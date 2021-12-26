import classNames from "classnames";

export default {
  props : {
    // 小圆点的颜色
    color : {
      type : String,
      default : '#1890ff'
    },
    // 自定义小圆点内容，可以是字符串或者slot
    dot : {
      type : String,
      default : ''
    },
    pending : [String , Boolean],
    pendingSlot : [Object , String],
    prefixCls : String,
    // 是否是最后一个节点
    isLast : Boolean
  },
  methods : {
    renderLine () {
      const h = this.$createElement;
      const { prefixCls , pending , isLast } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-item-tail')
        }
      )
    },
    renderDot () {
      const h = this.$createElement;
      const { prefixCls , color } = this.$props;
      const dot = this.$props.dot || this.$slots.dot;
      if (dot) {
        return h(
          'div',
          {
            class : classNames(prefixCls + '-item-custom'),
            style : {
              borderColor : color,
              color : color
            }
          },
          [dot]
        )
      } else {
        return h(
          'div',
          {
            class : classNames(prefixCls + '-item-dot'),
            style : {
              borderColor : color,
              color : color
            }
          }
        )
      }
    },
    renderContent () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-item-content')
        },
        [this.$slots.default]
      )
    },
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , isLast , pending } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-item' , isLast ? prefixCls + '-item-last' : '')
      },
      [
        isLast && !pending ? null : this.renderLine(),
        this.renderDot(),
        this.renderContent()
      ]
    )
  }
}