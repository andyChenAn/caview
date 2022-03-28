import TimePicker from './timepicker';
import TimePanel from './timePanel';
import TimeInput from './timeInput';
import omit from 'omit.js';
import _extends from '@babel/runtime/helpers/extends';
import classNames from 'classnames';
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
    return {
      sVisible : sVisible,
      currentDate : currentDate,
      currentTime : ''
    }
  },
  methods : {
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
        prefixCls : prefixCls
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