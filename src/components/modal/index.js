import Modal from './modal.vue';
import Vue from 'vue';

const config = {
  // modal宽度
  width : 520,
  // modal的标题
  title : '',
  // modal的内容
  content : '',
  // 是否显示遮罩
  mask : true,
  // 是否允许body滚动
  scrollable : false,
  // 确认按钮文本
  okText : '确定',
  // 取消按钮文本
  cancelText : '取消',
  // modal的层级
  zIndex : 1000,
  // 是否全屏
  fullscreeen : false,
  // modal过渡动画效果
  transition : 'scale',
  // 点击确定按钮时，确定按钮是否显示 loading 状态
  loading : false,
  // 是否显示右上角关闭按钮
  closable : false,
  // modal的类型
  type : ''
};

function once (type , selector , callback) {
  selector.addEventListener(type , function fn (evt) {
    selector.removeEventListener(type , fn);
    callback(evt);
  })
}

once('mousedown' , document.body , evt => {
  evt.stopPropagation();
  evt.preventDefault();
  window.offset = {
    offsetX : evt.clientX,
    offsetY : evt.clientY,
    clientWidth : document.body.clientWidth
  };
});

let prefixCls = 'modal-type';

let types = ['info' , 'success' , 'error' , 'warning'];

Modal.createInstance = function (options) {
  const instance = new Vue({
    data : Object.assign({} , config , options),
    render (h) {
      let header , footer , content;
      if (this.title) {
        header = h('div' , {
          attrs : {
            class : prefixCls + '-header'
          }
        } , [
          types.indexOf(this.type) > -1 && h('i' , {
            attrs : {
              class : 'iconfont modal-type-icon icon-' + this.type
            }
          }),
          h('div' , {
            class : prefixCls + '-title',
            domProps : {
              innerHTML : this.title
            }
          })
        ])
      };
      footer = h('div' , {
        attrs : {
          class : prefixCls + '-footer'
        }
      } , [
        this.showCancel &&
        h('button' , {
          attrs : {
            class : prefixCls + '-cancle-btn'
          },
          on : {
            click : this.onCancel
          }
        } , this.cancelText),
        h('button' , {
          attrs : {
            class : prefixCls + '-confirm-btn'
          },
          on : {
            click : this.onOk
          }
        } , this.okText)
      ]);
      content = h('div' , {
        attrs : {
          class : prefixCls + '-content'
        }
      } , [
        h('div' , {
          domProps : {
            innerHTML : this.content
          }
        })
      ]);
      return h(Modal , {
        props : Object.assign({} , config , options)
      } , [
        h('template' , {
          slot : 'content'
        } , [
          header,
          content,
          footer
        ])
      ])
    },
    methods : {
      onOk () {
        this.$children[0].visible = false;
      },
      onCancel () {
        
      },
      show (options) {
        for (let key in options) {
          this[key] = options[key];
        };
        const modal = this.$children[0];
        modal.visible = true;
      }
    }
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  return instance;
}

Modal.info = function (options) {
  options.type = 'info';
  const instance = Modal.createInstance(Object.assign({} , {offset : window.offset} , options , {
    showCancel : false,
    showFooter : false,
    showHeader : false,
    maskClosable : false
  }));
  instance.show(options);
}


export default Modal;