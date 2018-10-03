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
  var date = new Date();
  //将信息存储在圈子-用户的关系表中
  var result = await DB('community_user').insert({ community_id: data.community_id, user_type: data.user_type, user_id: data.user_id, time: date });
  //更新对应圈子人数
  var result = await DB('community').where('community_id', data.community_id).increment('usernum', 1);;
  //更新用户加圈数
  if (data.user_type == 0) {
    var update = await DB('individual').where('individual_id', data.user_id).increment('joincommunity_num', 1);
  }
  else {
    var update = await DB('company').where('company_id', data.user_id).increment('joincommunity_num', 1);
  }

  ctx.body = {
    code: 1,
    result: result
  }

}