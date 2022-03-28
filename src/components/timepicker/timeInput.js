import classNames from "classnames";

export default {
  props : {
    placeholder : String,
    value : String,
    prefixCls : String,
    format : String
  },
  methods : {
    handleInput (evt) {
      this.$emit('input' , evt.target.value.trim())
    }
  },
  render () {
    const h = this.$createElement;
    const { placeholder , prefixCls , value } = this.$props;
    return h(
      'span',
      {
        class : classNames(prefixCls)
      },
      [
        h(
          'input',
          {
            class : classNames(prefixCls + '-input'),
            attrs : {
              placeholder : placeholder
            },
            domProps : {
              value : value
            },
            on : {
              input : this.handleInput
            }
          }
        ),
        h(
          'i',
          {
            class : classNames('iconfont icon-shijian' , prefixCls + '-time-icon' , value ? 'hide' : '')
          }
        ),
        h(
          'i',
          {
            class : classNames('iconfont icon-error' , prefixCls + '-clear-icon' , value ? 'show' : '')
          }
        )
      ]
    )
  }
}