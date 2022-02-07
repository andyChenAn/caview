import omit from 'omit.js';
import _extends from '@babel/runtime/helpers/extends';
import DatePicker from './datePicker';
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
      sVisible : sOpen
    }
  },
  watch : {
    open (newVal) {
      this.sVisible = newVal;
    },
    value (newVal) {
      this.currentDate = newVal;
    }
  },
  methods : {
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
  },
  render () {
    const h =this.$createElement;
    const datePickerProps = {
      props : _extends({} , omit(this.$props , ['value' , 'defaultValue' , 'open']) , {
        currentDate : this.currentDate,
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      }),
    };
    return h(
      DatePicker,
      datePickerProps
    )
  }
}