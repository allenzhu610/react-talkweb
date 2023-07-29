import React from 'react'
import Loadable from "react-loadable"

// 注意：参数名不能和路由任何一个path名相同；除path的参数后，path和name必须一样；`/`和`:`为关键字，不能作为参数传递
let routers = [{
    name: 'testpage',
    path: '/testpage',
    title: '测试页面',
    exact: false,
    component: Loadable({
      loader: () => import('../pages/testpage/testpage'),
      loading: () => <div className="page-loading"><span>加载中......</span></div>
    })
  }, {
    name: 'test2page',
    path: '/test2page/:test1/:test2',
    title: '测试页面2',
    parent: 'testpage', // 如果是二级路由，需要指定它的父级（必须）
    exact: false,
    component: Loadable({
      loader: () => import('../pages/testpage/test2page'),
      loading: () => <div className="page-loading"><span>加载中......</span></div>
    })
  }, {
    name: 'test3page',
    path: '/test3page',
    title: '测试页面3',
    parent: 'test2page', // 如果是二级路由，需要指定它的父级（必须）
    exact: false,
    component: Loadable({
      loader: () => import('../pages/testpage/test3page'),
      loading: () => <div className="page-loading"><span>加载中......</span></div>
    })
  }, {
    name: 'editUser',
    path: '/editUser',
    title: '用户编辑',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/editUser/editUser'),
      loading: () => <div className="page-loading"><span>加载中......</span></div>
    })
  }
]

export { routers }

