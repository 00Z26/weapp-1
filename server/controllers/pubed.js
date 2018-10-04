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
  var result = [];
  var answer = await DB.select('answer_id','answer_info','answer_time','object_type','object_id').from('answer').where({ user_id: data.user_id, user_type: data.user_type }).orderBy('answer_time', 'desc');
  for (var i = 0; i < answer.length; i++) {
    if (answer[i].object_type == 0) {
      var project = await DB.select('project_title').from('project').where('project_id', answer[i].object_id);
      result[i] = {
        answer_id:answer[i].answer_id,
        answer_info:answer[i].answer_info,
        answer_time:anaswer[i].answer_time,
        object_type:0,
        object_id:answer[i].object_id,
        object_title:project[0].project_title
      };
    }
    else {
      var question = await DB.select('question_title').from('question').where('question_id', answer[i].object_id);
      result[i] = {
        answer_id: answer[i].answer_id,
        answer_info: answer[i].answer_info,
        answer_time: answer[i].answer_time,
        object_type: 0,
        object_id: answer[i].object_id,
        object_title: question[0].question_title
      };
    }
  }
  var project = await DB.select('*').from('project').where({ user_id: data.user_id, user_type: data.user_type }).orderBy('project_time', 'desc');
  var question = await DB.select('*').from('question').where({ user_id: data.user_id, user_type: data.user_type }).orderBy('question_time', 'desc');

  ctx.body = {
    code: 1,
    question: question,        //返回发表的所有问题，最新的在前
    project:project,
    answer:result
  }
}