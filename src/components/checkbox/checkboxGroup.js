import classNames from "classnames";
import Checkbox from './index';
export default {
  props : {
    options : {
      type : Array,
      default () {
        return [];
      }
    },
    disabled : Boolean,
    defaultValue : {
      type : Array,
      default () {
        return [];
      }
    },
    value : {
      type : Array,
      default () {
        return [];
      }
    },
    name : {
      type : String,
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-checkbox-group'
    }
  },
  model : {
    prop : 'value',
    event : 'change'
  },
  data () {
    const { value , defaultValue } = this.$props;
    const sValue = value.length > 0 ? value : defaultValue;
    return {
      sValue : sValue
    }
  },
  provide : function () {
    return {
      checkboxGroupContext : this
    }
  },
  watch : {
    value (newVal) {
      this.sValue = newVal;
    }
  },
  methods : {
    addValue (value) {
      this.sValue = this.sValue.concat([value]);
    },
    removeValue (value) {
      this.sValue = this.sValue.filter(item => item !== value);
    },
    getCheckboxList () {
      const { options , prefixCls , disabled } = this.$props;
      const h = this.$createElement;
      const checkboxList = [];
      options.forEach(item => {
        const checkboxProps = {
          class : classNames(prefixCls + '-item'),
          attrs : {
            disabled : disabled,
            checked : this.check(item)
          },
          on : {
            change : this.handleChange
          }
        };
        checkboxList.push(
          h(
            Checkbox,
            checkboxProps,
            [typeof item === 'string' ? item : item.label]
          )
        )
      });
      return checkboxList;
    },
    handleChange (value) {
      
    },
    check (item) {
      if (typeof item === 'string') {
        return this.sValue.indexOf(item) > -1;
      } else {
        return this.sValue.indexOf(item.label) > -1;
      }
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls)
      },
      [this.getCheckboxList()]
    )
  }
}