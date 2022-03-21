import classNames from "classnames";
import CalendarLeftPart from './calendarLeftPart';
import CalendarRightPart from './calendarRightPart';
export default {
  props : {
    prefixCls : String,
    currentValue : Array,
    selectedValue : Array,
    format : String
  },
  methods : {
    onLeftSelect () {},
    onRightSelect () {}
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , currentValue , selectedValue } = this.$props;
    const leftPartProps = {
      props : {
        currentValue : currentValue,
        selectedValue : selectedValue,
        prefixCls : prefixCls
      },
      on : {
        select : this.onLeftSelect
      }
    };
    const rightPartProps = {
      props : {
        currentDate : currentValue[1],
        selectedValue : selectedValue,
        prefixCls : prefixCls
      },
      on : {
        select : this.onRightSelect
      }
    };
    return h(
      'div',
      {
        class : classNames(prefixCls + '-panel')
      },
      [
        h(
          CalendarLeftPart,
          leftPartProps
        ),
        h(
          CalendarRightPart,
          rightPartProps
        )
      ]
    )
  }
}