import 'antd-mobile/lib/grid/style'

import React from 'react'
import { Grid } from 'antd-mobile'

import { changeTitle } from '@utils/dom'

const data1 = [{
  icon: <i className="fa fa-list-alt fa-2x"
          style={ { color: '#36A1DB' } }></i>,
  text: '通行费收费',
  url: '/page1_1'
}, {
  icon: <i className="fa fa-list-alt fa-2x"
          style={ { color: '#36A1DB' } }></i>,
  text: '通行费收费',
  url: '/page1'
}, {
  icon: <i className="fa fa-area-chart fa-2x"
          style={ { color: '#678ce1' } }></i>,
  text: '流量通行费',
  url: '/page3'
}, {
  icon: <i className="fa fa-wrench fa-2x"
          style={ { color: '#8c67df' } }></i>,
  text: '非现金拆分',
  url: '/page9'
}]

const data2 = [{
  icon: <i className="fa fa-send fa-2x"
          style={ { color: '#84d018' } }></i>,
  text: '全省通行量',
  url: '/page2'
}, {
  icon: <i className="fa fa-institution fa-2x"
          style={ { color: '#14c760' } }></i>,
  text: '路段/收费站',
  url: '/page4'
}, {
  icon: <i className="fa fa-list-alt fa-2x"
          style={ { color: '#36A1DB' } }></i>,
  text: '长沙周边',
  url: '/page5'
}, {
  icon: <i className="fa fa-database fa-2x"
          style={ { color: '#f3b613' } }></i>,
  text: '出口流量',
  url: '/page11'
}, {
  icon: <i className="fa fa-car fa-2x"
          style={ { color: '#ff8a4a' } }></i>,
  text: '按车型流量',
  url: ''
}]

const data3 = [{
  icon: <i className="fa fa-file-text-o fa-2x"
          style={ { color: '#fc5366' } }></i>,
  text: '业主实得数据',
  url: '/page6'
}, {
  icon: <i className="fa fa-dollar fa-2x"
          style={ { color: '#8c67df' } }></i>,
  text: '通行费实收',
  url: '/page7'
}, {
  icon: <i className="fa fa-bus fa-2x"
          style={ { color: '#36A1DB' } }></i>,
  text: '管理处分车型',
  url: ''
}, {
  icon: <i className="fa fa-truck fa-2x"
          style={ { color: '#678ce1' } }></i>,
  text: '路段分车型',
  url: ''
}, {
  icon: <i className="fa fa-suitcase fa-2x"
          style={ { color: '#84d018' } }></i>,
  text: '通行费实得',
  url: ''
}, {
  icon: <i className="fa fa-shopping-basket fa-2x"
          style={ { color: '#14c760' } }></i>,
  text: '每公里实得',
  url: ''
}, {
  icon: <i className="fa fa-gg fa-2x"
          style={ { color: '#f3b613' } }></i>,
  text: '现金/非现金',
  url: ''
}]

const data4 = [{
  icon: <i className="fa fa-bar-chart fa-2x"
          style={ { color: '#ff8a4a' } }></i>,
  text: '计费里程数据',
  url: '/page10'
}, {
  icon: <i className="fa fa-credit-card-alt fa-2x"
          style={ { color: '#fc5366' } }></i>,
  text: '最低费额通行',
  url: '/page8'
}]

const subTitle = {
  color: '#000',
  fontSize: '15px',
  fontWeight: 'bold',
  padding: '15px 0 9px 15px'
}

// function* iterArr(arr) { //迭代器返回一个迭代器对象
//   if (Array.isArray(arr)) { // 内节点
//     for (let i = 0; i < arr.length; i++) {
//       yield* iterArr(arr[i]); // (*)递归
//     }
//   } else { // 离开     
//     yield arr;
//   }
// }
// // 使用 for-of 遍历:
// var arr = ['a', ['b', 'c'], ['d', 'e']];
// for (var x of iterArr(arr)) {
//   console.log(x); // a  b  c  d  e
// }

// // 或者直接将迭代器展开:
// var arr = ['a', ['b', ['c', ['d', 'e']]]];
// var gen = iterArr(arr);
// arr = [...gen]; // ["a", "b", "c", "d", "e"]

export default class Home extends React.Component {

  componentDidMount() {
    changeTitle(this.props.title)
  }

  openPage = (url) => {
    this.props.history.push(url)
  }

  render() {
    return (
      <div>
        <div className="home-grid">
          <div style={ subTitle }>
            联网收费相关数据汇总表
          </div>
          <Grid data={ data1 }
            hasLine={ false }
            onClick={ _el => this.openPage(_el.url) } />
          <div style={ subTitle }>
            通行量数据分析及展示
          </div>
          <Grid data={ data2 }
            hasLine={ false }
            onClick={ _el => this.openPage(_el.url) } />
          <div style={ subTitle }>
            通行费收入数据分析及展示
          </div>
          <Grid data={ data3 }
            hasLine={ false }
            onClick={ _el => this.openPage(_el.url) } />
          <div style={ subTitle }>
            高速路网基础信息查询
          </div>
          <Grid data={ data4 }
            hasLine={ false }
            onClick={ _el => this.openPage(_el.url) } />
        </div>
      </div>
    )
  }
}