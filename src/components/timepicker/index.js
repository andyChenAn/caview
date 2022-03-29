import TimePicker from './timepicker';
import TimePanel from './timePanel';
import TimeInput from './timeInput';
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
    },
    placeholder : {
      type : String,
      default : '选择时间'
    }
  },
  data () {
    const { open , defaultValue , value } = this.$props;
    const sVisible = !!open || false;
    let currentDate = value ? value : defaultValue ? defaultValue : new Date();
    let currentTime = this.getCurrentTime();
    return {
      sVisible : sVisible,
      currentDate : currentDate,
      currentTime : currentTime
    }
  },
  watch : {
    defaultValue (newVal) {
      this.currentTime = this.getCurrentTime();
      this.currentDate = newVal;
    },
    value (newVal) {
      this.currentTime = this.getCurrentTime();
      this.currentDate = newVal;
    },
    open (newVal) {
      if (newVal) {
        this.currentTime = this.getCurrentTime();
        this.currentDate = newVal;
      }
    }
  },
  methods : {
    getCurrentTime () {
      const { defaultValue , value } = this.$props;
      let now = value ? value : defaultValue ? defaultValue : '';
      if (now) {
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        hours = hours > 9 ? hours : '0' + hours;
        minutes = minutes > 9 ? minutes : '0' + minutes;
        seconds = seconds > 9 ? seconds : '0' + seconds;
        const len = this.format.split(':').length;
        now = [hours , minutes , seconds].slice(0 , len).join(':');
      };
      return now;
    },
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
    handleInput (value) {
      if (!value) {
        this.currentTime = '';
      }
      if (this.checkValue(value)) {
        this.currentTime = value;
        this.$emit('change' , value);
      }
    },
    checkValue (value) {
      const reg = /^\d{2}$/;
      let res = true;
      value = value.split(':').map(Number);
      if (value.length <= 1) {
        return false;
      };
      if (value.length > 3) {
        return false;
      }
      for (let i = 0 ; i < value.length ; i++) {
        if (!reg.test(value[i])) {
          res = false;
          break;
        }
      };
      return res;
    },
    handleChange (date) {
      this.currentDate = date;
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      const len = this.format.split(':').length;
      hours = hours > 9 ? hours : '0' + hours;
      minutes = minutes > 9 ? minutes : '0' + minutes;
      seconds = seconds > 9 ? seconds : '0' + seconds;
      const time = [hours , minutes , seconds].slice(0 , len);
      this.currentTime = time.join(':');
      this.$emit('change' , this.currentTime);
    },
    onClear () {
      this.currentTime = '';
      this.currentDate = new Date();
    }
  },
  render () {
    const { prefixCls } = this.$props;
    const h = this.$createElement;
    const timePickerProps = {
      props : _extends({} , omit(this.$props , ['defaultValue' , 'value' , 'open']) , {
        currentDate : this.currentDate,
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      }),
    };
    const timePanelProps = {
      props : {
        currentDate : this.currentDate,
        visible : this.sVisible,
        prefixCls : prefixCls,
        format : this.format
      },
      on : {
        change : this.handleChange
      }
    };
    const timeInputProps = {
      props : {
        prefixCls : prefixCls,
        value : this.currentTime,
        placeholder : this.placeholder,
        format : this.format
      },
      on : {
        input : this.handleInput,
        clear : this.onClear
      }
    };
    return h(
      TimePicker,
      timePickerProps,
      [
        h(
          'template',
          {
            slot : ['popup']
          },
          [
            h(
              TimePanel,
              timePanelProps
            )
          ]
        ),
        h(
          TimeInput,
          timeInputProps
        )
      ]
    )
  }
}