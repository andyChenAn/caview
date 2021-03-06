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
      type : Array,
      default () {
        return ['开始时间' , '结束时间']
      }
    }
  },
  data () {
    const { defaultValue , value , open } = this.$props;
    const now = new Date();
    now.setDate(1);
    const selectedValue = defaultValue.length > 0 ? value.length > 0 ? value : defaultValue : value.length > 0 ? value : [];
    const currentValue = selectedValue.length > 0 ? [selectedValue[0] , this.getNextMonth(selectedValue[0])] : [now , this.getNextMonth(now)];
    const sOpen = !!open || false;
    return {
      // 当前的日期
      currentValue,
      // 当前选中的日期
      selectedValue,
      // 是否显示日期弹框
      sVisible : sOpen,
      // 用来保存选择的日期
      tempDate : [],
      // 是否已经选择过一次日期
      isSelectDate : false,
      // 用户hover时的日期
      hoverValue : [],
      // 上一次选中的日期
      prevSelectedValue : []
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
    },
    sVisible (newVal) {
      // 当sVisible为false，重置数据
      if (!newVal) {
        this.tempDate = [];
        if (this.selectedValue.length < 2) {
          this.selectedValue = [];
        };
        if (this.prevSelectedValue.length === 2) {
          this.selectedValue = this.prevSelectedValue;
        }
        this.hoverValue = [];
      }
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
    onClear () {
      this.selectedValue = [];
      this.hoverValue = [];
      this.prevSelectedValue = [];
    },
    panelChange (dateArr) {
      this.currentValue = dateArr;
    },
    panelHover (hoverDate) {
      this.hoverValue = hoverDate;
    },
    clickPanel (date) {
      this.tempDate.push(date);
      this.tempDate = this.tempDate.sort((a , b) => {
        return a.getTime() - b.getTime();
      });
      this.selectedValue = this.tempDate.reduce((arr , item) => {
        arr.push(new Date(item));
        return arr;
      } , []);
      if (this.tempDate.length === 2) {
        this.prevSelectedValue = [this.selectedValue[0] , this.selectedValue[1]];
        // 表示选好了开始时间和结束时间
        this.currentValue = this.getCurrentValue(this.tempDate);
        this.sVisible = false;
        this.tempDate = [];
        this.$emit('change' , this.selectedValue);
      };
    },
    getCurrentValue (arr) {
      const first = arr[0];
      const last = arr[1];
      if (first.getFullYear() === last.getFullYear() && first.getMonth() === last.getMonth()) {
        return [first , this.getNextMonth(first)];
      };
      return arr;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , placeholder } = this.$props;
    const { currentValue , selectedValue , hoverValue } = this.$data;
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
        value : selectedValue,
        prefixCls : prefixCls,
        format : this.format,
        placeholder : placeholder,
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
        hoverValue : hoverValue,
        format : this.format
      },
      on : {
        panelChange : this.panelChange,
        clickPanel : this.clickPanel,
        panelHover : this.panelHover
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