import React, { Component } from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
  render() {
    const { getFieldDecorator } = (this.props as any).form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("parentId", {
            initialValue: "0"
          })(
            <Select>
              <Option value="0">一级分类</Option>
              <Option value="1">服装</Option>
              <Option value="2">电子产品</Option>
              <Option value="3">食品</Option>
            </Select>
          )}
        </Item>

        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: ""
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
