import React from 'react';
import { Input, Button, message, notification } from 'antd';
import Utils from '../../../utils';
import fetch from '../../../utils/fetch';
import API from '../../../utils/api';
import './style.scss';
import phone from '../../../assets/default/icon/phone.png';
import pwd from '../../../assets/default/icon/pwd.png';
import msg from '../../../assets/default/icon/msg.png';

class ForgetPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sendVscode = this.sendVscode.bind(this);
  }

  // 发送验证码
  sendVscode = () => {
    const y = this;
    if (!y.state.username) {
      message.error('请先输入手机号码！');
      return;
    }
    if (!Utils.checkType(this.state.username, 'phone')) {
      message.error('手机号码有误');
      return;
    }
    fetch
      .post(`/api/${API.sendVcode}`, { mobile: this.state.username })
      .then(res => {
        message.success('验证码正在为您发送...');
        console.log(res.data.response_data);
      });
  };

  toIndex() {
    this.props.history.push('/');
  }

  /**
   * 公共使用的获取form 受控组件元素值
   * @param {*} intro
   */
  onFormChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  submitFn = () => {
    const { username, code, password, password2 } = this.state;
    const param = {
      username,
      password,
      code,
    };
    if (!username) {
      message.error('请填写完整手机号码信息');
      return;
    }
    if (!Utils.checkType(username, 'phone')) {
      message.error('手机号码输入有误！');
      return;
    }
    if (password != password2) {
      message.error('两次输入的密码不一致');
    }
    fetch.post(`/api/${API.forgetPwd}`, param).then(res => {
      if (res.data.error_msg) {
        message.error(res.data.error_msg);
        return;
      }
      if (res.data.request_id) {
        notification.open({
          duration: 0.5,
          message: '通知',
          description: '修改密码成功！',
          onClick: () => {
            message.success('修改密码成功！');
          },
        });
        setTimeout(() => {
          this.props.history.push('/');
        }, 500);
      }
    });
  };

  render() {
    return (
      <div className="forgetPwd_wrap center">
        <div className="forgetPwd">
          <div className="title">忘记密码</div>
          <Input
            className="commonInp"
            placeholder="请输入手机号"
            onChange={this.onFormChange.bind(this, 'username')}
          />
          <img className="commonIcon" src={phone} />
          <Input
            className="commonInp"
            placeholder="请输入验证码"
            onChange={this.onFormChange.bind(this, 'code')}
          />
          <img className="commonIcon" src={msg} />
          <div className="sendVscode_loginState" onClick={this.sendVscode}>
            发送验证码
          </div>
          <Input.Password
            className="commonInp"
            placeholder="请输入新密码"
            onChange={this.onFormChange.bind(this, 'password')}
          />
          <img className="commonIcon" src={pwd} />
          <Input.Password
            className="commonInp"
            placeholder="请确认新密码"
            onChange={this.onFormChange.bind(this, 'password2')}
          />
          <img className="commonIcon" src={pwd} />
          <Button className="Btn" type="primary" onClick={this.submitFn}>
            确认
          </Button>
        </div>
      </div>
    );
  }
}

ForgetPwd.propTypes = {};

export default ForgetPwd;
