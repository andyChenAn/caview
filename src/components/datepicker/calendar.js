import classNames from 'classnames';
import CalendarHeader from './calendarHeader';
import CalendarBody from './calendarBody';
import CalendarFooter from './calendarFooter';
export default {
  props : {
    // 当前日期
    currentDate : Date,
    // 样式类前缀
    prefixCls : String,
    // 是否显示时间选择器
    showTime : [Object , Boolean],
    prefixCls : String,
    format : String
  },
  methods : {
    getCalendarHeader () {
      const { prefixCls , currentDate } = this.$props;
      const h = this.$createElement;
      const headerProps = {
        props : {
          year : currentDate.getFullYear(),
          month : currentDate.getMonth() + 1,
          prefixCls : classNames(prefixCls + '-header')
        },
        on : {
          'click-year' : this.clickYear,
          'click-month' : this.clickMonth
        }
      };
      return h(
        CalendarHeader,
        headerProps
      )
    },
    getCalendarBody () {
      const { prefixCls , currentDate } = this.$props;
      const h = this.$createElement;
      const calendarBodyProps = {
        props : {
          prefixCls : prefixCls + '-body',
          currentDate : currentDate
        },
        on : {
          select : this.onSelect
        }
      };
      return h(
        CalendarBody,
        calendarBodyProps
      );
    },
    getCalendarFooter () {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      const calendarFooterProps = {
        props : {
          prefixCls : prefixCls + '-footer'
        }
      };
      return h(
        CalendarFooter,
        calendarFooterProps,
        [this.getFooter()]
      )
    },
    getFooter () {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      return h(
        'span',
        {
          class : classNames(prefixCls + '-footer-text'),
          on : {
            click : this.clickToday
          }
        },
        ['今天']
      )
    },
    clickToday () {
      const now = new Date();
      this.$emit('select' , now);
    },
    clickYear (evt , year) {
      evt.stopPropagation();
      const date = new Date(this.currentDate);
      date.setFullYear(year);
      this.$emit('click-year' , date);
    },
    clickMonth (evt , month) {
      evt.stopPropagation();
      const date = new Date(this.currentDate);
      date.setMonth(month);
      this.$emit('click-month' , date);
    },
    onSelect (date) {
      this.$emit('select' , date);
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-box')
      },
      [
        this.getCalendarHeader(),
        this.getCalendarBody(),
        this.getCalendarFooter()
      ]
    )
  }
}