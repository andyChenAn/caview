import Modal from './modal.vue';
import Vue from 'vue';

const defaults = {
  width : 520,
  visible : false,
  title : '',
  content : '',
  okText : '',
  cancelText : '',
  lockScroll : true,
  showHeader : false,
  showFooter : false,
  showCancel : false,
  zIndex : 1000,
  mask : true,
  closable : false
};

let prefixCls = 'modal-type';

let types = ['info' , 'success' , 'error' , 'warning'];

Modal.createInstance = function (options) {
  const instance = new Vue({
    data : options,
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
          class : prefixCls = '-footer'
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
        props : Object.assign({} , options , {
          closable : this.closable,
          width : this.width
        })
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

      },
      onCancel () {
        
      }
    }
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  const modal = instance.$children[0];
  modal.visible = true;
}

Modal.info = function (options) {
  options = Object.assign({} , defaults , options);
  options.type = 'info';
  const instance = Modal.createInstance(options);
}


export default Modal;