const request = require("request");
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
module.exports =async (ctx,next) => {
  let appId = 'wx2541631ee62bb5d9';
  let secret = '3fd33c1b131c7576bbeab34b5e899e0c';
  let data = ctx.query;
  let url= `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${data.code}&grant_type=authorization_code`;
  let information =await new Promise((resolve, reject) => {
    request(url, (e, r, d) => {
      if (e) {
        return reject(e);
      }
      if (r.statusCode != 200) {
        return reject(`back statusCode：${r.statusCode}`);
      }
      return resolve(d);
    });
  })
  information = JSON.parse(information);
  
  let result='';
  if(data.user_type == "0")
  {
    var result1 = await DB.select('individual_id','individual_name','image').from('individual').where('openid', information.openid);
    if(result1.length==0){
      result=''
    }
    else{
      result = {
        user_type: 0,
        user_id: result1[0].individual_id,
        user_name: result1[0].individual_name,
        user_image: result1[0].image,
      }
    }
  }
  else{
    var result2 = await DB.select('company_id','company_name','image').from('company').where('openid', information.openid);
    if (result2.length==0) {
      result = '';
    }
    else{
      result= {
        user_type: 1,
        user_id: result2[0].company_id,
        user_name: result2[0].company_name,
        user_image: result2[0].image,
      }
    }
  }
  ctx.body = {
    code: 1,
    result:result
  }
}