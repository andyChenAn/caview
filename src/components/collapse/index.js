const noop = function () {};
import _extends from '@babel/runtime/helpers/extends';
import Collapse from './collapse';
export default {
  props : {
    // 当前选中的面板key
    activeKey : {
      type : [String , Array],
      default : ''
    },
    // 是否带边框
    border : {
      type : Boolean,
      default : true
    },
    // 手风琴效果
    accordion : {
      type : Boolean,
      default : false
    },
    // 默认选中的面板key
    defaultActiveKey : {
      type : String,
      default : '0'
    },
    // 折叠与展开的图标
    expandIcon : {
      type : Function,
      default : noop
    },
    expandIconPosition : {
      type : String,
      default : 'left'
    }
  },
  model : {
    prop : 'activeKey',
    event : 'change'
  },
  render () {
    const h = this.$createElement;
    const collpaseProps = {
      props : _extends({} , this.$props)
    };
    let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '')
    return h(
      Collapse,
      collpaseProps,
      [children]
    )
  }
}