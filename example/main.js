import Vue from 'vue';
import App from './App.vue';
import router from '@example/router';
import CaView from '../src';
Vue.use(CaView);
import '../src/styles/index.less';
import '@example/assets/css/base.less';
new Vue({
  router,
  render (h) {
    return h(App);
  }
}).$mount('#app');