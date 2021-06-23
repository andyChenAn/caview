let noop = function () {};
export default {
  props : {
    // 标题
    title : '',
    // 确认按钮的文本描述
    okText : '确认',
    // 取消按钮的文本描述
    cancelText : '取消',
    // 图标
    icon : '',
    // 点击取消按钮的回调
    cancel : {
      type : Function,
      default : noop
    },
    // 点击确认按钮的回调
    confirm : {
      type : Function,
      default : noop
    },
    // 显示与隐藏的回调
    visibleChange : {
      type : Function,
      default : noop
    },
    // 位置
    placement : {
      type : String,
      default : 'top'
    },
    // 是否显示气泡确认框
    visible : {
      type : Boolean,
      default : false
    },
    prefixCls : {
      type : String,
      default : 'ca-popover'
    }
  },
  render () {
    const h = this.$createElement;
    return this.$slots.default;
    //return this.$slots.default;
    //return h('div' , [ , 'sdfsf'])
  }
}