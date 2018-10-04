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
  var myfans = await DB.select('*').from('user_user').where({ idol_id: data.user_id, idol_type: data.user_type }).orWhere({fans_id: data.user_id, idol_type: data.user_type }).orderBy('time', 'desc');
  var idol = await DB.select('*').from('user_user').where({ fans_id: data.user_id, fans_type: data.user_type }).orderBy('time', 'desc');
  var count=0;
  for(count=0;count<20;count++){
    if (myfans[i].fans_type == 0) {
      var r = await DB.select('*').from('individual').where('individual_id', myfans[i].fans_id);
      result[i].fans_type = 0;
      result[i].fans_id = myfans[i].fans_id;
      result[i].fans_name = r[0].individual_name;
      result[i].fans_image = r[0].image;
    }
    else {
      var r = await DB.select('*').from('company').where('company_id', myfans[i].fans_id);
      result[i].fans_type = 1;
      result[i].fans_id = myfans[i].fans_id;
      result[i].fans_name = r[0].company_name;
      result[i].fans_image = r[0].image;
    }
  }


  if (myfans.length > 0) {
    for (var i = 0; i < myfans.length; i++) {
      if (myfans[i].fans_type == 0) {
        var r = await DB.select('*').from('individual').where('individual_id', myfans[i].fans_id);
        result[i].fans_type = 0;
        result[i].fans_id = myfans[i].fans_id;
        result[i].fans_name = r[0].individual_name;
        result[i].fans_image = r[0].image;
      }
      else {
        var r = await DB.select('*').from('company').where('company_id', myfans[i].fans_id);
        result[i].fans_type = 1;
        result[i].fans_id = myfans[i].fans_id;
        result[i].fans_name = r[0].company_name;
        result[i].fans_image = r[0].image;
      }
    }
  }
  ctx.body = {
    code: 1,
    result: result,        //返回关注的所有人，最新的在前
  }
}