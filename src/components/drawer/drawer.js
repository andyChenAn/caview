const noop = function () {};
import classnames from 'classnames';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _extends from '@babel/runtime/helpers/extends';
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
  data () {
    this.firstEnter = this.visible;
    return {
      
    }
  },
  watch : {
    visible () {
      if (!this.container) {
        this.getDefault(this.$props);
      }
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
      let _classnames;
      const h = this.$createElement;
      const { prefixCls , mask , placement , maskClosable , maskStyle , width , height } = this.$props;
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
      return h(
        'div',
        {
          class : wrapClassName
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
                width : width + 'px'
              }
            }, 
            [
              h('div' , {
                class : prefixCls + '-content'
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
    console.log(children)
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
