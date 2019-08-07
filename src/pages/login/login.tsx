import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";

import "./login.less";
import logo from "../../assets/images/logo.png";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from "react-router-dom";

class Login extends Component {
  // Form submit function
  handleSubmit = (event: any) => {
    event.preventDefault(); // 禁止默认事件

    (this.props as any).form.validateFields(async (err: any, values: any) => {
      if (!err) {
        // console.log("提交登录的ajax的请求", values);
        const { username, password } = values;
        try {
          const response: any = await reqLogin(username, password);
          // console.log("请求成功", response.data);
          const result = response;
          if (result.status === 0) {
            message.success("登录成功");
            // 保存user
            const user = result.data;
            memoryUtils.user = user;
            storageUtils.saveUser(user); // 保存在store中

            // 跳转至登录
            (this.props as any).history.replace("/");
          } else {
            message.error(result.msg);
          }
        } catch (error) {
          console.log("请求出错了", error);
        }
      } else {
        console.log("校验失败");
      }
    });
  };

  /**
   * 对密码进行自定义验证
   */
  validatorPwd = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback("密码必须输入");
    } else if (value.length < 4) {
      callback("密码长度不能小于4位");
    } else if (value.length > 12) {
      callback("密码长度不能大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("用户名必须是英文数字下划线开头");
    }
    callback();
  };

  render() {
    // const form = this.props.form;

    // 如果用户已经登录，自动跳转到管理界面
    const user: any = memoryUtils.user;
    if(user && user._id) {
      return <Redirect to='/' />
    }

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
              {getFieldDecorator("username", {
                rules: [
                  { required: true, whitespace: true, message: "请输入用户名" },
                  { min: 4, message: "用户名至少4位" },
                  { max: 12, message: "用户名最多12位" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文数字下划线开头"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validatorPwd
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

const WrapLogin = Form.create()(Login);

export default WrapLogin;
