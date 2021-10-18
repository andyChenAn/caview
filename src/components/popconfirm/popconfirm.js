import _extends from "@babel/runtime/helpers/extends";
export default {
  props : {
    placement : {
      type : String,
      default : 'top'
    },
    prefixCls : {
      type : String,
      default : 'ca-popconfirm'
    },
    visible : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
      sVisible : this.visible
    }
  },
  watch : {
    visible (newVal) {
      console.log(newVal);
    }
  },
  methods : {
    handleClick () {
      this.$emit('visibleChange' , true);
    }
  },
  render (h) {
    let children = (this.$slots.default || []).filter(c => c.tag || c.text.trim());
    if (children.length === 0) {
      return null;
    }
    children[0].data.on = {
      click : this.handleClick
    };
    return children;
  }
}


// import _extends from '@babel/runtime/helpers/extends';
// import ContainerRender from './containerRender';
// let noop = function () {};
// export default {
//   props : {
//     icon: {
//       type: [String, Object],
//       default: 'warning'
//     },
//     placement: {
//       type: String,
//       default: ''
//     },
//     prefixCls: {
//       type: String,
//       default: 'ca-popconfirm'
//     },
//     visible : {
//       type : Boolean,
//       default : false
//     }
//   },
//   mounted () {
//     this.$nextTick(() => {
//       this.renderContainer();
//     })
//   },
//   updated () {
//     this.$nextTick(() => {
//       this.renderContainer();
//     })
//   },
//   methods : {
//     handleClick () {
//       this.sVisible = true;
//       this.$emit('visibleChange' , true)
//     },
//     getContainer () {
//       let popupContainer = document.createElement('div');
//       popupContainer.style.position = 'absolute';
//       popupContainer.style.top = '0';
//       popupContainer.style.left = '0';
//       popupContainer.style.width = '100%';
//       document.body.appendChild(popupContainer);
//       this.popupContainer = popupContainer;
//       return popupContainer;
//     },
//     getComponent () {
//       return this.$slots.title;
//     }
//   },
//   render () {
//     const self = this;
//     const h = this.$createElement;
//     let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '')
//     children = children[0];
//     children.data.on || (children.data.on = {});
//     children.data.on.click = this.handleClick;
//     return h(
//       ContainerRender,
//       {
//         attrs : {
//           visible : this.visible,
//           parent : this,
//           getContainer : this.getContainer,
//           getComponent : this.getComponent,
//           children (ref) {
//             const renderContainer = ref.renderContainer;
//             self.renderContainer = renderContainer;
//             return children;
//           }
//         }
//       }
//     )
//   }
// }


// import _extends from '@babel/runtime/helpers/extends';
// import ContainerRender from './containerRender';
// let noop = function () { };
// export default {
//   props: {
//     // 标题
//     title: {
//       type : [String , Object],
//       default : ''
//     },
//     // 确认按钮的文本描述
//     okText: {
//       type : String,
//       default : '确认'
//     },
//     // 取消按钮的文本描述
//     cancelText: {
//       type : String,
//       default : '取消'
//     },
//     // 图标
//     icon: [String , Object],
//     // 位置
//     placement: {
//       type: String,
//       default: 'top'
//     },
//     // 是否显示气泡确认框
//     visible: {
//       type: Boolean,
//       default: false
//     },
//     prefixCls: {
//       type: String,
//       default: 'ca-popover'
//     }
//   },
//   data () {
//     let sVisible = this.visible;
//     return {
//       sVisible
//     }
//   },
//   watch : {
//     sVisible (newVal) {
//       this.sVisible = newVal;
//     }
//   },
//   mounted () {
//     this.renderContainer();
//   },
//   updated () {
//     this.renderContainer();
//   },
//   methods: {
//     getPopconfirmContent() {
//       const title = this.$props.title || this.$slots.title;
//       return title || '';
//     },
//     handleClick (evt) {
//       this.sVisible = true;
//     },
//     // 获取容器节点
//     getContainer () {
//       let popupContainer = document.createElement('div');
//       popupContainer.style.position = 'absolute';
//       popupContainer.style.top = '0';
//       popupContainer.style.left = '0';
//       popupContainer.style.width = '100%';
//       document.body.appendChild(popupContainer);
//       this.popupContainer = popupContainer;
//       return popupContainer;
//     },
//     // 获取组件
//     getCompnent () {
//       let title = this.$props.title;
//       if (!title) {
//         title = this.$slots.title;
//       };
//       return title;
//     }
//   },
//   beforeDestroy () {
//     this._component = null;
//   },
//   render() {
//     const self = this;
//     const h = this.$createElement;
//     // 这里主要是过滤掉popconfirm组件中的空白节点
//     let children = this.$slots.default.filter(c => {
//       return c.tag || c.text.trim() !== '';
//     });
//     children[0].data.on = {
//       click : self.handleClick
//     };
//     return h(
//       ContainerRender,
//       {
//         attrs : {
//           parent : this,
//           visible : this.sVisible,
//           getContainer : this.getContainer,
//           getCompnent : this.getCompnent,
//           children (obj) {
//             let renderContainer = obj.renderContainer;
//             self.renderContainer = renderContainer;
//             return children;
//           }
//         }
//       }
//     )
//     // return h(
//     //   ContainerRender,
//     //   {
//     //     attrs: {
//     //       children(ref) {
//     //         let renderContainer = ref.renderContainer;
//     //         self.renderContainer = renderContainer;
//     //         children[0].data || (children[0].data = {});
//     //         children[0].data.on = {
//     //           click: self.handleClick
//     //         };
//     //         return children;
//     //       }
//     //     }
//     //   }
//     // )
//   }
// }