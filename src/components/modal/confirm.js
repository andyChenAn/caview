import Vue from 'vue';
import Modal from './modal';
Modal.newInstance = properties => {
  const _props = properties || {};
  const instance = new Vue({
    data : Object.assign({} , _props , {
      visible : false,
      title : '',
      body : '',
      width : 520
    }),
    render (h) {
      return h(Modal , {
        props : Object.assign({} , _props , {
          width : this.width
        }),
        domProps : {
          value : this.visible
        },
        on : {
          input : value => {
            this.visible = value;
          }
        }
      })
    }
  });
  const component = instance.$mount();
  document.body.appendChild(component.$el);
  const modal = instance.$children[0];

  return {
    show () {
      modal.visible = true;
    }
  }
};
export default Modal;