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
  var project_id = await DB.select('object_id').from('PQ_user').where({ user_id: data.user_id, user_type: data.user_type, object_type: 0 }).orderBy('time', 'desc');
  if (project_id.length > 0) {
    for (var i = 0; i < project_id.length; i++) {
      result[i] = await DB.select('*').from('project').where('project_id', project_id[i]);
    }
  }
  ctx.body = {
    code: 1,
    result: result,        //返回关注的所有项目，最新的在前
  }
}