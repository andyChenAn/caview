import classNames from "classnames";
import { formatDate } from '../utils/date';
export default {
  props : {
    clearable : {
      type : Boolean,
      default : false
    },
    value : {
      type : [Date , String],
      default : ''
    },
    prefixCls : {
      type : String,
      default : ''
    },
    placeholder : {
      type : String,
      default : ''
    },
    format : {
      type : String,
      default : ''
    }
  },
  methods : {
    onClear (evt) {
      evt.stopPropagation();
      this.$emit('clear');
    }
  },
  render () {
    const { prefixCls , placeholder , value , format , clearable } = this.$props;
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
              click : this.onClear
            }
          }
        )
      ]
    )
  }
}