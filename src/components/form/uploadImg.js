import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import API from '../../utils/api';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  // const isJPG = file.type === 'image/jpeg';
  // if (!isJPG) {
  //     message.error('You can only upload JPG file!');
  // }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('上传图片大小需小于2M!');
  }
  // return isJPG && isLt2M;
  return isLt2M;
}

class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Common_uploadImgUrl:
        process.env.NODE_ENV === 'production'
          ? `${API.uploadImg}`
          : `/api/${API.uploadImg}`, // 本项目一致上传地址，不修改
      loading: false,
    };
  }

  static propTypes = {
    imgNameKey: PropTypes.string.isRequired, // 上传的图片的原始名称
    uploadPrompt: PropTypes.string.isRequired, // 上传图片提示
  };

  /**
   * 公共图片上传处理函数
   * @param {*} intro
   */
  UploadImghandleChange = (BaseImgName, info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // 获取上传后图片真实的在线地址
      const response_newOnlineImgUrl = info.file.response.response_data;
      const localKey = `${BaseImgName}_local`;
      const onlineKey = `${BaseImgName}_online`;
      getBase64(info.file.originFileObj, localImage =>
        this.setState(
          {
            [localKey]: localImage, // 本地图片
            [onlineKey]: response_newOnlineImgUrl, // 线上图片
            loading: false,
          },
          () => {
            this.onPubOnlineImgUrl(BaseImgName, {
              url: response_newOnlineImgUrl,
            });
          },
        ),
      );
    }
  };

  // 发送线上地址给props
  onPubOnlineImgUrl = (name, onlineObj) => {
    const onlineImgMsg = { name, ...onlineObj };
    this.props.onSubOnlineImgUrl(onlineImgMsg);
  };

  render() {
    const { imgNameKey, uploadPrompt } = this.props;
    const { loading, Common_uploadImgUrl } = this.state;
    // 公共上传图片显示状态
    const UploadButton = function(props) {
      return (
        <div>
          <Icon type={props.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">{props.showName}</div>
        </div>
      );
    };
    return (
      <Upload
        name="fileImg" // 传送图片的 key
        listType="picture-card"
        className="item_block_fix avatar-uploader"
        showUploadList={false}
        action={Common_uploadImgUrl}
        beforeUpload={beforeUpload}
        onChange={this.UploadImghandleChange.bind(this, imgNameKey)}
      >
        {this.state[`${imgNameKey}_local`] ? (
          <img src={this.state[`${imgNameKey}_local`]} alt="avatar" />
        ) : (
          <UploadButton showName={uploadPrompt} loading={loading} />
        )}
      </Upload>
    );
  }
}

export default UploadImg;
