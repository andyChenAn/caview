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

document.body.addEventListener('mousedown' , evt => {
  evt.stopPropagation();
  window.offset = {
    offsetX : evt.clientX,
    offsetY : evt.clientY,
    clientWidth : document.body.clientWidth
  };
});

let prefixCls = 'modal-type';

let types = ['info' , 'success' , 'error' , 'warning'];

let instance = null;

Modal.createInstance = function (options) {
  instance = new Vue({
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
            click : this.handleCancel
          }
        } , this.cancelText),
        h('button' , {
          attrs : {
            class : prefixCls + '-confirm-btn'
          },
          on : {
            click : this.handleOk
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
        props : Object.assign({} , config , options),
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
      handleOk () {
        const modal = this.$children[0];
        modal.visible = false;
        this.remove();
        if (typeof this.onOk === 'function') {
          this.onOk();
        }
      },
      handleCancel () {
        const modal = this.$children[0];
        modal.visible = false;
        this.remove();
        if (typeof this.onCancel === 'function') {
          this.onCancel();
        }
      },
      show (options) {
        for (let key in options) {
          this[key] = options[key];
        };
        const modal = this.$children[0];
        modal.visible = true;
      },
      remove () {
        setTimeout(() => {
          this.$destroy();
          document.body.removeChild(this.$el);
        } , 300)
      }
    }
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  return instance;
}

types.forEach(type => {
  Modal[type] = function (options) {
    options.type = type;
    const instance = Modal.createInstance(Object.assign({} , {offset : window.offset} , options , {
      showCancel : false,
      showFooter : false,
      showHeader : false,
      maskClosable : false
    }));
    instance.show(options);
  }
});

Modal.destroy = function () {
  if (!instance) {
    return;
  }
  const modal = instance.$children[0];
  modal.visible = false;
  instance.remove();
}

export default Modal;