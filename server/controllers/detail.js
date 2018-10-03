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
    answer = await DB.select('*').from('answer').where({ 'object_type': 0, 'object_id': data.object_id });
    //获取回答项目的用户姓名
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].user_type == 0) {
        var information = await DB.select('individual_name').from('individual').where('individual_id', answer[i].user_id);
        answer[i].user_name = information[0].individual_name;
        answer[i].user_image = information[0].image;
      }
      if (answer[i].user_type == 1) {
        var information = await DB.select('company_name').from('company').where('company_id', answer[i].user_id);
        answer[i].user_name = information[0].company_name;
        answer[i].user_image = information[0].image;
      }
    }
    //获取发布项目的用户的姓名
    if (project.user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', project.user_id);
      project.user_name = information[0].individual_name;
      project.user_image = information[0].image;
    }
    if (project.user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', project.user_id);
      project.user_name = information[0].company_name;
      project.user_image = information[0].image;
    }
    result = project;
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
      if (question.user_type == 0) {
        var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', question.user_id);
        question.user_name = information[0].individual_name;
        question.user_image = information[0].image;
      }
      if (question.user_type == 1) {
        var information = await DB.select('company_name', 'image').from('company').where('company_id', question.user_id);
        question.user_name = information[0].company_name;
        question.user_image = information[0].image;
      }
      result = question;
  }
  ctx.body = {
    result: result,
    answer: answer
  }
}