import React from "react";
import { Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import phone from '../../assets/icon/phone.png';
import pwd from '../../assets/icon/pwd.png';
import tan from '../../assets/icon/tan.png';
import msg from "../../assets/icon/msg.png";
import './style.css';

class SignInTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: '',
            // 密码登录
            vcode: '',
            phone: '',
            phone2: '',
            autoLogin: false
        };
    }

    onChange(key, e) {
        this.setState({
            [key]: key === 'autoLogin' ? e.target.checked : e.target.value
        })
    }
    submit(key, e) {
        if (key === 'loginByPwd') {
            alert("你的手机号是：" + this.state.phone)
            console.log(this.state)
        } else {
            alert("你的手机号是：" + this.state.phone2)
        }
    }

    sendVscode() {
        alert('发送验证码')
    }
    toRegister() {
        console.log(this.props);
    }

    render() {
        const props = this.props;
        const tabContent_pwd = <div className="tabContentBox columnAround">
            <Input className="phone" value={this.state.phone} onChange={this.onChange.bind(this, 'phone')} placeholder="请输入手机号" />
            <img className="phone_icon" src={phone} />
            <Input className="pwd" onChange={this.onChange.bind(this, 'vcode')} placeholder="请输入密码" />
            <img className="phone_icon icon_pwd" src={pwd} />
            <div className="checkBox">
                <Checkbox onChange={this.onChange.bind(this, 'autoLogin')}>自动登录</Checkbox>
            </div>
            <Button className="loginBtn" onClick={this.submit.bind(this, 'loginByPwd')} type="primary">登录</Button>
            <div className="tishi oneLineBetween">
                <div>没有账号<span className="blue"><Link to="/register">立即注册</Link></span></div>
                <div className="blue"><Link to="/loginState?forgetPwd=true">忘记密码</Link></div>
            </div>
        </div>;
        const tabContent_vcode = <div className="tabContentBox columnAround">
            <Input className="phone" value={this.state.phone2} onChange={this.onChange.bind(this, 'phone2')} placeholder="请输入手机号" />
            <img className="phone_icon" src={phone} />
            <div className="phone_toast oneLineEnd"><img className="icon_tan" src={tan} /> 手机号未注册</div>
            <Input className="vcode" placeholder="请输入验证码" />
            <div className="sendVscode" onClick={() => this.sendVscode()}>发送验证码</div>
            <img className="icon_vcode" src={msg} />
            <Button className="loginBtn2" onClick={this.submit.bind(this, 'loginByVcode')} type="primary">登录</Button>
        </div>;
        return props.index === 0 ? tabContent_pwd : tabContent_vcode;
    }
}

export default SignInTab;
