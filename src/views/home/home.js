import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Head, Foot } from '../../layouts';
import { BigAd, Loading, ConcatAd } from '../../components';
import { fetchUserInfo } from '../../actions/user';
import fetch from '../../utils/fetch';
import Api from '../../utils/api';
import location1 from '../../assets/default/icon/location_1.png';
import location2 from '../../assets/default/icon/location_2.png';
import location3 from '../../assets/default/icon/location_3.png';
import toPrev from '../../assets/default/icon/l_jianTou.png';
import toNext from '../../assets/default/icon/r_jianTou.png';
import './style.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panterList: [], // 合作伙伴列表
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('HR_token');
    const currentPath = this.props.match.path;
    // 未登录 从注册页面可访问 home
    if (token === null && currentPath === '/') {
      this.props.history.push('/signIn');
    } else {
      // 对已经卸载的组件异步更新会报错
      // this.getPanterList();
    }
  }

  getPanterList() {
    const y = this;
    // 首页 合作伙伴推荐显示 2
    fetch.post(`/api/${Api.panterList}`, { paging: '2' }).then(res => {
      console.log(res.data.response_data);
      const data = res.data.response_data.lists;
      y.setState({
        panterList: data,
      });
    });
  }

  render() {
    const { panterList } = this.state;
    const panterListImgs =
      panterList && panterList.length > 0
        ? panterList.map((panter, index) => (
            <a
              className={(index + 1) % 4 === 0 ? 'mr0 imgBox' : 'imgBox'}
              key={panter.id}
            >
              {' '}
              <div className="coverImg">
                <img
                  className="coverImg"
                  style={{
                    backgroundImage: `url(${panter.company_img})`,
                  }}
                />
              </div>
            </a>
          ))
        : '';
    return (
      <div className="homePage">
        <Head />
        {/* <Loading /> */}
        {/* 大广告 */}
        <BigAd adType={1} />
        <ConcatAd />
        {/* 平台定位 */}
        <div className="response_container loation_wrap">
          <div className="loation app">
            <div className="up">
              <div className="title_box">
                <div className="title">平台定位</div>
                <span className="small_hui" />
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
            </div>
            <h6>平台的定位内容宣传</h6>

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
                  <div className="title">HR精英俱乐部线下活动</div>
                  <div className="intro">人员贡献提供了求职就业机会</div>
                </div>
              </div>
              <div className="activity_item columnBetween">
                <img src={location3} />
                <div className="content columnBetween">
                  <div className="title">高端职位猎头</div>
                  <div className="intro">人员贡献提供了求职就业机会</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Foot />
      </div>
    );
  }
}

export default Home;
