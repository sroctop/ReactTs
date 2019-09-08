import React, { Component } from 'react';
import {
  Card,
  Icon,
  List
} from 'antd'

const Item = List.Item
/**
 * Product 的详情子路由组件
 */
export default class ProductDetail extends Component {
  render() {

    const title = (
      <span>
        <Icon type="arrow-left" />
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>XXXXXXXXXXXXX</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>XXXXXXXXXXXXX</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>XXXXXXXXXXXXX</span>
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
            <span dangerouslySetInnerHTML={{__html: '<h1 style="color: red;">内容</h1>'}}></span>
          </Item>
        </List>
      </Card>
    );
  }
}