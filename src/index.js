import Message from './components/message';
import Notification from './components/notification';
import Modal from './components/modal';
const components = {
  Message,
  Notification,
  Modal
}
const caview = {
  ...components
}
const install = function (Vue) {
  Object.keys(caview).forEach(key => {
    Vue.component(key , caview[key]);
  });
  Vue.prototype.$message = Message;
  Vue.prototype.$notification = Notification;
  Vue.prototype.$modal = Modal;
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};
export default {
  install
}
