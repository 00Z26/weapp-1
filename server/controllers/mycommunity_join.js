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
  var community_id = await DB.select('community_id').from('community_user').where({ user_id: data.user_id, user_type: data.user_type }).orderBy('time', 'desc');
  var community = await DB.select('*').from('community').whereNot('user_id', data.user_id).whereIn('community_id', community_id).orderBy('community_time', 'desc');
  for (var i = 0; i < community.length; i++) {
    if (community[i].user_type == 0) {
      var information = await DB.select('individual_name').from('individual').where('individual_id', community[i].user_id);
      community[i].user_name = information[0].individual_name;
    }
    if (community[i].user_type == 1) {
      var information = await DB.select('company_name').from('company').where('company_id', community[i].user_id);
      community[i].user_name = information[0].company_name;
    }
  }
  ctx.body = {
    code: 1,
    result: community,        //返回我加入的圈子，最新的在前
  }
}