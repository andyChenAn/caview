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
    // 处理图片加载失败的回调
    loadError : {
      type : Function,
      default : function () {}
    },
    // 图片加载失败时，需要展示的内容
    alt : String,
    prefixCls : {
      type : String,
      default : 'ca-avatar'
    }
  },
  data () {
    return {
      scale : 1,
      imgExist : true
    }
  },
  watch : {
    src () {
      this.$nextTick(() => {
        this.scale = 1;
        this.imgExist = true;
        this.$forceUpdate();
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setScale();
    })
  },
  updated () {
    this.$nextTick(() => {
      this.setScale();
    })
  },
  methods : {
    setScale () {
      const avatarNode = this.$refs.avatarNode;
      const avatarChildNode = this.$refs.avatarChildNode;
      if (!avatarNode || !avatarChildNode) {
        return;
      }
      let avatarWidth = avatarNode.offsetWidth;
      let avatarChildWidth = avatarChildNode.offsetWidth;
      if (avatarWidth == 0 || avatarChildWidth == 0 || this.prevAvatarChildWidth == avatarChildWidth && this.prevAvatarWidth == avatarWidth) {
        return;
      }
      this.prevAvatarWidth = avatarWidth;
      this.prevAvatarChildWidth = avatarChildWidth;
      this.scale = avatarWidth - 8 < avatarChildWidth ? (avatarWidth - 8) / avatarChildWidth : 1;
    },
    handleError () {
      const { loadError } = this.$props;
      if (loadError && typeof loadError === 'function') {
        let flag = loadError();
        if (flag !== false) {
          this.imgExist = false;
        }
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
    if (src && this.imgExist) {
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
          ref : 'avatarChildNode',
          style : {
            transform : `scale(${this.scale}) translateX(-50%)`
          }
        },
        [children]
      )
    }
    return h(
      'span',
      {
        class : classNames(prefixCls , typeof size === 'string' ? prefixCls + '-' + size : null , prefixCls + '-' + shape , src && this.imgExist ? prefixCls + '-img' : null),
        style : sizeStyle,
        ref : 'avatarNode'
      },
      [children]
    )
  }
}