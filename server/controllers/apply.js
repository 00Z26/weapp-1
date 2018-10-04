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
  var result= await DB('apply').insert({ user_type: data.user_type, user_id: data.user_id, community_id: data.community_id, time: date });
  ctx.body = {
    code: 1,
    result: result
  }
}