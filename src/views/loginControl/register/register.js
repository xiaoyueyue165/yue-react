import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Input, Button, message, Form, notification } from 'antd';
import { Sex, UploadImg, Agreement } from "../../../components";
import fetch from '../../../utils/fetch';
import API from "../../../utils/api";
import Utils from "../../../utils";
import './style.scss';
import camera from "../../../assets/default/icon/camera.png";

class register_withForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultSex: '1',
            AgreementState: true,
            phone: '',// 手机号
            successShowToast: false,
            successShow_content: ''
        }
    }

    componentWillMount() {
        // this._getSuccessContent();
    }

    toIndex() {
        this.props.history.push('/')
    }
    /**
    *
    * antd form subimt,获取表单数据
    * @memberof PublishZhiwei
    */
    handleSubmit = (e) => {
        e.preventDefault();
        // 全部参数
        let param;
        console.log('注册-选择的性别', this.state.defaultSex);

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const { imageUrl1_url, imageUrl2_url, imageUrl3_url, pwd, pwd2 } = this.state;

            if (!Utils.checkType(this.state.phone, 'phone')) {
                message.error('手机号码格式有误');
                return;
            }
            if (!imageUrl1_url || !imageUrl2_url || !imageUrl3_url) {
                message.error('请您上传必要的图片信息！');
                return;
            }
            if (pwd != pwd2) {
                message.error('两次输入的密码不一致');
                return;
            }
            if (!this.state.AgreementState) {
                message.error('协议内容未同意');
                return;
            }
            // 删除多余的密码信息
            delete values.password2;

            param = { "sex": this.state.defaultSex, "identity_front": imageUrl1_url, "identity_rear": imageUrl2_url, "business_license": imageUrl3_url, ...values }
            console.log("注册参数", param);

            fetch.post(`/api/${API.register}`, param).then(res => {
                if (res.data.error_msg) {
                    message.error(res.data.error_msg);
                    return;
                }
                if (res.data.request_id) {

                    notification.open({
                        duration: 3,
                        message: '通知',
                        description: '恭喜您注册成功！',
                        onClick: () => {
                            message.success("恭喜您注册成功！");
                        },
                    });
                    this.setState({
                        successShowToast: true
                    })

                }
            })

        });
    }
    // 好的跳转到
    onSubOk = () => {
        setTimeout(() => {
            this.props.history.push('/')
        }, 300);
    }
    // 成功时弹出的信息
    _getSuccessContent = () => {
        fetch.post(`/api/${API.registerSuccessToast}`, { type: 1 }).then(res => {
            if (res.data.error_msg) {
                message.error(res.data.error_msg);
                return;
            }
            if (res.data.request_id) {
                this.setState({
                    successShow_content: res.data.response_data.lists
                })
            }
        })
    }
    /**
    * 修改性别
    * @param {*} intro
    */
    onGetSex = (sex) => {
        this.setState({
            defaultSex: sex,
        });
    }
    /**
   * 手机号更新
   * @param {*} intro
   */
    handlePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    /**
    * 两次输入密码更新
    * @param {*} intro
    */
    handleTwicePwd = (key, e) => {
        this.setState({
            [key]: e.target.value
        })
    }
    sendVscode() {
        if (!this.state.phone) {
            message.error('手机号码不可为空');
            return;
        }
        if (!Utils.checkType(this.state.phone, 'phone')) {
            message.error('手机号码格式有误');
            return;
        } else {
            fetch.post(`/api/${API.sendVcode}`, { mobile: this.state.phone }).then(res => {
                console.log(res.data.response_data)
            })
            message.success('验证码正在为您发送...');
        }

    }
    // 认同协议吗？
    onSubXieyiState = (state) => {
        this.setState({
            AgreementState: state
        })
    }
    // 订阅线上返回的图片
    onSubOnlineImg = (obj) => {
        this.setState({
            [obj.name]: obj.url
        }, () => {
            console.log(this.state);
        })

    }

    render() {
        // 认同协议吗？
        const { AgreementState } = this.state;
        const { getFieldDecorator } = this.props.form;

        const { defaultSex, successShowToast, successShow_content } = this.state;
        const RegisterForm = <div className="mainBox">
            <div className="title">注册</div>

            <Form onSubmit={this.handleSubmit}>
                <div className="leftName">
                    <div className="keyName">
                        公司名称
        </div>
                    <div className="keyName">
                        负责人姓名
        </div>
                    <div className="keyName">
                        职位名称
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
                    <Form.Item>
                        {getFieldDecorator('company_name', {
                            rules: [{ required: true, message: '请输入公司名称!' }],
                        })(
                            <Input className="inputText" placeholder="请输入公司名称" />
                        )}

                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('principal_name', {
                            rules: [{ required: true, message: '请输入负责人姓名!' }],
                        })(
                            <Input className="inputText" placeholder="请输入负责人姓名" />
                        )}

                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('position', {
                            rules: [{ required: true, message: '请输入职位名称!' }],
                        })(
                            <Input className="inputText" placeholder="请输入职位名称" />
                        )}

                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('company_phone', {
                            rules: [{ required: true, message: '请输入公司电话!' }],
                        })(
                            <Input className="inputText" placeholder="请输入公司电话" />
                        )}

                    </Form.Item>

                    <Sex className="normalH" defaultSex={defaultSex} getResultSex={this.onGetSex} />
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input className="inputText" placeholder="请输入手机号" onChange={this.handlePhone} />
                        )}

                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入验证码!' }],
                        })(
                            <div className="code_wrap">
                                <Input className="inputText" placeholder="请输入验证码" /> <div className="sendVscode_register" onClick={() => this.sendVscode()}>发送验证码</div>
                            </div>

                        )}

                    </Form.Item>

                    <div className="uploadImg oneLineBetween">
                        <UploadImg imgNameKey="imageUrl1_url" uploadPrompt="身份证正面图片" onSubOnlineImgUrl={this.onSubOnlineImg} />
                        <UploadImg imgNameKey="imageUrl2_url" uploadPrompt="身份证背面图片" onSubOnlineImgUrl={this.onSubOnlineImg} />
                    </div>
                    <div className="uploadImg oneLineStart">
                        <UploadImg imgNameKey="imageUrl3_url" uploadPrompt="营业执照图片" onSubOnlineImgUrl={this.onSubOnlineImg} />
                    </div>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input.Password className="inputText" placeholder="请输入密码" onChange={this.handleTwicePwd.bind(this, 'pwd')} />

                        )}

                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password2', {
                            rules: [{ required: true, message: '请确认输入密码!' }],
                        })(
                            <Input.Password className="inputText" placeholder="请确认输入密码" onChange={this.handleTwicePwd.bind(this, 'pwd2')} />
                        )}

                    </Form.Item>

                    <Button className="registerBtn" type="primary" htmlType="submit">注册</Button>
                    {/* 协议 */}

                    <Agreement className="xiayi center" text="平台协议" type={1} checked={AgreementState} onPubXieYiState={this.onSubXieyiState} />
                </div>
            </Form>
        </div>;
        //   FIXME:style 样式问题 暂时 register_mainBox_Toast =》  padding-top: 40%;
        return successShowToast ? <div className="register_mainBox_Toast"></div> : <div className="register_mainBox center"> {RegisterForm}
        </div>




    }

};

register_withForm.propTypes = {

};

const Register = Form.create()(register_withForm);


export default Register;