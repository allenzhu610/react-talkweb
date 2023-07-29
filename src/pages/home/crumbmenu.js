import styles from './home.less'

import React from 'react'
import { Link } from "react-router-dom"
import { Breadcrumb } from 'antd'

export default class Crumbmenu extends React.Component {

  getLink = (routers, path, item) => {
    const pathArray = path.split('/'),
      paramSize = routers.find(router => router.name === item).path.split(':').length - 1
    return pathArray.slice(0, pathArray.indexOf(item) + paramSize + 1).join('/')
  }
  
  render() {
    const { pathname, routers } = this.props
    return (
      <Breadcrumb className={ styles.breadcrumb }>
        {
          pathname.split('/').filter(i => i).map((item, key) => {
            if (item === 'home') {
              return <Breadcrumb.Item key={ key }><Link to="/home"><i className="fa fa-home"></i> 主页</Link></Breadcrumb.Item>
            }
            const crumb = routers && routers.find(router => router.name === item)
            const menu = this.props.sidermenu.find(m => m.to === '/' + item)
            if (crumb) {
              let icon = ''
              if (crumb.icon) {
                icon += `fa fa-${crumb.icon}`
              } else if (menu) {
                icon += `fa fa-${menu.icon}`
              } else {
                icon = 'hide'
              }
              return <Breadcrumb.Item key={ key }><Link to={ this.getLink(routers, pathname, item) }><i className={ icon }></i> { crumb.title }</Link></Breadcrumb.Item>
            }
            return null
          })
        }
      </Breadcrumb>
    )
  }
}