// 工具用户，或得可访问的系统，以及权限
module.exports = ctx => {
  const userid = ctx.request.body.id

  if (!userid) {
    ctx.body = {
      code: 0,
      msg: '参数错误'
    }
    return
  }

  ctx.body = {
    code: 1,
    msg: '成功',
    data: {
      portalTitle: '收费数据管理平台',
      systemList: [{
        id: 1,
        name: 'sfjk',
        title: '收费监控',
        ico: 'luwangjiance',
        allow: true
      }, {
        id: 2,
        name: 'sjcsjk',
        title: '数据传输监控',
        ico: 'toutaofeifenxi',
        allow: true
      }, {
        id: 3,
        name: 'hbmdgl',
        title: '黑名单管理',
        ico: 'shoufeijichaguanli',
        allow: true
      }, {
        id: 4,
        name: 'csglyxf',
        title: '参数管理与下发',
        ico: 'luwangjiance',
        allow: true
      }, {
        id: 5,
        name: 'cardbox', // 必须和前台project里面的项目一致
        title: '卡箱管理',
        ico: 'pzgl',
        allow: true
      }, {
        id: 6,
        name: 'zhcxytj',
        title: '综合查询和统计',
        ico: 'jichushujuguanli',
        allow: true
      }, {
        id: 1,
        name: 'jcfwgl',
        title: '基础服务管理',
        ico: 'ltcgl',
        allow: false
      }, {
        id: 1,
        name: 'xtgl',
        title: '系统管理',
        ico: 'sfzrcgl',
        allow: true
      }]
    }
  }
}
