/**
 * 函数组件，主要用于render函数
 */
export default {
  functional : true,
  name : 'renderFn',
  props : {
    render : Function
  },
  render (h , context) {
    return context.props.render(h);
  }
}