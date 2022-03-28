import classNames from "classnames";

export default {
  props : {
    placeholder : String,
    value : String,
    prefixCls : String,
    format : String
  },
  // computed : {
  //   currentTime () {
  //     const hours = this.currentDate.getHours();
  //     const minutes = this.currentDate.getMinutes();
  //     const seconds = this.currentDate.getSeconds();
  //     const len = this.format.split(':').length;
  //     return [hours , minutes , seconds].slice(0 , len).join(':');
  //   }
  // },
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