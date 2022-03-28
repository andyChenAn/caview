import TimePicker from './timepicker';
import omit from 'omit.js';
import _extends from '@babel/runtime/helpers/extends';
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-time-picker'
    },
    // 默认时间
    defaultValue : Date,
    value : Date,
    open : {
      type : Boolean,
      default : false
    },
    // 时间格式，hh表示小时，mm表示分钟，ss表示秒
    format : {
      type : String,
      default : 'hh:mm:ss'
    }
  },
  data () {
    const { open , defaultValue , value } = this.$props;
    const sVisible = !!open || false;
    let currentDate = value ? value : defaultValue ? defaultValue : new Date();
    return {
      sVisible : sVisible,
      currentDate : currentDate
    }
  },
  render () {
    const h = this.$createElement;
    const timePickerProps = {
      props : _extends({} , omit(this.$props , ['defaultValue' , 'value' , 'open']) , {
        currentDate : this.currentDate
      })
    }
    return h(
      TimePicker,
      timePickerProps
    )
  }
}