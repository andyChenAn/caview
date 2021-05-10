import CaDrawer from './drawer';
import extend from '../utils/extends';
import { getInstanceProps , getComponentFormProp } from '../utils/props';
const Drawer = {
  name : 'Drawer',
  props : {
    value : {
      type : Boolean,
      default : false
    },
    title : {
      type : String,
      default : ''
    },
    headerStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    mask : {
      type : Boolean,
      default : true
    },
    maskClosable : {
      type : Boolean,
      default : true
    },
    maskStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    getContainer : {
      type : [Function , String],
      default : 'body'
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
    prefixClass : {
      type : String,
      default : 'ca-drawer'
    },
    closable : {
      type : Boolean,
      default : true
    },
    zIndex : {
      type : [String , Number],
      default : 1000
    }
  },
  data () {
    return {
      visible : this.value,
      firstEnter : false
    }
  },
  watch : {
    value (newVal) {
      this.visible = newVal;
    }
  },
  provide : {
    parentDrawer : this
  },
  inject : {
    parentDrawer : {
      default () {
        return null;
      }
    }
  },
  methods : {
    close () {},
    // 渲染关闭按钮
    renderCloseIcon () {
      const h = this.$createElement;
      let closable = this.$props.closable;
      if (closable) {
        return h('i' , {
          class : 'iconfont icon-remove ' + this.prefixClass + '-remove',
          on : {
            click : this.close
          }
        })
      }
    },
    // 渲染drawer头部
    renderHeader () {
      const h = this.$createElement;
      const closable = this.$props.closable;
      const headerStyle = this.$props.headerStyle;
      const title = getComponentFormProp(this , 'title');
      if (!title && !closable) {
        return null;
      }
      return h('div' , {
        style : headerStyle,
        class : this.prefixClass + '-header'
      } , [
        title && h('div' , {
          class : this.prefixClass + '-title'
        } , Array.isArray(title) ? title : [title]),
        closable ? this.renderCloseIcon() : null
      ])
    },
    renderContent () {
      const h = this.$createElement;
      return h('div' , {
        class : this.prefixClass + '-content'
      } , [this.$slots['default']])
    },
    renderBody () {
      let h = this.$createElement;
      return h('div' , {
        class : this.prefixClass + '-body'
      } , [
        this.renderHeader(),
        this.renderContent()
      ])
    },
  },
  render (h) {
    const props = this.$props;
    const drawerProps = extend({} , props , {
      visible : this.visible
    });
    if (!this.getContainer || !this.visible && !this.firstEnter) {
      return null;
    }
    const vnode = h(
      CaDrawer,
      {
        props : drawerProps
      }, 
      [this.renderBody()]
    );
    let target;
    if (typeof this.getContainer === 'string') {
      target = document.querySelectorAll(this.getContainer)[0];
    } else if (typeof this.getContainer === 'function') {
      target = this.getContainer();
    };
    this.$nextTick(() => {
      target.appendChild(vnode.elm);
      this.firstEnter = true;
    });
    return vnode;
  }
};
export default Drawer;