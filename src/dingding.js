import '@module/font-awesome/less/font-awesome.less'
import './styles/Dingding.less';

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import routers from './projects/dingding/routers'
import page404 from './pages/404/404'

// import Fetch from './utils/Fetch'

import registerServiceWorker from './registerServiceWorker'

const App = () => {
  return (
    <div className="app">
      <Switch>
        { routers.map((r, key) => (
            <Route key={ key }
              render={ props => <r.component { ...props }
                                  title={ r.title } /> }
              exact={ r.exact }
              path={ r.path } />
          )) }
        <Redirect from="/"
          to={ '/home' }
          exact={ true } />
        <Route component={ page404 } />
      </Switch>
    </div>
  )
}

function initDingDing() {
  setTimeout(function() {
    if (!window.dd) {
      initDingDing()
      return
    }
    // window.dd.config({
    //   agentId: '183272092', // 必填，微应用ID
    //   corpId: 'ding2a612a89a3b194e335c2f4657eb6378f',//必填，企业ID
    //   timeStamp: , // 必填，生成签名的时间戳
    //   nonceStr: '', // 必填，生成签名的随机串
    //   signature: '', // 必填，签名
    //   jsApiList: ['biz.navigation.setTitle'] // 必填，需要使用的jsapi列表
    // });
    // window.dd.error(function (error) {
    //   // alert('env error');
    // });
    if (window.dd.version) {
      window.dd.ready(function() {

        // console.log('requestAuthCode')
        // window.dd.runtime.permission.requestAuthCode({
        //   corpId: "ding2a612a89a3b194e335c2f4657eb6378f",
        //   onSuccess: function(result) { // CODE
        //     console.log('requestAuthCode onSuccess:', result)
        //     // access_token
        //     const gettokenurl = `https://oapi.dingtalk.com/gettoken?corpid=${window.ddConfig.corpId}&corpsecret=${window.ddConfig.corpsecret}`
        //     // https://oapi.dingtalk.com/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE
        //   },
        //   onFail : function(err) {
        //     console.log(err)
        //   }
        // })

        ReactDOM.render(
          <HashRouter>
            <App />
          </HashRouter>,
          document.getElementById('root')
        )
      })
    } else {
      ReactDOM.render(
        <HashRouter>
          <App />
        </HashRouter>,
        document.getElementById('root')
      )
    }
  }, 50)

}

initDingDing()

registerServiceWorker();
