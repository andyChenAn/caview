import _extends from '@babel/runtime/helpers/extends';
import DatePicker from './datePicker';
import Carlendar from './carlendar';
import DateContent from './dateContent';
import omit from 'omit.js';
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-date-picker'
    },
    defaultValue : {
      type : [Date , String],
      default : ''
    },
    value : {
      type : [Date , String],
      default : ''
    },
    clearable : {
      type : Boolean,
      default : true
    },
    autoFocus : {
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
      date : currentDate,
      // 是否显示日期弹框
      sVisible : sOpen,
      // 展示的日期数据
      dateContent : this.value || this.defaultValue || null,
      // 初始日期，主要用于恢复为最开始的默认值
      initDate : currentDate
    }
  },
  watch : {
    open (newVal) {
      this.sVisible = newVal;
    },
    value (newVal) {
      this.date = newVal;
      this.dateContent = newVal;
    }
  },
  methods : {
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('openChange' , visible);
    },
    onSelect (date) {
      this.sVisible = false;
      this.date = date;
      this.dateContent = date;
      this.$emit('change' , date);
    },
    onClear () {
      this.dateContent = null;
      this.date = this.initDate;
    }
  },
  render () {
    const { prefixCls } = this.$props;
    const h = this.$createElement;
    const datePickerProps = {
      props : _extends({} , omit(this.$props , ['defaultValue' , 'value']) , {
        currentDate : this.date,
        visible : this.sVisible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      })
    };
    const carlendarProps = {
      props : {
        date : this.date,
        prefixCls : prefixCls + '-carlendar'
      },
      on : {
        select : this.onSelect
      }
    };
    const dateContentProps = {
      props : {
        clearable : this.clearable,
        value : this.dateContent,
        prefixCls : this.prefixCls,
        placeholder : this.placeholder,
        format : this.formatter
      },
      on : {
        clear : this.onClear
      }
    };
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
              Carlendar,
              carlendarProps
            )
          ]
        ),
        h(
          DateContent,
          dateContentProps
        )
      ]
    )
  }
}