import classNames from "classnames";
export default {
  props : {
    header : {
      type : [String , Object],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-collapse'
    },
    isActive : {
      type : Boolean,
      default : false
    },
    accordion : {
      type : Boolean,
      default : false
    },
    expandIcon : Function,
    panelKey : String
  },
  updated () {
    const dom = this.$refs.content;
    if (dom.classList.contains('ca-collapse-content-active')) {
      let { height } = dom.getBoundingClientRect();
      height = parseInt(height);
      if (!this.height && height && this.height !== height) {
        this.height = height;
      }
      dom.style.height = '0px';
      setTimeout(() => {
        dom.style.height = this.height + 'px';
      })
    } else if (parseInt(dom.style.height) == this.height) {
      dom.style.height = '0px';
    }
  },
  methods : {
    getIcon () {
      const { expandIcon , isActive , prefixCls } = this.$props;
      const h = this.$createElement;
      let icon = h('span' , { class : classNames('iconfont icon-arrow-right' , prefixCls + '-arrow' , isActive ? 'active' : null) });
      if (typeof expandIcon === 'function') {
        icon = expandIcon(this.$props);
      };
      return icon;
    },
    renderCollapseHeader (prefixCls) {
      const h = this.$createElement;
      let { header } = this.$props;
      header = header || this.$slots.header;
      let icon = this.getIcon();
      if (header) {
        return h(
          'div',
          {
            class : classNames(prefixCls + '-header'),
            on : {
              click : this.clickHeader
            }
          },
          [icon , header]
        )
      };
      return null;
    },
    renderCollapseContent (prefixCls) {
      const h = this.$createElement;
      const { isActive } = this.$props;
      return h(
        'transition',
        {
          attrs : {
            name : 'collapse-slide',
            appear : true
          }
        },
        [
          h(
            'div',
            {
              directives : [
                {
                  name : 'show',
                  value : isActive
                }
              ],
              class : classNames(prefixCls + '-content' , isActive ? prefixCls + '-content-active' : null),
              ref : 'content'
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-content-inner')
                },
                [this.$slots.default]
              )
            ]
          )
        ]
      )
    },
    clickHeader (evt) {
      const { panelKey } = this.$props;
      this.$emit('itemClick' , panelKey);
    }
  },
  render () {
    const { prefixCls } = this.$props;
    const h = this.$createElement;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-item')
      },
      [
        this.renderCollapseHeader(prefixCls),
        this.renderCollapseContent(prefixCls)
      ]
    )
  }
}