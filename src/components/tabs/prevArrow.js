import classNames from "classnames";

export default {
  props : {
    prefixCls : String,
    prevArrowStyle : Object
  },
  methods : {
    handlePrevClick () {
      this.$emit('prevClick');
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , prevArrowStyle } = this.$props;
    return h(
      'span',
      {
        class : classNames(prefixCls + '-prev-arrow-icon'),
        on : {
          click : this.handlePrevClick
        }
      },
      [
        h(
          'i',
          {
            class : classNames('iconfont icon-arrow-left' , prefixCls +'-prev-icon'),
            style : prevArrowStyle
          }
        )
      ]
    )
  }
}