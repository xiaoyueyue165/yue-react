import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Animated from "animated/lib/targets/react-dom";
import './style.scss'

class ConcatAd extends Component {
    state = {
        anim_Top: new Animated.Value(0),
        top_first: '' // 首次加载广告距离顶部高度
    };

    componentDidMount() {
        let ad_height = 210;
        const view_height = window.innerHeight;
        // console.log(this.Ad);
        let top_first = parseInt((view_height - ad_height) / 2); //计算top
        this.setState({
            top_first: top_first,
        })
        // 首次加载运动
        Animated.spring(this.state.anim_Top, { toValue: top_first + 200 }).start();
        setInterval(() => {
            window.addEventListener('scroll', this.onListenWindowScoll);
        }, 8);
    }

    onListenWindowScoll = (e) => {
        const { top_first } = this.state;
        let that = this;
        window.onscroll = function () { //页面滚动
            var NowScollTop = document.documentElement.scrollTop
            if (NowScollTop < window.innerHeight) {
                Animated.spring(that.state.anim_Top, { toValue: top_first + 100 }).start();
            } else if (NowScollTop == 0) {
                Animated.spring(that.state.anim_Top, { toValue: top_first + 500 }).start();
            } else {
                Animated.spring(that.state.anim_Top, { toValue: top_first - 100 }).start();
                // console.log('移动超过初始 NowScollTop', NowScollTop, '初始滚动的高度', top_first);
            }
        }
    }
    handleAnimatedMoveTop = () => {
        const { top_first } = this.state;
        Animated.timing(this.state.anim_Top, { toValue: top_first }).start();
    }
    render() {
        return (
            <Animated.div className="Concat_Ad" style={{ top: this.state.anim_Top }} >
                <div className="title" ref={(ele) => { this.Ad = ele }}>在线咨询</div>
                <div className="onlineCusConcat">在线客服</div>
                <div className="phoneContent mulitLineBetween">
                    <div className="text">联系电话</div>
                    <div className="phone">010-2154643</div>
                </div>
            </Animated.div>
        );
    }
}

export default ConcatAd

