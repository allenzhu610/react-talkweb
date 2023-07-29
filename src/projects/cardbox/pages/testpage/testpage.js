import React from 'react'
import { Route, Switch } from "react-router-dom"
import { Button } from 'antd'
// import Page404 from '../../../../pages/404/404'

export default class Testpage extends React.Component {
	constructor(props) {
	    super(props)
	    this.testpage = this.testpage.bind(this)
	}

  	testpage() {
  		console.log(this.props.match.url + '/test2page/66/777')
  		this.props.history.push(this.props.match.url + '/test2page/66/777')
  	}

	render() {
		return (
			<div>
		    	<Button onClick={ this.testpage }>sub page → test2page</Button>
		    	<br />
		    	<Button href="#/home/editUser">go to editUser</Button>
		    	<Switch>
		    		{
		    			this.props.subRouters.map((r, key) => {
		    				const Component = r.component,
                      			subRouter = this.props.allRouters.filter(item => item.parent === r.name)
		    				return <Route key={ key } render={ props => <Component { ...props } allRouters={ this.props.allRouters } subRouters={ subRouter } /> } exact={ r.exact } path={ this.props.match.url + r.path } />
		    			})
		    		}
		    		{/*<Route component={ Page404 } />*/}
		    	</Switch>
			</div>
		)
	}
}