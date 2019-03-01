import React, { Component } from 'react'
import './style.scss'

class Foot extends Component {
    render() {
        return (
            <div className="foot_wrap app">
                <div className="mainLinks">
                    <div className="title">友情链接：</div>
                    <ul className="clearfix">
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                        <li><a href="">前潮网络</a></li>
                    </ul>
                    <div className="line"></div>
                    <div className="com">
                        <div className="row">首润人力资源</div>
                        <div className="row">北京市顺义区顺义大街</div>
                        <div className="row">0108888888</div>
                        <div className="row">888888888@163.com</div>
                    </div>
                    <div className="qrCode oneLineBetween">
                        <div className="code columnBetween">
                            <div className="img"></div>
                            <div className="intro">公众号二维码</div>
                        </div>
                        <div className="code columnBetween">
                            <div className="img"></div>
                            <div className="intro">小程序二维码</div>
                        </div>

                    </div>
                </div>
                <div className="copyRight oneLineBetween">
                    <p>Copyright 2017© DECO All rights Reserved. ICP备案号31654646</p>
                    <a>技术支持</a>
                </div>
            </div>
        )
    }
}

export default Foot
