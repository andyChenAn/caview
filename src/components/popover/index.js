export default {
  props : {
    title : {
      type : String,
      default : ''
    },
    content : {
      type : String,
      default : ''
    },
    placement : {
      type : String,
      default : 'topCenter'
    },
    visible : {
      type : Boolean,
      default : false
    }
  },
  render () {
    const h = this.$createElement;
    const content = this.renderContent();
    return this.$slots.default
  }
}