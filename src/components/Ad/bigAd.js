import React, { Component } from 'react'
import { Carousel, message } from 'antd';
import fetch from "../../utils/fetch";
import API from "../../utils/api";
import PropTypes from 'prop-types'
import './style.scss'

class BigAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperList: []
        }
    }
    static propTypes = {
        adType: PropTypes.number.isRequired
    }
    componentWillMount() {
        // 类型(1首页,2简历库,3职位库,4企业服务,5HR精英俱乐部,6合作伙伴,7关于我们)
        this._getAdOnlineUrl(this.props.adType);
    }

    // 获取企业服务列表 by class_id
    _getAdOnlineUrl = (index) => {
        fetch.post(`/api/${API.bannerList}`, { 'type': index }).then(res => {
            if (res.data.error_msg) {
                message.error(res.data.error_msg);
                return;
            }
            let response = res.data.response_data.lists;
            this.setState({
                swiperList: response
            })
        })
    }
    render() {
        const { swiperList } = this.state;
        return (
            <Carousel className="bigAd_Wrap" autoplay="true">
                {swiperList ?
                    swiperList.map((item, index) => {
                        return (
                            <div key={item.id} className="bigImg app">
                                <a href={item.skip_url}>
                                    {/* 图片要求有版心 1200px 居中 */}
                                    <div className="main-img" style={{ backgroundImage: 'url(' + item.img_url + ')' }} ></div>
                                    {/* <img className="index_qrCode" src={qrCode} /> */}
                                </a>
                            </div>
                        )
                    }) : 'loading...'
                }
            </Carousel>
        )
    }
}


export default BigAd
