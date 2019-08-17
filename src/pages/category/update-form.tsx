import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Input } from "antd";

interface Props {
  setForm: any,
  form: any,
}

const Item = Form.Item;

class UpdateForm extends Component<Props> {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // 将form对象通过setForm() 传递父组件
    this.props.setForm(this.props.form);
  }

  render() {
    const { categoryName }: any = this.props;
    const { getFieldDecorator } = this.props.form;
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
