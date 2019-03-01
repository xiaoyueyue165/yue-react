import React, { Component } from 'react'
import Head from "../../layouts/head/head";
import Foot from "../../layouts/foot/foot";
import index from "../../assets/big/index.png";
import qrCode from "../../assets/qrCode.png";
import hezuo from "../../assets/hezuo.png";
import location1 from "../../assets/icon/location_1.png";
import location2 from "../../assets/icon/location_2.png";
import location3 from "../../assets/icon/location_3.png";
import toPrev from "../../assets/icon/l_jianTou.png";
import toNext from "../../assets/icon/r_jianTou.png";
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
                <div className="loation app">
                    <div className="up">
                        <div className="title_box">
                            <div className="title">平台定位</div>
                            <span className="small_hui"></span>
                            <div className="bg">
                                <span>P</span>
                                <span>O</span>
                                <span>S</span>
                                <span>I</span>
                                <span>T</span>
                                <span>I</span>
                                <span>O</span>
                                <span>N</span>
                                <span>I</span>
                                <span>N</span>
                                <span>G</span>
                            </div>
                        </div>
                        <h6>平台的定位内容宣传</h6>
                    </div>
                    <div className="activity_tabs">
                        <div className="activity_item active_tab columnBetween">
                            <img src={location1} />
                            <div className="content columnBetween">
                                <div className="title">人员共享的优势</div>
                                <div className="intro">人员贡献提供了求职就业机会</div>
                            </div>
                        </div>
                        <div className="activity_item columnBetween">
                            <img src={location2} />
                            <div className="content columnBetween">
                                <div className="title">人员共享的优势</div>
                                <div className="intro">人员贡献提供了求职就业机会</div>
                            </div>
                        </div>
                        <div className="activity_item columnBetween">
                            <img src={location3} />
                            <div className="content columnBetween">
                                <div className="title">人员共享的优势</div>
                                <div className="intro">人员贡献提供了求职就业机会</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Product app">
                    <div className="up">
                        <div className="title_box">
                            <div className="title">服务产品</div>
                            <span className="small_hui"></span>
                            <div className="bg">
                                <span>S</span>
                                <span>E</span>
                                <span>R</span>
                                <span>V</span>
                                <span>I</span>
                                <span>C</span>
                                <span>E</span>
                                <span></span>
                                <span>P</span>
                                <span>R</span>
                                <span>O</span>
                                <span>D</span>
                                <span>U</span>
                                <span>C</span>
                                <span>T</span>
                            </div>
                        </div>
                        <h6>与知名行业合作给您提供优质职位</h6>
                    </div>
                    <div className="products_list">
                        <img className="toNext" src={toNext} />
                        <img className="toPrev" src={toPrev} />

                        <div className="product_item">
                            <div className="small_block"></div>
                            <div className="content columnBetween">
                                <div className="title">01<div className="text">我用人</div></div>
                                <div className="intro">现阶段企业对于某一个或多个岗位用工需求不大，需要处理突发情况的用工对于某些时段</div>
                            </div>
                        </div>
                        <div className="product_item">
                            <div className="small_block"></div>
                            <div className="content columnBetween">
                                <div className="title">02<div className="text">我用人</div></div>
                                <div className="intro">各企业将目前不饱和人员共享到其他企业实现成本降低，员工收入提升，大大增加了职工的稳定性和相互的粘合度</div>
                            </div>
                        </div>
                        <div className="product_item">
                            <div className="small_block"></div>
                            <div className="content columnBetween">
                                <div className="title">03<div className="text">我用人</div></div>
                                <div className="intro">引入第三方平台，本平台提供了基础套餐的展示、预约、拼团等功能</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fill_block app"></div>

                <div className="Partner app">
                    <div className="up">
                        <div className="title_box">
                            <div className="title">合作伙伴</div>
                            <span className="small_hui"></span>
                            <div className="bg">
                                <span>P</span>
                                <span>A</span>
                                <span>R</span>
                                <span>T</span>
                                <span>N</span>
                                <span>E</span>
                                <span>R</span>
                            </div>
                        </div>
                        <h6>与知名行业合作给您提供优质职位</h6>
                    </div>
                    <div className="company_list">
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                        <a> <img src={hezuo} /></a>
                    </div>
                </div>
                <Foot />
            </div>
        )
    }
}

export default Home
