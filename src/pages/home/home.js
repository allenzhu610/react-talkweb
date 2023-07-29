import styles from './home.less'

import React from 'react'
import { Link, Redirect, Route, Switch } from "react-router-dom"
import { Layout, Menu, Modal } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import Sidermenu from './sidermenu'
import Crumbmenu from './crumbmenu'
import Fetch from '../../utils/Fetch'

import routers from '../../projects'
import Welcome from '../welcome/welcome'
import Page404 from '../404/404'

const {Header, Content, Sider} = Layout
const confirm = Modal.confirm

const images = {
  systemLogo: require('./statics/systemLogo.png')
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      systemName: '',
      systemTitle: '',
      loginout: false
    }
  }
  componentDidMount() {
    const systemid = sessionStorage.systemId
    const user = this.getUser()
    if (user === null) {
      this.setState({
        loginout: true
      })
      return
    }
    Fetch('/test/home', {
      systemid,
      userid: user.id
    }, false).then(response => {
      if (response.code === 1) {
        this.setState(preState => ({
          content: preState.content.concat(response.data.menus),
          systemName: response.data.systemName,
          systemTitle: response.data.systemTitle
        }))
      // sessionStorage.sidermenu = JSON.stringify(response.data.menus)
      }
    }).catch(error => {

    })
  }
  loginout = () => {
    confirm({
      title: '你确定要退出登录吗?',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      maskClosable: true,
      onOk: () => {
        // 需要调用接口 TODO
        sessionStorage.user = ''
        this.setState({
          loginout: true
        })
      }
    })
  }
  renderThumb = ({style, ...props}) => {
    const thumbStyle = {
      backgroundColor: 'rgba(154, 154, 154, 0.60)'
    }
    return <div style={ { ...style, ...thumbStyle } }
             { ...props }></div>
  }
  getUser = () => {
    try {
      return JSON.parse(sessionStorage.user)
    } catch ( e ) {
      return null
    }
  }
  render() {
    const {content, loginout, systemTitle, systemName} = this.state,
      match = this.props.match.url,
      pathname = this.props.location.pathname,
      user = this.getUser()
    // 可在此做权限，目前判断了用户是否存在的权限
    if (loginout || user === null) {
      return <Redirect to="/login"
               push={ false } />
    }
    return (
      <div className={ styles.home }>
        <Header className={ styles.header }>
          <img src={ images.systemLogo }
            alt="systemLogo" />
          <Menu theme="dark"
            mode="horizontal"
            className={ styles.headerMenu }>
            <Menu.Item key="1">
              <i className="fa fa-smile-o"></i> 欢迎您，
              { user.username }（
              { user.organization }）
            </Menu.Item>
            <Menu.Item key="2">
              <a href="#/portal"><i className="fa fa-home"></i> 首页</a>
            </Menu.Item>
            <Menu.Item key="3">
              <i className="fa fa-user"></i> 个人信息
            </Menu.Item>
            <Menu.Item key="4"
              onClick={ this.loginout }>
              <i className="fa fa-sign-out"></i> 退出
            </Menu.Item>
          </Menu>
        </Header>
        <div className={ styles.contentLayout }>
          <Sider className={ styles.sider }
            width={ 160 }
            style={ { background: '#2f4050' } }>
            <div className={ styles.systemname }>
              { systemTitle }
            </div>
            <Scrollbars autoHide
              style={ { width: '100%', height: '100%' } }
              renderThumbVertical={ this.renderThumb }>
              { content.length === 0 ? <div /> : <Sidermenu { ...this.props }
                                                   content={ content } /> }
            </Scrollbars>
          </Sider>
          <div className={ styles.contentPage }>
            <Crumbmenu pathname={ pathname }
              routers={ routers[systemName] }
              sidermenu={ content } />
            <Content className={ styles.content }>
              <Switch>
                { routers[systemName] && routers[systemName].map((r, key) => {
                    const Component = r.component,
                      subRouter = routers[systemName].filter(item => item.parent === r.name)
                    return <Route key={ key }
                             render={ props => <Component { ...props }
                                                 allRouters={ routers[systemName] }
                                                 subRouters={ subRouter } /> }
                             exact={ r.exact }
                             path={ match + r.path } />
                  }) }
                <Route component={ Welcome }
                  path={ match }
                  exact={ true } />
                <Route component={ Page404 } />
              </Switch>
            </Content>
            <div className={ styles.footer }>
              ©2018 湖南省高速公路管理局监控中心版权所有 <strong>拓维公司技术支持</strong>
            </div>
          </div>
        </div>
      </div>
    )
  }
}