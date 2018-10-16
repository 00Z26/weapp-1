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
    var information = await DB.select('*').from('individual').where('individual_id', data.user_id);
    result.focusnum=parseInt(information[0].idol_num) + parseInt(information[0].questionfocus_num) + parseInt(information[0].projectfocus_num);
    result.pubednum=information[0].answer_num+information[0].question_num+information[0].project_num;
    result.communitynum=information[0].setcommunity_num+information[0].joincommunity_num;
    result.fans_num=information[0].fans_num;
    result.individual_name = information[0].individual_name
    result.image = information[0].image
    result.individual_sex=information[0].individual_sex;
    result.individual_job = information[0].individual_job
    result.individual_state = information[0].individual_state
    result.individual_corporation = information[0].individual_corporation
    result.individual_introduce = information[0].individual_introduce
  }
  else{
    var information = await DB.select('*').from('company').where('company_id', data.user_id);
    result.focusnum = parseInt(information[0].idol_num) + parseInt(information[0].questionfocus_num) + parseInt(information[0].projectfocus_num);
    result.pubednum = information[0].answer_num + information[0].question_num + information[0].project_num;
    result.communitynum = information[0].setcommunity_num + information[0].joincommunity_num;
    result.fans_num = information[0].fans_num;
    result.company_name = information[0].company_name
    result.image = information[0].image
    result.company_type= information[0].company_type;
    result.company_state = information[0].company_state
    result.company_address = information[0].company_address
    result.company_introduce = information[0].company_introduce
  }
  
  ctx.body={
    result:result
  }
  }