import classNames from "classnames";

export default {
  props : {
    prefixCls : String
  },
  render () {
    const { prefixCls } = this.$props;
    const h = this.$createElement;
    return h(
      'div',
      {
        class : classNames(prefixCls)
      },
      [
        h(
          'span',
          {
            class : classNames(prefixCls + '-btn')
          },
          [this.$slots.default]
        )
      ]
    )
  }
}