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
  var result1=[];
  var result2=[];
  var count1=0;
  var count2=0;

  //获取圈子信息
  var community = await DB.select('*').from('community').where('community_id', data.community_id);
  if (community[0].user_type == 0) {
    var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', community[0].user_id);
    community[0].user_name = information[0].individual_name;
    community[0].user_image = information[0].image;
  }
  if (community[0].user_type == 1) {
    var information = await DB.select('company_name', 'image').from('company').where('company_id', community[0].user_id);
    community[0].user_name = information[0].company_name;
    community[0].user_image = information[0].image;
  }

//获取圈子内容
  var obj = await DB.select('object_type','object_id').from('PQ_community').orderBy('time','desc').where('community_id',data.community_id).andWhere('power',1);
  for(var i=0;i<obj.length;i++)
    {
      if (obj[i].object_type == 0) {
        var information = await DB.select('*').from('project').where('project_id', obj[i].object_id);
        result1[count1++]= information[0];
      }
     if (obj[i].object_type == 1) {
       var information = await DB.select('*').from('question').where('question_id', obj[i].object_id);
        result2[count2++] = information[0];
     }
    }

  //获取项目用户信息
  for (var i = 0; i < result1.length; i++) {
    if (result1[i].user_type == 0) {
      var information = await DB.select('individual_name','image').from('individual').where('individual_id', result1[i].user_id);
      result1[i].user_name = information[0].individual_name;
      result1[i].user_image = information[0].image;
    }
    if (result1[i].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', result1[i].user_id);
      result1[i].user_name = information[0].company_name;
      result1[i].user_image = information[0].image;
    }
  }
  //获取问题用户信息
  for (var i = 0; i < result2.length; i++) {
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
  ctx.body = {
    code: 1,
    community:community[0],
    result1:result1,     //返回id所在圈子的问题、项目（按时间倒序）
    result2: result2,
  }
}