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
    panelChange (dateArr) {
      this.$emit('panelChange' , dateArr);
    },
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , currentValue , selectedValue } = this.$props;
    const leftPartProps = {
      props : {
        currentValue : currentValue,
        selectedValue : selectedValue,
        prefixCls : prefixCls,
      },
      on : {
        panelChange : this.panelChange
      }
    };
    const rightPartProps = {
      props : {
        currentValue : currentValue,
        selectedValue : selectedValue,
        prefixCls : prefixCls,
      },
      on : {
        panelChange : this.panelChange
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