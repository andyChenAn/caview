export default {
  props : {
    visible : {
      type : Boolean,
      default : false
    },
    parent : Object,
    children : Function,
    getContainer : Function,
    getComponent : Function
  },
  methods : {
    renderComponent () {
      const self = this;
      if (this.visible) {
        let el;
        if (!this.container) {
          this.container = this.getContainer();
          el = document.createElement('div');
          this.componentEl = el;
          this.container.appendChild(el);
        };
        if (!this._component) {
          this._component = new this.$root.constructor({
            el : el,
            render () {
              return self.getComponent();
            }
          })
        }
      }
    },
    removeComponent () {
      if (this.container) {
        this._component && this._component.$destroy();
        this.container.parentNode.removeChild(this.container);
        this.container = null;
        this._component = null;
      }
    }
  },
  render () {
    return this.children({
      renderComponent : this.renderComponent,
      removeComponent : this.removeComponent
    })
  }
};