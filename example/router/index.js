import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);
const routes = [
  {
    path : '/message',
    component : () => import('@example/docs/message')
  },
  {
    path : '/notification',
    component : () => import('@example/docs/notification')
  },
  {
    path : '/modal',
    component : () => import('@example/docs/modal')
  },
  {
    path : '/drawer',
    component : () => import('@example/docs/drawer')
  },
  {
    path : '/popconfirm',
    component : () => import('@example/docs/popconfirm')
  },
  {
    path : '/loading',
    component : () => import('@example/docs/loading')
  }
];
const router = new VueRouter({
  routes
});
export default router;