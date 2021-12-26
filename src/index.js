import Message from './components/message';
import Notification from './components/notification';
import Modal from './components/modal';
import Drawer from './components/drawer';
import Popconfirm from './components/popconfirm';
import Loading from './components/loading';
import Progress from './components/progress';
import Avatar from './components/avatar';
import Badge from './components/badge';
import Calendar from './components/calendar';
import Carousel from './components/carousel';
import Collapse from './components/collapse';
import CollapsePanel from './components/collapse/collapsePanel';
import List from './components/list';
import ListItem from './components/list/item';
import ListItemMeta from './components/list/meta';
import Popover from './components/popover';
import Card from './components/card';
import CardMeta from './components/card/meta';
import Statistic from './components/statistic';
import Countdown from './components/statistic/countdown';
import Table from './components/table';
import Tabs from './components/tabs';
import TabPane from './components/tabs/tabPane';
import Tag from './components/tag';
import Timeline from './components/timeline';
import TimelineItem from './components/timeline/timelineItem';
import Tooltip from './components/tooltip';
const components = {
  Message,
  Notification,
  Modal,
  Drawer,
  Popconfirm,
  Loading,
  Progress,
  Avatar,
  Badge,
  Calendar,
  Carousel,
  Collapse,
  CollapsePanel,
  List,
  ListItem,
  ListItemMeta,
  Popover,
  Card,
  CardMeta,
  Statistic,
  Countdown,
  Table,
  Tabs,
  TabPane,
  Tag,
  Timeline,
  TimelineItem,
  Tooltip
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
