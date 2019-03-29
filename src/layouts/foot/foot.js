import React, { Component } from 'react'
import { message } from 'antd';
import fetch from "../../utils/fetch";
import API from "../../utils/api";
import './style.scss'

class Foot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteMsg: {},
            friendShipLinks: []
        }
    }
    componentWillMount() {
        // this._getSiteMsg();
        // this._getFriendShipLinks();
    }
    // 网站基本信息
    _getSiteMsg = () => {
        fetch.post(`/api/${API.siteMsg}`, {}).then(res => {
            if (res.data.error_msg) {
                message.error(res.data.error_msg);
                return;
            }
            if (res.data.request_id) {
                this.setState({
                    siteMsg: res.data.response_data
                })
            }
        })
    }
    // 友情链接
    _getFriendShipLinks = () => {
        fetch.post(`/api/${API.friendShipList}`, {}).then(res => {
            if (res.data.error_msg) {
                message.error(res.data.error_msg);
                return;
            }
            if (res.data.request_id) {
                this.setState({
                    friendShipLinks: res.data.response_data.lists
                })
            }
        })
    }

    render() {
        const { siteMsg, friendShipLinks } = this.state
        return (
            <div className="foot_wrap app">
                <div className="mainLinks">
                    <div className="title">友情链接：</div>
                    <ul className="clearfix">
                        {friendShipLinks.length > 0 ?
                            friendShipLinks.map(v => {
                                return < li key={v.id} > <a href={v.skip_url}>{v.title}</a></li>
                            })
                            : 'loading...'}


                    </ul>
                    <div className="line"></div>
                    {siteMsg ? <React.Fragment>
                        <div className="com">
                            <div className="row">{siteMsg.company_name}</div>
                            <div className="row">{siteMsg.company_address}</div>
                            <div className="row">{siteMsg.company_phone}</div>
                            <div className="row">{siteMsg.company_email}</div>
                        </div>
                        <div className="qrCode oneLineBetween">
                            <div className="code columnBetween">
                                <div className="img">
                                    <img className="coverImg" src={siteMsg.official_accounts} />
                                </div>
                                <div className="intro">公众号二维码</div>
                            </div>
                            <div className="code columnBetween">
                                <div className="img">
                                    <img className="coverImg" src={siteMsg.mini_program} />
                                </div>
                                <div className="intro">小程序二维码</div>
                            </div>

                        </div>
                    </React.Fragment> : 'loading...'}

                </div>
                <div className="copyRight oneLineBetween">
                    <div className="innerBox">
                        <p>Copyright 2017© DECO All rights Reserved. ICP备案号31654646</p>
                        <a>技术支持</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Foot
