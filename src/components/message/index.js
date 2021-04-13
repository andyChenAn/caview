import Vue from 'vue';
import CaMessage from './message.vue';
let MessageConstructor = Vue.extend(CaMessage);

// 保存已经创建的message组件实例
let instances = [];
let count = 1;
let zIndex = 1000;

function isVnode (node) {
  return node !== null && typeof node === 'object' && node.hasOwnProperty('componentOptions')
}

function Message (options) {
  const instance = new MessageConstructor({
    data : options
  });
  let onClose = options.onClose;
  let id = 'message_' + count++;
  options.onClose = function () {
    Message.close(id , onClose);
  };
  instance.id = id;
  instance.$mount();
  instances.push(instance);
  document.body.appendChild(instance.$el);
  let top = options.offset || 20;
  instances.forEach(item => {
    top += item.$el.offsetHeight + 15;
  });
  instance.offset = top;
  instance.visible = true;
  instance.$el.style.zIndex = zIndex++;
  return instance;
}

['success' , 'error' , 'info' , 'warning'].forEach(type => {
  Message[type] = function (options) {
    if (typeof options == 'string') {
      options = {
        content : options
      }
    };
    options.type = type;
    return Message(options);
  }
});

Message.close = function (id , onClose) {
  let removeOffset;
  let index = -1;
  let len = instances.length;
  for (let i = 0 ; i < len ; i++) {
    if (id == instances[i].id) {
      removeOffset = instances[i].$el.offsetHeight;
      index = i;
      if (typeof onClose === 'function') {
        onClose(instances[i]);
      }
      instances.splice(i , 1);
      break;
    }
  };
  for (let i = index ; i < len - 1 ; i++) {
    instances[i].$el.style.top = parseInt(instances[i].$el.style.top) - removeOffset - 15 + 'px';
  }
};

Message.closeAll = function () {
  for (let i = instances.length - 1 ; i >= 0 ; i--) {
    instances[i].close();
  }
}

export default Message;