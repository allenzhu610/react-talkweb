import '@module/font-awesome/less/font-awesome.less'
import './styles/App.less';

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Loading from '@components/Loading'
import routers from './routers'
import page404 from './pages/404/404'

import registerServiceWorker from './registerServiceWorker'

const App = () => {
  return (
    <div className="app">
      <Loading />
      <Switch>
        { routers.map((r, key) => (
            <Route key={ key }
              { ...r } />
          )) }
        <Redirect from="/"
          to={ '/login' }
          exact={ true } />
        <Route component={ page404 } />
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)

registerServiceWorker();
