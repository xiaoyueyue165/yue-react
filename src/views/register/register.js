import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Input, Button, Radio, message } from 'antd';
import Upload from "antd/lib/upload";
import utils from "../../utils";
import './style.scss';
import bigBg from '../../assets/bigBg.png';
import camera from "../../assets/icon/camera.png";

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
const IMgProps = {
    name: 'file',
    multiple: false,
    action: '//jsonplaceholder.typicode.com/posts/',
    showUploadList: false,
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
class register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultSex: 1,
            xieyi: true
        }
        this.onChangeSex = this.onChangeSex.bind(this);
        this.onChangeXieyi = this.onChangeXieyi.bind(this);
    }
    toIndex() {
        this.props.history.push('/')
    }

    onChangeXieyi(e) {
        console.log(this.state.xieyi)
        this.setState({
            xieyi: !this.state.xieyi,
        });
    }
    onChangeSex(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            defaultSex: e.target.value,
        });
    }
    sendVscode() {
        alert('发送验证码')
    }

    render() {
        const xieyi = this.state.xieyi;
        console.log(IMgProps)
        return (
            <div className="wrapper">
                <div className="company hand" onClick={this.toIndex.bind(this)}>首润人力资源</div>
                <div className="rightState">已有账号，<span className="blue"><Link to="/signIn">立即登录</Link></span></div>
                <img className='bigBg' src={bigBg} />
                <div className="mainBox">
                    <div className="title">注册</div>
                    <div className="leftName">
                        <div className="keyName">
                            公司名称
                    </div>
                        <div className="keyName">
                            负责人姓名
                    </div>
                        <div className="keyName">
                            公司电话
                    </div>
                        <div className="keyName">
                            性别
                    </div>
                        <div className="keyName">
                            手机号
                    </div>
                        <div className="keyName">
                            验证码
                    </div>
                        <div className="keyName uploadImg">
                            上传身份证照片
                    </div>
                        <div className="keyName uploadImg">
                            上传公司营业执照
                    </div>
                        <div className="keyName">
                            设置密码
                    </div>
                        <div className="keyName">
                            再次输入
                    </div>
                    </div>
                    <div className="rightVal">
                        <Input className="inputText" placeholder="请输入公司名称" />
                        <Input className="inputText" placeholder="请输入姓名" />
                        <Input className="inputText" placeholder="请输入公司电话" />
                        <RadioGroup className="normalH" onChange={this.onChangeSex} value={this.state.defaultSex}>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                        <Input className="inputText" placeholder="请输入手机号" />
                        <Input className="inputText" placeholder="请输入验证码" /> <div className="sendVscode_register" onClick={() => this.sendVscode()}>发送验证码</div>
                        <div className="uploadImg oneLineBetween">
                            <Dragger className="item_block" {...IMgProps}>
                                <img className="camera" src={camera} />
                                <span>身份证正面照</span>
                            </Dragger>
                            <Dragger className="item_block" {...IMgProps}>
                                <img className="camera" src={camera} />
                                <span>身份证反面面照</span>
                            </Dragger>
                        </div>
                        <div className="uploadImg oneLineStart">
                            <Dragger className="item_block" {...IMgProps}>
                                <img className="camera" src={camera} />
                                <span>公司营业执照</span>
                            </Dragger>
                        </div>
                        <Input className="inputText" placeholder="请输入密码" />
                        <Input className="inputText" placeholder="请确认输入密码" />
                        <Button className="registerBtn" type="primary">注册</Button>
                        <div className="xieyi center">
                            <Radio onClick={this.onChangeXieyi} defaultChecked={this.state.xieyi} checked={this.state.xieyi}>发布《共享人员协议》</Radio>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

register.propTypes = {

};


export default register;