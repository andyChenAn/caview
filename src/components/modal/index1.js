import Modal from './modal.js';

Modal.info = function (options) {
  options = Object.assign({} , defaults , options);
  options.type = 'info';
  const instance = Modal.createInstance(options);
}


export default Modal;