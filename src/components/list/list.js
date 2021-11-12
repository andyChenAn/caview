import _extends from "@babel/runtime/helpers/extends";
import classNames from "classnames";
export default {
  props : {
    header : {
      type : [String , Object],
      default : ''
    },
    footer : {
      type : [String , Object],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-list'
    },
    border : {
      type : Boolean,
      default : false
    }
  },
  methods : {
    getListItems (prefixCls) {
      const h = this.$createElement;
      let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
      let newChildren = [];
      children.forEach(child => {
        child.componentOptions.propsData = _extends({} , (child.componentOptions.propsData || {}) , {
          prefixCls : prefixCls
        })
        newChildren.push(child);
      });
      return h(
        'ul',
        {
          class : classNames(prefixCls + '-items')
        },
        newChildren
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , border } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls , border ? prefixCls + '-border' : null)
      },
      [this.getListItems(prefixCls)]
    )
  }
}