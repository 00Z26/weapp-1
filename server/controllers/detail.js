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
  var data = ctx.query;
  var result='';
  var answer='';
  if (data.object_type==0){
    var project = await DB.select('*').from('project').where('project_id', data.object_id);
    //判断回答的是否显示
    if(data.user_type==project[0].user_type&&data.user_id==project[0].user_id)
    {
      answer = await DB.select('*').from('answer').where({ 'object_type': 0, 'object_id': data.object_id });
      //获取回答项目的用户姓名
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].user_type == 0) {
          var information = await DB.select('individual_name','image').from('individual','image').where('individual_id', answer[i].user_id);
          answer[i].user_name = information[0].individual_name;
          answer[i].user_image = information[0].image;
        }
        if (answer[i].user_type == 1) {
          var information = await DB.select('company_name','image').from('company','image').where('company_id', answer[i].user_id);
          answer[i].user_name = information[0].company_name;
          answer[i].user_image = information[0].image;
        }
      }
    }
    else{
      answer = await DB.select('*').from('answer').where({ 'object_type': 0, 'object_id': data.object_id }).andWhere({user_type:data.user_type,user_id:data.user_id});
      //获取回答项目的用户姓名
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].user_type == 0) {
          var information = await DB.select('individual_name','image').from('individual').where('individual_id', answer[i].user_id);
          answer[i].user_name = information[0].individual_name;
          answer[i].user_image = information[0].image;
        }
        if (answer[i].user_type == 1) {
          var information = await DB.select('company_name','image').from('company').where('company_id', answer[i].user_id);
          answer[i].user_name = information[0].company_name;
          answer[i].user_image = information[0].image;
        }
      }
    } 
    //获取发布项目的用户的姓名
    if (project[0].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', project[0].user_id);
      project[0].user_name = information[0].individual_name;
      project[0].user_image = information[0].image;
    }
    if (project[0].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', project[0].user_id);
      project[0].user_name = information[0].company_name;
      project[0].user_image = information[0].image;
    }
    result = project[0];
    }

    
  else{
      var question = await DB.select('*').from('question').where('question_id', data.object_id);
      answer = await DB.select('*').from('answer').where({ 'object_type': 1, 'object_id': data.object_id });
      //获取回答问题的用户姓名
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].user_type == 0) {
          var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', answer[i].user_id);
          answer[i].user_name = information[0].individual_name;
          answer[i].user_image = information[0].image;
        }
        if (answer[i].user_type == 1) {
          var information = await DB.select('company_name', 'image').from('company').where('company_id', answer[i].user_id);
          answer[i].user_name = information[0].company_name;
          answer[i].user_image = information[0].image;
        }
      }
      //获取发布问题的用户的姓名
    if (question[0].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', question[0].user_id);
      question[0].user_name = information[0].individual_name;
      question[0].user_image = information[0].image;
      }
    if (question[0].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', question[0].user_id);
      question[0].user_name = information[0].company_name;
      question[0].user_image = information[0].image;
      }
    result = question[0];
  }
  ctx.body = {
    result: result,
    answer: answer
  }
}