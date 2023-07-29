import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'

import Fetch from '../../utils/Fetch'

@Form.create()
export default class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    const remember = localStorage.username,
      username = remember || ''
    this.state = {
      username,
      remember,
      loginsuccess: false
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) return
      const response = await Fetch('/test/login', {
        username: values.username,
        password: values.password
      }).catch(error => {
        message.error('请求错误，登录失败')
        sessionStorage.user = ''
      })
      if (response.code === 0) {
        message.error(response.msg)
        sessionStorage.user = ''
      } else {
        if (values.remember) {
          localStorage.username = values.username
        } else {
          localStorage.username = ''
        }
        sessionStorage.user = JSON.stringify(response.data)
        this.setState({
          loginsuccess: true
        })
      }
    })
  }
  render() {
    if (this.state.loginsuccess) {
      return (<Redirect to="/portal"
                push={ false } />)
    }
    const {remember, username} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Item>
          { getFieldDecorator('username', {
              initialValue: username,
              rules: [{
                required: true,
                message: '请输入用户名!'
              }],
            })(
              <Input prefix={ <i className="fa fa-user"
                              style={ { color: 'rgba(0,0,0,.25)' } }></i> }
                placeholder="请输入用户名" />
            ) }
        </Form.Item>
        <Form.Item>
          { getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入密码!'
              }],
            })(
              <Input prefix={ <i className="fa fa-key"
                              style={ { color: 'rgba(0,0,0,.25)' } }></i> }
                type="password"
                placeholder="请输入密码" />
            ) }
        </Form.Item>
        <Form.Item>
          { getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: !!remember,
            })(
              <Checkbox>
                记住用户
              </Checkbox>
            ) }
          <Button type="primary"
            htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
}