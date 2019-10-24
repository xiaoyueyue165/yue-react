import React from 'react';
import { Input, Button, Checkbox, message, notification } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Utils from '../../../utils';
import fetch from '../../../utils/fetch';
import API from '../../../utils/api';
import phoneIcon from '../../../assets/default/icon/phone.png';
import pwd from '../../../assets/default/icon/pwd.png';
import tan from '../../../assets/default/icon/tan.png';
import msg from '../../../assets/default/icon/msg.png';
import './style.scss';

class SignInTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: '',
      // 密码登录
      vcode: '',
      phone: '',
      phone2: '',
      error_msg: '', // 验证码错误提示
      autoLogin: false,
    };
  }

  /**
   *  密码登录
   * @param {*} intro
   */
  loginByPwd = e => {
    const y = this;
    const param = {
      username: y.state.phone,
      password: y.state.vcode,
    };
    if (!y.state.phone || !y.state.vcode) {
      message.error('手机号与密码不可为空哦！');
      return;
    }
    if (!Utils.checkType(y.state.phone, 'phone')) {
      message.error('请填写正确的手机号码！');
      return;
    }

    fetch
      .post(`/api/${API.login}`, param)
      .then(res => {
        if (res.data.error_msg) {
          message.error(res.data.error_msg);
          return;
        }
        if (res.data.request_id) {
          const token = res.data.response_data.access_token;
          localStorage.setItem('HR_token', token);
          notification.success({
            duration: 200,
            message: '通知',
            description: '已成功登录！',
            onClick: () => {
              message.success('已成功登录！');
            },
          });
          setTimeout(() => {
            this.props.history.push('/');
          }, 300);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // console.log('密码登录:', param);
  };

  /**
   *  验证码登录
   * @param {*} intro
   */
  loginByVcode = e => {
    const y = this;
    const param = {
      username: y.state.phone2,
      code: y.state.vcode2,
    };
    if (!y.state.phone2) {
      message.error('请先输入手机号获取验证码！');
      return;
    }
    if (!Utils.checkType(y.state.phone2, 'phone')) {
      message.error('请填写正确的手机号码！');
      return;
    }
    if (!y.state.vcode2) {
      message.error('请输入验证码！');
      return;
    }
    fetch.post(`/api/${API.loginByVcode}`, param).then(res => {
      if (res.data.error_msg) {
        y.setState({
          error_msg: res.data.error_msg,
        });
        return;
      }
      if (res.data.request_id) {
        const token = res.data.response_data.access_token;
        localStorage.setItem('HR_token', token);
        notification.success({
          duration: 300,
          message: '通知',
          description: '已成功登录！',
          onClick: () => {
            message.success('已成功登录！');
          },
        });
        setTimeout(() => {
          this.props.history.push('/');
        }, 300);
      }
    });
    console.log('验证码登录:', param);
  };

  onChange(key, e) {
    this.setState({
      [key]: key === 'autoLogin' ? e.target.checked : e.target.value,
    });
  }

  sendVscode() {
    const y = this;
    if (!y.state.phone2) {
      message.error('请先输入手机号码！');
      return;
    }
    if (!Utils.checkType(this.state.phone2, 'phone')) {
      message.error('手机号码有误');
      return;
    }
    fetch
      .post(`/api/${API.sendVcode}`, { mobile: this.state.phone2 })
      .then(res => {
        message.success('验证码正在为您发送...');
        console.log(res.data.response_data);
      });
  }

  render() {
    const { props } = this;
    const { phone, phone2, error_msg } = this.state;
    const tabContent_pwd = (
      <div className="signInTab_tabContentBox columnAround">
        <Input
          className="phone"
          value={phone}
          onChange={this.onChange.bind(this, 'phone')}
          placeholder="请输入手机号"
        />
        <img className="phone_icon" src={phoneIcon} />
        <div className="pwd_wrap">
          <Input.Password
            className="pwd"
            onChange={this.onChange.bind(this, 'vcode')}
            placeholder="请输入密码"
          />
        </div>
        <img className="phone_icon icon_pwd" src={pwd} />
        <div className="checkBox">
          <Checkbox onChange={this.onChange.bind(this, 'autoLogin')}>
            自动登录
          </Checkbox>
        </div>
        <Button className="loginBtn" onClick={this.loginByPwd} type="primary">
          登录
        </Button>
        <div className="tishi oneLineBetween">
          <div>
            没有账号
            <span className="blue">
              <Link to="/register">立即注册</Link>
            </span>
          </div>
          <div className="blue">
            <Link to="/forgetPwd">忘记密码</Link>
          </div>
        </div>
      </div>
    );
    const tabContent_vcode = (
      <div className="signInTab_tabContentBox columnAround">
        <Input
          className="phone"
          value={phone2}
          onChange={this.onChange.bind(this, 'phone2')}
          placeholder="请输入手机号"
        />
        <img className="phone_icon" src={phoneIcon} />
        {error_msg ? (
          <div className="phone_toast oneLineEnd">
            <img className="icon_tan" src={tan} /> {error_msg}
          </div>
        ) : (
          ''
        )}

        <Input
          className="vcode"
          placeholder="请输入验证码"
          onChange={this.onChange.bind(this, 'vcode2')}
        />
        <div className="sendVscode" onClick={() => this.sendVscode()}>
          发送验证码
        </div>
        <img className="icon_vcode" src={msg} />
        <Button
          className="loginBtn2"
          onClick={this.loginByVcode}
          type="primary"
        >
          登录
        </Button>
      </div>
    );
    return props.index === 0 ? tabContent_pwd : tabContent_vcode;
  }
}

export default withRouter(SignInTab);
