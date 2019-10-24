function ImgTextWrapHOC(WrappedComponent, someProps) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }

    render() {
      // 用容器包裹输入组件，不要修改它，漂亮！
      return <WrappedComponent {...this.props} {...someProps} />;
    }
  };
}
export default ImgTextWrapHOC;
