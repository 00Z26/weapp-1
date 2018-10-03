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
  var date = new Date();
  var result = '回答成功';
  //存储回答，项目/问题（0/1）
  var answer_id = await DB('answer').returning('answer_id').insert({ user_type: data.user_type, user_id: data.user_id, answer_info: data.answer_info, answer_time: date, commentnum: 0, praisenum: 0 ,object_type: data.object_type, object_id: data.object_id});
  //项目/问题回答数更新
  if(data.object_type==0){
    var update = await DB('project').where('project_id', data.object_id).increment('answernum', 1);
  }
  else {
    var update = await DB('question').where('question_id', data.object_id).increment('answernum', 1);
  }
  //用户回答问题数量更新
  if (data.user_type == 0) {
    var update = await DB('individual').where('individual_id', data.user_id).increment('answer_num', 1);
  }
  else {
    var update = await DB('company').where('company_id', data.user_id).increment('answer_num', 1);
  }

  ctx.body = {
    code: 1,
    result: result
  }

}