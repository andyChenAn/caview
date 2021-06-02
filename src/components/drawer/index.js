
import CaDrawer from './drawer';
import _extends from '@babel/runtime/helpers/extends';
const Drawer = {
  name : 'Drawer',
  props : {
    closable : {
      type : Boolean,
      default : true
    },
    maskClosable : {
      type : Boolean,
      default : true
    },
    getContainer : {
      type : [String , Function],
      default : 'body'
    },
    mask : {
      type : Boolean,
      default : true
    },
    maskStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    title : '',
    visible : {
      type : Boolean,
      default : false
    },
    width : {
      type : [String , Number],
      default : ''
    },
    height : {
      type : [String , Number],
      default : ''
    },
    placement : {
      type : String,
      default : 'right'
    },
    zIndex : {
      type : [String , Number],
      default : 100
    },
    prefixCls : {
      type : String,
      default : 'ca-drawer'
    },
    bodyStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    headerStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    // 抽屉最外层样式
    wrapStyle : {
      type : Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      _push : false
    }
  },
  inject : {
    parentDrawer : {
      default () {
        return null;
      }
    }
  },
  provide () {
    return {
      parentDrawer : this
    }
  },
  mounted () {
    if (this.visible && this.parentDrawer) {
      this.parentDrawer.push();
    }
  },
  updated () {
    this.$nextTick(() => {
      if (this.parentDrawer) {
        if (this.visible) {
          this.parentDrawer.push();
        } else {
          this.parentDrawer.pull();
        }
      }
    })
  },
  methods : {
    push () {
      this._push = true;
    },
    pull () {
      this._push = false;
    },
    renderBody (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : prefixCls + '-wrap-body'
        },
        [
          this.renderHeader(prefixCls),
          this.renderContent(prefixCls)
        ]
      )
    },
    renderHeader (prefixCls) {
      const h = this.$createElement;
      const props = this.$props;
      const closable = props.closable;
      const headerStyle = props.headerStyle;
      const title = props.title || this.$slots['title'];
      if (!title && !closable) {
        return null;
      }
      const headerClass = title ? prefixCls + '-header' : prefixCls + 'no-title-header';
      return h(
        'div',
        {
          class : headerClass,
          style : headerStyle
        },
        [
          title && h(
            'div',
            {class : prefixCls + '-title'},
            [title]
          ),
          closable ? this.renderCloseBtn(prefixCls) : null
        ]
      )
    },
    renderCloseBtn (prefixCls) {
      const h = this.$createElement;
      const closable = this.closable;
      return closable && h('i' , {
        class : 'iconfont icon-remove ' + prefixCls + '-close',
        on : {
          click : this.close
        }
      })
    },
    renderContent (prefixCls) {
      const h = this.$createElement;
      const props = this.$props;
      const bodyStyle = props.bodyStyle;
      return h(
        'div',
        {
          class : prefixCls + '-body',
          style : bodyStyle
        },
        [this.$slots['default']]
      )
    },
    close () {
      this.$emit('close');
    },
    getDrawerStlye () {
      const props = this.$props;
      const wrapStyle = props.wrapStyle;
      const placement = props.placement;
      const zIndex = props.zIndex;
      return _extends({
        zIndex,
        transform : this._push ? this.getTransform(placement) : ''
      } , wrapStyle);
    },
    getTransform (placement) {
      if (placement === 'left' || placement === 'right') {
        return 'translateX(' + (placement === 'left' ? 180 : -180) + 'px)';
      }
      if (placement === 'top' || placement === 'bottom') {
        return 'translateY(' + (placement === 'top' ? 180 : -180) + 'px)';
      }
    }
  },
  render (h) {
    const props = this.$props;
    const prefixCls = props.prefixCls || 'ca-drawer';
    const CaDrawerProps = {
      props : {
        ...props,
        wrapStyle : this.getDrawerStlye()
      },
      on : {
        close : this.close
      }
    }
    return h(
      CaDrawer,
      CaDrawerProps,
      [this.renderBody(prefixCls)]
    )
  }
};
export default Drawer;