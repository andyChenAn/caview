import classNames from "classnames";
import Cascader from './cascader';
import _extends from '@babel/runtime/helpers/extends';
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
    },
    popupVisible : {
      type : Boolean,
      default : false
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
    getContent () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls)
        },
        [
          this.renderInput(),
          this.renderValue(),
          this.renderArrow()
        ]
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
    getPopupContent () {
      const h = this.$createElement;
      return h(
        
      )
    }
  },
  render () {
    const h =this.$createElement;
    const children = this.getContent();
    const cascaderProps = {
      props : _extends({} , this.$props , {
        children : children
      })
    }
    return h(
      Cascader,
      cascaderProps,
      [
        h(
          'template',
          {
            slot : 'popup'
          },
          [this.getPopupContent()]
        )
      ]
    )
  }
}