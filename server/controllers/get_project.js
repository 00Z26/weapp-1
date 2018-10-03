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
  var project = await DB.select('*').from('project').where('project_id',data.project_id);
  var answer = await DB.select('*').from('answer').where({ 'object_type': 1, 'object_id': data.project_id});
  for (var i = 0; i < answer.length; i++) {
    if (answer[i].user_type == 0) {
      var information = await DB.select('individual_name','image').from('individual').where('individual_id', answer[i].user_id);
      answer[i].user_name = information[0].individual_name;
      answer[i].user_image = information[0].image;
    }
    if (comment[i].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', answer[i].user_id);
      answer[i].user_name = information[0].company_name;
      answer[i].user_image = information[0].image;
    }
  }

  if (project.user_type == 0) {
    var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', comment[i].user_id);
    project.user_name = information[0].individual_name;
    project.user_image = information[0].image;
  }
  if (project.user_type == 1) {
    var information = await DB.select('company_name', 'image').from('company').where('company_id', comment[i].user_id);
    project.user_name = information[0].company_name;
    project.user_image = information[0].image;
  }
  project.answer=answer;
  ctx.body = {
    code: 1,
    result: project,        //返回发表的所有项目，最新的在前
  }
}