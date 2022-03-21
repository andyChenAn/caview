import _extends from '@babel/runtime/helpers/extends';
import omit from 'omit.js';
import RangePicker from './rangePicker';
import RangeInput from './rangeInput';
import CalendarPart from './calendarPart';
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-range-picker'
    },
    value : {
      type : Array,
      default () {
        return [];
      }
    },
    defaultValue : {
      type : Array,
      default () {
        return [];
      }
    },
    separator : {
      type : String,
      default : '~'
    },
    format : {
      type : String,
      default : 'YYYY-MM-DD'
    },
    open : {
      type : Boolean,
      default : false
    },
    placeholder : {
      type : [String , Array],
      default : ''
    }
  },
  data () {
    const { defaultValue , value , open } = this.$props;
    const now = new Date();
    const selectedValue = defaultValue.length > 0 ? value.length > 0 ? value : defaultValue : value.length > 0 ? value : [];
    const currentValue = selectedValue.length > 0 ? [selectedValue[0] , this.getNextMonth(selectedValue[0])] : [now , this.getNextMonth(now)];
    const sOpen = !!open || false;
    return {
      // 当前的日期
      currentValue,
      // 当前选中的日期
      selectedValue,
      // 是否显示日期弹框
      sVisible : sOpen
    }
  },
  watch : {
    open (newVal) {
      this.sVisible = newVal;
    },
    defaultValue (newVal) {
      this.currentValue = newVal;
      this.selectedValue = JSON.parse(JSON.stringify(newVal));
    },
    defaultValue (newVal) {
      this.currentValue = newVal;
      this.selectedValue = JSON.parse(JSON.stringify(newVal));
    }
  },
  methods : {
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
    // 获取当前日期的下一天
    getNextDate (date) {
      const day = date.getDate() + 1;
      date = new Date(date);
      date.setDate(day);
      return date;
    },
    // 当前日期的下一月
    getNextMonth (date) {
      const month = date.getMonth() + 1;
      date = new Date(date);
      date.setMonth(month);
      return date;
    },
    // 清空日期
    onClear () {}
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , placeholder } = this.$props;
    const { currentValue , selectedValue } = this.$data;
    let current = [] , selectValue = [] , placeholders = [];
    if (currentValue.length === 0) {
      current = [new Date() , this.getNextDate(new Date())]
    };
    if (!placeholder || placeholder.length === 0) {
      if (selectedValue.length === 0) {
        placeholders = ['开始时间' , '结束时间'];
      } else {
        selectValue = JSON.parse(JSON.stringify(selectedValue));
      }
    } else {
      if (selectedValue.length === 0) {
        placeholders = placeholder;
      } else {
        selectValue = JSON.parse(JSON.stringify(selectedValue));
      }
    }
    const rangePickerProps = {
      props : _extends({} , omit(this.$props , ['defaultValue' , 'value' , 'open']) , {
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      })
    };
    const rangeInputProps = {
      props : {
        value : selectValue,
        prefixCls : prefixCls,
        format : this.format,
        placeholder : placeholders,
        separator : this.separator
      },
      on : {
        clear : this.onClear
      }
    };
    const calendarPartProps = {
      props : {
        prefixCls : prefixCls + '-calendar-part',
        currentValue : currentValue,
        selectedValue : selectedValue,
        format : this.format
      }
    };
    return h(
      RangePicker,
      rangePickerProps,
      [
        h(
          'template',
          {
            slot : ['popup']
          },
          [
            h(
              CalendarPart,
              calendarPartProps,
            )
          ]
        ),
        h(
          RangeInput,
          rangeInputProps
        )
      ]
    )
  }
}