import Message from './components/message';
import Notification from './components/notification';
import Modal from './components/modal';
import Drawer from './components/drawer';
import Popconfirm from './components/popconfirm';
import Loading from './components/loading';
import Progress from './components/progress';
import Avatar from './components/avatar';
import Badge from './components/badge';
const components = {
  Message,
  Notification,
  Modal,
  Drawer,
  Popconfirm,
  Loading,
  Progress,
  Avatar,
  Badge
}
const caview = {
  ...components
};
// 全局钩子
import './components/utils/portalDirective';
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
