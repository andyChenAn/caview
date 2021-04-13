import Vue from 'vue';
import ModalClass from './modal';
let ModalConstructor = Vue.extend(ModalClass);

let zIndex = 2000;
let instances = [];

let types = ['success' , 'error' , 'info' , 'warning'];

document.body.addEventListener('mousedown' , evt => {
  evt.stopPropagation();
  evt.preventDefault();
  Modal.options = {
    offsetX : evt.clientX,
    offsetY : evt.clientY,
    clientWidth : document.body.clientWidth
  };
})

function Modal (options = {}) {
  options = Object.assign({} , Modal.options , options);
  const instance = new ModalConstructor({
    data : options
  });
  instance.$mount();
  console.log(instance.$on)
  document.body.appendChild(instance.$el);
  instance.visible = options.visible || true;
};

types.forEach(type => {
  Modal[type] = function (options) {
    options.type = type;
    return Modal(options);
  }
})

export default Modal;