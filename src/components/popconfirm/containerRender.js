export default {
  props : {
    visible : {
      type : Boolean,
      default : false
    },
    parent : {
      type : Object,
      default : {}
    },
    children : {
      type : Function,
      default : function () {}
    },
    getContainer : {
      type : Function,
      default : function () {}
    },
    getComponent : {
      type : Function,
      default : function () {}
    }
  },
  methods : {
    renderContainer () {
      const self = this;
      if (this.visible) {
        let el = this.componentEl;
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
              return self.getComponent()
            }
          })
        }
      }
    },
    removeContainer () {
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
      renderContainer : this.renderContainer,
      removeContainer : this.removeContainer
    });
  }
}