import classNames from "classnames";
import RangeLeftHeader from './rangeLeftHeader';
import RangeLeftBody from './rangeLeftBody';
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
    getCalendarHeader () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const currentDate = this.currentHeaderValue[0];
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
        RangeLeftHeader,
        headerProps
      )
    },
    clickYear (evt , year) {
      evt.stopPropagation();
      const date = new Date(this.currentHeaderValue[0]);
      date.setFullYear(year);
      this.currentHeaderValue.splice(0 , 1 , date);
      this.$emit('panelChange' , this.currentHeaderValue);
    },
    clickMonth (evt , month) {
      evt.stopPropagation();
      const date = new Date(this.currentHeaderValue[0]);
      date.setMonth(month);
      this.currentHeaderValue.splice(0 , 1 , date);
      this.$emit('panelChange' , this.currentHeaderValue);
    },
    onSelect (date) {
      
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
        RangeLeftBody,
        bodyProps
      )
    }
  },
  render () {
    const h =this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-left')
      },
      [
        this.getCalendarHeader(),
        this.getCalendarBody()
      ]
    )
  }
}