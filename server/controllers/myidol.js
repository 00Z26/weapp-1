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
  var result=[];
  var myidol = await DB.select('*').from('user_user').where({ fans_id: data.user_id, fans_type: data.user_type }).orderBy('time', 'desc');
  if (myidol.length>0){
    for (var i = 0; i < myidol.length; i++) {
      if (myidol[i].idol_type==0){
        var idol = await DB.select('*').from('individual').where('individual_id', myidol[i].idol_id);
        result[i] = {
          idol_type: 0,
          idol_id: myidol[i].idol_id,
          idol_name: idol[0].individual_name,
          idol_image: idol[0].image,
          answer_num: idol[0].answer_num,
          project_num: idol[0].project_num,
          community_num: idol[0].setcommunity_num + idol[0].joincommunity_num,
          fans_num: idol[0].fans_num,
        }
     }
     else{
        var idol = await DB.select('*').from('company').where('company_id', myidol[i].idol_id);
        result[i] = {
          idol_type: 1,
          idol_id: myidol[i].idol_id,
          idol_name: idol[0].company_name,
          idol_image: idol[0].image,
          answer_num: idol[0].answer_num,
          project_num: idol[0].project_num,
          community_num: idol[0].setcommunity_num + idol[0].joincommunity_num,
          fans_num: idol[0].fans_num,
        }
     }
    }
  }
  ctx.body = {
    code: 1,
    result: result,        //返回关注的所有人，最新的在前
  }
}