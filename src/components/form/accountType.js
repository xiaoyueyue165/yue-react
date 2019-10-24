import React, { Component } from 'react';
import { Select } from 'antd';
import fetch from '../../utils/fetch';
import API from '../../utils/api';

const { Option } = Select;

class AccountType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: '',
      placeholder: '请选择', // 默认显示
    };
  }

  componentWillMount() {
    this._getAccountType();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     return nextState.accountType ? true : false;
  // }
  _getAccountType() {
    fetch.post(`/api/${API.accountype}`, {}).then(res => {
      if (res.data.error_msg) {
        message.error(res.data.error_msg);
        return;
      }
      this.setState({
        accountTypes: res.data.response_data.lists,
      });
    });
  }

  handleChangeAccountType = value => {
    this.setState({
      accountType: value,
    });
    this.props.onPubAccountType(value);
  };

  render() {
    const { accountTypes, placeholder } = this.state;
    let children;
    // 显示文字提示
    const placeholderShow = this.props.placeholder || placeholder;
    if (!accountTypes) {
      return '';
    }
    // 有默认选中的，应对编辑选择默认的
    if (this.props.defaultId) {
      children = (
        <Select
          placeholder={placeholderShow}
          value={this.props.defaultId}
          className={this.props.className}
          style={{ width: 120 }}
          onChange={this.handleChangeAccountType}
        >
          {accountTypes.map(item => (
            <Option key={item.id} value={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      );
    } else {
      // 无初始值
      children = (
        <Select
          placeholder={placeholderShow}
          className={this.props.className}
          style={{ width: 120 }}
          onChange={this.handleChangeAccountType}
        >
          {accountTypes.map(item => (
            <Option key={item.id} value={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      );
    }

    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default AccountType;
