import _extends from "@babel/runtime/helpers/extends";
import classNames from "classnames";
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-list'
    }
  },
  methods : {
    getListItemMeta (prefixCls) {
      let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
      let newChildren = [];
      children.forEach(child => {
        child.componentOptions.propsData = _extends({} , (child.componentOptions.propsData || {}) , {
          prefixCls : prefixCls
        });
        newChildren.push(child);
      });
      return newChildren;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'li',
      {
        class : classNames(prefixCls + '-item')
      },
      [this.$slots.default]
    )
  }
}