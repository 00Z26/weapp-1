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
  let count1= 0;
  let count2= 0;
  var power=1;
  var result1=[];
  var result2=[];
  var community_id = await DB.select('community_id').from('community_user').where({user_type:data.user_type,user_id:data.user_id});
  //没有圈子的情况
    result1 = await DB.select('*').from('project').where('project_time', '>', date.getTime() - 15 * 24 * 60 * 60 * 1000).andWhere('power', power).orderBy('project_time', 'desc');
    result2 = await DB.select('*').from('question').where('question_time', '>', date.getTime() - 15 * 24 * 60 * 60 * 1000).andWhere('power', power).orderBy('question_time', 'desc');
    var length1 = result1.length;
    var length2 = result1.length;
    for (var i = 0; i < length1; i++) {
      if (result1[i].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', result1[i].user_id);
        result1[i].user_name = information[0].individual_name;
        result1[i].user_image = information[0].image;
      }
      if (result1[i].user_type == 1) {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', result1[i].user_id);
        result1[i].user_name = information[0].company_name;
        result1[i].user_image = information[0].image;
      }
    }
    for (var i = 0; i < length2; i++) {
      if (result2[i].user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', result2[i].user_id);
        result2[i].user_name = information[0].individual_name;
        result2[i].user_image = information[0].image;
      }
      if (result2[i].user_type == 1) {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', result2[i].user_id);
        result2[i].user_name = information[0].company_name;
        result2[i].user_image = information[0].image;
      }
    }
  count1=length1;
  count2=length2;
  //有圈子
   if (community_id.length != 0) {
    var object_info = await DB.select('object_id', 'object_type').from('PQ_community').where('community_id', 'in', community_id).andWhere('power', power).andWhere('time', '>', date.getTime() - 15 * 24 * 60 * 60 * 1000).orderBy('time', 'desc');
    
    for(var i=0;i<object_info.length;i++){
      //对应的是项目
      if(object_info[i].object_type==0){
        var p = await DB.select('*').from('project').where('project_id',object_info[i].object_id);
        if (p[0].user_type == 0) {
          var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', p[0].user_id);
          p[0].user_name = information[0].individual_name;
          p[0].user_image = information[0].image;
        }
        if (p[0].user_type == 1) {
          var information = await DB.select('company_name', 'image').from('company').where('company_id', p[0].user_id);
          p[0].user_name = information[0].company_name;
          p[0].user_image = information[0].image;
        }
        result1[count1++]=p[0];
      }
      else{
        //对应的是问题
        var q = await DB.select('*').from('question').where('question_id', object_info[i].object_id);
        if (q[0].user_type == 0) {
          var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', q[0].user_id);
          q[0].user_name = information[0].individual_name;
          q[0].user_image = information[0].image;
        }
        if (q[0].user_type == 1) {
          var information = await DB.select('company_name', 'image').from('company').where('company_id', q[0].user_id);
          q[0].user_name = information[0].company_name;
          q[0].user_image = information[0].image;
        }
        result2[count2++] = q[0];
      }  
    }
}
ctx.body = {
    code: 1,
    result1:result1,        //返回最近两天的、无权限的项目
    result2:result2        //返回最新两天的、无权限问题
  }
}

//

