import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

class Sex extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      ageRange: '',
      placeholder: '请选择',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 自己更改 state 再render
    // console.log("nextProps", nextProps);

    return !!(
      nextState.ageRange || nextProps.defaultSex !== this.props.defaultSex
    );
  }

  handleChangeAgeRange = (ageRange, that) => {
    this.setState({
      ageRange,
    });
    this.triggerChange({ ageRange });
    this.props.onGetAgeRange(ageRange);
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...this.state, ...changedValue });
    }
  };

  renderAgeRange = key => {
    switch (key) {
      case '1':
        return '18-25';
      case '2':
        return '25-30';
      case '3':
        return '30-35';
      case '4':
        return '35-40';
      case '':
        return '35-40';
      default:
        return '没有匹配项';
    }
  };

  render() {
    // 显示文字提示
    const { placeholder, ageRange } = this.state;
    const placeholderShow = this.props.placeholder || placeholder;
    const { defaultSex } = this.props;
    let defaultRange = null;
    // 编辑，反向操作时，根据 defaultIndex 确定选择哪一个
    // 默认选中的年龄
    const values = {};
    if (this.props.defaultIndex) {
      defaultRange = this.renderAgeRange(this.props.defaultIndex);
      values.value = ageRange || defaultRange;
    }
    // value={defaultRange ? defaultRange : this.state.ageRange}
    const man = (
      <Select
        placeholder={placeholderShow}
        {...values}
        className={this.props.className}
        style={{ width: 120 }}
        onChange={this.handleChangeAgeRange}
      >
        <Option key="0" value="1">
          18-25
        </Option>
        <Option key="1" value="2">
          25-30
        </Option>
        <Option key="2" value="3">
          30-35
        </Option>
        <Option key="3" value="4">
          35-40
        </Option>
        <Option key="4" value="5">
          41-50
        </Option>
        <Option key="5" value="6">
          51-60
        </Option>
      </Select>
    );

    const woman = (
      <Select
        placeholder={placeholderShow}
        {...values}
        className={this.props.className}
        style={{ width: 120 }}
        onChange={this.handleChangeAgeRange}
      >
        <Option key="0" value="1">
          18-25
        </Option>
        <Option key="1" value="2">
          25-30
        </Option>
        <Option key="2" value="3">
          30-35
        </Option>
        <Option key="3" value="4">
          35-40
        </Option>
        <Option key="4" value="5">
          41-50
        </Option>
      </Select>
    );
    return <>{defaultSex === '1' ? man : woman}</>;
  }
}

export default Sex;
