import React, { Component } from 'react';
import { Carousel, message } from 'antd';
import PropTypes from 'prop-types';
import { Loading } from '..';
import fetch from '../../utils/fetch';
import API from '../../utils/api';
import './style.scss';

class Ad extends Component {
  static propTypes = {
    adType: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      Ads: [],
    };
  }

  componentDidMount() {
    // 类型(1首页,2简历库,3职位库,4企业服务,5HR精英俱乐部,6合作伙伴,7关于我们)
    this._getAdOnlineUrl(this.props.adType);
  }

  // 获取企业服务列表 by class_id
  _getAdOnlineUrl = index => {
    fetch.post(`/api/${API.adContorl}`, { type: index }).then(res => {
      if (res.data.error_msg) {
        message.error(res.data.error_msg);
        return;
      }
      const response = res.data.response_data.lists;
      this.setState({
        Ads: response,
      });
    });
  };

  render() {
    const { Ads } = this.state;
    return (
      <div className="adImgW100 center">
        <div className="ad_img_wrap">
          <Carousel autoplay>
            {Ads
              ? Ads.map(v => (
                  <div key={v.id}>
                    <img className="" src={v.img_url} />
                  </div>
                ))
              : ''}
          </Carousel>
          {Ads.length === 0 ? <Loading className="class_YY" /> : ''}
        </div>
      </div>
    );
  }
}

export default Ad;
