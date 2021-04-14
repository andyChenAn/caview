import Modal from './modal.js';

document.body.addEventListener('mousedown' , evt => {
  evt.stopPropagation();
  evt.preventDefault();
  Modal.options = {
    offsetX : evt.clientX,
    offsetY : evt.clientY,
    clientWidth : document.body.clientWidth
  };
});

Modal.info = function (options) {
  options.type = 'info';
  const instance = Modal.createInstance(options);
}


export default Modal;