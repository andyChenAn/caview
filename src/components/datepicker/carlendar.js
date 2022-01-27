import classNames from "classnames";
import CarlendarHeader from './carlendarHeader';
import CarlendarBody from './carlendarBody';
import CarlendarFooter from './carlendarFooter';
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
    },
    getCarlendarBody () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const carlendarBodyProps = {
        props : {
          prefixCls : prefixCls + '-body',
          value : this.currentDate
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
    const h = this.$createElement;
    return h(
      'div',
      [
        this.getCarlendarHeader(),
        this.getCarlendarBody(),
        this.getCarlendarFooter()
      ]
    )
  }
}