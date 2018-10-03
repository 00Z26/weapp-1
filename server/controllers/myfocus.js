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
  var idol = [];
  var question=[];
  var project=[];
  //获取关注对象
  var myidol = await DB.select('idol_id','idol_type').from('user_user').where({ fans_id: data.user_id, fans_type: data.user_type }).orderBy('time', 'desc');
  if (myidol.length > 0) {
    for (var i = 0; i < myidol.length; i++) {
      if (myidol[i].idol_type == 0) {
        var information = await DB.select('*').from('individual').where('individual_id', myidol[i].idol_id);
        idol[i]=information[0];
      }
      else {
        information= await DB.select('*').from('company').where('company_id', myidol[i].idol_id);
        idol[i]=information[0];
      }
    }
  }
  //获取关注项目
  var project_id = await DB.select('object_id').from('PQ_user').where({ user_id: data.user_id, user_type: data.user_type, object_type: 0 }).orderBy('time', 'desc');
  for (var i = 0; i < project_id.length; i++) {
    var p = await DB.select('*').from('project').where('project_id', project_id[i].object_id);
    if (p[0].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', p[0].user_id);
      p[0].user_name = information[0].individual_name;
      p[0].user_image = information[0].image;
    }
    if (p[0].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', p[0].user_id);
      p[0].user_name = information[0].company_name;
      p[0].user_image = information[0].image;
    }
    project[i] = p[0];
  }

  //获取关注问题
  var question_id = await DB.select('object_id').from('PQ_user').where({ user_id: data.user_id, user_type: data.user_type, object_type:1 }).orderBy('time', 'desc');
  for(var i=0;i<question_id.length;i++){
    var q = await DB.select('*').from('question').where('question_id',question_id[i].object_id);
    if (q[0].user_type == 0) {
      var information = await DB.select('individual_name', 'image').from('individual').where('individual_id', q[0].user_id);
      q[0].user_name = information[0].individual_name;
      q[0].user_image = information[0].image;
    }
    if (q[0].user_type == 1) {
      var information = await DB.select('company_name', 'image').from('company').where('company_id', q[0].user_id);
      q[0].user_name = information[0].company_name;
      q[0].user_image = information[0].image;
    }
    question[i] = q[0];
  }
  ctx.body = {
    code: 1,
    idol:idol,        //返回关注的所有人，最新的在前
    project: project,  //返回关注的项目，最新的在前
    question: question  //返回关注的问题，最新的在前
  }
}