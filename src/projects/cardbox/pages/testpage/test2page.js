import React from 'react'
import { Route, Switch } from "react-router-dom"
import { Button } from 'antd'
// import Page404 from '../../../../pages/404/404'

export default class Test2page extends React.Component {

	testpage = () => {
  		this.props.history.push(this.props.match.url + '/test3page')
  	}

	render() {
	return (
		<div>
			<Button onClick={ this.testpage }>sub page → test3page</Button>
	    	<Switch>
	    		{
	    			this.props.subRouters.map((r, key) => {
	    				const Component = r.component,
                      		subRouter = this.props.allRouters.filter(item => item.parent === r.name)
	    				return <Route key={ key }  render={ props => <Component { ...props } allRouters={ this.props.allRouters } subRouter={ subRouter } /> } exact={ r.exact } path={ this.props.match.url + r.path } />
	    			})
	    		}
	    		{/*<Route component={ Page404 } />*/}
	    	</Switch>
		</div>
	)
	}
}