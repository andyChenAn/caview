import classNames from "classnames";
import { formatDate } from "../utils/date";
export default {
  props : {
    clearable : Boolean,
    value : [Date , String],
    prefixCls : String,
    placeholder : String,
    format : String,
  },
  methods : {
    onClear (evt) {
      evt.stopPropagation();
      this.$emit('clear')
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , placeholder , value , format , clearable } = this.$props;
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
            domProps : {
              value : value ? formatDate(value , format) : ''
            },
            class : classNames(prefixCls + '-input')
          }
        ),
        h(
          'i',
          {
            class : classNames('iconfont icon-rili' , prefixCls + '-rili')
          }
        ),
        (clearable && value) && h(
          'i',
          {
            class : classNames('iconfont icon-error' , prefixCls + '-clearable'),
            on : {
              click : evt => this.onClear(evt)
            }
          }
        )
      ]
    )
  }
}