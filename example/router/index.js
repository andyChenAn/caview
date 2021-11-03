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
  },
  {
    path : '/progress',
    component : () => import('@example/docs/progress')
  },
  {
    path : '/avatar',
    component : () => import('@example/docs/avatar')
  },
  {
    path : '/badge',
    component : () => import('@example/docs/badge')
  },
  {
    path : '/calendar',
    component : () => import('@example/docs/calendar')
  },
  {
    path : '/carousel',
    component : () => import('@example/docs/carousel')
  }
];
const router = new VueRouter({
  routes
});
export default router;