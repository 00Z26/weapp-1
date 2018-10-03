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
  var result={};
  var result1 = await DB.select('individual_id').from('individual').where('openid', data.openid);
  var result2 = await DB.select('company_id').from('company').where('openid', data.openid);
  if(result1.length==0&&result2.length==0){
     result='未注册';
  }
  else if(result.length){
    result.user_type=0;
    result.user_id=result1[0].individual_id;
  }
  else{
    result.user_type = 1;
    result.user_id = result2[0].individual_id;
  }
  ctx.body={
    result:result
  }  
}
