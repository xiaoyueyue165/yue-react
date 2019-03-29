import React, { Component } from 'react'
import { Radio, message, Modal } from 'antd';
import fetch from '../../../utils/fetch';
import API from "../../../utils/api";
import PropTypes from 'prop-types'
import './style.scss'

class Agreement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            visible: false // 协议内容弹窗
        }
    }

    componentWillMount() {
        this.setState({
            ...this.props
        })
    }

    /**
    *  同意协议
    * @param {*} intro
    */
    onChangeXieyi = (e) => {
        if (e.target.nodeName !== 'SPAN') {
            this.setState({
                checked: !this.state.checked,
            });
            // 传递
            this.props.onPubXieYiState(!this.state.checked)
        }
    }
    // 协议内容
    _getXieyiContent = (e) => {
        if (e.target.nodeName === 'SPAN') {
            fetch.post(`/api/${API.agreement}`, { type: this.props.type }).then(res => {
                if (res.data.error_msg) {
                    message.error(res.data.error_msg);
                    return;
                }
                if (res.data.request_id) {
                    this.setState({
                        content: res.data.response_data.content
                    }, () => {
                        // 打开协议内容弹窗
                        this.showModal();
                    })
                }
            })
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const { text, content } = this.state;
        return (
            <div className={this.props.className + " " + 'fontAndHeight center'}>
                <Radio onClick={this.onChangeXieyi} defaultChecked={this.state.checked} checked={this.state.checked}>我同意《<span onClick={this._getXieyiContent} className="xieyi_Link">{text}</span>》</Radio>
                <Modal
                    title={text}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div dangerouslySetInnerHTML={{ __html: content }}
                        style={{ marginBottom: '59px' }}
                        className="content" />
                    {/* </div> */}
                </Modal>
            </div >
        )
    }
}
Agreement.propTypes = {
    text: PropTypes.string, // 展示文字
    type: PropTypes.number, // 协议类型
    checked: PropTypes.bool, // 默认选中？
    onPubXieYiState: PropTypes.func // 接受协议结果
};
export default Agreement
