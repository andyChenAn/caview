const noop = function () {};
import classnames from 'classnames';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _extends from '@babel/runtime/helpers/extends';
import ref from 'vue-ref';
import Vue from 'vue';
Vue.use(ref , {name : 'ca-ref'});
const CaDrawer = {
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
    this.firstEnter = this.visible;
    this.contentDom = null;
    this.maskDom = null;
    this.preProps = _extends({} , this.$props);
    return {
      
    }
  },
  watch : {
    visible (newVal) {
      if (newVal !== undefined && newVal !== this.preProps.open) {
        this.isOpen = true;
        if (!this.container) {
          this.getDefault(this.$props);
        }
      };
      this.preProps.open = newVal;
    }
  },
  updated () {
    this.$nextTick(() => {
      if (!this.firstEnter && this.container) {
        this.$forceUpdate();
        this.firstEnter = true;
      }
    })
  },
  methods : {
    maskClose () {
      this.$emit('close');
    },
    getDefault (props) {
      this.getParent(props);
      if (props.getContainer) {
        this.container = this.getDefaultContainer();
      }
    },
    getDefaultContainer () {
      let container = document.createElement('div');
      this.parent.appendChild(container);
      return container;
    },
    setBodyStyle () {
      const getContainer = this.$props.getContainer;
      if (getContainer === 'body') {
        if (this.firstEnter && document.body.style.overflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
        };
      }
    },
    onTransitionend () {
      if (!this.visible) {
        document.body.style.overflow = '';
      }
    },
    getParent (props) {
      const getContainer = props.getContainer;
      if (typeof getContainer === 'string') {
        let dom = document.querySelectorAll(getContainer)[0];
        this.parent = dom;
      }
      if (typeof getContainer === 'function') {
        this.parent = getContainer();
      }
      if (typeof getContainer === 'object' && getContainer instanceof HTMLElement) {
        this.parent = getContainer
      };
      if (!getContainer && this.container) {
        this.parent = this.container.parentNode;
      }
    },
    getChild (open) {
      const self = this;
      let _classnames;
      const h = this.$createElement;
      const { 
        prefixCls , 
        mask , 
        placement , 
        maskClosable , 
        maskStyle , 
        width , 
        height ,
        wrapStyle
      } = this.$props;
      const children = this.$slots['default'];
      const wrapClassName = classnames(
        prefixCls,
        (
          _classnames = {},
          _defineProperty(_classnames , prefixCls + '-' + placement , true),
          _defineProperty(_classnames , prefixCls + '-open' , open)
        )
      );
      const isHorizontal = placement === 'left' || placement === 'right';
      const placementName = 'translate' + (isHorizontal ? 'X' : 'Y');
      const placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
      const transform = open ? '' : placementName + '(' + placementPos + ')';
      if (this.isOpen === undefined || this.isOpen) {
        // 这里获取内容的位置信息，目的是为了浏览器重绘，这样就避免第一次点击的时候，抽屉没有过渡动画效果
        this.contentDom && this.contentDom.getBoundingClientRect();
        // 设置body样式
        this.setBodyStyle();
      }
      const directivesContentDom = [{
        name : 'ca-ref',
        value (c) {
          self.contentDom = c;
        }
      }];
      return h(
        'div',
        {
          class : wrapClassName,
          style : wrapStyle
        },
        [
          mask && h('div' , {
            class : prefixCls + '-mask',
            on : {
              click : maskClosable ? this.maskClose : noop
            },
            style : maskStyle
          }),
          h(
            'div', 
            {
              class : prefixCls + '-content-wrap',
              style : {
                transform : transform,
                width : width + 'px',
                height : height + 'px'
              },
              on : {
                transitionend : this.onTransitionend
              }
            },
            [
              h('div' , {
                class : prefixCls + '-content',
                directives : directivesContentDom
              } , [children])
            ]
          )
        ]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const children = this.getChild(this.firstEnter ? this.visible : false);
    if (!this.container || !this.visible && !this.firstEnter) {
      return null;
    };
    return h('div' , {
      directives : [{
        name : 'ca-portal',
        value : this.container
      }]
    } , [children]);
  }
};
export default CaDrawer;
