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
  var result = [];
  data.object_id=JSON.parse(data.object_id)
  
  if (data.object_type == 0) {
    for (var i = 0; i < data.object_id.length; i++) {
      //存储点赞（点赞用户-点赞对象、0为点赞回答；1为点赞评论）
      result[i] = await DB('praise').insert({ user_type: data.user_type, user_id: data.user_id, object_type: data.object_type, object_id: data.object_id[i], praise_time: date });
;      //回答点赞数更新
      var update = await DB('answer').where('answer_id', data.object_id[i]).increment('praisenum', 1);
  }
  }
  else
  {
    for (var i = 0; i < data.object_id.length; i++) {
    //存储点赞（点赞用户-点赞对象、0为点赞回答；1为点赞评论）
    result[i] = await DB('praise').insert({ user_type: data.user_type, user_id: data.user_id, object_type: data.object_type, object_id: data.object_id[i], praise_time: date });
    //评论点赞数更新
    var update = await DB('comment').where('comment_id', data.object_id[i]).increment('praisenum', 1);
  }
  }
  
  ctx.body = {
    code: 1,
    result: result
  }

}