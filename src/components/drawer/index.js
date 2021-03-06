
import CaDrawer from './drawer';
import _extends from '@babel/runtime/helpers/extends';
import propDefine from './propDefine';
const Drawer = {
  name : 'Drawer',
  props : propDefine,
  data () {
    this.preVisible = this.$props.visible;
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
      if (this.preVisible !== this.visible && this.parentDrawer) {
        if (this.visible) {
          this.parentDrawer.push();
        } else {
          this.parentDrawer.pull();
        }
      }
      this.preVisible = this.visible;
    })
  },
  methods : {
    push () {
      // 这里需要注意的我们不能直接this._push = true
      this.$data._push = true;
    },
    pull () {
      // 这里需要注意的我们不能直接this._push = false
      this.$data._push = false;
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
      const headerClass = title ? prefixCls + '-header' : prefixCls + '-no-title-header';
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
        transform : this.$data._push ? this.getTransform(placement) : ''
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