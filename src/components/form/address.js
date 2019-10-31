import React, { Component } from 'react';
import { Select, message } from 'antd';
import fetch from '../../utils/fetch';
import API from '../../utils/api';

const { Option } = Select;

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityArr: [],
      areaArr: [],
      streetArr: [],
      province_id: '', // 省id
      city_id: '', // 市id
      area_id: '', // 区县id
      street_id: '', // 街id
    };
  }

  componentDidMount() {
    this._getAddress(null, 'provinceArr');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(
      nextState.province_id ||
      nextState.provinceArr ||
      nextState.city_id ||
      nextState.area_id
    );
  }

  _getAddress(id, key) {
    const param = id ? { pid: id } : {};
    fetch.post(`/api/${API.areaList}`, param).then(res => {
      if (res.data.error_msg) {
        message.error(res.data.error_msg);
        return;
      }
      this.setState({
        [key]: res.data.response_data.lists,
      });
    });
  }

  // 选择市
  handleGetCity = (id, that) => {
    this.setState({
      province_id: id,
      province_name: that.props.children,
    });
    this._getAddress(id, 'cityArr');
  };

  // 选择区
  handleSelectArea = (id, that) => {
    this.setState({
      city_id: id,
      city_name: that.props.children,
    });
    this._getAddress(id, 'areaArr');
  };

  // 选择街道
  handleSelectStreet = (id, that) => {
    this.setState({
      area_id: id,
      area_name: that.props.children,
    });

    this._getAddress(id, 'streetArr');
  };

  // 设置街道
  handleGetStreetingId = (id, that) => {
    this.setState({
      street_id: id,
      street_name: that.props.children,
    });
    const { province_name, city_name, area_name } = this.state;
    const addressInfo = {
      province_name,
      city_name,
      area_name,
      street_name: that.props.children,
    };
    console.log('地址名称信息', addressInfo);
    const addressInfo_result = JSON.stringify(addressInfo);

    const { province_id, city_id, area_id } = this.state;
    this.props.onPubAddressMsg({
      province_id,
      city_id,
      area_id,
      street_id: id,
      addressInfo: addressInfo_result,
    });
  };

  render() {
    const { provinceArr, cityArr, areaArr, streetArr } = this.state;

    if (!provinceArr) {
      return '';
    }
    // 已有选中的地址信息，编辑模式
    let placeholderShow;

    const showDefaultValue = key => {
      const valus = {};
      if (this.props.placeholder) {
        placeholderShow = JSON.parse(this.props.placeholder);
        valus.defaultValue = placeholderShow[key];
        return valus;
      }
      return valus;
    };
    const styles = {
      width: 120,
      height: 38,
      marginRight: 10,
      marginBottom: 20,
    };

    const provinceArr_children = (
      <Select
        placeholder="选择省"
        {...showDefaultValue('province_name')}
        className={this.props.className}
        style={{ ...styles }}
        onChange={this.handleGetCity}
      >
        {provinceArr.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    );

    const noData = (
      <Select>
        <Option />{' '}
      </Select>
    );
    return (
      <>
        {provinceArr_children}
        {/* 选择市 */}
        {cityArr ? (
          <Select
            placeholder="选择市"
            {...showDefaultValue('city_name')}
            className={this.props.className}
            style={{ ...styles }}
            onChange={this.handleSelectArea}
          >
            {cityArr.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        ) : (
          noData
        )}
        {/* 选择区 */}
        {areaArr ? (
          <Select
            placeholder="选择区"
            {...showDefaultValue('area_name')}
            className={this.props.className}
            style={{ ...styles }}
            onChange={this.handleSelectStreet}
          >
            {areaArr.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        ) : (
          noData
        )}

        {streetArr ? (
          <Select
            placeholder="选择街道"
            {...showDefaultValue('street_name')}
            className={this.props.className}
            style={{ ...styles }}
            onChange={this.handleGetStreetingId}
          >
            {streetArr.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        ) : (
          noData
        )}
      </>
    );
  }
}

export default Address;
