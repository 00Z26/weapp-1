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
  var result='建圈成功';
  var x = await DB.select('company_id').from('company').where('company_id', data.user_id);    //获取建圈的人的类型
  var y = await DB.select('community_name').from('community').where('community_name', data.community_name);
  if(y==0){
    //如果圈名不重复，则将圈子信息插入并获取自增id
    var community_id = await DB('community').returning('community_id').insert({ user_type: data.user_type, user_id: data.user_id, community_name: data.community_name, community_image:data.community_image, community_type: data.community_type, community_introduce: data.community_introduce, community_time: date, questionnum: 0, projectnum: 0, usernum: 1 })
    //将信息存储在圈子-用户的关系表中
    var result_community_user = await DB('community_user').insert({ community_id: community_id, user_type: data.user_type, user_id: data.user_id, time: date });
  }
  else{
    //如果圈名重复，则重新输入
    result='圈子名称重复';
  }
  //更新用户建圈数
  if (data.user_type == 0) {
    var update = await DB('individual').where('individual_id', data.user_id).increment('setcommunity_num', 1);
  }
  else {
    var update = await DB('company').where('company_id', data.user_id).increment('setcommunity_num', 1);
  }

  ctx.body = {
    result:result,
  }

}