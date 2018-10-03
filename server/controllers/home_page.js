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
  var date=new Date();
  var result1 = await DB.select('*').from('project').where('project_time','>', date.getTime() - 2 * 24 * 60 * 60 * 1000);
  var result2 = await DB.select('*').from('question').where('question_time' ,'>', date.getTime() - 2 * 24 * 60 * 60 * 1000);

  var length1 = result1.length;
  var length2 = result1.length;
  for (var i = 0; i < length1; i++) {
    if (result1[i].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', result1[i].user_id);
      result1[i].user_name = information[0].individual_name;
      result1[i].user_image = information[0].image;
    }
    if (result1[i].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', result1[i].user_id);
      result1[i].user_name = information[0].company_name;
      result1[i].user_image = information[0].image;
    }
  }

  for (var i = 0; i < length2; i++) {
    if (result2[i].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', result2[i].user_id);
      result2[i].user_name = information[0].individual_name;
      result2[i].user_image = information[0].image;
    }
    if (result2[i].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', result2[i].user_id);
      result2[i].user_name = information[0].company_name;
      result2[i].user_image = information[0].image;
    }
  }
  

  ctx.body = {
    code: 1,
    result1:result1,        //返回最近两天的、无权限的项目
    result2:result2        //返回最新两天的、无权限问题
  }
}

//

