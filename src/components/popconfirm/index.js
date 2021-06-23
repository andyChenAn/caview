import classnames from 'classnames';
import _extends from '@babel/runtime/helpers/extends';
import Popconfirm from './popconfirm';
export default {
  name: 'Popconfirm',
  props: {
    // 标题
    title: '',
    // 确认按钮的文本描述
    okText: '确认',
    // 取消按钮的文本描述
    cancelText: '取消',
    // 图标
    icon: '',
    // 点击取消按钮的回调
    cancel: Function,
    // 点击确认按钮的回调
    confirm: Function,
    // 显示与隐藏的回调
    visibleChange: Function,
    // 位置
    placement: {
      type: String,
      default: 'top'
    },
    // 是否显示气泡确认框
    visible: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'ca-popover'
    }
  },
  render() {
    const h = this.$createElement;
    const props = this.$props;
    const popconfirmProps = _extends({}, props);
    return h(Popconfirm, {
      props: popconfirmProps,
    }, [this.$slots.default])
  }
}