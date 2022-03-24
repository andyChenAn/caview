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
      currentSelectedValue : [],
      showClearIcon : false
    }
  },
  watch : {
    value (newVal) {
      if (newVal.length === 2) {
        this.currentSelectedValue = newVal;
      }
    }
  },
  methods : {
    onClear (evt) {
      evt.stopPropagation();
      this.currentSelectedValue = [];
      this.$emit('clear');
    },
    handleMouseenter () {
      this.showClearIcon = true;
    },
    handleMouseleave () {
      this.showClearIcon = false;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , separator , format , placeholder } = this.$props;
    const startPlaceholder = placeholder[0];
    const endPlaceholder = placeholder[1];
    let startValue , endValue = null;
    // 当选择了两个日期的时候，才会显示在输入框中
    if (this.currentSelectedValue.length == 2) {
      startValue = this.currentSelectedValue[0] ? formatDate(this.currentSelectedValue[0], format) : '';
      endValue = this.currentSelectedValue[1] ? formatDate(this.currentSelectedValue[1] , format) : '';
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
            class : classNames(prefixCls + '-input-box'),
            on : {
              mouseenter : this.handleMouseenter,
              mouseleave : this.handleMouseleave
            }
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
                class : classNames('iconfont icon-error' , prefixCls + '-clearable' , this.showClearIcon ? 'show' : ''),
                on : {
                  click : evt => this.onClear(evt)
                }
              }
            )
          ]
        )
      ]
    )
  }
}