import classNames from "classnames";
export default {
  props : {
    checked : Boolean,
    defaultChecked : Boolean,
    autoFocus : Boolean,
    disabled : Boolean,
    prefixCls : String,
    name : String,
    text : String,
    type : {
      type : String,
      default : 'checkbox'
    },
    indeterminate : Boolean
  },
  inject : {
    checkboxGroupContext : {
      default () {
        return undefined;
      }
    }
  },
  data () {
    const { checked , defaultChecked , text } = this.$props;
    const c = checked || defaultChecked || false;
    return {
      sChecked : c,
    }
  },
  watch : {
    checked (newVal) {
      this.sChecked = newVal;
    },
  },
  methods : {
    handleClick (evt) {
      this.sChecked = !this.sChecked;
      this.$emit('change' , this.sChecked);
      if (this.checkboxGroupContext) {
        if (this.sChecked) {
          // 添加
          this.checkboxGroupContext.addValue(evt.target.value);
        } else {
          // 删除
          this.checkboxGroupContext.removeValue(evt.target.value);
        }
      }
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , type , disabled , name , text , indeterminate } = this.$props;
    const { sChecked } = this.$data;
    return h(
      'span',
      {
        class : classNames(prefixCls , sChecked ? prefixCls + '-checked' : '' , disabled ? prefixCls + '-disabled' : '' , indeterminate && !sChecked ? prefixCls + '-indeterminate' : '')
      },
      [
        h(
          'input',
          {
            attrs : {
              type : type,
              disabled : disabled,
              name : name,
              value : text
            },
            class : classNames(prefixCls + '-input'),
            on : {
              click : this.handleClick
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-content')
          }
        )
      ]
    )
  }
}