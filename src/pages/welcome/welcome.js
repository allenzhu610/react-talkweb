import React from 'react'

export default class Welcome extends React.Component {
  constructor(props) {
    super(props)
    const user = sessionStorage.user
    this.state = {
      user: !user || JSON.parse(user)
    }
  }
  render() {
    return (
      <div className="text-center" style={ { width: '100%' } }>
        <h2 style={ { display: 'inline-block' } }>{ this.state.user.username }，您好</h2>
        <h2>欢迎使用{ sessionStorage.systemTitle }系统</h2>
      </div>
    )
  }
}