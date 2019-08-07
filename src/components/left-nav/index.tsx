import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
import "./index.less";

const { SubMenu } = Menu;

/**
 * 左侧导航的组件
 */
class LeftNav extends Component {

  private openKay?: any;
  private menuNodes?: any;
  /**
   * 根据menu的数据数组生成对应的标签数组
   */
  getMenuNodes_map = (menuList: any) => {
    return menuList.map((item: any) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  getMenuNodes = (menuList: any) => {
    // 得到当前请求的路由路径
    const path = (this.props as any).location.pathname;

    return menuList.reduce( (pre: any, item: any) => {

      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find((cItem: any) => cItem.key === path)
        // 如果存在，说明当前item的子列表需要打开
        if(cItem) {
          this.openKay = item.key;
        }

        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }

      return pre;
    } ,[])
  }

  // 在第一次render之前，执行一次
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // 得到当前请求的路由路径
    const path = (this.props as any).location.pathname;

    // 得到需要打开菜单项的key
    const openKay = this.openKay;

    console.log('render()', path);

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>Roc 后台</h1>
        </Link>

        <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKay]}>
          {
            this.menuNodes
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav as any);