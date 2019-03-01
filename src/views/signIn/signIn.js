import React, { Component } from "react";
import signIn_img from '../../assets/signIn_img.png';
import SignInTab from "../../components/signInTab/signInTab";
import time from '../../assets/icon/signIn_tab1.png';
import pwd from '../../assets/icon/signIn_tab2.png';
import './style.css';

class signIn extends Component {
  constructor() {
    super();
    this.state = ({
      tab: 0
    })
  }
  toHome() {
    this.props.history.push('/home');
  }
  sendTabIndex(index) {
    this.setState({
      tab: index
    })
  }

  render() {
    const tabIndex = this.state.tab;
    return (
      <div className="app">
        <div className="header oneLineBetween">
          <div className="login_btn hand">
            yue-react-start
          </div>
          <div className="guo hand" onClick={this.toHome.bind(this)}>跳过，先浏览下</div>
        </div>
        <div className="bigBg_box">
          <img className="signIn_img" src={signIn_img} />
          <div className="card-container">

            <div className="tabNav">
              <div className={tabIndex === 0 ? 'tab_item active hand' : 'tab_item hand'} onClick={() => this.sendTabIndex(0)}>密码登录</div>
              <div className={tabIndex === 1 ? 'tab_item active hand' : 'tab_item hand'} onClick={() => this.sendTabIndex(1)}>验证码登录</div>
            </div>
            <SignInTab index={tabIndex} phone="" />
          </div>
        </div>
        <div id="footer" className="oneLineBetween">
          <div className="item oneLineBetween">
            <img src={time} />
            <div className="context columnBetween">
              <div className="title">极速入职</div>
              <div className="intro">最快24小时拿到企业offer</div>
            </div>
          </div>
          <div className="item oneLineBetween">
            <img src={pwd} />
            <div className="context columnBetween">
              <div className="title">极速入职</div>
              <div className="intro">最快24小时拿到企业offer</div>
            </div>
          </div>
          <div className="item oneLineBetween">
            <img src={pwd} />
            <div className="context columnBetween">
              <div className="title">极速入职</div>
              <div className="intro">最快24小时拿到企业offer</div>
            </div>
          </div>
          <div className="item oneLineBetween">
            <img src={pwd} />
            <div className="context columnBetween">
              <div className="title">极速入职</div>
              <div className="intro">最快24小时拿到企业offer</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default signIn;

