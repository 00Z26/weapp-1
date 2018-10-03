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
  var question_id = await DB.select('object_id').from('PQ_user').where({ user_id: data.user_id, user_type: data.user_type,object_type:1 }).orderBy('time', 'desc');
  if(question_id.length>0){
    for(var i=0;i<question_id.length;i++){
      result[i] = await DB.select('*').from('question').where('question_id',question_id[i]);
    }
  }
  ctx.body = {
    code: 1,
    result: result,        //返回关注的所有问题，最新的在前
  }
}