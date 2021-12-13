import classNames from "classnames";

export default {
  props : {
    prefixCls : String,
    nextArrowStyle : Object
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , nextArrowStyle } = this.$props;
    return h(
      'span',
      {
        class : classNames(prefixCls + '-next-arrow-icon')
      },
      [
        h(
          'i',
          {
            class : classNames('iconfont icon-arrow-right'),
            style : nextArrowStyle
          }
        )
      ]
    )
  }
}