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
  var answer = await DB.select('*').from('answer').where('answer_id', data.answer_id);
  var comment = await DB.select('*').from('comment').where('answer_id',data.answer_id).orderBy('praisenum','desc');
  for (var i = 0; i < comment.length; i++) {
    if (comment[i].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', comment[i].user_id);
      comment[i].user_name = information[0].individual_name;
      comment[i].user_image = information[0].image;
    }
    if (comment[i].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', comment[i].user_id);
      comment[i].user_name = information[0].company_name;
      comment[i].user_image = information[0].image;
    }
  }
  if (answer.user_type == 0) {
    var information = await DB.select('individual_name','image').from('individual').where('individual_id', answer[i].user_id);
    answer.user_name = information[0].individual_name;
    answer.user_image=information[0].image;
  }
  if (answer.user_type == 1) {
    var information = await DB.select('company_name', 'image').from('company').where('company_id', answer[i].user_id);
    answer.user_name = information[0].company_name;
    answer.user_image = information[0].image;
  }
  ctx.body = {
    code: 1,
    result: comment,       //返回发表的所有项目，最新的在前
    answer: answer
  }
}