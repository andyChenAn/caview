export default {
  name : 'Portal',
  props : ['getContainer' , 'children'],
  mounted () {
    this.createContainer();
    console.log(11)
  },
  beforeDestory () {
    this.removeContainer();
  },
  methods : {
    createContainer () {
      this._container = this.$props.getContainer;
      this.$forceUpdate();
    },
    removeContainer () {
      if (this._container && this._container.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
    }
  },
  render () {
    const h = this.$createElement;
    if (this._container) {
      return h('div' , {
        directives : [{
          name : 'ca-portal',
          value : this._container
        }]
      } , [this.$props.children]);
    }
  }
}