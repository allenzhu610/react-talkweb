// 工具用户和系统获取有权限的菜单
module.exports = ctx => {
  const userid = ctx.request.body.userid,
    systemId = ctx.request.body.systemid

  if (!userid || !systemId) {
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
      systemId,
      systemName: 'cardbox',
      systemTitle: '卡箱管理',
      menus: [{
        "id": 1,
        "parentId": "#",
        "icon": "bar-chart",
        "label": "test page",
        "to": "/testpage"
      },
        {
          "id": 2,
          "parentId": "#",
          "icon": "bar-chart",
          "label": "Second Item",
          "to": "/test"
        },
        {
          "id": 3,
          "parentId": 2,
          "icon": "bar-chart",
          "label": "用户编辑",
          "to": "/editUser"
        },
        {
          "id": 4,
          "parentId": 2,
          "icon": "bar-chart",
          "label": "Sub Menu",
          "to": "/aaaaaa"
        },
        {
          "id": 5,
          "parentId": "#",
          "icon": "bar-chart",
          "label": "Label of Item",
          "to": "/test"
        },
        {
          "id": 6,
          "parentId": "#",
          "icon": "bar-chart",
          "label": "Label of Item",
          "to": "/test"
        },
        {
          "id": 7,
          "parentId": 6,
          "icon": "bar-chart",
          "label": "Label of Item",
          "to": "/test"
        },
        {
          "id": 8,
          "parentId": 7,
          "icon": "bar-chart",
          "label": "Label of Item",
          "to": "/test"
        }]
    }
  }
}
