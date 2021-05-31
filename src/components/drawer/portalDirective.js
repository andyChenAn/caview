import Vue from 'vue';
Vue.directive('ca-portal' , {
  inserted (el , binding) {
    let value = binding.value;
    let parentNode = typeof value === 'function' ? value(el) : value;
    if (parentNode !== el.parentNode) {
      parentNode.appendChild(el);
    }
  },
  componentUpdated (el , binding) {
    let value = binding.value;
    let parentNode = typeof value === 'function' ? value(el) : value;
    if (parentNode !== el.parentNode) {
      parentNode.appendChild(el);
    }
  }
});