import React, { Component } from 'react'
import Head from "../../layouts/head/head";
import Foot from "../../layouts/foot/foot";
import index from "../../assets/big/index.png";
import qrCode from "../../assets/qrCode.png";
import './style.scss'

class Home extends Component {
    render() {
        return (
            <div className="homePage">
                <Head />
                <div className="bigImg app">
                    <img src={index} />
                    <img className="index_qrCode" src={qrCode} />
                </div>
                <div className="Partner app">
                    <div className="title_box">
                        <div className="title">合作伙伴</div>
                        <div className="bg">
                            Partner
                        </div>
                    </div>
                </div>
                <Foot />
            </div>
        )
    }
}

export default Home
