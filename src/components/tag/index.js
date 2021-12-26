import classNames from 'classnames';
export default {
  props : {
    // 标签颜色
    color : {
      type : String,
      default : ''
    },
    // 是否显示标签隐藏按钮
    closable : {
      type : Boolean,
      default : false
    },
    // 是否显示标签
    visible : {
      type : Boolean,
      default : true
    },
    prefixCls : {
      type : String,
      default : 'ca-tag'
    },
    checkable : {
      type : [String , Boolean],
      default : false
    },
    // 是否选中，当只有checkable为true时才生效
    checked : {
      type : Boolean,
      default : false
    }
  },
  methods : {
    getTagStyle () {
      let style = {}
      const { color } = this.$props;
      if (color) {
        style = {
          color : '#fff',
          backgroundColor : color
        }
      };
      return style;
    },
    renderCloseIcon () {
      const h = this.$createElement;
      const { prefixCls , closable } = this.$props;
      return closable && h(
        'i',
        {
          class : classNames('iconfont icon-remove' , prefixCls + '-close-icon'),
          on : {
            click : this.handleClose
          }
        }
      )
    },
    handleClose (evt) {
      this.$emit('close' , evt);
    },
    handleChange () {
      this.$emit('change');
    },
    handleClick () {

    }
  },
  render () {
    const h = this.$createElement;
    const { visible , prefixCls } = this.$props;
    const tag = h(
      'span',
      {
        directives : [
          {
            name : 'show',
            value : visible
          }
        ],
        on : {
          change : this.handleChange,
          click : this.handleClick
        },
        class : classNames(prefixCls),
        style : this.getTagStyle()
      },
      [this.$slots.default , this.renderCloseIcon()]
    );
    return h(
      'transition',
      {
        attrs : {
          appear : false,
          name : classNames(prefixCls + '-zoom')
        }
      },
      [tag]
    )
  }
}