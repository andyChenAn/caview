import classNames from 'classnames';
import CalendarHeader from './calendarHeader';
export default {
  props: {
    currentValue: Array,
    selectedValue: Array,
    prefixCls: String
  },
  data () {
    return {
      currentHeaderValue : this.currentValue,
    }
  },
  methods: {
    getCalendarHeader() {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
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
          'show-arrow' : this.setShowArrow
        }
      };
      return h(
        CalendarHeader,
        headerProps
      )
    },
    setShowArrow () {},
    clickYear (evt , year) {
      evt.stopPropagation();
      const date = new Date(this.currentHeaderValue[0]);
      date.setFullYear(year);
      this.currentHeaderValue.splice(0 , 1 , date);
    },
    clickMonth (evt , month) {
      evt.stopPropagation();
      const date = new Date(this.currentHeaderValue[0]);
      date.setMonth(month);
      this.currentHeaderValue.splice(0 , 1 , date)
    }
  },
  render() {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class: classNames(prefixCls + '-left')
      },
      [
        this.getCalendarHeader()
      ]
    )
  }
}