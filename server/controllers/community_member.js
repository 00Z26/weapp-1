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
  var user = await DB.select('user_type','user_id','community_name').from('community').where('community_id', data.community_id);
  var member = await DB.select('user_type','user_id').from('community_user').where('community_id', data.community_id).whereNot('user_id',user[0].user_id);
  if (member.length > 0) {
    for (var i = 0; i < member.length; i++) {
      result[i + 1] = {};
      if (member[i].user_type == 0) {
        var m = await DB.select('*').from('individual').where('individual_id', member[i].user_id);
        result[i + 1]={
          user_type: 0,
          user_id: member[i].user_id,
          user_name: m[0].individual_name,
          user_image: m[0].image,
          answer_num: m[0].answer_num,
          project_num: m[0].project_num,
          community_num: m[0].setcommunity_num + m[0].joincommunity_num,
          fans_num: m[0].fans_num,
        }
      }
      else {
        var m = await DB.select('*').from('company').where('company_id', member[i].user_id);
        result[i + 1] = {
          user_type: 0,
          user_id: member[i].user_id,
          user_name: m[0].company_name,
          user_image: m[0].image,
          answer_num: m[0].answer_num,
          project_num: m[0].project_num,
          community_num: m[0].setcommunity_num + m[0].joincommunity_num,
          fans_num: m[0].fans_num,
        }
      }
    }
  }
  result[0] = {};
  if (user[0].user_type == 0) {
    var m = await DB.select('*').from('individual').where('individual_id', user[0].user_id);
    result[0] = {
      user_type: 0,
      user_id: user[0].user_id,
      user_name: m[0].individual_name,
      user_image: m[0].image,
      answer_num: m[0].answer_num,
      project_num: m[0].project_num,
      community_num: m[0].setcommunity_num + m[0].joincommunity_num,
      fans_num: m[0].fans_num,
    }
  }
  else{
    var m = await DB.select('*').from('company').where('company_id', user[0].user_id);
    result[0] = {
      user_type: 0,
      user_id: user[0].user_id,
      user_name: m[0].company_name,
      user_image: m[0].image,
      answer_num: m[0].answer_num,
      project_num: m[0].project_num,
      community_num: m[0].setcommunity_num + m[0].joincommunity_num,
      fans_num: m[0].fans_num,
    }
  }
  ctx.body = {
    code: 1,
    result: result,        //返回关注的所有人，最新的在前
  }
}