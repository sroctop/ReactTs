import React, { Component } from "react";
import { Card, Table, Button, Icon, message, Modal } from "antd";
import LinkButton from "../../components/link-button";
import { reqCategorys } from "../../api";
import AddForm from './add-form';
import UpdateForm from './update-form';

/**
 * 分类路由
 */
export default class Category extends Component {
  private columns?: any;
  private parentId?: any;
  private category?: any;

  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: "0", // 当前需要显示的分类列表的parentId
    parentName: "", // 当前需要显示的分类列表父分类名称
    showStates: 0
  };

  /**
   * 初始化Table的列数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name"
      },
      {
        title: "操作",
        width: 300,
        render: (category: any) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {(this.state as any).parentId === "0" ? (
              <LinkButton onClick={() => this.showSubCategorys(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        )
      }
    ];
  };

  /**
   * 显示指定一级分类对象的子列表
   */
  showSubCategorys = (category: any) => {
    window.console.log("category", category);
    // 更新状态
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      () => {
        // 在状态更新且重新render() 之后执行
        // 获取二级分类列表显示
        this.getCategorys();
      }
    );
  };

  /**
   * 显示指定的一级分类列表
   */
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: []
    });
  };

  /**
   * 响应点击取消： 隐藏确定框
   */
  handleCancel = () => {
    this.setState({
      showStates: 0
    });
  };

  /**
   * 显示添加的确定框
   */
  showAdd = () => {
    this.setState({
      showStates: 1
    });
  };

  /**
   * 添加分类
   */
  addCategory = () => {
    message.success("添加分类");
  };

  /**
   * 显示修改的确定框
   */
  showUpdate = (category: any) => {
    // 保存分类对象
    this.category = category;
    // 更新状态
    this.setState({
      showStates: 2
    });
  };

  /**
   * 修改分类
   */
  updateCategory = () => {
    message.success("修改分类");
  };

  /**
   * 异步获取一级/二级分类列表显示
   */
  getCategorys = async () => {
    // 发送请求前，显示loading
    this.setState({
      loading: true
    });

    const { parentId } = this.state as any;

    const result: any = await reqCategorys(parentId);

    this.setState({
      loading: false
    });

    if (result.status === 0) {
      // 取出分类数组数据（1/2级）
      const categorys = result.data;
      if (parentId === "0") {
        // 更新状态
        this.setState({
          categorys
        });
      } else {
        this.setState({
          subCategorys: categorys
        });
      }
    } else {
      message.error("获取分类数据失败");
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  // 发送异步ajax请求
  componentDidMount() {
    // 获取一级分类列表显示
    this.getCategorys();
  }

  render() {
    // 读取状态数据
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      loading,
      showStates
    } = this.state;


    const category = this.category || {};

    // card 的左侧标题
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: 5 }} />
          <span>{parentName}</span>
        </span>
      );
      
    // card 的右侧
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          loading={loading}
          bordered
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />

        <Modal
          title="添加分类"
          visible={showStates === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm/>
        </Modal>

        <Modal
          title="修改分类"
          visible={showStates === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category.name}/>
        </Modal>
      </Card>
    );
  }
}
