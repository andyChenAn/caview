import _extends from "@babel/runtime/helpers/extends";
import classNames from "classnames";
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-list'
    },
    extra : {
      type : String,
      default : ''
    }
  },
  methods : {
    renderItemContent (prefixCls) {
      const h = this.$createElement;
      const extra = this.$props.extra || this.$slots.extra;
      if (extra) {
        return h(
          'div',
          {
            class : classNames(prefixCls + '-item-main')
          },
          [
            this.$slots.default,
            extra
          ]
        )
      } else {
        return this.$slots.default;
      }
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'li',
      {
        class : classNames(prefixCls + '-item')
      },
      [
        this.renderItemContent(prefixCls)
      ]
    )
  }
}