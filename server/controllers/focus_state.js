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
  var result='';
  if(data.focus_type=='user'){
    result = await DB.select('*').from('user_user').where({ idol_type: data.object_type, idol_id: data.object_id, fans_type: data.user_type, fans_id: data.user_id});
  }
  else{
    result = await DB.select('*').from('PQ_user').where({ user_type: data.user_type, user_id: data.user_id, object_type: data.object_type, object_id: data.object_id });
  }
  ctx.body = {
    code: 1,
    result: result.length,
  }

}