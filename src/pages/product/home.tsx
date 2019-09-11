
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
import { reqProducts, reqSearchProducts } from '../../api';
import { PAGE_SIZE } from '../../utils/constant';

const Option = Select.Option;

interface IMyComponentProps {
  history: {
    push: (
      path: string,
      state?: object
    ) => void;
  };
}

/**
 * Product 的默认的子路由组件
 */
export default class Product extends Component<IMyComponentProps> {
  private columns?: any;

  state = {
    total: 0,
    products: [],
    loading: false, // 列表是否在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索
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
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
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

    this.setState({
      loading: true,
    })

    const {searchName, searchType} = this.state;
    let result: any;
    if(searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType,
      })
    } else {
       result = await reqProducts(pageNum, PAGE_SIZE);
    }

    this.setState({
      loading: false,
    })
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        products: list
      })
    }
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {

    const { total, products, loading, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value: any) => this.setState({ searchType: value })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={(event: any) => this.setState({ searchName: event.target.value })} />
        <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
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
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />;
      </Card>
    );
  }
}
