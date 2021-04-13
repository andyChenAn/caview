import Vue from 'vue';
import CaNotification from './notification';
let NotificationConstructor = Vue.extend(CaNotification);

let count = 1;
let instances = {};

function Notification (options) {
  const instance = new NotificationConstructor({
    data : options
  });
  let placement = options.placement || instance.placement;
  instances[placement] = instances[placement] || [];
  let key = options.key || 'notification_' + count++;
  let onClose = options.onClose;
  options.onClose = function () {
    Notification.close(key , placement , onClose);
  };
  instance.key = key;
  instances[placement].push(instance);
  instance.$mount();
  let target = instance.getContainer();
  target.appendChild(instance.$el);
  let y = options.y || instance.y;
  instances[placement].forEach((item , index) => {
    if (index == 0) {
      y += item.$el.offsetHeight;
    } else {
      y += item.$el.offsetHeight + 20;
    }
  });
  instance.visible = true;
  instance.y = y;
  return instance;
};
// 全局配置
Notification.options = {};

Notification.open = function (options = {}) {
  options = Object.assign({} , Notification.options , options);
  return Notification(options);
};

['success' , 'error' , 'info' , 'warning'].forEach(type => {
  Notification[type] = function (options) {
    options = Object.assign({} , Notification.options , options);
    options.type = type;
    return Notification(options);
  }
});

Notification.close = function (key , placement , onClose) {
  let len = instances[placement].length;
  let removeHeight;
  let index = -1;
  for (let i = 0 ; i < len ; i++) {
    if (instances[placement][i].key == key) {
      removeHeight = instances[placement][i].$el.offsetHeight + 20;
      if (typeof onClose === 'function') {
        onClose.call(instances[placement][i]);
      }
      instances[placement].splice(i , 1);
      index = i;
      break;
    }
  };
  if (placement == 'topLeft' || placement == 'topRight') {
    for (let i = index ; i < len - 1 ; i++) {
      instances[placement][i].$el.style.top = parseInt(instances[placement][i].$el.style.top) - removeHeight + 'px'; 
    };
  } else if (placement == 'bottomLeft' || placement == 'bottomRight') {
    for (let i = index ; i < len - 1 ; i++) {
      instances[placement][i].$el.style.bottom = parseInt(instances[placement][i].$el.style.bottom) - removeHeight + 'px'; 
    };
  }
};

Notification.closeAll = function () {
  for (let placement in instances) {
    for (let i = instances[placement].length - 1 ; i >= 0 ; i--) {
      instances[placement][i].close();
    }
  }
};

Notification.config = function (options) {
  Notification.options = Object.assign({} , options);
};

export default Notification;