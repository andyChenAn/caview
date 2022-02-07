import classNames from "classnames";
import { formatDate } from '../utils/date';
export default {
  props : {
    clearable : {
      type : Boolean,
      default : false
    },
    value : {
      type : [Date , String , Array],
      default : ''
    },
    prefixCls : {
      type : String,
      default : ''
    },
    placeholder : {
      type : [String , Array],
      default : ''
    },
    format : {
      type : String,
      default : ''
    },
    isRangeDatePicker : Boolean,
    separator : String
  },
  methods : {
    onClear (evt) {
      evt.stopPropagation();
      this.$emit('clear');
    }
  },
  render () {
    const { prefixCls , placeholder , value , format , clearable , isRangeDatePicker , separator } = this.$props;
    const h = this.$createElement;
    if (isRangeDatePicker) {
      const startPlaceholder = placeholder[0];
      const endPlaceholder = placeholder[1];
      const startValue = value[0];
      const endValue = value[1];
      return h(
        'span',
        {
          class : classNames(prefixCls)
        },
        [
          h(
            'span',
            {
              class : classNames(prefixCls + '-input-box')
            },
            [
              h(
                'input',
                {
                  attrs : {
                    placeholder : startPlaceholder,
                    readonly : true
                  },
                  domProps : {
                    value : startValue ? formatDate(startValue , format) : ''
                  },
                  class : classNames(prefixCls + '-range-input')
                }
              ),
              h(
                'span',
                {
                  class : classNames(prefixCls + '-separator')
                },
                [separator]
              ),
              h(
                'input',
                {
                  attrs : {
                    placeholder : endPlaceholder,
                    readonly : true
                  },
                  domProps : {
                    value : endValue ? formatDate(endValue , format) : ''
                  },
                  class : classNames(prefixCls + '-range-input')
                }
              ),
              (clearable && startValue && endValue) && h(
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
        ]
      )
    } else {
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
}