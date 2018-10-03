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
  var data =ctx.query;
  var code=1;
 if(data.individualName && (data.individualJob!=0)){
   var result2 = await DB('user').insert({ userid: code, username: data.individualName, job: data.individualJob , corporation: data.individualCompany });
   code=0
 }
  var result1 = await DB.select('userid', 'username', 'job', 'corporation').from('user');
  ctx.body = {
    code: code,
    url1: result1
  }

}