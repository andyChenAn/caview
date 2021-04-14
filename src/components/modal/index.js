import Modal from './modal.vue';

document.body.addEventListener('mousedown' , evt => {
  evt.stopPropagation();
  evt.preventDefault();
  Modal.options = {
    offsetX : evt.clientX,
    offsetY : evt.clientY,
    clientWidth : document.body.clientWidth
  };
});




export default Modal;