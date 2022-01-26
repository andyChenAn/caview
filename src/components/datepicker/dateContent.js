import classNames from "classnames";

export default {
  props : {
    clearable : Boolean,
    value : [Date , String],
    prefixCls : String,
    placeholder : String
  },
  render () {
    const { prefixCls , placeholder } = this.$props;
    const h = this.$createElement;
    return h(
      'span',
      {
        class : classNames(prefixCls)
      },
      [
        h(
          'input',
          {
            attrs : {
              placeholder : placeholder,
              readonly : true, 
            },
            class : classNames(prefixCls + '-input')
          }
        ),
        h(
          'i',
          {
            class : classNames('iconfont icon-rili' , prefixCls + '-rili')
          }
        )
      ]
    )
  }
}