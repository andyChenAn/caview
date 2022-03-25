import omit from 'omit.js';
import _extends from '@babel/runtime/helpers/extends';
import DatePicker from './datePicker';
import Calendar from './calendar';
import DateInput from './dateInput';
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
      default : true
    },
    placeholder : {
      type : String,
      default : '请选择'
    },
    open : {
      type : Boolean,
      default : false
    },
    format : {
      type : String,
      default : 'YYYY-MM-DD'
    }
  },
  data () {
    const { defaultValue , value , open } = this.$props;
    const currentDate = value || defaultValue || '';
    const sOpen = !!open || false;
    return {
      // 日期
      currentDate : currentDate,
      // 是否显示日期弹框
      sVisible : sOpen,
      // 选中显示的日期
      selectedDate : ''
    }
  },
  watch : {
    open (newVal) {
      this.sVisible = newVal;
    },
    value (newVal) {
      this.currentDate = newVal;
    },
    defaultValue (newVal) {
      this.currentDate = newVal;
    }
  },
  methods : {
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
    onSelect (date) {
      this.sVisible = false;
      this.currentDate = date;
      this.selectedDate = date;
      this.$emit('change' , date);
    },
    onClear () {
      this.selectedDate = '';
      this.currentDate = '';
    },
    clickYear (date) {
      this.currentDate = date;
    },
    clickMonth (date) {
      this.currentDate = date;
    }
  },
  render () {
    const h =this.$createElement;
    const { prefixCls } = this.$props;
    const datePickerProps = {
      props : _extends({} , omit(this.$props , ['value' , 'defaultValue' , 'open']) , {
        currentDate : this.currentDate || new Date(),
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      }),
    };
    const calendarProps = {
      props : _extends({} , omit(this.$props , ['value' , 'defaultValue' , 'open' , 'clearable']) , {
        currentDate : this.currentDate || new Date(),
        prefixCls : prefixCls + '-calendar',
      }),
      on : {
        select : this.onSelect,
        'click-year' : this.clickYear,
        'click-month' : this.clickMonth
      }
    };
    const dateInputProps = {
      props : {
        clearable : this.clearable,
        value : this.selectedDate,
        prefixCls : this.prefixCls,
        placeholder : this.placeholder,
        format : this.format,
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