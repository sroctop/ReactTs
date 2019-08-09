import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Input } from "antd";

const Item = Form.Item;

class UpdateForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
  }
  render() {
    const { categoryName }: any = this.props;
    const { getFieldDecorator } = (this.props as any).form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName,
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
