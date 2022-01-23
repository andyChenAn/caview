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
    handleClick () {
      this.sChecked = !this.sChecked;
      this.$emit('change' , this.sChecked);
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , type , disabled , name } = this.$props;
    const { sChecked } = this.$data;
    return h(
      'span',
      {
        class : classNames(prefixCls , sChecked ? prefixCls + '-checked' : '' , disabled ? prefixCls + '-disabled' : '')
      },
      [
        h(
          'input',
          {
            attrs : {
              type : type,
              disabled : disabled,
              name : name
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