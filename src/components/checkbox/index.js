import classNames from 'classnames';
import _extends from '@babel/runtime/helpers/extends';
import Checkbox from './checkbox';
export default {
  props : {
    checked : Boolean,
    defaultChecked : Boolean,
    autoFocus : Boolean,
    disabled : Boolean,
    prefixCls : {
      type : String,
      default : 'ca-checkbox'
    }
  },
  render () {
    const h = this.$createElement;
    const children = this.$slots.default;
    const { prefixCls } = this.$props;
    const checkboxProps = {
      props : _extends({} , this.$props)
    };
    return h(
      'label',
      {
        class : classNames(prefixCls + '-wrap')
      },
      [
        h(
          Checkbox,
          checkboxProps
        ),
        children !== undefined && h(
          'span',
          [children]
        )
      ]
    )
  }
}