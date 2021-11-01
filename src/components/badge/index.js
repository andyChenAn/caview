import classNames from 'classnames';
import omit from 'omit.js';
import ScrollNumber from './scrollNumber';
export default {
  props : {
    // 数字
    count : {
      type : [Number , String],
      default : ''
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
    },
    // 是否显示0
    showZero : {
      type : Boolean,
      default : false
    },
    // 是否展示小红点
    dot : {
      type : Boolean,
      default : false
    },
    // 标徽状态，可以是success(成功),error(异常),processing(处理中),warning(警告),default(默认)
    status : {
      type : String,
      default : ''
    }
  },
  methods : {
    getDisplayCount () {
      const { count , maxCount } = this.$props;
      return count > maxCount ? maxCount + '+' : count;
    },
    // 是否需要显示标徽，如果showZero为false，获取存在小红点，获取存在slot=count，那么就不显示数字
    isHidden () {
      const { dot , showZero , status } = this.$props;
      const count = this.$slots.count;
      // 如果没有count字段，那么直接返回true
      if (this.$props.count === undefined || this.$props.count === null || this.$props.count === '') {
        return true;
      };
      return dot || (!showZero && !this.$props.count) || count || status;
    },
    // 渲染数字
    renderBadgeNumber () {
      const h = this.$createElement;
      const scrollNumberProps = omit(this.$props , ['prefixCls' , 'showZero' , 'dot' , 'status' , 'maxCount']);
      scrollNumberProps.count = this.getDisplayCount();
      return h(
        'transition',
        {
          attrs : {
            appear : true,
            css : true,
            name : 'badge-zoom'
          }
        },
        [
          h(
            ScrollNumber,
            {
              props : scrollNumberProps
            }
          )
        ]
      )
    },
    // 渲染小红点或者slot=count内容或者status
    renderBadgeText (prefixCls) {
      const h = this.$createElement;
      const { dot , status , color } = this.$props;
      const count = this.$slots.count;
      if (count) {
        return count;
      };
      if (dot || status) {
        return h(
          'transition',
          {
            attrs : {
              appear : true,
              css : true,
              name : 'badge-zoom'
            }
          },
          [
            h(
              'span',
              {
                class : classNames(prefixCls + '-dot' , status ? prefixCls + '-status-' + status : null),
                style : {
                  backgroundColor : color
                }
              }
            )
          ]
        )
      };
      return null;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    let children = null;
    if (this.$slots.default) {
      children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
    }
    const hidden = this.isHidden();
    return h(
      'span',
      {
        class : classNames(prefixCls)
      },
      [
        children,
        hidden ? this.renderBadgeText(prefixCls) : this.renderBadgeNumber(prefixCls)
      ]
    )
  }
};