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
  var community_id = await DB.select('community_id').from('community_user').where({ user_id: data.user_id, user_type: data.user_type });
  var result = [];
  var obj = await DB.select('*').from('PQ_community').orderBy('time', 'desc').where('community_id', 'in', community_id);
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].object_type == 0) {
      var information = await DB.select('*').from('project').where('project_id', obj[j].object_id);
      result1[i] = information;
    }
    if (obj[i].object_type == 1) {
      var information = await DB.select('*').from('question').where('question_id', obj[j].object_id);
      result1[i] = information;
    }
  }
  for (var i = 0; i < result.length; i++) {
    if (result1[i].user_type == 0) {
      var information = await DB.select('*').from('individual').where('individual_id', result1[i].user_id);
      result1[i].user_info = information;
    }
    if (result1[i].user_type == 1) {
      var information = await DB.select('*').from('company').where('company_id', result1[i].user_id);
      result1[i].user_info = information;
    }
  }
  ctx.body = {
    code: 1,
    result: result      //返回id所在圈子的问题、项目（按时间倒序）
  }
}