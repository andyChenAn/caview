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
  model : {
    prop : 'visible',
  },
  data () {
    const visible = this.$props.visible || false;
    const checked = this.$props.checked || false;
    return {
      sVisible : visible,
      sChecked : checked
    }
  },
  watch : {
    visible (newVal) {
      this.sVisible = newVal;
    },
    checked (newVal) {
      this.sChecked = newVal;
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
      this.sVisible = false;
      this.$emit('close' , evt);
    },
    handleClick (evt) {
      const { checkable } = this.$props;
      const isCheckable = checkable || checkable === '';
      if (isCheckable) {
        this.sChecked = !this.sChecked;
        this.$emit('change' , this.sChecked);
      }
      this.$emit('click' , evt);
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , checkable , color } = this.$props;
    const { sVisible , sChecked } = this.$data;
    const isCheckable = checkable || checkable === '';
    const tag = h(
      'span',
      {
        directives : [
          {
            name : 'show',
            value : sVisible
          }
        ],
        on : {
          click : this.handleClick
        },
        class : classNames(prefixCls , isCheckable ? prefixCls + '-checkable' : '' , sChecked ? prefixCls + '-checked' : '' , color ? prefixCls + '-has-color' : ''),
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