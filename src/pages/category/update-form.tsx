import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Input } from "antd";

const Item = Form.Item;

class UpdateForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // 将form对象通过setForm() 传递父组件
    (this.props as any).setForm((this.props as any).form);
  }

  render() {
    const { categoryName }: any = this.props;
    const { getFieldDecorator } = (this.props as any).form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName,
            rules: [
              {required: true, message: '分类名称必须输入'}
            ]
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
