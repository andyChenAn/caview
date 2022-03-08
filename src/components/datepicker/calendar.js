import { getDaysForMonth , getFirstDayForWeek } from './utils';
import classNames from 'classnames';
import CalendarHeader from './calendarHeader';
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
  data () {
    return {
      // 展示的日期天数列表
      dayList : []
    }
  },
  watch : { 
    currentDate (newVal) {
      this.dayList = this.getDayList(newVal);
    }
  },
  created () {
    this.dayList = this.getDayList(this.currentDate);
  },
  methods : {
    getDayList (currentDate) {
      const dayNum = getDaysForMonth(currentDate);
      let prevDayNum = getDaysForMonth(new Date(currentDate).setMonth(currentDate.getMonth() - 1));
      const firstDayForWeek = getFirstDayForWeek(currentDate);
      let displayDays = [];
      // 当月展示的天数
      for (let i = 1 ; i <= dayNum ; i++) {
        displayDays.push({
          date : i,
          month : currentDate.getMonth(),
          year : currentDate.getFullYear(),
          type : 'current',
          hover : false,
          disabled : false,
          click : false
        })
      };
      // 上月展示的天数
      for (let i = 1 ; i <= firstDayForWeek ; i++) {
        displayDays.unshift({
          date : prevDayNum,
          month : currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1,
          year : currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
          type : 'prev',
          hover : false,
          disabled : true,
          click : false
        });
        prevDayNum--;
      };
      // 下月展示的天数
      const nextDayNum = 7 * 6 - displayDays.length;
      for (let i = 1 ; i <= nextDayNum ; i++) {
        displayDays.push({
          date : i,
          month : currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1,
          year : currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear(),
          type : 'next',
          hover : false,
          disabled : true,
          click : false
        })
      };
      return displayDays;
    },
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
    clickYear () {},
    clickMonth () {}
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
        this.getCalendarHeader()
      ]
    )
  }
}