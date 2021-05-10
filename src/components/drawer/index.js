import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _extends from '@babel/runtime/helpers/extends';
import classnames from 'classnames';
import omit from 'omit.js';
import VcDrawer from './drawer';
import baseMixin from '../utils/baseMixin';
import PropTypes from '../utils/vue-types';
import { getOptionProps , getComponentFromProp , getListeners } from '../utils/props';
const Drawer = {
  name : 'Drawer',
  props : {
    closable : PropTypes.bool.def(true),
    destroyOnClose : PropTypes.bool,
    getContainer : PropTypes.any,
    maskClosable : PropTypes.bool.def(true),
    mask : PropTypes.bool.def(true),
    maskStyle : PropTypes.object,
    wrapStyle : PropTypes.object,
    bodyStyle : PropTypes.object,
    headerStyle : PropTypes.object,
    drawerStyle : PropTypes.object,
    title : PropTypes.any,
    visible : PropTypes.bool,
    width : PropTypes.oneOfType([PropTypes.string , PropTypes.number]).def(256),
    height : PropTypes.oneOfType([PropTypes.string , PropTypes.number]).def(256),
    zIndex : PropTypes.number,
    prefixCls : PropTypes.string,
    placement : PropTypes.oneOf(['top' , 'bottom' , 'left' , 'right']).def('right'),
    level : PropTypes.any.def(null),
    wrapClassName : PropTypes.string,
    handle : PropTypes.any,
    afterVisibleChange : PropTypes.func,
    keyboard : PropTypes.bool.def(true)
  },
  mixins : [baseMixin],
  data () {
    this.destroyClose = false;
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
    let visible = this.visible;
    if (visible && this.parentDrawer) {
      this.parentDrawer.push();
    }
  },
  methods : {
    push () {
      this.setState({
        _push : true
      })
    },
    getDestroyOnClose () {
      return this.destroyClose && !this.visible;
    },
    onDestroyTransitionEnd () {
      let isDestroyOnClose = this.getDestroyOnClose();
      if (!isDestroyOnClose) {
        return;
      }
      if (!this.visible) {
        this.destroyClose = true;
        this.$forceUpdate();
      }
    },
    renderHeader (prefixCls) {
      let h = this.$createElement;
      let _$props2 = this.$props,
          closable = _$props2.closable,
          headerStyle = _$props2.headerStyle;
      let title = getComponentFromProp(this , 'title');
      // 如果没有title并且不显示关闭按钮
      if (!title && !closable) {
        return null;
      }
      let headerClassName = title ? prefixCls + '-header' : prefixCls + '-header-no-title';
      return h(
        'div',
        {
          class : headerClassName,
          style : headerStyle
        },
        [
          title && h(
            'div',
            {class : prefixCls + '-title'},
            [title]
          ),
          closable ? this.renderCloseIcon(prefixCls) : null
        ]
      )
    },
    renderCloseIcon (prefixCls) {
      let h = this.$createElement;
      let closable = this.closable;
      return closable && h('i' , {
        class : 'iconfont icon-remove ' + prefixCls + '-remove',
        on : {
          click : this.close
        }
      })
    },
    close (e) {
      this.$emit('close' , e)
    },
    renderBody (prefixCls) {
      let h = this.$createElement;
      if (this.destroyClose && !this.visible) {
        return null;
      };
      this.destroyClose = false;
      let _$props3 = this.$props,
          bodyStyle = _$props3.bodyStyle,
          drawerStyle = _$props3.drawerStyle;
  
      let containerStyle = {};
      
      let isDestroyOnClose = this.getDestroyOnClose();
      if (isDestroyOnClose) {
        containerStyle.opacity = 0;
        containerStyle.transition = 'opacity .3s';
      }
      return h(
        'div',
        {
          class : prefixCls + '-wrapper-body',
          style : _extends({} , containerStyle , drawerStyle),
          on : {
            transitionend : this.onDestroyTransitionEnd
          }
        },
        [
          this.renderHeader(prefixCls)
        ]
      )
    },
    getRcDrawerStyle () {
      let _$props = this.$props,
          zIndex = _$props.zIndex,
          placement = _$props.placement,
          wrapStyle = _$props.wrapStyle;
      let push = this.$data._push;
      return _extends({
        zIndex : zIndex,
        transform : push ? this.getPushTransform(placement) : undefined
      } , wrapStyle)
    },
    getPushTransform (placement) {
      if (placement === 'left' || placement === 'right') {
        return 'transformX('+ (placement === 'left' ? 180 : -180) +'px)'
      };
      if (placement === 'top' || placement === 'bottom') {
        return 'transformY('+ (placement === 'top' ? 180 : -180) +'px)';
      }
    }
  },
  render () {
    let _classnames;
    let h = arguments[0];
    let props = getOptionProps(this);
    let customizePrefixCls = props.prefixCls,
        width = props.width,
        height = props.height,
        visible = props.visible,
        placement = props.placement,
        wrapClassName = props.wrapClassName,
        mask = props.mask,
        rest = _objectWithoutProperties(props , ['prefixCls', 'width', 'height', 'visible', 'placement', 'wrapClassName', 'mask'])
    let haveMask = mask ? '' : 'no-mask';
    let offsetStyle = {};
    let prefixCls = 'drawer';
    if (placement == 'left' || placement == 'right') {
      offsetStyle.width = typeof width == 'number' ? width + 'px' : width;
    } else {
      offsetStyle.height = typeof height == 'number' ? height + 'px' : height;
    };
    let handler = getComponentFromProp(this , 'handle');
    let vcDrawerProps = {
      props : _extends({} , omit(rest , ['closable', 'destroyOnClose', 'drawerStyle', 'headerStyle', 'bodyStyle', 'title', 'push', 'visible', 'getPopupContainer', 'rootPrefixCls', 'getPrefixCls', 'renderEmpty', 'csp', 'pageHeader', 'autoInsertSpaceInButton']) , {
        handler : handler
      } , offsetStyle , {
        prefixCls : prefixCls,
        open : visible,
        showMask : mask,
        placement : placement,
        className : classnames((_classnames = {}, _defineProperty(_classnames, wrapClassName, !!wrapClassName), _defineProperty(_classnames, haveMask, !!haveMask), _classnames)),
        wrapStyle : this.getRcDrawerStyle()
      }),
      on: _extends({}, getListeners(this))
    };
    return h(
      VcDrawer,
      vcDrawerProps,
      [this.renderBody(prefixCls)]
    )
  }
};
export default Drawer;