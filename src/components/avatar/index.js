import classNames from "classnames";

export default {
  props : {
    // 图像形状，可以是circle或者square，默认为circle
    shape : {
      type : String,
      default : 'circle'
    },
    // 图像尺寸大小，可以是数字，也可以是字符串（small , large , default）
    size : {
      type : [String , Number],
      default : 'default'
    },
    // 图片地址
    src : {
      type : String,
      default : ''
    },
    // 图标类型
    icon : {
      type : String,
      default : ''
    },
    srcSet : String,
    // 处理图片加载失败的回调
    loadError : Function,
    // 图片加载失败时，需要展示的内容
    alt : String,
    prefixCls : {
      type : String,
      default : 'ca-avatar'
    }
  },
  data () {
    return {
      scale : 1
    }
  },
  mounted () {

  },
  methods : {
    setScale () {

    },
    handleError () {
      const { loadError } = this.$props;
      if (loadError && typeof loadError === 'function') {
        loadError();
      }
    }
  },
  render () {
    const h = this.$createElement;
    let { prefixCls , size , src , shape , alt } = this.$props;
    let sizeStyle = {}
    if (typeof size == 'number') {
      sizeStyle = {
        width : size + 'px',
        height : size + 'px',
        lineHeight : size + 'px',
        fontSize : '18px'
      }
    };
    let children = this.$slots.default;
    if (src) {
      children = h(
        'img',
        {
          attrs : {
            src : src,
            alt : alt
          },
          on : {
            error : this.handleError
          }
        }
      )
    } else {
      children = h(
        'span',
        {
          class : prefixCls + '-text',
          ref : 'avatarChildNode'
        },
        [children]
      )
    }
    return h(
      'span',
      {
        class : classNames(prefixCls , typeof size === 'string' ? prefixCls + '-' + size : null , prefixCls + '-' + shape , src ? prefixCls + '-img' : null),
        style : sizeStyle,
        ref : 'avatarNode'
      },
      [children]
    )
  }
}