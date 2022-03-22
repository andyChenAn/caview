import classNames from "classnames";
import RangeRightHeader from './rangeRightHeader';
import RangeRightBody from './rangeRightBody';
export default {
  props : {
    currentValue : Array,
    selectedValue : Array,
    prefixCls : String
  },
  data () {
    return {
      currentHeaderValue : this.currentValue,
    }
  },
  methods : {
    clickYear (evt , year) {
      evt.stopPropagation();
      const date = new Date(this.currentHeaderValue[1]);
      date.setFullYear(year);
      this.currentHeaderValue.splice(1 , 1 , date);
      this.$emit('panelChange' , this.currentHeaderValue);
    },
    clickMonth (evt , month) {
      evt.stopPropagation();
      const date = new Date(this.currentHeaderValue[1]);
      date.setMonth(month);
      this.currentHeaderValue.splice(1 , 1 , date);
      this.$emit('panelChange' , this.currentHeaderValue);
    },
    getCalendarHeader () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const currentDate = this.currentHeaderValue[1];
      const headerProps = {
        props: {
          prefixCls: classNames(prefixCls),
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          currentValue: this.currentHeaderValue
        },
        on : {
          'click-year' : this.clickYear,
          'click-month' : this.clickMonth,
        }
      };
      return h(
        RangeRightHeader,
        headerProps
      )
    },
    getCalendarBody () {
      const h = this.$createElement;
      const { prefixCls , currentValue , selectedValue } = this.$props;
      const bodyProps = {
        props : {
          prefixCls : classNames(prefixCls + '-body'),
          currentValue : currentValue,
          selectedValue : selectedValue
        },
        on : {
          select : this.onSelect
        }
      };
      return h(
        RangeRightBody,
        bodyProps
      )
    },
    onSelect (date) {
      
    }
  },
  render () {
    const h =this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-right')
      },
      [
        this.getCalendarHeader(),
        this.getCalendarBody()
      ]
    )
  }
}