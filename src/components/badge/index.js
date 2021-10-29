import classNames from 'classnames';
import omit from 'omit.js';
import ScrollNumber from './scrollNumber';
export default {
  props : {
    // 数字
    count : {
      type : [Number , String],
      default : 0
    },
    // 小圆点颜色
    color : {
      type : String,
      default : ''
    },
    // 偏移量
    offset : {
      type : Array,
      default () {
        return []
      }
    },
    prefixCls : {
      type : String,
      default : 'ca-badge'
    },
    // 最大值
    maxCount : {
      type : [Number , String],
      default : 99
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    let children = null;
    if (this.$slots.default) {
      children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
    }
    const scrollNumberProps = omit(this.$props , ['color' , 'offset' , 'prefixCls']);
    return h(
      'span',
      {
        class : classNames(prefixCls)
      },
      [
        children,
        h(
          ScrollNumber,
          {
            props : scrollNumberProps
          },
        )
      ]
    )
  }
};