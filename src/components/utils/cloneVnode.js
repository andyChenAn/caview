// 调用这个方法的目的是为了克隆一个新的vnode，不然的话通过propsData传递的数据，当数据发生变化时，组件不会更新
// 该方法来自ant-vue-design
import _extends from "@babel/runtime/helpers/extends";
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
export default cloneVNode;