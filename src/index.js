import Message from './components/message';
import Notification from './components/notification';
import Modal from './components/modal';
import Drawer from './components/drawer';
const components = {
  Message,
  Notification,
  Modal,
  Drawer
}
const caview = {
  ...components
};
// 全局钩子
import './components/drawer/portalDirective';
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
