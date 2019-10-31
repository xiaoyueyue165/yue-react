import React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import './style.scss';

const Bookmark = withRouter(props => {
  //    面包屑展示路由数据
  const breadcrumbNameMap = props.routes;
  // const breadcrumbNameMap = {
  //     '/jianLiKu': '简历库',
  //     '/jianLiKu/publish': '发布'
  // };

  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  // 当前渲染添加的面包屑
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  // 首页
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <div className="Bookmark_wrap response_container">
      <div className="bookmark_content onLineStart">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
    </div>
  );
});

export default Bookmark;
