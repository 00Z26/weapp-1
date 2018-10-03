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
  var result1 = await DB.select('username', 'password').from('user');   //读数据
  var result2=await DB('user').insert({ username: 'simaqi', password: 'simaqi521',id:2}) //插入数据
  ctx.body = {
    code: code,
    name: name,
    url1: result1
  }
}