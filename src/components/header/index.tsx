import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";

import LinkButton from '../link-button';
import { reqWeather } from "../../api";
import menuList from "../../config/menuConfig";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import "./index.less";

/**
 * 左侧导航的组件
 */
class Header extends Component {

  private intervalId?: any;

  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: "", // 天气图片url
    weather: "" // 天气的文本
  };

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({
        currentTime
      });
    }, 1000);
  };

  getWeather = async () => {
    // 调用接口，获取数据
    const response: any = await reqWeather("青岛");
    this.setState({
      dayPictureUrl: response.dayPictureUrl,
      weather: response.weather
    });
  };

  getTitle = () => {
    // 得到当前请求路径
    const path = (this.props as any).location.pathname;

    let title;
    menuList.forEach((item: any) => {
      if (item.key === path) {
        // 如果当前item的key 与 path 匹配，则逻辑通过
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find((cItem: any) => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });

    return title;
  };

  /**
   * 退出登录
   */
  logout = () => {
    Modal.confirm({
      title: "您确定要退出吗?",
      content: "退出登录 返回登录界面",
      onOk:() => {
        // 删除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 跳转到login
        (this.props as any).history.replace('/login');
      }
    });
  };

  /**
   * 第一次render() 之后执行一次
   * 一般在此执行异步操作：发ajax请求/启动定时器
   */
  componentDidMount() {
    // 获取当前时间
    this.getTime();

    // 获取当前天气
    this.getWeather();
  }

  /**
   * 当前组件卸载之前
   */
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId);
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;
    const username = (memoryUtils.user as any).username;
    const title = this.getTitle();

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>
            退出
          </LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header as any);
