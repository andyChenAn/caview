import classNames from "classnames";
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-list'
    },
    title : {
      type : [String , Object],
      default : ''
    },
    description : {
      type : [String , Object],
      default : ''
    }
  },
  methods : {
    renderAvatar (prefixCls) {
      const h = this.$createElement;
      let avatar = '';
      if (this.$slots.avatar) {
        avatar = this.$slots.avatar;
      };
      return avatar ? h(
        'div',
        {
          class : classNames(prefixCls + '-item-meta-avatar')
        },
        [avatar]
      ) : null
    },
    renderTitle (prefixCls) {
      const h = this.$createElement;
      let title = this.$props.title || this.$slots.title;
      return title ? h(
        'div',
        {
          class : classNames(prefixCls + '-item-meta-title')
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
          class : classNames(prefixCls + '-item-meta-description')
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
        class : classNames(prefixCls + '-item-meta')
      },
      [
        this.renderAvatar(prefixCls),
        h(
          'div',
          {
            class : classNames(prefixCls + '-item-meta-content')
          },
          [
            this.renderTitle(prefixCls),
            this.renderDescription(prefixCls)
          ]
        )
      ]
    )
  }
}