/**
 * 渲染通知提示组件中的按钮
 */
export default {
  name : 'renderBtn',
  functional : true,
  props : {
    render : Function
  },
  render (h , context) {
    return h('div' , {
      class : 'btn-box'
    } , [context.props.render(h)]);
  }
}