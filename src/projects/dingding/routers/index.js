import Home from '../pages/home'
// import Layout from '../pages/layout'
import Page1 from '../pages/page1'
import Page1_1 from '../pages/page1_1'
import Page2 from '../pages/page2'
import Page3 from '../pages/page3'
import Page4 from '../pages/page4'
import Page5 from '../pages/page5'
import Page6 from '../pages/page6'
import Page7 from '../pages/page7'
import Page8 from '../pages/page8'
import Page9 from '../pages/page9'
import Page10 from '../pages/page10'
import Page11 from '../pages/page11'

// 注意：参数名不能和路由任何一个path名相同；除path的参数后，path和name必须一样；`/`和`:`为关键字，不能作为参数传递
let routers = [{
  name: 'home',
  path: '/home',
  title: '首页',
  exact: true,
  // level: 1,
  component: Home
} /*, {
    name: 'layout',
    path: '/layout',
    title: '',
    exact: false,
    level: 1,
    component: Layout
  }*/ , {
  name: 'page1',
  path: '/page1',
  title: '全省高速公路通行费收费相关数据汇总表',
  exact: true,
  // level: 2,
  component: Page1
}, {
  name: 'page1_1',
  path: '/page1_1',
  title: '全省高速公路通行费收费相关数据汇总表',
  exact: true,
  // level: 2,
  component: Page1_1
}, {
  name: 'page2',
  path: '/page2',
  title: '全省通行量',
  exact: true,
  // level: 2,
  component: Page2
}, {
  name: 'page3',
  path: '/page3',
  title: '流量通行费统计表',
  exact: true,
  // level: 2,
  component: Page3
}, {
  name: 'page4',
  path: '/page4',
  title: '重点路段、收费站通行量',
  exact: true,
  // level: 2,
  component: Page4
}, {
  name: 'page5',
  path: '/page5',
  title: '长沙周边流量',
  exact: true,
  // level: 2,
  component: Page5
}, {
  name: 'page6',
  path: '/page6',
  title: '各业主实得数据报表',
  exact: true,
  // level: 2,
  component: Page6
}, {
  name: 'page7',
  path: '/page7',
  title: '通行费实收数据对比',
  exact: true,
  // level: 2,
  component: Page7
}, {
  name: 'page8',
  path: '/page8',
  title: '最低费额通行费查询',
  exact: true,
  // level: 2,
  component: Page8
}, {
  name: 'page9',
  path: '/page9',
  title: '非现金拆分数据组成',
  exact: true,
  // level: 2,
  component: Page9
}, {
  name: 'page10',
  path: '/page10',
  title: '非现金拆分数据组成',
  exact: true,
  // level: 2,
  component: Page10
}, {
  name: 'page11',
  path: '/page11',
  title: '非现金拆分数据组成',
  exact: true,
  // level: 2,
  component: Page11
}
]

export default routers

