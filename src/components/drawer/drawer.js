const currentDrawer = {};
const Drawer = {
  data () {
    let open = this.open ? this.open : false;
    this.drawerId = Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9))).toString(16);
    currentDrawer[this.drawerId] = open;
    return {
      sOpen : open
    }
  },
  render (h) {
    return h('div' , {} , [this.$slots['default']]);
  }
};
export default Drawer;