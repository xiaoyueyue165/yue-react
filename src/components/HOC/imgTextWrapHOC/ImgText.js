import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Utils from '../../../utils';
import Storage from '../../../utils/storage';
// import Tel from "../../../assets/icon/taocan_tel.png";
import './style.scss';

class ImgText extends Component {
  componentWillMount() {
    if (this.props.id) {
      Storage.setLocal('ImgTextProps', this.props);
    }
  }

  render() {
    // showCollect props.showCollect === false 不显示收藏按钮
    const { id, name, type, content, isCollect } =
      this.props && this.props.id
        ? this.props
        : JSON.parse(Storage.getLocal('ImgTextProps'));
    return (
      <div className="ImgTextWrap">
        <div className="taocan2">
          <div className="name">{name}</div>
          <div className="imgText">
            {/* <div className="imgBox">
                            <img className="coverImg" style={{ marginBottom: '19px' }} src={Jieshao} />
                        </div> */}
            <div />
            <div
              style={{ marginBottom: '59px' }}
              className="content"
              dangerouslySetInnerHTML={{ __html: Utils.escape2Html(content) }}
            ></div>
          </div>
        </div>

        <div className="onlineConcat">
          <div className="innerBox oneLineBetween">
            <div className="telBox">
              <img className="telIcon" src={Tel} />
              <span className="tel_phone">咨询电话：400-000-0606</span>
            </div>
            <Button className="concatBtn">在线咨询</Button>
          </div>
        </div>
      </div>
    );
  }
}

ImgText.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.number,
  id: PropTypes.string,
  isCollect: PropTypes.number,
};
export default ImgText;
