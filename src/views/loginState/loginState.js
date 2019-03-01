import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Input, Button, message } from 'antd';
import utils from "../../utils";
import './style.scss';
import bigBg from '../../assets/bigBg.png';
import phone from '../../assets/icon/phone.png';
import pwd from '../../assets/icon/pwd.png';
import msg from '../../assets/icon/msg.png';


class loginState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.sendVscode = this.sendVscode.bind(this);
    }
    sendVscode() {
        alert('发送验证码')
    }
    toIndex() {
        this.props.history.push('/')
    }

    render() {
        var parseObj = utils.parseParam(this.props.location.search);
        let forgetPwd = parseObj.forgetPwd;
        const sendVscode = this.sendVscode;

        function ForgetPwd_R() {

            return <div className="mainBox">
                <div className="title">忘记密码</div>
                <Input className="commonInp" placeholder="请输入手机号" />
                <img className="commonIcon" src={phone} />
                <Input className="commonInp" placeholder="请输入验证码" />
                <img className="commonIcon" src={msg} />
                <div className="sendVscode_loginState" onClick={sendVscode}>发送验证码</div>
                <Input className="commonInp" placeholder="请输入新密码" />
                <img className="commonIcon" src={pwd} />
                <Input className="commonInp" placeholder="请确认新密码" />
                <img className="commonIcon" src={pwd} />
                <Button className="Btn" type="primary">确认</Button>
            </div>;
        }
        function Success_R() {
            return <div className="ToastBox">
                <div className="s_title">您已注册成功</div>
                <div className="answer">您还需要准备以下资料，以便于上门访问</div>
                <Button className="s_Btn" type="primary">好的</Button>
            </div>;
        }
        console.log(forgetPwd)


        return (
            <div className="wrapper_loginState">
                <div className="company hand" onClick={this.toIndex.bind(this)}>首润人力资源</div>
                <img className='bigBg' src={bigBg} />
                {forgetPwd === 'true' ? <ForgetPwd_R /> : <Success_R />}
            </div>
        );
    }

};

loginState.propTypes = {

};

export default loginState;