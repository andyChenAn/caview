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
    open : {
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
  data () {
    this.firstEnter = false;
    return {
      sOpen : this.open
    }
  },
  watch : {
    open (newVal) {
      if (!this.container) {
        this.container = this.defaultGetContainer(this.$props);
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
    defaultGetContainer (props) {
      const getContainer = props.getContainer;
      let container;
      if (typeof getContainer === 'string') {
        container = document.querySelectorAll(getContainer)[0];
      } else {
        container = this.getContainer();
      };
      return container;
    },
    maskClose () {
      this.$emit('close');
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
                width : width + 'px',
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
  render (h) {
    const children = this.getChild(this.firstEnter ? this.open : false);
    if (!this.container || !this.open && !this.firstEnter) {
      return null;
    }
    const vnode = h('div' , [children]);
    this.$nextTick(() => {
      if (this.container && !this.firstEnter) {
        this.container.appendChild(vnode.elm);
      }
    });
    return vnode;
  }
};
export default CaDrawer;