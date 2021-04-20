import Drawer from './drawer';
//export default Drawer;

export default {
  props : {
    // 是否显示drawer
    value : {
      type : Boolean,
      default : false
    },
    // 标题
    title : {
      type : String,
      default : ''
    },
    // 显示位置，默认是右边，可以是left,top,right,bottom
    placement : {
      type : String,
      default : 'right'
    },
    // 是否显示遮罩层
    mask : {
      type : Boolean,
      default : true
    },
    // 是否允许点击遮罩层隐藏抽屉
    maskClosable : {
      type : Boolean,
      default : true
    },
    // 遮罩层样式
    maskStyle : {
      type : Object,
      default : () => {}
    },
    // 宽度
    width : {
      type : [Number , String],
      default : 256
    },
    // 层级
    zIndex : {
      type : [Number , String],
      default : 1000
    },
    // 高度
    height : {
      type : [Number , String],
      default : 256
    },
    // 挂载点，默认是body
    getContainer : {
      type : Function,
      default : () => {
        return document.body;
      }
    },
    push : {
      type : [Number , String],
      default : 180
    }
  },
  computed : {
    computedStyle () {
      let style = {};
      if (this.placement == 'left' || this.placement == 'right') {
        style.width = this.width + 'px';
      } else if (this.placement == 'top' || this.placement == 'bottom') {
        style.height = this.height + 'px';
      };
      return style;
    }
  },
  watch : {
    value (newVal) {
      if (newVal) {
        this.visible = newVal;
        this.showDrawer = true;
        this.disabelBodyScroll();
        if (
          this.$parent.$children.length == 1 && 
          this.$parent.$children[0].$options._componentTag == 'Drawer'
          ) {
          let pushStyle = this.getPushStyle();
          this.$parent.pushStyle = pushStyle;
        }
      }
    }
  },
  data () {
    return {
      visible : this.value,
      showDrawer : false,
      positionStyle : {},
      pushStyle : {},
    }
  },
  mounted () {
    this.positionStyle = this.getPositionStyle();
  },
  methods : {
    getPushStyle () {
      let style = {};
      if (this.placement == 'right') {
        style.transform = `translateX(-${this.push}px)`;
      } else if (this.placement == 'right') {
        style.transform = `translateX(${this.push}px)`;
      } else if (this.placement == 'top') {
        style.transform = `translateY(-${this.push}px)`;
      } else if (this.placement == 'bottom') {
        style.transform = `translateY(${this.push}px)`;
      }
      return style;
    },
    getPositionStyle () {
      let style = {};
      const target = this.getContainer();
      if (target) {
        if (target.nodeName.toLowerCase() !== 'body') {
          style.position = 'absolute';
        };
      }
      return style;
    },
    clickMask () {
      this.close();
    },
    onAfterLeave () {
      this.enableBodyScroll();
      this.showDrawer = false;
      this.close();
    },
    close () {
      this.visible = false;
      this.$emit('input' , false);
    },
    disabelBodyScroll () {
      document.body.setAttribute('style' , 'overflow:hidden;');
    },
    enableBodyScroll () {
      document.body.setAttribute('style' , '');
    }
  },
  render (h) {
    return h('div' , {
      attrs : {
        class : 'ca-drawer'
      },
      style : {
        ...this.positionStyle
      },
      directives : [
        {
          name : 'show',
          expression : this.showDrawer,
          value : this.showDrawer
        }
      ]
    } , [
      h('transition' , {
        attrs : {
          name : 'drawer-fade'
        }
      } , [
        h('div' , {
          on : {
            click : this.clickMask
          },
          attrs : {
            class : 'mask'
          },
          style : {
            ...this.maskStyle
          },
          directives : [
            {
              name : 'show',
              expression : this.visible,
              value : this.visible
            }
          ]
        })
      ])
    ])
  }
}