export default {
  props : {
    children : Function,
    tabList : {
      type : Array,
      default () {
        return [];
      }
    },
    disableArrow : {
      type : Function,
      default : function () {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.disableArrow(this.$el);
    })
  },
  methods : {
    renderTabList () {
      const h = this.$createElement;
      return h(
        'div',
        [this.$props.tabList]
      )
    }
  },
  render () {
    return this.children(this);
  }
}