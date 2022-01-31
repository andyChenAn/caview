import classNames from "classnames";
import CarlendarHeader from './carlendarHeader';
import CarlendarBody from './carlendarBody';
import CarlendarFooter from './carlendarFooter';
export default {
  props : {
    date : Date,
    prefixCls : String,
    isRangeDatePicker : Boolean,
    // 是否显示选择时间选择器
    showTime : [Object , Boolean],
    index : Number,
    showArrow : Boolean
  },
  data () {
    const { date }  = this.$props;
    return {
      currentDate : date,
      prevMonth : 1
    }
  },
  watch : {
    date (newVal) {
      this.currentDate = newVal;
    }
  },
  methods : {
    clickYear (evt , year) {
      evt.stopPropagation();
      const date = new Date(this.currentDate);
      date.setFullYear(year);
      this.currentDate = date;
    },
    clickMonth (evt , month) {
      evt.stopPropagation();
      const date = new Date(this.currentDate);
      if (this.prevMonth > month && month === 1 && this.prevMonth === 12) {
        // 下一年
        date.setFullYear(date.getFullYear() + 1);
      };
      if (this.prevMonth < month && month === 12 && this.prevMonth === 1) {
        // 上一年
        date.setFullYear(date.getFullYear() - 1);
      }
      this.prevMonth = month;
      const currentDay = date.getDate();
      date.setDate(1);
      date.setMonth(month);
      date.setDate(0);
      const days = date.getDate();
      if (currentDay <= days) {
        date.setDate(currentDay);
      } else {
        date.setMonth(month);
        date.setDate(0);
        const lastDay = date.getDate();
        date.setDate(lastDay);
      }
      this.currentDate = date;
    },
    setShowArrow (showArrow) {
      this.$emit('show-arrow' , showArrow);
    },
    onSelect (date) {
      this.$emit('select' , date);
    },
    getCarlendarHeader () {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      const headerProps = {
        props : {
          prefixCls : classNames(prefixCls),
          year : this.currentDate.getFullYear(),
          month : this.currentDate.getMonth() + 1,
          isRangeDatePicker : this.isRangeDatePicker,
          index : this.index,
          showArrow : this.showArrow
        },
        on : {
          'click-year' : this.clickYear,
          'click-month' : this.clickMonth,
          'show-arrow' : this.setShowArrow
        }
      }
      return h(
        CarlendarHeader,
        headerProps
      )
    },
    getCarlendarBody () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const carlendarBodyProps = {
        props : {
          prefixCls : prefixCls + '-body',
          value : this.currentDate,
          isRangeDatePicker : this.isRangeDatePicker,
          index : this.index
        },
        on : {
          select : this.onSelect
        }
      }
      return h(
        CarlendarBody,
        carlendarBodyProps
      )
    },
    getCarlendarFooter () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const footerProps = {
        props : {
          prefixCls : classNames(prefixCls + '-footer'),
        }
      };
      return h(
        CarlendarFooter,
        footerProps,
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
      this.currentDate = new Date();
      this.$emit('select' , this.currentDate);
    }
  },
  render () {
    const { prefixCls , isRangeDatePicker , showTime } = this.$props;
    const h = this.$createElement;
    return h(
      'div',
      {
        class : classNames(isRangeDatePicker ? prefixCls + '-box' : '')
      },
      [
        this.getCarlendarHeader(),
        this.getCarlendarBody(),
        (!isRangeDatePicker || !!showTime) && this.getCarlendarFooter()
      ]
    )
  }
}