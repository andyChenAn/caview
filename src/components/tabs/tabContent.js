import _extends from "@babel/runtime/helpers/extends";
import classNames from "classnames";
function cloneVNode(vnode) {
  var componentOptions = vnode.componentOptions;
  var data = vnode.data;
  var listeners = {};
  if (componentOptions && componentOptions.listeners) {
    listeners = _extends({}, componentOptions.listeners);
  }
  var on = {};
  if (data && data.on) {
    on = _extends({}, data.on);
  }
  var cloned = new vnode.constructor(vnode.tag, data ? _extends({}, data, { on: on }) : data, vnode.children, vnode.text, vnode.elm, vnode.context, componentOptions ? _extends({}, componentOptions, { listeners: listeners }) : componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned;
}
export default {
  props : {
    prefixCls : String,
    activeKey : String,
    activeIndex : Number,
    animate : Boolean
  },
  render () {
    const { prefixCls , activeKey } = this.$props;
    const { animate } = this.$props;
    const h = this.$createElement;
    const children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
    let newChildren = [];
    children.map(child => {
      child.componentOptions.propsData = _extends({} , (child.componentOptions.propsData || {}) , {
        prefixCls : prefixCls,
        paneKey : child.key,
        currentKey : activeKey
      });
      child = cloneVNode(child);
      newChildren.push(child);
    });
    let style = {};
    if (animate) {
      style = {
        transform : `translate3d(-${this.activeIndex * 100}% , 0px , 0px)`
      }
    }
    return h(
      'div',
      {
        class : classNames(prefixCls + '-content' , animate ? prefixCls + '-content-animate' : prefixCls + '-content-no-animate'),
        style : style
      },
      [newChildren]
    )
  }
}