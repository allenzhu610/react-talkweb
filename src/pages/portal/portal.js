import './statics/portalfont.css'
import styles from './portal.less'

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Modal } from 'antd'

import Fetch from '../../utils/Fetch'

const images = {
  avatar: require('./statics/avatar.png')
}

export default class Portal extends React.Component {
  constructor(props) {
    super(props)
    const user = sessionStorage.user
    this.state = {
      user: !user || JSON.parse(user),
      portalData: [],
      portalTitle: '',
      loginout: false
    }
    this.loginout = this.loginout.bind(this)
    this.openSystem = this.openSystem.bind(this)
  }
  componentDidMount() {
    Fetch('/test/portal', {
      id: this.state.user.id
    }, false).then(response => {
      if (response.code === 1) {
        this.setState(preState => ({
          portalTitle: response.data.portalTitle,
          portalData: preState.portalData.concat(response.data.systemList)
        }))
      }
    }).catch(error => {

    })
  }
  loginout() {
    Modal.confirm({
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
  openSystem(allow, id, title) {
    if (!allow) {
      return
    }
    sessionStorage.systemId = id
    sessionStorage.systemTitle = title
    this.props.history.push('/home')
  }
  render() {
    const {portalData, portalTitle, user, loginout} = this.state
    if (loginout || typeof user !== 'object') {
      return <Redirect to="/login"
               push={ false } />
    }
    return (
      <div className={ styles.content }>
        <div className={ styles.topbar }>
          <Row>
            <Col span={ 12 }>
              <div className={ styles.logo }>
                { portalTitle }
              </div>
            </Col>
            <Col span={ 12 }
              className="text-right">
              <a className={ styles.A_blank }
                href="http://192.168.2.148"
                target="_blank"
                rel="noopener noreferrer"><i className="iconfont icon-luduanfuwu"></i> <span>收费业务管理</span></a>
              <a className={ styles.A_blank }
                href="http://192.168.2.148"
                target="_blank"
                rel="noopener noreferrer"><i className="iconfont icon-jcsjgl"></i> <span>基础数据管理</span></a>
            </Col>
          </Row>
          <Row className={ styles.block }>
            <Col span={ 20 }>
              { portalData.map((item, key) => (
                  <div className={ styles.eachBlock }
                    key={ key }
                    allow={ item.allow ? '1' : '0' }
                    onClick={ this.openSystem.bind(this, item.allow, item.id, item.title) }>
                    <i className={ ['portalfont', `portal-${item.ico}`].join(' ') }></i>
                    <div>
                      { item.title }
                    </div>
                  </div>
                )) }
            </Col>
            <Col span={ 4 }>
              <div className={ styles.avatar }>
                <img src={ images.avatar }
                  alt="avatar" />
              </div>
              <div className={ ['text-center', styles.help].join(' ') }>
                <span>欢迎你<br />{ user.username }</span>
                <br />
                <a><i className="fa fa-question-circle"></i>帮助</a>
                <a onClick={ this.loginout }><i className="fa fa-power-off"></i>退出</a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}