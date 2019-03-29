# yue-react-start
> Yue's react project shel

## 使用

- [ant-design](https://github.com/ant-design/ant-design)
- [Animated](https://github.com/animatedjs/animated)
- [redux](https://www.redux.org.cn/)

## 代码规范

  + constructor
  + static propTypes 
  + 组件生命周期方法
  + `_`开头设为单个class内私有方法
  + `onPub`来自子组件的发布 / `onSub`来自父组件的订阅
  + `handle*`事件监听方法
  + `render*`渲染逻辑修改
  + render() 方法
  
## 注意事项
-  sass最外层层级嵌套，避免全局样式冲突
- React-Router + history
  + `this.props.history.push()`路由跳转时报错
````js
import { withRouter } from 'react-router-dom';
...
   handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push("/payFor");
    }
    ...
export default withRouter(XXX);
````
- 组件更新优化(父组件 setState 带动子组件重新 render，需要优化)
````js
 shouldComponentUpdate(nextProps, nextState) {
    return something ? true :false;
    }
````
- 事件冒泡处理
````js
 // 文章详情
    onToDetail = (id, key, e) => {
        if (e.target.nodeName !== 'BUTTON') {
           ...
            // 详情页跳转
            this.props.history.push('/qiyeServices/serviceTab8/detail')
            })
        }
    }
    // 收藏
    handleCollect = (article_id, type, e) => {
        if (e.target.nodeName === 'BUTTON') {
          ... 
          // actions
        }
````
- 图片占满盒子布局，使用背景
````css
/* 100%适应宽的图片 */
.coverImg {
  display: block;
  height: 100% !important;
  width: 100% !important;
  -webkit-background-size: cover;
  background-size: cover !important;
  background-repeat: no-repeat;
  background-position: center;
}
````
````js
// use
  <div className="coverImg" style={{ backgroundImage: 'url(' + item.img_url + ')' }} ></div>
````

- 动态className
````js
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
 ````

## 参考链接

- [分享关于React组件规范化的一些建议](https://github.com/minooo/React-Study/issues/6) by [minooo](https://github.com/minooo)
- [mapStateToProps，mapDispatchToProps的使用姿势](https://imweb.io/topic/5a426d32a192c3b460fce354)
- [使用React开发政府网站，还兼容了IE8的过程](https://github.com/jun-lu/blog/issues/51) / [青岛市居民健康信息服务平台](http://guahao.jkqd.gov.cn/#/index)
- [BEM](http://getbem.com/naming/)
- [React Router 4.x 开发，这些雷区我们都帮你踩过了](https://juejin.im/entry/5b50518bf265da0f6436c34a)
- [React-Router browserHistory浏览器刷新出现页面404解决方案](https://www.thinktxt.com/react/2017/02/26/react-router-browserHistory-refresh-404-solution.html)
