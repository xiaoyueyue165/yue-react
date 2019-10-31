import React, { Component } from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
// use ag: simglePublishJianLi
class Sex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSex: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 自身组件更改再更新
    return !!(nextState.changeSex || nextProps.defaultSex);
  }

  /**
   * 修改性别 踩坑  https://github.com/ant-design/ant-design/issues/11693
   * @param {*} intro
   */
  onChangeSex = e => {
    this.setState({
      changeSex: e.target.value,
      defaultSex: e.target.value,
    });
    this.props.getResultSex(e.target.value);
  };

  render() {
    // console.log('sex render...');

    const { changeSex } = this.state;
    const { defaultSex } = this.props;
    return (
      <>
        <RadioGroup
          className={this.props.className}
          onChange={this.onChangeSex}
          value={changeSex || defaultSex}
        >
          <Radio value="1" defaultChecked>
            男
          </Radio>
          <Radio value="2">女</Radio>
        </RadioGroup>
      </>
    );
  }
}

export default Sex;
