import React, { Component } from 'react';
import {
  Card,
  Icon,
  List
} from 'antd'
import LinkButton from '../../components/link-button';

interface IMyComponentProps {
  history: {
    goBack: () => void;
  };
  location: {
    state: {
      product: {
        name: string;
        desc: string;
        price: string;
        detail: string;
      };
    };
  };
}

const Item = List.Item
/**
 * Product 的详情子路由组件
 */
export default class ProductDetail extends Component <IMyComponentProps> {
  render() {

    // 读取携带过来的state数据
    const { name, desc, price, detail} = this.props.location.state.product;

    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left" style={{ marginRight: 15, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>XXXXXXXXXXXXX</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              <img className="product-img" src="https://www.js.qzroc.com/img/1.png" alt=""/>
              <img className="product-img" src="https://www.js.qzroc.com/img/2.jpg" alt=""/>
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html: detail}}></span>
          </Item>
        </List>
      </Card>
    );
  }
}