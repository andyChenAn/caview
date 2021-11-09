const noop = function () {};
import _extends from '@babel/runtime/helpers/extends';
import _toArray from '@babel/runtime/helpers/toArray';
import classNames from 'classnames';
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
    },
    prefixCls : {
      type : String,
      default : 'ca-collapse'
    }
  },
  data () {
    const { defaultActiveKey , activeKey } = this.$props;
    let currentActiveKey = activeKey || defaultActiveKey; 
    currentActiveKey = _toArray(currentActiveKey);
    return {
      currentActiveKey
    }
  },
  watch : {
    activeKey (newVal) {
      this.currentActiveKey = _toArray(newVal);
    }
  },
  methods : {
    getCollapseItems () {
      let newChildren = [];
      const { accordion , prefixCls } = this.$props;
      let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
      children.forEach((child , index) => {
        let key = child.key || String(index);
        let isActive = false;
        if (accordion) {
          isActive = this.currentActiveKey[0] === key;
        } else {
          isActive = this.currentActiveKey.indexOf(key) > -1;
        };
        child.componentOptions.propsData = _extends({} , child.componentOptions.propsData , {
          isActive : isActive,
          prefixCls : prefixCls,
          panelKey : key
        });
        child.componentOptions.listeners = _extends({} , child.componentOptions.listeners , {
          itemClick : this.onClickItem
        });
        child = cloneVNode(child);
        newChildren.push(child);
      });
      return newChildren;
    },
    onClickItem (key) {
      const { accordion } = this.$props;
      if (accordion) {
        this.currentActiveKey = this.currentActiveKey[0] === key ? [] : [key];
      }
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , expandIconPosition } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls , prefixCls + '-' + expandIconPosition)
      },
      [this.getCollapseItems()]
    )
  }
}