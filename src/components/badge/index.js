import omit from 'omit.js';
import ScrollNumber from './scrollNumber';
export default {
  props : {
    // 数字
    count : {
      type : Number,
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
      type : Number,
      default : 99
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , count } = this.$props;
    let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
    const scrollNumberProps = omit(this.$props , ['color' , 'offset' , 'prefixCls']);
    console.log(scrollNumberProps);
    return h(
      'span',
      {
        class : prefixCls
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