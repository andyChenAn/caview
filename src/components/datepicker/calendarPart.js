import classNames from "classnames";
import CalendarLeftPart from './calendarLeftPart';
import CalendarRightPart from './calendarRightPart';
export default {
  props : {
    prefixCls : String,
    currentValue : Array,
    selectedValue : Array,
    hoverValue : Array,
    format : String
  },
  methods : {
    panelChange (dateArr) {
      this.$emit('panelChange' , dateArr);
    },
    clickPanel (date) {
      this.$emit('clickPanel' , date);
    },
    panelHover (hoverDate) {
      this.$emit('panelHover' , hoverDate);
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , currentValue , selectedValue , hoverValue } = this.$props;
    const leftPartProps = {
      props : {
        currentValue : currentValue,
        selectedValue : selectedValue,
        hoverValue : hoverValue,
        prefixCls : prefixCls,
      },
      on : {
        panelChange : this.panelChange,
        clickPanel : this.clickPanel,
        panelHover : this.panelHover
      }
    };
    const rightPartProps = {
      props : {
        currentValue : currentValue,
        selectedValue : selectedValue,
        hoverValue : hoverValue,
        prefixCls : prefixCls,
      },
      on : {
        panelChange : this.panelChange,
        clickPanel : this.clickPanel,
        panelHover : this.panelHover
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