export default {
  props : {
    children : {
      type : Function,
      default : function () {}
    }
  },
  methods : {
    renderContainer () {
      
    }
  },
  render () {
    return this.children({
      renderContainer : this.renderContainer
    })
  }
}