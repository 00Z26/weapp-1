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
  var community_id = [];
  var result=[];
  if(data.need=='name'){
    community_id = await DB.select('community_id').from('community_user').where({ user_type: data.user_type, user_id: data.user_id });
    for (var i = 0; i < community_id.length; i++) {
      var x = await DB.select('community_id','community_name').from('community').where('community_id', community_id[i].community_id);
      result[i] = x[0];
    }
  }
  else{
    community_id = await DB.select('community_id').from('community_user').where({ user_type: data.user_type, user_id: data.user_id });
    for (var i = 0; i < community_id.length; i++) {
      var x = await DB.select('*').from('community').where('community_id', community_id[i].community_id);
      result[i] = x[0];
      if (result[i].user_type == 0) {
        var information = await DB.select('individual_name','image').from('individual').where('individual_id', result[i].user_id);
        result[i].user_name = information[0].individual_name;
        result[i].user_image = information[0].image;
      }
      if (result[i].user_type == 1) {
        var information = await DB.select('company_name','image').from('company').where('company_id', result[i].user_id);
        result[i].user_name = information[0].company_name;
        result[i].user_image = information[0].image;
      }
    }
  }
  ctx.body = {
    result: result
  }

}