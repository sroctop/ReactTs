import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  };

  componentWillMount() {
    (this.props as any).setForm((this.props as any).form);
  }

  render() {
    const { getFieldDecorator } = (this.props as any).form;
    const { categorys, parentId }: any = this.props;
    return (
      <Form>
        <Item label="所属分类">
          {getFieldDecorator("parentId", {
            initialValue: parentId
          })(
            <Select>
              <Option value="0">一级分类</Option>
              {categorys.map((c: any) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          )}
        </Item>

        <Item label="分类名称">
          {getFieldDecorator("categoryName", {
            initialValue: "",
            rules: [
              {required: true, message: '分类名称必须输入'}
            ]
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
