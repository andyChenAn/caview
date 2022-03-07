import omit from 'omit.js';
import _extends from '@babel/runtime/helpers/extends';
import DatePicker from './datePicker';
import Calendar from './calendar';
import DateInput from './dateInput';
import { getDaysForMonth , getFirstDayForWeek } from './utils';
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-date-picker'
    },
    defaultValue : Date,
    value : Date,
    clearable : {
      type : Boolean,
      default : false
    },
    placeholder : {
      type : String,
      default : '请选择'
    },
    open : {
      type : Boolean,
      default : false
    },
    formatter : {
      type : String,
      default : 'YYYY-MM-DD'
    }
  },
  data () {
    const { defaultValue , value , open } = this.$props;
    const currentDate = value || defaultValue || new Date();
    const sOpen = !!open || false;
    return {
      // 日期
      currentDate : currentDate,
      // 是否显示日期弹框
      sVisible : sOpen,
      // 展示的日期天数列表
      dayList : []
    }
  },
  watch : {
    open (newVal) {
      this.sVisible = newVal;
    },
    value (newVal) {
      this.currentDate = newVal;
      this.dayList = this.getDayList(this.currentDate);
    }
  },
  created () {
    this.dayList = this.getDayList(this.currentDate);
  },
  methods : {
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
    onSelect () {},
    onClear () {},
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
    }
  },
  render () {
    const h =this.$createElement;
    const { prefixCls } = this.$props;
    const datePickerProps = {
      props : _extends({} , omit(this.$props , ['value' , 'defaultValue' , 'open']) , {
        currentDate : this.currentDate,
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      }),
    };
    const calendarProps = {
      props : _extends({} , omit(this.$props , ['value' , 'defaultValue' , 'open' , 'clearable']) , {
        currentDate : this.currentDate,
        prefixCls : prefixCls + '-calendar',
      }),
      on : {
        select : this.onSelect
      }
    };
    const dateInputProps = {
      props : {
        clearable : this.clearable,
        value : this.currentDate,
        prefixCls : this.prefixCls,
        placeholder : this.placeholder,
        formatter : this.formatter,
      },
      on : {
        clear : this.onClear
      }
    }
    return h(
      DatePicker,
      datePickerProps,
      [
        h(
          'template',
          {
            slot : ['popup']
          },
          [
            h(
              Calendar,
              calendarProps
            )
          ]
        ),
        h(
          DateInput,
          dateInputProps
        )
      ]
    )
  }
}