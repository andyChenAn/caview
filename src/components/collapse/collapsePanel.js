import classNames from "classnames";
export default {
  props : {
    // 面板标题
    header : {
      type : [String , Object],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-collapse'
    },
    // 是否点击的是当前面板
    isActive : {
      type : Boolean,
      default : false
    },
    accordion : {
      type : Boolean,
      default : false
    },
    // 展开面板的图标，是一个作用域插槽
    expandIcon : Function,
    // 从父组件传递过来的key，主要是用来点击面板时，将panelKey作为参数回传给itemClick
    panelKey : String,
    // 是否禁用该面板
    disabled : Boolean,
    // 是否展示面板箭头
    showArrow : {
      type : Boolean,
      default : true
    }
  },
  methods : {
    onBeforeEnter (el) {
      el.style.height = '0px';
      el.style.opacity = 0;
      el.classList.add('collapse-transition');
    },
    onEnter (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.opacity = 1;
      }
    },
    onAfterEnter (el) {
      el.style.height = '';
      el.style.opacity = '';
      el.classList.remove('collapse-transition');
    },
    onBeforeLeave (el) {
      el.style.height = el.scrollHeight + 'px';
      el.style.opacity = 1;
    },
    onLeave (el) {
      if (el.scrollHeight !== 0) {
        el.style.height = '0px';
        el.style.opacity = 0;
        el.classList.add('collapse-transition');
      }
    },
    onAfterLeave (el) {
      el.style.height = '';
      el.style.opacity = '';
      el.classList.remove('collapse-transition')
    },
    onBeforeAppear (el) {
      el.style.height = '0px';
      el.style.opacity = 0;
      el.classList.add('collapse-transition');
    },
    onAppear (el) {
      setTimeout(() => {
        el.style.height = el.scrollHeight + 'px';
        el.style.opacity = 1;
      })
    },
    getIcon () {
      let { expandIcon , isActive , prefixCls } = this.$props;
      const h = this.$createElement;
      if (this.$scopedSlots.expandIcon) {
        expandIcon = this.$scopedSlots.expandIcon;
      };
      let icon = h('span' , { class : classNames('iconfont icon-arrow-right' , prefixCls + '-arrow' , isActive ? 'active' : null) });
      if (typeof expandIcon === 'function') {
        icon = h(
          'span',
          {
            class : classNames(prefixCls + '-arrow')
          },
          [expandIcon(this.$props)]
        );
      };
      return icon;
    },
    renderCollapseHeader (prefixCls) {
      const h = this.$createElement;
      let { header , disabled , showArrow } = this.$props;
      header = header || this.$slots.header;
      let icon = this.getIcon();
      if (header) {
        return h(
          'div',
          {
            class : classNames(prefixCls + '-header' , disabled ? prefixCls + '-header-disabled' : null , !showArrow ? prefixCls + '-no-arrow' : null),
            on : {
              click : this.clickHeader
            }
          },
          [showArrow && icon , header , this.$slots.extra ? h('div' , { class : classNames(prefixCls + '-extra') } , [this.$slots.extra]) : null]
        )
      };
      return null;
    },
    renderCollapseContent (prefixCls) {
      const h = this.$createElement;
      const { isActive } = this.$props;
      // 判断是否为第一次渲染，一开始是没有内容的，只有点击之后才会渲染内容
      if (isActive && !this.firstRender) {
        this.firstRender = true;
      };
      return this.firstRender ? h(
        'transition',
        {
          props : {
            appear : true
          },
          on : {
            'before-enter' : this.onBeforeEnter,
            'enter' : this.onEnter,
            'after-enter' : this.onAfterEnter,
            'before-leave' : this.onBeforeLeave,
            'leave' : this.onLeave,
            'after-leave' : this.onAfterLeave,
            'before-appear' : this.onBeforeAppear,
            'appear' : this.onAppear
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
              class : classNames(prefixCls + '-content' , isActive ? prefixCls + '-content-active' : null)
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
      ) : null
    },
    clickHeader (evt) {
      const { panelKey , disabled } = this.$props;
      if (disabled) {
        return;
      }
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