const { mysql: config } = require('../config')
const DB = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
})
module.exports = async (ctx, next) => {
  var data=ctx.query;
  var date=new Date();
  var last_time='';
  if(data.user_type==0){
   last_time = await DB.select('last_check_time').from('individual').where('individual_id',data.user_id);
    var update = await DB('individual').update({ 'last_check_time': date }).where('individual_id', data.user_id);
  }
  else{
    last_time = await DB.select('last_check_time').from('company').where('company_id', data.user_id);
    var update = await DB('company').update({ 'last_check_time': date }).where('company_id', data.user_id);
  }
  var praise='';
  var invite='';
  var answer='';
  var count=0;

  //获取点赞新消息
  //获取回答点赞
  count=0;
  var praise_answer=[];
  var answer = await DB.select('answer_id','answer_info','object_type','object_id').from('answer').where({ 'user_id': data.user_id, 'user_type':data.user_type});
  for(var i=0;i<answer.length;i++){
    var other_information = await DB.select('user_type', 'user_id', 'praise_time').from('praise').where('praise_time', '>', last_time[0].last_check_time).andWhere({ 'object_id': answer[i].answer_id, 'object_type': 0 });
    for (var j = 0; j < other_information.length; j++) {
      if (other_information[j].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', other_information[j].user_id);
        other_information[j].user_name = information[0].individual_name;
        other_information[j].user_image = information[0].image;
      }
      else {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', other_information[j].user_id);
        other_information[j].user_name =information[0].company_name;
        other_information[j].user_image = information[0].image;
      }
      praise_answer[count]={
        answer_id:answer[i].answer_id,
        answer_info:answer[i].answer_info,
        object_type: answer[i].object_type,
        object_id:answer[i].object_id,
        user_type: other_information[j].user_type,
        user_id: other_information[j].user_id,
        user_name: other_information[j].user_name,
        user_image: other_information[j].user_image,
        praise_time: other_information[j].praise_time,
      }
      count = count + 1;
    }
  }
  
  //获取评论点赞
  count=0;
  var praise_comment=[];
  var comment = await DB.select('comment_id', 'comment_info', 'answer_id').from('comment',).where({ 'user_id': data.user_id, 'user_type': data.user_type });
  for (var i = 0; i < comment.length; i++) {
    var other_information = await DB.select('user_type', 'user_id', 'praise_time').from('praise').where('praise_time', '>', last_time[0].last_check_time).andWhere({ 'object_id': comment[i].comment_id, 'object_type': 1 });
    for (var j = 0; j < other_information.length;j++){
      if (other_information[j].user_type==0){
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', other_information[j].user_id);
        other_information[j].user_name = information[0].individual_name;
        other_information[j].user_image = information[0].image;
      }
      else{
        var information = await DB.select('company_name', 'image').from('company').where('company_id', other_information[j].user_id);
        other_information[j].user_name = information[0].company_name;
        other_information[j].user_image = information[0].image;
      }
      praise_comment[count] = {
        comment_id: comment[i].comment_id,
        comment_info: comment[i].comment_info,
        answer_id: comment[i].answer_id,
        user_type: other_information[j].user_type,
        user_id: other_information[j].user_id,
        user_name: other_information[j].user_name,
        user_image: other_information[j].user_image,
        praise_time: other_information[j].praise_time
      };
      count = count + 1;
    }
  }
var praise={
    praise_answer:praise_answer,
    praise_comment:praise_comment
  }


  //获取邀请消息
  //获取邀请的项目
  var invite_project=[];
  var tem = await DB.select('host_type', 'host_id', 'invite_id', 'time').from('invite').where('time', '>', last_time[0].last_check_time).andWhere({ 'guest_id': data.user_id, 'guest_type': data.user_type, 'invite_type': 'P' });
  for (var i = 0; i < tem.length;i++){
    var p = await DB.select('project_id', 'project_title').from('project').where('project_id', tem[i].invite_id);
    if(tem[i].host_type==0){
    var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', tem[i].host_id);
      tem[i].user_name = information[0].individual_name;
      tem[i].user_image = information[0].image;
    }
    else{
      var information = await DB.select('company_name', 'image').from('company').where('company_id', tem[i].host_id);
      tem[i].user_name = information[0].company_name;
      tem[i].user_image = information[0].image;
    }
    invite_project[i]={
      project_id: p[0].invite_id,
      project_title:p[0].project_title,
      user_type:tem[i].host_type,
      user_id:tem[i].host_id,
      user_name:tem[i].user_name,
      user_image:tem[i].user_image,
      time:tem[i].time
    };
    i = i + 1;
  }

  //获取邀请的问题
  var invite_question = [];
  var tem = await DB.select('host_type', 'host_id', 'invite_id', 'time').from('invite').where('time', '>', last_time[0].last_check_time).andWhere({ 'guest_id': data.user_id, 'guest_type': data.user_type, 'invite_type': 'Q' });
  for (var i = 0; i < tem.length; i++) {
    var q = await DB.select('question_id', 'question_title').from('question').where('question_id', tem[i].invite_id);
    if (tem[i].host_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', tem[i].host_id);
      tem[i].user_name = information[0].individual_name;
      tem[i].user_image = information[0].image;
    }
    else {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', tem[i].host_id);
      tem[i].user_name = information[0].company_name;
      tem[i].user_image = information[0].image;
    }
    invite_question[i] = {
      question_id: p[0].invite_id,
      question_title: p[0].question_title,
      user_type: tem[i].host_type,
      user_id: tem[i].host_id,
      user_name: tem[i].user_name,
      user_image: tem[i].user_image,
      time: tem[i].time
    };
    i = i + 1;
  }
  //获取邀请的圈子
  var invite_community = [];
  var tem = await DB.select('host_type', 'host_id', 'invite_id', 'time').from('invite').where('time', '>', last_time[0].last_check_time).andWhere({ 'guest_id': data.user_id, 'guest_type': data.user_type, 'invite_type': 'C' });
  for (var i = 0; i < tem.length; i++) {
    var c = await DB.select('community_id', 'community_name').from('community').where('community_id', tem[i].invite_id);
    if (tem[i].host_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', tem[i].host_id);
      tem[i].user_name = information[0].individual_name;
      tem[i].user_image = information[0].image;
    }
    else {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', tem[i].host_id);
      tem[i].user_name = information[0].company_name;
      tem[i].user_image = information[0].image;
    }
    invite_community[i] = {
      community_id: p[0].invite_id,
      community_name: p[0].community_name,
      user_type: tem[i].host_type,
      user_id: tem[i].host_id,
      user_name: tem[i].user_name,
      user_image: tem[i].user_image,
      time: tem[i].time
    };
    i = i + 1;
  }

  //获取申请的圈子
  var apply_community = [];
  count=0;
  var community = await DB.select('community_id', 'community_name').from('community').where({ 'user_id': data.user_id, 'user_type': data.user_type });
  for (var i = 0; i < community.length; i++) {
    var user = await DB.select('user_type', 'user_id','time').from('apply').where('time', '>', last_time[0].last_check_time).andWhere('community_id', community[i].community_id);
    for(var j=0;j<user.length;j++){
      if (user[j].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', user[j].user_id);
        user[j].user_name = information[0].individual_name;
        user[j].user_image = information[0].image;
      }
      else {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', user[j].user_id);
        user[j].user_name = information[0].company_name;
        user[j].user_image = information[0].image;
      }
      apply_community[count] = {
        community_id: community[i].community_id,
        community_name: community[i].community_name,
        user_type: user[j].user_type,
        user_id: user[j].user_id,
        user_name: user[j].user_name,
        user_image: user[j].user_image,
        time: user[j].time
      };
      count = count + 1;
    }
}

var  invite = {
    invite_project:invite_project,
    invite_question:invite_question,
    invite_community:invite_community,
    apply_community:apply_community
  }
  
  //获取回答消息
  //获取项目回答
  var reply_project = [];
  count = 0;
  var project = await DB.select('project_id', 'project_title').from('project').where({ 'user_id': data.user_id, 'user_type': data.user_type });
  for(var i=0;i<project.length;i++){
    var user = await DB.select('user_type', 'user_id', 'answer_time').from('answer').where('answer_time', '>', last_time[0].last_check_time).andWhere({ 'object_id':project[i].project_id , 'object_type': 0 });
    for (var j = 0; j < user.length; j++) {
      if (user[j].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', user[j].user_id);
        user[j].user_name = information[0].individual_name;
        user[j].user_image = information[0].image;
      }
      else {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', user[j].user_id);
        user[j].user_name = information[0].company_name;
        user[j].user_image = information[0].image;
      }
      reply_project[count] = {
        project_id:project[i].project_id,
        project_title:project[i].project_title,
        user_type:user[j].user_type,
        user_id:user[j].user_id,
        user_name:user[j].user_name,
        user_image:user[j].user_image,
        time:user[j].answer_time
      };
      count = count + 1;
    }
    }
  //获得问题回答
  var reply_question = [];
  count = 0;
  var question = await DB.select('question_id', 'question_title').from('question').where({ 'user_id': data.user_id, 'user_type': data.user_type });
  for (var i = 0; i < question.length; i++) {
    var user = await DB.select('user_type', 'user_id', 'answer_time').from('answer').where('answer_time', '>', last_time[0].last_check_time).andWhere({ 'object_id': question[i].question_id, 'object_type': 1 });
    for (var j = 0; j < user.length; j++) {
      if (user[j].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', user[j].user_id);
        user[j].user_name = information[0].individual_name;
        user[j].user_image = information[0].image;
      }
      else {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', user[j].user_id);
        user[j].user_name = information[0].company_name;
        user[j].user_image = information[0].image;
      }
      reply_question[count] = {
        question_id: question[i].question_id,
        question_title: question[i].question_title,
        user_type: user[j].user_type,
        user_id: user[j].user_id,
        user_name: user[j].user_name,
        user_image: user[j].user_image,
        time: user[j].answer_time
      };
      count = count + 1;
    }
  }
  //获取评论  
  var comment = [];
  count = 0;
  var answer = await DB.select('answer_id', 'answer_info').from('answer').where({ 'user_id': data.user_id, 'user_type': data.user_type });
  for (var i = 0; i < answer.length; i++) {
    var user = await DB.select('user_type', 'user_id', 'comment_time').from('comment').where('comment_time', '>', last_time[0].last_check_time).andWhere({ 'answer_id': answer[i].answer_id });
    for (var j = 0; j < user.length; j++) {
      if (user[j].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', user[j].user_id);
        user[j].answer_time=user[j].comment_time;
        user[j].user_name = information[0].individual_name;
        user[j].user_image = information[0].image;
      }
      else {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', user[j].user_id);
        user[j].answer_time = user[j].comment_time;
        user[j].user_name = information[0].company_name;
        user[j].user_image = information[0].image;
      }
      comment[count] = {
        answer_id:answer[i].answer_id,
        answer_info:answer[i].answer_info,
        user_type: user[j].user_type,
        user_id: user[j].user_id,
        user_name: user[j].user_name,
        user_image: user[j].user_image,
        time: user[j].comment_time
      };
      count = count + 1;
    }
  } 
  var reply = {
    reply_project:reply_project,
    reply_question: reply_question,
    comment: comment,
  }
  
  ctx.body = {
    praise: praise,
    invite: invite,
    comment:reply,
    last_time: last_time[0].last_check_time
  }
}