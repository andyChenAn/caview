import classNames from "classnames";

export default {
  props : {
    placeholder : {
      type : String,
      default : '请选择'
    },
    // 数据
    dataSource : {
      type : Array,
      default () {
        return [];
      }
    },
    // 默认选中项
    defaultValue : {
      type : Array,
      default () {
        return [];
      }
    },
    // 选中项
    value : {
      type : Array,
      default () {
        return [];
      }
    },
    prefixCls : {
      type : String,
      default : 'ca-cascader'
    }
  },
  data () {
    const { value , defaultValue } = this.$props;
    const sValue = value.length > 0 ? value : defaultValue.length > 0 ? defaultValue : [];
    const placeHolderText = this.$props.placeholder;
    return {
      sValue : sValue,
      placeHolderText : placeHolderText,
      showPopup : false
    }
  },
  watch : {
    value (newVal) {
      this.sValue = newVal;
    }
  },
  methods : {
    renderInput () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const placeholder = this.getPlaceholder();
      return h(
        'input',
        {
          class : classNames(prefixCls + '-input'),
          attrs : {
            placeholder : placeholder,
            readonly : true,
            type : 'text'
          }
        }
      )
    },
    renderValue () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const value = this.getValue();
      return h(
        'span',
        {
          class : classNames(prefixCls + '-value')
        },
        [value]
      )
    },
    renderArrow () {
      const h =this.$createElement;
      const { prefixCls } = this.$props;
      return h(
        'i',
        {
          class : classNames('iconfont icon-arrow-down' , prefixCls + '-arrow')
        }
      )
    },
    getValue () {
      let { sValue } = this.$data;
      return sValue.join(' / ');
    },
    getPlaceholder () {
      const { placeholder } = this.$props;
      const { sValue } = this.$data;
      return sValue.length > 0 ? '' : placeholder
    },
    handleClick () {
      const h = this.$createElement;
      
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls),
        on : {
          click : this.handleClick
        }
      },
      [
        this.renderInput(),
        this.renderValue(),
        this.renderArrow()
      ]
    )
  }
}