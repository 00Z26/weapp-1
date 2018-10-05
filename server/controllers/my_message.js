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
  if(data.user_type==0){
    var individual = await DB.select('individual_name', 'individual_sex', 'individual_job', 'individual_corporation', 'individual_introduce').from('individual').where('individual_id', data.user_id );
    console.log(individual)
    if(individual[0].individual_job=='本科生'){
      individual[0].individual_job = 0;
    } else if (individual[0].individual_job == '硕士'){
      individual[0].individual_job = 1;
    } else if (individual[0].individual_job == '博士') {
      individual[0].individual_job = 2;
    }
    result=individual[0];
  }
  else{
    var company = await DB.select('*').from('company').where('company_id', data.user_id);
    result = company[0];
  }
  ctx.body = {
    code: 1,
    result: result,        //返回我的所有信息
  }
}