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
  var result='关注成功';
  if(data.fans_type != undefined){
    //存储关注关系
    result = await DB('user_user').insert({ fans_type: data.fans_type, fans_id: data.fans_id, idol_type: data.idol_type, idol_id: data.idol_id, time: date });
    //粉丝关注数更新
    if (data.fans_type == 0) {
      var update1 = await DB('individual').where('individual_id', data.fans_id).increment('idol_num', 1);
    }
    else {
      var update1 = await DB('company').where('company_id', data.fans_id).increment('idol_num', 1);
    }
    //偶像被关注数更新
    if (data.idol_type == 0) {
      var update2 = await DB('individual').where('individual_id', data.idol_id).increment('fans_num', 1);
    }
    else {
      var update2 = await DB('company').where('company_id', data.idol_id).increment('fans_num', 1);
    }
  }
  else{
    //存储关注关系
    result = await DB('PQ_user').insert({ user_type:data.user_type,user_id:data.user_id,object_type:data.object_type,object_id:data.object_id, time: date });
    //对应项目、问题关注数更新，用户的关注数更新
    if(data.object_type==0){
     var update1 = await DB('project').where('project_id', data.object_id).increment('focus_num', 1);
     if(data.user_type==0){
       var update1 = await DB('individual').where('individual_id', data.user_id).increment('projectfocus_num', 1);
     }
     else{
       var update1 = await DB('company').where('company_id', data.user_id).increment('projectfocus_num', 1);
     }
    }
    else{
     var update1 = await DB('question').where('question_id', data.object_id).increment('focus_num', 1);
      if (data.user_type == 0) {
        var update1 = await DB('individual').where('individual_id', data.user_id).increment('questionfocus_num', 1);
      }
      else {
        var update1 = await DB('company').where('company_id', data.user_id).increment('questionfocus_num', 1);
      }
    }
  }
  ctx.body = {
    code: 1,
    result: result,
  }

}