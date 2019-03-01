import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import avator from "../../assets/avator.jpg";
import './style.scss'

class head extends Component {
    render() {
        return (
            <div className="head_wrap app">
                <div className="head_com hand">yue-react-start</div>
                <div className="right_nav">
                    <Link to="/" >首页</Link>
                    <Link to="/" >我有人</Link>
                    <Link to="/" >我用人</Link>
                    <Link to="/" >企业服务</Link>
                    <Link to="/" >HR精英俱乐部</Link>
                    <Link to="/" >合作伙伴</Link>
                    <Link to="/" >关于我们</Link>
                </div>
                <div className="head_avator hand">
                <img src={avator}/>
                </div>
            </div>
        )
    }
}

export default head
