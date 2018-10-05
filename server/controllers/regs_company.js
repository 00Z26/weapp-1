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
  var data = ctx.query;
  var date = new Date();
  var code = 1;
  //检测名字是否重复
  var check_name =await DB.select('company_name').from('company').where('company_name',data.company_name);
  var check_id =await DB.select('company_id').from('company').where('company_id', data.company_id);
  var result='';
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
    result = await DB('company').insert({ company_id: data.company_id, openid: openid.openid, company_name: data.company_name, image: data.image, company_type: data.company_type, company_address: data.company_address, company_introduce: '暂无介绍', company_state: '未认证', company_time: date, answer_num: 0, comment_num: 0, question_num: 0, project_num: 0, setcommunity_num: 0, joincommunity_num: 0, fans_num: 0, idol_num: 0, questionfocus_num: 0, projectfocus_num:0,last_check_time:date});
  }
  else if(check_name.length){
    result='名字重复';
    code=0;
  }
  else{
    result='电话号码已注册';
    code=0;
  }

  //例如 
 //var result1 = await DB('company').insert({ company_id: 15827348758, company_name: '红星公司',company_type: '制造机械厂', company_address: '华中科技大学后面', company_state: '未认证',company_introduce: '这个公司很懒什么都没写', company_time:date});
  ctx.body = {
    code:code,
    result: result,
  }

}