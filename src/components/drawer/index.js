
import CaDrawer from './drawer';
import _extends from '@babel/runtime/helpers/extends';
import omit from 'omit.js';
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
      default : () => {}
    },
    title : '',
    visible : {
      type : Boolean,
      default : false
    },
    width : {
      type : [String , Number],
      default : 256
    },
    height : {
      type : [String , Number],
      default : 256
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
      default : () => {}
    },
    headerStyle : {
      type : Object,
      default : () => {}
    }
  },
  methods : {
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
    }
  },
  render (h) {
    const props = this.$props;
    const prefixCls = props.prefixCls || 'ca-drawer';
    const CaDrawerProps = {
      props : props,
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