const CaDrawer = {
  props : {
    closable : {
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
    }
  },
  mounted () {
    this.container = this.defaultGetContainer();
  },
  methods : {
    defaultGetContainer () {
      const props = this.$props;
      const getContainer = props.getContainer;
      let container;
      if (typeof getContainer === 'string') {
        container = document.querySelectorAll(getContainer)[0];
      } else {
        container = this.getContainer();
      };
      return container;
    },
    getChild () {
      const h = this.$createElement;
      const children = this.$slots['default'];
      return h(
        'div',

      )
    }
  },
  render (h) {
    const props = this.$props;
    if (!props.visible) {
      return null;
    }
    const children = this.getChild();
    let vnode = h('div' , this.$slots['default']);
    this.$nextTick(() => {
      if (this.container) {
        this.container.appendChild(vnode.elm);
      }
    })
    return vnode;
  }
};
export default CaDrawer;






















// import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
// import _defineProperty from '@babel/runtime/helpers/defineProperty';
// import _typeof from '@babel/runtime/helpers/typeof';
// import _extends from '@babel/runtime/helpers/extends';
// import classnames from 'classnames';
// import Vue from 'vue';
// import ref from 'vue-ref';
// import { IDrawerProps } from './IDrawerPropTypes';
// import baseMixin from '../utils/baseMixin';
// import Portal from '../utils/Portal';
// import { initDefaultProps , getEvents , getListeners } from '../utils/props';
// import { dataToArray, transitionEnd, transitionStr, addEventListener, removeEventListener, transformArguments, isNumeric } from './utils';

// function noop () {};

// let currentDrawer = {};
// let windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement);

// Vue.use(ref , {name : 'ca-ref'});
// const Drawer = {
//   mixins : [baseMixin],
//   props : initDefaultProps(IDrawerProps , {
//     prefixCls : 'drawer',
//     placement : 'left',
//     getContainer : 'body',
//     level : 'all',
//     duration : '0.3s',
//     ease : 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
//     firstEnter :false,
//     showMask : true,
//     handler : true,
//     maskStyle : {},
//     wrapperClassName : '',
//     className : ''
//   }),
//   data () {
//     this.levelDom = [];
//     this.contentDom = null;
//     this.maskDom = null;
//     this.handlerdom = null;
//     this.mousePos = null;
//     this.sFirstEnter = this.firstEnter;
//     this.timeout = null;
//     this.children = null;
//     this.drawerId = Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9))).toString(16);
//     let open = this.open !== undefined ? this.open : !!this.defaultOpen;
//     currentDrawer[this.drawerId] = open;
//     this.originalOpen = this.open;
//     this.preProps = _extends({} , this.$props);
//     return {
//       sOpen : open
//     }
//   },
//   watch : {
//     open (val) {
//       this.isOpenChange = true;
//       if (!this.container) {
//         this.getDefault(this.$props);
//       }
//       this.setState({
//         sOpen : val
//       });
//       this.preProps.open = val;
//     }
//   },
//   methods : {
//     getDefault (props) {
//       this.getParentAndLevelDom(props);
//       if (props.getContainer || props.parent) {
//         this.container = this.defaultGetContainer();
//       }
//     },
//     getSelfContainer: function getSelfContainer() {
//       return this.container;
//     },
//     defaultGetContainer: function defaultGetContainer() {
//       if (windowIsUndefined) {
//         return null;
//       }
//       var container = document.createElement('div');
//       this.parent.appendChild(container);
//       if (this.wrapperClassName) {
//         container.className = this.wrapperClassName;
//       }
//       return container;
//     },
//     getParentAndLevelDom: function getParentAndLevelDom(props) {
//       var _this3 = this;

//       if (windowIsUndefined) {
//         return;
//       }
//       var level = props.level,
//           getContainer = props.getContainer;

//       this.levelDom = [];
//       if (getContainer) {
//         if (typeof getContainer === 'string') {
//           var dom = document.querySelectorAll(getContainer)[0];
//           this.parent = dom;
//         }
//         if (typeof getContainer === 'function') {
//           this.parent = getContainer();
//         }
//         if ((typeof getContainer === 'undefined' ? 'undefined' : _typeof(getContainer)) === 'object' && getContainer instanceof window.HTMLElement) {
//           this.parent = getContainer;
//         }
//       }
//       if (!getContainer && this.container) {
//         this.parent = this.container.parentNode;
//       }
//       if (level === 'all') {
//         var children = Array.prototype.slice.call(this.parent.children);
//         children.forEach(function (child) {
//           if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== _this3.container) {
//             _this3.levelDom.push(child);
//           }
//         });
//       } else if (level) {
//         dataToArray(level).forEach(function (key) {
//           document.querySelectorAll(key).forEach(function (item) {
//             _this3.levelDom.push(item);
//           });
//         });
//       }
//     },
//     getOpen () {
//       return this.open !== undefined ? this.open : this.sOpen;
//     },
//     getChildToRender (open) {
//       let _classnames , _this5 = this;
//       let h = this.$createElement;
//       let _$props2 = this.$props,
//           className = _$props2.className,
//           prefixCls = _$props2.prefixCls,
//           placement = _$props2.placement,
//           showMask = _$props2.showMask,
//           handler = _$props2.handler,
//           maskStyle = _$props2.maskStyle,
//           width = _$props2.width,
//           height = _$props2.height,
//           wrapStyle = _$props2.wrapStyle,
//           keyboard = _$props2.keyboard,
//           maskClosable = _$props2.maskClosable;
//       let children = this.$slots['default'];
//       let wrapperClassname = classnames(prefixCls, (_classnames = {}, _defineProperty(_classnames, prefixCls + '-' + placement, true), _defineProperty(_classnames, prefixCls + '-open', open), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'no-mask', !showMask), _classnames));
//       let isOpenChange = this.isOpenChange;
//       let isHorizontal = placement === 'left' || placement === 'right';
//       let placementName = 'translate' + (isHorizontal ? 'X' : 'Y');
//       let placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
//       let transform = open ? '' : placementName + '('+ placementPos +')';
//       if (isOpenChange === undefined || isOpenChange) {
//         let contentValue = this.conetentDom ? this.contentDom.getBoundClientRect()[isHorizontal ? 'width' : 'height'] : 0;
//         let value = (isHorizontal ? width : height) || contentValue;
//         this.setLevelDomTransform(open , false , placementName , value);
//       };
//       let handlerChildren = void 0;
//       if (handler !== false) {

//       };
//       let domContProps = {
//         class : wrapperClassname,
//         directives : [{
//           name : 'ca-ref',
//           value (c) {
//             _this5.dom = c;
//           }
//         }],
//         on : {
//           transitionEnd : this.onWrapperTransitionEnd
//         },
//         style : wrapStyle
//       };
//       let direcitvesMaskDom = [{
//         name : 'ca-ref',
//         value (c) {
//           _this5.maskDom = c;
//         }
//       }];
//       let directivesContentWrapper = [{
//         name : 'ca-ref',
//         value (c) {
//           _this5.contentWrapper = c;
//         }
//       }];
//       let directivesContentDom = [{
//         name : 'ca-ref',
//         value (c) {
//           _this5.contentDom = c;
//         }
//       }];
//       return h(
//         'div',
//         domContProps,
//         [
//           showMask && h(
//             'div', 
//             {
//               class : prefixCls + '-mask',
//               on : {
//                 click : maskClosable ? this.onMaskTouchEnd : noop
//               },
//               style : maskStyle,
//               directives : direcitvesMaskDom
//             }
//           ),
//           h(
//             'div',
//             {
//               class : prefixCls + '-content-wrapper',
//               style : {
//                 transform : transform,
//                 width: isNumeric(width) ? width + 'px' : width,
//                 height: isNumeric(height) ? height + 'px' : height
//               },
//               directives : directivesContentWrapper
//             },
//             [
//               h(
//                 'div',
//                 {
//                   class : prefixCls + '-content',
//                   directives : directivesContentDom
//                 },
//                 [children]
//               )
//             ]
//           )
//         ]
//       )
//     },
//     onMaskTouchEnd (e) {
//       this.$emit('close' , e);
//       this.onTouchEnd(e , true);
//     },
//     onTouchEnd (e , close) {
//       if (this.open !== undefined) {
//         return;
//       }
//       let open = close || this.sOpen;
//       this.isOpenChange = true;
//       this.setState({
//         sOpen : !open
//       });
//     },
//     onWrapperTransitionEnd (e) {
//       if (e.target === this.contentWrapper && e.propertyName.match(/transform$/)) {
//         let _open2 = this.getOpen();
//         this.dom.style.transition = '';
//         if (!_open2 && this.getCurrentDrawerSome()) {
//           document.body.style.overflowX = '';
//           if (this.maskDom) {
//             this.maskDom.style.left = '';
//             this.maskDom.style.width = '';
//           }
//         };
//         if (this.afterVisibleChange) {
//           this.afterVisibleChange(!!_open2);
//         }
//       }
//     },
//     getCurrentDrawerSome () {
//       return !Object.keys(currentDrawer).some(key => {
//         return currentDrawer[key];
//       })
//     },
//     setLevelDomTransform (open , openTransition , placementName , value) {
//       let _this4 = this;
//       let _$props = this.$props,
//           placement = _$props.placement,
//           levelMove = _$props.levelMove,
//           duration = _$props.duration,
//           ease = _$props.ease,
//           getContainer = _$props.getContainer;
//       if (!windowIsUndefined) {
//         this.levelDom.forEach(dom => {
//           if (_this4.isOpenChange || openTransition) {
//             dom.style.transition = 'transform ' + duration + ' ' + ease;
//             addEventListener(dom, transitionEnd, _this4.trnasitionEnd);
//           }
//         })
//       }
//     },
//     transitionEnd (e) {
//       removeEventListener(e.target , transitionEnd , trnasitionEnd);
//       e.target.style.transition = '';
//     }
//   },
//   render () {
//     let _this6 = this;
//     let h = arguments[0];
//     let _$props3 = this.$props,
//         getContainer = _$props3.getContainer,
//         wrapperClassName = _$props3.wrapperClassName,
//         handler = _$props3.handler,
//         forceRender = _$props3.forceRender;
//     let open = this.getOpen();
//     let portal = null;
//     currentDrawer[this.drawerId] = open ? this.container : open;
//     let children = this.getChildToRender(this.sFirstEnter ? open : false);
//     if (!getContainer) {
//       let directives = [{
//         name : 'ca-ref',
//         value (c) {
//           _this6.container = c;
//         }
//       }];
//       return h(
//         'div',
//         {
//           class : wrapperClassName,
//           directives : directives
//         },
//         [children]
//       )
//     };
//     if (!this.container || !open && !this.sFirstEnter) {
//       return null;
//     };
//     if (open || this.dom) {
//       portal = h(Portal , {
//         attrs : {
//           getContainer : this.getSelfContainer,
//           children: children
//         }
//       });
//       return portal;
//     }
//   }
// };
// export default Drawer;

