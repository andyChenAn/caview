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
    return this.$slots.default
  }
}