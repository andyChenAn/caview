import classNames from "classnames";
export default {
  props : {
    prefixCls : String,
    nextArrowStyle : Object,
    tabPosition : String
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , nextArrowStyle , tabPosition } = this.$props;
    const iconClass = tabPosition === 'top' || tabPosition === 'bottom' ? 'icon-arrow-right' : 'icon-arrow-down'
    return h(
      'span',
      {
        class : classNames(prefixCls + '-next-arrow-icon'),
      },
      [
        h(
          'i',
          {
            class : classNames('iconfont' , prefixCls + '-next-icon' , iconClass),
            style : nextArrowStyle
          }
        )
      ]
    )
  }
}