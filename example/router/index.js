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
  },
  {
    path : '/collapse',
    component : () => import('@example/docs/collapse')
  },
  {
    path : '/list',
    component : () => import('@example/docs/list')
  },
  {
    path : '/popover',
    component : () => import('@example/docs/popover')
  },
  {
    path : '/card',
    component : () => import('@example/docs/card')
  },
  {
    path : '/statistic',
    component : () => import('@example/docs/statistic')
  },
  {
    path : '/table',
    component : () => import('@example/docs/table')
  },
  {
    path : '/tabs',
    component : () => import('@example/docs/tabs')
  },
  {
    path : '/tag',
    component : () => import('@example/docs/tag')
  },
  {
    path : '/timeline',
    component : () => import('@example/docs/timeline')
  },
  {
    path : '/tooltip',
    component : () => import('@example/docs/tooltip')
  },
  {
    path : '/cascader',
    component : () => import('@example/docs/cascader')
  },
  {
    path : '/checkbox',
    component : () => import('@example/docs/checkbox')
  },
  {
    path : '/datepicker',
    component : () => import('@example/docs/datepicker')
  },
  {
    path : '/timepicker',
    component : () => import('@example/docs/timepicker')
  }
];
const router = new VueRouter({
  routes
});
export default router;