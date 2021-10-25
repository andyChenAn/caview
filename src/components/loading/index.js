export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-loading'
    },
    // 是否为加载中状态，默认为true
    loading : {
      type : Boolean,
      default : true
    },
    // 加载提示文字
    tip : {
      type : String,
      default : ''
    },
    // 加载指示符，我们可以自定义loading效果
    indicator : Function
  },
  methods : {
    renderLoading (prefixCls) {
      const h = this.$createElement;
      let vnode;
      if (this.indicator && typeof this.indicator === 'function') {
        vnode = this.indicator(h);
      } else if (this.$slots.indicator) {
        vnode = this.$slots.indicator.filter(c => c.tag || c.text.trim() !== '');
      } else {
        vnode = h(
          'div',
          {
            class : prefixCls + '-inner'
          },
          [
            h(
              'span',
              {
                class : prefixCls + '-circle'
              }
            )
          ]
        )
      }
      return vnode;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , loading , tip } = this.$props;
    return loading ? h(
      'div',
      {
        class : prefixCls
      },
      [
        this.renderLoading(prefixCls),
        tip ? h(
          'div',
          {
            class : prefixCls + '-text'
          },
          [tip]
        ) : null
      ]
    ) : null
  }
}