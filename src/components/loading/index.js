import classNames from "classnames";
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
    indicator : Function,
    // 组件的尺寸，默认为default，可以是small，large，default
    size : {
      type : String,
      default : 'default'
    }
  },
  methods : {
    renderLoading (prefixCls) {
      const size = this.$props.size;
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
            class : classNames(prefixCls + '-content' , prefixCls + '-' + size)
          },
          [
            h(
              'span',
              {
                class : classNames(prefixCls + '-icon')
              }
            )
          ]
        )
      }
      return vnode;
    },
    renderTip (prefixCls , children) {
      const { tip } = this.$props;
      const h = this.$createElement;
      return tip ? h(
        'div',
        {
          class : classNames(prefixCls + '-tip')
        },
        [tip]
      ) : null;
    },
    renderChildren (prefixCls , children) {
      const h = this.$createElement;
      const { loading } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-text' , loading ? prefixCls + '-blur' : null)
        },
        children
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , loading , tip } = this.$props;
    let children = this.$slots.default || [];
    // 只渲染第一个子元素
    children = children.length > 1 ? [children[0]] : children;
    let vnode = null;
    if (children.length > 0) {
      // 存在子元素，只会渲染第一个子元素
      vnode = h(
        'div',
        {
          class : prefixCls + '-wrap'
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls , {[prefixCls + '-ing'] : loading , [prefixCls + '-show-text'] : !!tip})
            },
            [
              this.renderLoading(prefixCls),
              this.renderTip(prefixCls , children)
            ]
          ),
          this.renderChildren(prefixCls , children)
        ]
      )
    } else {
      // Loading组件没有子元素
      vnode = h(
        'div',
        {
          class : classNames(prefixCls , {[prefixCls + '-ing'] : loading})
        },
        [
          this.renderLoading(prefixCls),
          this.renderTip(prefixCls , children)
        ]
      )
    };
    return vnode;
  }
}