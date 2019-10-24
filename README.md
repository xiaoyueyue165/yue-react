# yue-react-start

> Yue's react project shel

## 使用

- [ant-design](https://github.com/ant-design/ant-design)
- [Animated](https://github.com/animatedjs/animated)
- [redux](https://www.redux.org.cn/)

### 配置项目命令

```bash
yarn start // dev 模式
yarn build // pord 模式
yarn prettier // 格式化代码
yarn eslint // 检查所有js文件的代码
yarn eslint:html // 将检查结果写入一个网页文件./reports/lint-results.html
yarn eslint:fix // 自动修正某些不规范的代码
```

### 注意事项

- sass 最外层层级嵌套，避免全局样式冲突
- React-Router + history 路由跳转
  - `import { withRouter } from 'react-router-dom'; this.props.history.push("/index");`
- 动态设置 className

```js
// method 1
<div className={value.class + " " + value.class2}>{value.value}</div>
// method 2
<div className={this.setMineClassName(v, index)}
      // 动态设置 className
    setMineClassName = (v, index) => {
        return className
    }
// method 3
<div className={`LoadingBox center ${props.className}`}>
```

#### 参考链接

- [分享关于 React 组件规范化的一些建议](https://github.com/minooo/React-Study/issues/6) by [minooo](https://github.com/minooo)
- [mapStateToProps，mapDispatchToProps 的使用姿势](https://imweb.io/topic/5a426d32a192c3b460fce354)
- [使用 React 开发政府网站，还兼容了 IE8 的过程](https://github.com/jun-lu/blog/issues/51) / [青岛市居民健康信息服务平台](http://guahao.jkqd.gov.cn/#/index)
- [BEM](http://getbem.com/naming/)
- [React Router 4.x 开发，这些雷区我们都帮你踩过了](https://juejin.im/entry/5b50518bf265da0f6436c34a)
- [React-Router browserHistory 浏览器刷新出现页面 404 解决方案](https://www.thinktxt.com/react/2017/02/26/react-router-browserHistory-refresh-404-solution.html)
- [搭建自己的前端脚手架](https://github.com/senntyou/blogs/blob/master/web-advance/22.md)
