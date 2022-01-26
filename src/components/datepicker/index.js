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
    defaultValue : [Date , String],
    value : [Date , String],
    format : 'YYYY-MM-DD',
    clearable : Boolean,
    autoFocus : Boolean,
    placeholder : {
      type : String,
      default : '请选择'
    },
    open : Boolean
  },
  data () {
    const { defaultValue , value , open } = this.$props;
    const currentDate = value || defaultValue || new Date();
    const sOpen = !!open || false;
    return {
      date : currentDate,
      sVisible : sOpen,
      dateContent : null
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
        placeholder : this.placeholder
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