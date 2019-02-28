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
            userName: '',
        };
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    sendVscode() {
        alert('发送验证码')
    }
    toRegister() {
        console.log(this.props);
    }


    render() {
        const props = this.props;
        console.log(props)
        const tabContent_pwd = <div className="tabContentBox columnAround">
            <Input className="phone" placeholder="请输入手机号" />
            <img className="phone_icon" src={phone} />
            <Input className="pwd" placeholder="请输入密码" />
            <img className="phone_icon icon_pwd" src={pwd} />
            <div className="checkBox">
                <Checkbox onChange={this.onChange}>自动登录</Checkbox>
            </div>
            <Button className="loginBtn" type="primary">登录</Button>
            <div className="tishi oneLineBetween">
                <div>没有账号<span className="blue"><Link to="/register">立即注册</Link></span></div>
                <div className="blue"><Link to="/loginState?forgetPwd=true">忘记密码</Link></div>
            </div>
        </div>;
        const tabContent_vcode = <div className="tabContentBox columnAround">
            <Input className="phone" placeholder="请输入手机号" />
            <img className="phone_icon" src={phone} />
            <div className="phone_toast oneLineEnd"><img className="icon_tan" src={tan} /> 手机号未注册</div>
            <Input className="vcode" placeholder="请输入验证码" />
            <div className="sendVscode" onClick={() => this.sendVscode()}>发送验证码</div>
            <img className="icon_vcode" src={msg} />
            <Button className="loginBtn2" type="primary">登录</Button>
        </div>;
        return props.index === 0 ? tabContent_pwd : tabContent_vcode;
    }
}

export default SignInTab;
