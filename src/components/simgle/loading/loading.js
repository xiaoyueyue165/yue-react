import React from 'react';
import { Spin } from 'antd';
import './style.scss';

const Loading = props => (
  <div className={`LoadingBox center ${props.className}`}>
    <Spin size={props.size} />
  </div>
);

Loading.propTypes = {};

export default Loading;
