import classNames from "classnames";
import { formatDate } from "../utils/date";
export default {
  props : {
    value : Array,
    prefixCls : String,
    format : String,
    separator : String,
    placeholder : Array
  },
  data () {
    return {
      currentDateArr : this.value
    }
  },
  watch : {
    value (newVal) {
      console.log(newVal , 'asdfasf')
    }
  },
  methods : {
    onClear () {}
  },
  render () {
    const h = this.$createElement;
    const { value , prefixCls , separator , format , placeholder } = this.$props;
    const startPlaceholder = placeholder[0];
    const endPlaceholder = placeholder[1];
    let startValue , endValue = null;
    if (value.length == 2) {
      startValue = value[0] ? formatDate(value[0], format) : '';
      endValue = value[1] ? formatDate(value[1] , format) : '';
    };
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
                  value : startValue
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
                  value : endValue
                },
                class : classNames(prefixCls + '-range-input')
              }
            ),
            startValue && endValue && h(
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
  }
}