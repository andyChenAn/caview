import classNames from "classnames";

export default {
  props : {
    checked : Boolean,
    defaultChecked : Boolean,
    autoFocus : Boolean,
    disabled : Boolean,
    prefixCls : String,
    type : {
      type : String,
      default : 'checkbox'
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , type , disabled } = this.$props;
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
              type : type,
              disabled : disabled
            },
            class : classNames(prefixCls + '-input')
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-content')
          }
        )
      ]
    )
  }
}