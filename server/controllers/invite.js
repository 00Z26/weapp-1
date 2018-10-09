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
  var result=[];
  var guest = JSON.parse(data.guest);
  for (var i = 0; i < guest.length; i++) {
    result = await DB('invite').insert({ host_type: data.host_type, host_id: data.host_id, invite_type: data.invite_type, invite_id: data.invite_id, guest_type: guest[i].guest_type, guest_id: guest[i].guest_id, time: date });
  }
  ctx.body = {
    code: 1,
    result: result
  }
}