import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';
import { fetchUserInfo } from '../../actions/user';
import Storage from '../../utils/storage';
import avator from '../../assets/avator.jpg';
import './style.scss';

class head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  static propTypes = {
    fetchUserInfo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const token = Storage.getLocal('Yue_token');
    this.setState({
      token,
    });
    if (token) {
      // this.props.fetchUserInfo()
    }
  }

  shouldComponentUpdate(nextProps, nextStates) {
    return nextStates.token || false;
  }

  // 点亮导航栏文字
  _shouldStarCurrentNavigationBar = navLocation => {
    const locationStr = this.props.location.pathname;
    //    首页点亮
    if (navLocation === '/home' && locationStr === '/') {
      return true;
    }
    return locationStr.indexOf(navLocation) !== -1;
  };

  /**
   * 退出登录
   * @param {*} intro
   */
  onSignOut = e => {
    Storage.removeLocal('HR_token');
    Storage.removeLocal('hr_avator');
    this.setState({
      token: '',
    });
    Storage.removeCookie('QCUSS');
    setTimeout(() => {
      this.props.history.push('/home');
    }, 300);
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link className="tac tab_a" to="/personalCenter">
            个人中心
          </Link>
        </Menu.Item>
        {!this.state.token ? <Menu.Divider /> : ''}

        {!this.state.token ? (
          <Menu.Item key="1">
            <Link className="tac tab_a" to="/signIn">
              前往登录
            </Link>
          </Menu.Item>
        ) : (
          ''
        )}
        <Menu.Divider />
        {this.state.token ? (
          <Menu.Item className="tac tab_a" onClick={this.onSignOut} key="2">
            退出登录
          </Menu.Item>
        ) : (
          ''
        )}
      </Menu>
    );
    return (
      <div className="response_container header_border">
        <div className="head_wrap container-header">
          <div className="head_com hand">
            <Link to="/">Yue's react project shell</Link>
          </div>
          <div className="right_nav">
            <Link
              className={
                this._shouldStarCurrentNavigationBar('/home')
                  ? 'active_nav'
                  : ''
              }
              to="/"
            >
              首页
            </Link>
            <Link
              className={
                this._shouldStarCurrentNavigationBar('/aboutUs')
                  ? 'active_nav'
                  : ''
              }
              to="/aboutUs"
            >
              关于我们
            </Link>
          </div>
          <Dropdown overlay={menu} trigger={['click', 'hover']}>
            <div className="head_avator hand ant-dropdown-link">
              <img
                src={
                  Storage.getLocal('hr_avator')
                    ? Storage.getLocal('hr_avator').slice(1, -1)
                    : avator
                }
              />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { fetchUserInfo },
  )(head),
);
