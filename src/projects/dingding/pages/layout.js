// 目前废弃

import 'antd-mobile/lib/nav-bar/style';
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import routers from '../../routers'
import page404 from '../../../../pages/404/404'

import { NavBar } from 'antd-mobile';

export default class Layout extends React.Component {
  render() {
    const match = this.props.match.url
    return (
      <div>
        <NavBar mode="dark"
          icon={ <i className="fa fa-chevron-left"></i> }
          style={ { position: 'fixed', width: '100%', zIndex: 1 } }>
          NavBar
        </NavBar>
        <div style={ { paddingTop: '45px' } }>
          <Switch>
            { routers.filter(item => item.level === 2).map((r, key) => (
                <Route key={ key }
                  render={ props => <r.component { ...props } /> }
                  exact={ r.exact }
                  path={ match + r.path } />
              )) }
            <Route component={ page404 } />
          </Switch>
        </div>
      </div>
    )
  }
}