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
  var result1 = '更改成功';
  if (data.user_type == 0) {
    var result = await DB('individual').where('individual_id', data.user_id).update({individual_job: data.individual_job,individual_corporation:data.individual_corporation,individual_introduce:data.individual_introduce });
  }
  else {
    var result2 = await DB('company').where('company_id', data.user_id).update({ company_type: data.company_type, company_adress: data.company_adress, company_introduce: data.company_introduce })
  }
  ctx.body = {
    code: 1,
    result: result        //返回我的所有信息
  }
}