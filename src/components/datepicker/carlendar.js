import classNames from "classnames";
import CarlendarHeader from './carlendarHeader';
export default {
  props : {
    date : Date,
    prefixCls : String
  },
  data () {
    const { date }  = this.$props;
    return {
      currentDate : date
    }
  },
  watch : {
    date (newVal) {
      this.currentDate = newVal;
    }
  },
  methods : {
    clickYear (year) {
      const date = new Date(this.currentDate);
      date.setFullYear(year);
      this.currentDate = date;
    },
    clickMonth (month) {
      const date = new Date(this.currentDate);
      date.setMonth(month - 1);
      this.currentDate = date;
    },
    getCarlendarHeader () {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      const headerProps = {
        props : {
          prefixCls : classNames(prefixCls),
          year : this.currentDate.getFullYear(),
          month : this.currentDate.getMonth() + 1
        },
        on : {
          'click-year' : this.clickYear,
          'click-month' : this.clickMonth
        }
      }
      return h(
        CarlendarHeader,
        headerProps
      )
    }
  },
  render () {
    const h = this.$createElement;
    return h(
      'div',
      [
        this.getCarlendarHeader()
      ]
    )
  }
}