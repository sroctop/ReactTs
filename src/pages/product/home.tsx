import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
} from 'antd';
import LinkButton from '../../components/link-button';
import { reqProducts } from '../../api';

const Option = Select.Option;

/**
 * Product 的默认的子路由组件
 */
export default class Product extends Component {
  private columns?: any;

  state = {
    total: 0, 
    products: [
      {
        "_id": "123",
        "name": "qzroc",
        "status": 0,
        "desc": "www.qzroc.com",
        "price": 4999,
      }
    ],
  }

  /**
   * 初始化table的列
   */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price: number) => '￥' + price // 当前指定了对应的属性
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (status: number | boolean) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product: any) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>操作</LinkButton>
            </span>
          )
        }
      }
    ];
  }

  /**
   * 获取指定页码的列表数据显示
   */
  getProducts = async (pageNum: number) => {
    const result: any = await reqProducts(pageNum, 3);
    if(result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        products: list
      })
    }
  }

  
  componentWillMount () {
    this.initColumns();
  }

  componentDidMount () {
    this.getProducts(1);
  }

  render() {

    const { products } = this.state;



    const title = (
      <span>
        <Select value='1' style={{ width: 150 }}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} />
        <Button type="primary">搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type="plus" />
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table bordered rowKey="_id" dataSource={products} columns={this.columns} />;
      </Card>
    );
  }
}