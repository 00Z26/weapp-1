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
  var power = JSON.parse(data.power);
  var result='发布成功';
  var question_id = await DB('question').returning('question_id').insert({user_type:data.user_type, user_id:data.user_id, question_title:data.question_title, question_info:data.question_info, question_time:date, answernum:0, power:power.object_power, hot:100,focus_num:0});
  if (power.detail_power.length > 0) {
    var i = 0;
    for (; i < power.detail_power.length; i++) {
      var result3 = await DB('PQ_community').insert({ community_id: power.detail_power[i].community_id, object_type: 1, object_id: question_id, power: power.detail_power[i].power, time: date });
    }
  }
  //用户发布问题数更新
  if (data.user_type == 0) {
    var update = await DB('individual').where('individual_id', data.user_id).increment('question_num',1);
  }
  else {
    var update = await DB('company').where('company_id', data.user_id).increment('question_num', 1);
  }
  //例如
  //var x = await DB('question').insert({ user_type: 0, user_id: 18211949726, question_title: '公司如何解决员工问题', question_info: '我们公司是一个小公司.....', question_time: date, answernum: 0, power: 1, hot: 100 });
  
  ctx.body = {
    code: 1,
    result:result
  }
}