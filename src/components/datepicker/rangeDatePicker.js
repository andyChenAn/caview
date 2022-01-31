import classNames from 'classnames';
import _extends from '@babel/runtime/helpers/extends';
import omit from 'omit.js';
import Carlendar from './carlendar';
import DateContent from './dateContent';
import RangePicker from './rangePicker';
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
    },
    prefixCls : {
      type : String,
      default : 'ca-date-picker'
    },
    clearable : {
      type : Boolean,
      default : true
    },
    open : {
      type : Boolean,
      default : false
    },
    separator : {
      type : String,
      default : '至'
    },
    placeholder : {
      type : Array,
      default () {
        return ['开始日期' , '结束日期']
      }
    }
  },
  data () {
    const { defaultValue , value , open } = this.$props;
    const now = new Date();
    let dateList = defaultValue.length > 0 ? value.length > 0 ? value : defaultValue : [now , this.getNextMonthDate(now)];
    const sOpen = !!open || false;
    let dateContent = [];
    if (this.defaultValue.length >= 2) {
      dateContent = this.defaultValue.slice(0 , 2);
    }
    if (this.value.length >= 2) {
      dateContent = this.value.slice(0 , 2);
    };
    return {
      dateList : dateList,
      sVisible : sOpen,
      dateContent : dateContent,
      showArrow : false,
    }
  },
  watch : {
    open (newVal) {
      this.sVisible = newVal;
    },
    value (newVal) {
      this.dateList = newVal;
    }
  },
  methods : {
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
    onSelect (date) {
      this.dateContent.push(date);
    },
    setShowArrow (showArrow) {
      this.showArrow = showArrow;
    },
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
      const nextDate = new Date(date);
      const month = nextDate.getMonth();
      let nextMonth = month + 1;
      if (nextMonth > 11) {
        nextMonth = 0;
      };
      nextDate.setDate(1);
      nextDate.setMonth(nextMonth);
      return nextDate;
    },
    // 渲染日期面板列表
    getCarlendarList (dateList) {
      const children = [];
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      dateList.map((date , index) => {
        const carlendarProps = {
          props : {
            date : date,
            prefixCls : prefixCls + '-carlendar',
            isRangeDatePicker : true,
            index : index,
            showArrow : this.showArrow
          },
          on : {
            select : this.onSelect,
            'show-arrow' : this.setShowArrow
          }
        };
        children.push(h(
          Carlendar,
          carlendarProps
        ))
      });
      return h(
        'div',
        {
          class : classNames(prefixCls + '-panel')
        },
        [children]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { dateList } = this.$data;
    const { prefixCls } = this.$props;
    const rangePickerProps = {
      props : _extends({} , omit(this.$props , ['defaultValue' , 'value']) , {
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      })
    };
    const dateContentProps = {
      props : {
        clearable : this.clearable,
        value : this.dateContent,
        prefixCls : this.prefixCls,
        placeholder : this.placeholder,
        format : this.formatter,
        isRangeDatePicker : true,
        separator : this.separator
      }
    }
    return h(
      RangePicker,
      rangePickerProps,
      [
        h(
          'template',
          {
            slot : ['popup']
          },
          [this.getCarlendarList(dateList)]
        ),
        h(
          DateContent,
          dateContentProps
        )
      ]
    )
  }
}