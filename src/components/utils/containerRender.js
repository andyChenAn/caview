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
  beforeDestroy () {
    this.removeComponent();
  },
  methods : {
    renderComponent () {
      const self = this;
      if (this.visible || this._component) {
        let el;
        if (!this.container) {
          this.container = this.getContainer();
          el = document.createElement('div');
          this.componentEl = el;
          this.container.appendChild(el);
        };
        // 保存起来，防止放在render函数中，会触发多次渲染
        let com = { component: self.getComponent() };
        if (!this._component) {
          this._component = new this.$root.constructor({
            el : el,
            data : {
              _com : com
            },
            methods : {
              setComponent (_com) {
                this.$data._com = _com;
              }
            },
            render () {
              return this.$data._com.component;
            }
          })
        } else {
          this._component.setComponent(com);
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