import login from '../pages/login/login'
import home from '../pages/home/home'
import portal from '../pages/portal/portal'

// `/`和`:`为关键字，不能作为参数传递
let routers = [{
    name: 'login',
    path: '/login',
    title: '登录',
    exact: true,
    component: login
  }, {
    name: 'home', // 名称，必须唯一
    path: '/home', // 路径，第一个必须为'/'，主名字必须唯一，浏览器导航路径（url)
    title: '主页', // 页面title及导航栏显示的名称
    exact: false, // 严格匹配
    component: home
  }, {
    name: 'portal',
    path: '/portal',
    title: '管理平台',
    exact: true,
    component: portal
  }
]

export default routers

