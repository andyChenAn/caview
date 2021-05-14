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
    }
  },
  mounted () {
    this.container = this.defaultGetContainer();
  },
  watch : {
    visible (newVal) {
      this.open = newVal;
    }
  },
  data () {
    this.preProps = _extends({} , this.$props);
    return {
      open : this.visible,
      firstEnter : false
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
    maskClose () {
      this.$emit('close');
    },
    getChild () {
      let _classnames;
      const h = this.$createElement;
      const { prefixCls , mask , placement , maskClosable , maskStyle } = this.$props;
      const children = this.$slots['default'];
      const wrapClassName = classnames(
        prefixCls,
        (
          _classnames = {},
          _defineProperty(_classnames , prefixCls + '-' + placement , true),
          _defineProperty(_classnames , prefixCls + '-open' , this.open)
        )
      )
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
              class : prefixCls + '-content-wrap'
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
    if (!this.container || !this.open && !this.firstEnter) {
      return null;
    };
    const children = this.getChild();
    let vnode = h('div' , [children]);
    this.$nextTick(() => {
      if (this.container && !this.firstEnter) {
        this.container.appendChild(vnode.elm);
      }
    })
    return vnode;
  }
};
export default CaDrawer;