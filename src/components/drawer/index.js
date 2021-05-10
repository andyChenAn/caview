import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _extends from '@babel/runtime/helpers/extends';
import classnames from 'classnames';
import omit from 'omit.js';
import VcDrawer from './drawer';
import baseMixin from '../utils/baseMixin';
import PropTypes from '../utils/vue-types';
import { getOptionProps , getComponentFromProp } from '../utils/props';
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
        prefixCls : 'drawer-',
        open : visible,
        showMask : mask,
        placement : placement,
        className : classnames((_classnames = {}, _defineProperty(_classnames, wrapClassName, !!wrapClassName), _defineProperty(_classnames, haveMask, !!haveMask), _classnames)),
      }),
      
    };
    return null;
  }
};
export default Drawer;