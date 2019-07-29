import React, { Component } from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd';

import './login.less'
import logo from './images/logo.png';

class Login extends Component {

  render() {

    // const form = this.props.form;

    const form = (this.props as any).form;
    
    const { getFieldDecorator } = form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>React项目后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', {})(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {})(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }

  // Form submit function
  handleSubmit = (event: any) => {

    event.preventDefault();
    const form = (this.props as any).form;
    const values = form.getFieldsValue();
    console.log('handleSubmit()',values);
  }
}

const WrapLogin = Form.create()(Login)

export default WrapLogin;