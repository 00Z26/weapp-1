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
  var user = await DB.select('user_type','user_id').from('community').where('community_id', data.community_id);
  var member = await DB.select('user_type','user_id').from('community_user').where('community_id', data.community_id).whereNot('user_id',user[0].user_id);
  if (member.length > 0) {
    for (var i = 0; i < member.length; i++) {
      if (member[i].user_type == 0) {
        var m = await DB.select('*').from('individual').where('individual_id', member[i].user_id);
        result[i+1].user_type = 0;
        result[i + 1].user_id = member[i].user_id;
        result[i + 1].user_name = m[0].individual_name;
        result[i + 1].user_image = m[0].image;
        result[i + 1].answer_num = m[0].answer_num;
        result[i + 1].project_num = m[0].project_num;
        result[i + 1].community_num = m[0].setcommunity_num + m[0].joincommunity_num;
        result[i + 1].fans_num = m[0].fans_num;
      }
      else {
        var m = await DB.select('*').from('company').where('company_id', member[i].user_id);
        result[i + 1].fans_type = 1;
        result[i+1].fans_id = member[i].user_id;
        result[i+1].fans_name = m[0].company_name;
        result[i + 1].fans_image = m[0].image;
        result[i + 1].answer_num =m[0].answer_num;
        result[i + 1].project_num = m[0].project_num;
        result[i + 1].community_num = m[0].setcommunity_num + m[0].joincommunity_num;
        result[i + 1].fans_num = m[0].fans_num;
      }
    }
  }
  if (user.user_type == 0) {
    var m = await DB.select('*').from('individual').where('individual_id', user.user_id);
    result[0].user_type = 0;
    result[0].user_id = member[i].user_id;
    result[0].user_name = m[0].individual_name;
    result[0].user_image = m[0].image;
    result[0].answer_num = m[0].answer_num;
    result[0].project_num = m[0].project_num;
    result[0].community_num = m[0].setcommunity_num + m.joincommunity_num;
    result[0].fans_num = m[0].fans_num;
  }
  else{
    var m = await DB.select('*').from('company').where('company_id', member[i].user_id);
    result[0].fans_type = 1;
    result[0].fans_id = member[i].user_id;
    result[0].fans_name = m[0].company_name;
    result[0].fans_image = m[0].image;
    result[0].answer_num = m[0].answer_num;
    result[0].project_num = m[0].project_num;
    result[0].community_num = m[0].setcommunity_num + m.joincommunity_num;
    result[0].fans_num = m[0].fans_num;
  }
  ctx.body = {
    code: 1,
    result: result,        //返回关注的所有人，最新的在前
  }
}