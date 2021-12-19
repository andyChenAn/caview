import classNames from "classnames";

export default {
  props : {
    prefixCls : String,
    prevArrowStyle : Object,
    tabPosition : String
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , prevArrowStyle , tabPosition } = this.$props;
    const iconClass = tabPosition === 'top' || tabPosition === 'bottom' ? 'icon-arrow-left' : 'icon-arrow-up'
    return h(
      'span',
      {
        class : classNames(prefixCls + '-prev-arrow-icon'),
      },
      [
        h(
          'i',
          {
            class : classNames('iconfont' , prefixCls +'-prev-icon' , iconClass),
            style : prevArrowStyle
          }
        )
      ]
    )
  }
}