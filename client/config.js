/**
  小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://sl5hr478.qcloud.la';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

      // 上传图片接口
      uploadUrl: `${host}/weapp/upload`,


        //注册上传信息接口------该页面用于调试，无意义
       //regcurl: `${host}/weapp/regs`,

       //用于发布项目-----关于权限后台仍需完善，暂时均默认全公开
       //前端需传输数据，user_id:18211949726, project_title: '商城开发', project_type: '微信小程序开发', project_period: '两个月', project_budget: 1000, project_time: project_time, project_require: '能快速开发，有经验'
        pub_project: `${host}/weapp/pub_project`,

      //用于发布问题-----关于权限后台仍需完善，暂时均默认全公开
      //(前端需传输数据，user_id: 18211949726, question_title: '公司如何解决员工问题', question_info: '我们公司是一个小公司.....'
        pub_question: `${host}/weapp/pub_question`,

       //用于首页推荐
       //（前端无需传输数据）
        home_page: `${host}/weapp/home_page`,

       //用于圈子内动态展示
       //（前端需传输数据，community_id: 1）
      community_PQ: `${host}/weapp/community_PQ`,

      //用于关注的动态展示
      //（前端需传输数据，user_id:18211949726）
      home_dongtai: `${host}/weapp/home_dongtai`,

       //个人用户注册
       //（前端需传过来的数据：例如：individual_id: 18211949729, individual_name: '周星驰', individual_job: '本科生', individual_corporation: '华中科技大学',image:'地址'}
      regs_individual: `${host}/weapp/regs_individual`,

      
      //公司用户注册
      //（前端需传过来的数据：例如：individual_id: 18211949729, individual_name: '周星驰', individual_job: '本科生', individual_corporation: '华中科技大学',image:'地址'}
      regs_company: `${host}/weapp/regs_company`,

      //建圈,传过来数据{user_type: 0/1,user_id: 18211949726,community_name:'文艺圈',community_type:'文学',community_introduce:'无'}
      regs_community: `${host}/weapp/regs_community`,

      //加入圈子传过来数据{user_type: 0/1,user_id: 18211949726,community_id:1}
      join_community: `${host}/weapp/join_community`,
      
      //获取项目、问题详细内容和对应的回答,传输数据举例{object_type: 0/1, object_id:1}
      detail: `${host}/weapp/detail`,

      //获取回答详细内容和对应的评论,传输数据举例{answer_id:1}
      answer_detail: `${host}/weapp/answer_detail`,

      //获取用户的所有圈子，传输数据举例——只获取名字{user_type: 0/1, user_id:18211949726,need:'name'}，获取全部信息{user_type: 0/1, user_id:18211949726,need:'all'}
      user_community: `${host}/weapp/user_community`,

      //评论-只允许对回答评论，不允许对评论评论，传输数据举例{user_type:0/1 ,user_id: 18211949726, comment_info:'你好，我也好',answer_id:1}
      comment: `${host}/weapp/comment`,

      //点赞，传输数据举例{user_type: 0/1, user_id:18211949726, object_type:0代表点赞回答；1代表点赞评论, object_id:点赞对象id}
      praise: `${host}/weapp/praise`,

      //回答问题，传输数据举例{user_type: 0/1, user_id:18211949726, answer_info: '你好，我也好',object_type:0,object_id:1}
      answer: `${host}/weapp/answer`,
      
      //更改个人信息,传输数据举例{user_type：0,user_id：18211949726,individual_job：'本科生',individual_corporation:'华科',individual_introduce:'这个人很懒，啥都没有'}或者{user_type：1,user_id：18211949725,company_type:'=网络公司',company_adress：'不知名处',company_introduce:'这个公司很懒，啥都没有'}
     change_message: `${host}/weapp/change_message`,

      //我的个人信息，传输数据举例{user_type: 0/1, user_id:18211949726}
      my_message: `${host}/weapp/my_message`,

      //我加入的圈子，传输数据举例{user_type: 0/1, user_id:18211949726}
      mycommunity_join: `${host}/weapp/mycommunity_join`,

      //我建立的圈子，传输数据举例{user_type: 0/1, user_id:18211949726}
      mycommunity_set: `${host}/weapp/mycommunity_set`,

      //关注我的，传输数据举例{user_type: 0/1, user_id:18211949726}
      myfans: `${host}/weapp/myfans`,


      //我关注的
      myfocus: `${host}/weapp/myfocus`,


      //我关注的用户，传输数据举例{user_type: 0/1, user_id:18211949726}
      myidol: `${host}/weapp/myidol`,

      //我关注的问题，传输数据举例{user_type: 0/1, user_id:18211949726}
      myfocus_question: `${host}/weapp/myfocus_question`,
      //我关注的项目，传输数据举例{user_type: 0/1, user_id:18211949726}
      myfocus_project: `${host}/weapp/myfocus_project`,

      //已发布的问题，项目、回答，传输数据举例{user_type: 0/1, user_id:18211949726}
      pubed: `${host}/weapp/pubed`,

      //关注,传输数据举例{fans_type: 0/1, fans_id:18211949726,idol_type: 0/1, idol_id:18211949726}
      focus: `${host}/weapp/focus`,

      
     //获取用户openid
      getopenid: `${host}/weapp/getopenid`,
    //上传图片至服务器
      uploadimage: `${host}/weapp/uploadimage`,

      //查看他人信息
      home: `${host}/weapp/home`,
        
    }
};

module.exports = config;
