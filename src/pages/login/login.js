import styles from './login.less'
import React from 'react'

import LoginForm from './loginForm'

export default class Login extends React.Component {
  
  render() {
    return (
      <div className={ styles.content }>
        <div className={ styles.loginbg }>
          <div className={ styles.loginbox }>
            <div className={ styles.loginflag }></div>
            <LoginForm />
          </div>
        </div>
        <div className={ styles.copyright }>
          <p>
            本系统支持IE9及以上版本IE浏览器，WINDOWS7操作系统点击下载
            <a target="_blank" href="/brower/ie/IE11-Windows6.1-x86-zh-cn.exe">IE11（32位）</a>
            <a target="_blank" href="/brower/ie/IE11-Windows6.1-x64-zh-cn.exe">IE11（64位）</a>
          </p>
          <p>
            为了您的良好体验，请尽量使用火狐浏览器访问本系统，
            <a target="_blank" href="/brower/firefox/Firefox_48.0.0.6051_setup.exe">点击下载火狐浏览器</a>
            <a target="_blank" href="/brower/sogou/sogou_pinyin_wubi_2.1.0.1305.exe">点击下载搜狗输入法</a>
          </p>
          <p>©2018 湖南省高速公路管理局监控中心版权所有 拓维公司技术支持</p>
        </div>
      </div>
    )
  }
}