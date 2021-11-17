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
    },
    split : {
      type : Boolean,
      default : true
    },
    dataSource : {
      type : Array,
      default () {
        return [];
      }
    },
    size : {
      type : String,
      default : 'default'
    },
    extra : {
      type : [String , Object],
      default : ''
    },
    loadMore : {
      type : [String , Array],
      default : ''
    }
  },
  methods : {
    getListItems (prefixCls) {
      const h = this.$createElement;
      const { dataSource , extra } = this.$props;
      const { renderItem } = this.$scopedSlots;
      let newChildren = [];
      for (let i = 0 ; i < dataSource.length ; i++) {
        let vnode = renderItem(dataSource[i] , i)[0];
        vnode.componentOptions.propsData = _extends({} , (vnode.componentOptions.propsData || {}) , {
          prefixCls : prefixCls,
          extra : extra
        });
        let newVnode = cloneVNode(vnode);
        newChildren.push(newVnode);
      }
      return h(
        'ul',
        {
          class : classNames(prefixCls + '-items')
        },
        newChildren
      )
    },
    renderHeader (prefixCls) {
      const header = this.$props.header || this.$slots.header;
      const h = this.$createElement;
      return header ? h(
        'div',
        {
          class : prefixCls + '-header'
        },
        [header]
      ) : null
    },
    renderFooter (prefixCls) {
      const footer = this.$props.footer || this.$slots.footer;
      const h = this.$createElement;
      return footer ? h(
        'div',
        {
          class : prefixCls + '-footer'
        },
        [footer]
      ) : null;
    },
    renderLoadMore (prefixCls) {
      const h =this.$createElement;
      const loadMore = this.$props.loadMore;
      console.log(loadMore)
      return loadMore ? h(
        'div',
        {
          class : classNames(prefixCls + '-load-more')
        },
        [loadMore]
      ) : null
    }
  },
  render () {
    const h = this.$createElement;
    const { size , prefixCls , border , split , extra , loadMore } = this.$props;
    const header = this.$props.header || this.$slots.header;
    const footer = this.$props.footer || this.$slots.footer;
    const needLastItemBorderBottom = !!extra || !!loadMore || !!this.$slots.extra || !!header || !!footer;
    return h(
      'div',
      {
        class : classNames(prefixCls , border ? prefixCls + '-border' : null , split ? prefixCls + '-split' : null , size ? prefixCls + '-' + size : null , needLastItemBorderBottom ? prefixCls + '-need-last-item-border-bottom' : null)
      },
      [
        this.renderHeader(prefixCls),
        this.getListItems(prefixCls),
        this.renderFooter(prefixCls),
        this.renderLoadMore(prefixCls)
      ]
    )
  }
}