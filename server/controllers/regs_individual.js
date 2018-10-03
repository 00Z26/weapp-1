const { mysql: config } = require('../config')
const request = require("request");
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
  var data =ctx.query;
  var date=new Date();
  var code=1;
  //检测名字是否重复
  var check_name = DB.select('individual_name').from('individual').where('individual_name', data.individual_name);
  var check_id = DB.select('individual_id').from('individual');
  if(check_id.length==0&&check_name.length==0){
    let appId = 'wx2541631ee62bb5d9';
    let secret = '3fd33c1b131c7576bbeab34b5e899e0c';
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${data.code}&grant_type=authorization_code`;
    let openid = await new Promise((resolve, reject) => {
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
    openid = JSON.parse(openid);
    var result = await DB('individual').insert({ individual_id: data.individual_id, openid: openid.openid, image: data.image, individual_name: data.individual_name, individual_sex: data.individual_sex, individual_job: data.individual_job, individual_corporation: data.individual_corporation, individual_state: '未认证', individual_introduce: '暂无介绍', individual_time: date, answer_num: 0, comment_num: 0, question_num: 0, project_num: 0, setcommunity_num: 0, joincommunity_num: 0, fans_num: 0, idol_num: 0 });

  }
  else if(check_id.length){
    result='名字重复'
    code=0;
  }
  else{
    result='该电话号码已注册';
    code=0;
  }
 ctx.body = {
    code:code,
    result:result, //返回注册成功
   }
}