export default {
  name : 'Portal',
  props : ['getContainer' , 'children'],
  mounted () {
    this.createContainer();
  },
  beforeDestory () {
    this.removeContainer();
  },
  methods : {
    createContainer () {
      this._container = this.$props.getContainer();
      this.$forceUpdate();
    },
    removeContainer () {
      if (this._container && this._container.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
    }
  },
  render () {
    if (this._container) {
      return cloneElement(this.$props.children , {
        directives : [{
          
        }]
      })
    }
  }
}