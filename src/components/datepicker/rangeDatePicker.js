import classNames from 'classnames';
export default {
  props : {
    defaultValue : {
      type : Array,
      default () {
        return []
      }
    },
    value : {
      type : Array,
      default () {
        return [];
      }
    },
    formatter : {
      type : String,
      default : 'YYYY-MM-DD'
    }
  },
  data () {
    const { defaultValue , value } = this.$props;
    const now = new Date();
    let dateList = defaultValue.length > 0 ? value.length > 0 ? value : defaultValue : [now , this.getNextMonthDate(now)];
    return {
      dateList : dateList
    }
  },
  methods : {
    // 获取当前日期的下一年日期数据
    getNextYearDate (date) {
      const year = date.getFullYear();
      const nextYear = year + 1;
      date.setFullYear(nextYear);
      const nextDate = date;
      return nextDate;
    },
    // 获取当前日期的上一年日期数据
    getPrevYearDate (date) {
      const year = date.getFullYear();
      const prevYear = year - 1;
      date.setFullYear(prevYear);
      const prevDate = date;
      return prevDate;
    },
    // 获取当前日期的上一月日期数据
    getPrevMonthDate (date) {
      const month = date.getMonth();
      let prevMonth = month - 1;
      if (prevMonth < 0) {
        prevMonth = 11;
      };
      date.setMonth(prevMonth);
      const prevDate = date;
      return prevDate;
    },
    // 获取当前日期的下一月日期数据
    getNextMonthDate (date) {
      const month = date.getMonth();
      let nextMonth = month + 1;
      if (nextMonth > 11) {
        nextMonth = 0;
      };
      date.setMonth(nextMonth);
      const nextDate = date;
      return nextDate;
    }
  },
  render () {
    const h = this.$createElement;
    const { dateList } = this.$data;
    
  }
}