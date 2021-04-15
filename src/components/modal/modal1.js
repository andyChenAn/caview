import Vue from 'vue';
import Modal from './modal.vue';
let defaults = {
  visible : false,
  width : 520,
  title : '',
  content : '',
  okText : '',
  cancelText : '',
  loading : false,
  closable : false,
  type : '',
  lockScroll : true,
  showHeader : false,
  showFooter : false
}
// 创建实例
Modal.createInstance = function (options) {
  const instance = new Vue({
    data : Object.assign({} , defaults , options),
    render (h) {
      let header , content , footer;
      // modal头部
      if (this.title) {
        header = h('div' , {
          attrs : {
            class : 'type-header'
          }
        } , [
          h('i' , {
            class : 'iconfont icon-' + this.type
          }),
          h('div' , {
            class : 'type-title'
          } , this.title)
        ])
      };
      // modal底部
      footer = h('div' , {
        attrs : {
          class : 'type-footer'
        }
      } , [
        h('button' , {
          // on : {
          //   click : this.onOk
          // },
          attrs : {
            class : 'confirm'
          }
        } , [
          h('span' , this.okText)
        ])
      ]);
      // 内容
      if (this.render) {
        content = h('div' , {
          attrs : {
            class : 'type-content'
          }
        } , [this.render(h)])
      } else {
        content = h('div' , {
          attrs : {
            class : 'type-content',
          },
          domProps : {
            innerHTML : this.content
          }
        });
      };
      return h(Modal , {
        props : Object.assign({} , defaults , options),
        on : {
          input : value => {
            setTimeout(() => {
              document.body.removeChild(this.$el);
            } , 300)
            this.visible = value;
          }
        }
      } , [
        h('div' , {
          slot : 'content'
        } ,[
          header,
          content,
          footer
        ])
      ])
    }
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  const modal = instance.$children[0];
  modal.visible = true;
};
export default Modal;