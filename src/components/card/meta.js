import classNames from "classnames";

export default {
  props : {
    title : {
      type : String,
      default : ''
    },
    description : {
      type : String,
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-card'
    }
  },
  methods : {
    renderAvatar (prefixCls) {
      const h = this.$createElement;
      const avatar = this.$slots.avatar || null;
      return avatar ? h(
        'div',
        {
          class : classNames(prefixCls + '-meta-avatar')
        },
        [avatar]
      ) : null
    },
    renderContent (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-meta-inner')
        },
        [
          this.renderTitle(prefixCls),
          this.renderDescription(prefixCls)
        ]
      )
    },
    renderTitle (prefixCls) {
      const h = this.$createElement;
      let title = this.$props.title || this.$slots.title;
      return title ? h(
        'div',
        {
          class : classNames(prefixCls + '-meta-title')
        },
        [title]
      ) : null
    },
    renderDescription (prefixCls) {
      const h = this.$createElement;
      let description = this.$props.description || this.$slots.description;
      return description ? h(
        'div',
        {
          class : classNames(prefixCls + '-meta-description')
        },
        [description]
      ) : null
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-meta')
      },
      [
        h(
          'div',
          {
            class : classNames(prefixCls + '-meta-wrap')
          },
          [
            this.renderAvatar(prefixCls),
            this.renderContent(prefixCls)
          ]
        )
      ]
    )
  }
}