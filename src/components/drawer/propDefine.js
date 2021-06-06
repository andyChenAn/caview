export default {
  // 是否显示关闭按钮
  closable : {
    type : Boolean,
    default : true
  },
  // 是否允许点击遮罩层关闭抽屉
  maskClosable : {
    type : Boolean,
    default : true
  },
  // 抽屉组件的挂载点，默认是body，如果是函数的话，返回值必须是一个html元素
  getContainer : {
    type : [String , Function],
    default : 'body'
  },
  // 是否显示遮罩层
  mask : {
    type : Boolean,
    default : true
  },
  // 遮罩层样式
  maskStyle : {
    type : Object,
    default () {
      return {}
    }
  },
  // 抽屉组件的标题
  title : '',
  // 是否显示抽屉组件
  visible : {
    type : Boolean,
    default : false
  },
  // 抽屉组件的宽度，默认就是本身内容的宽度
  width : {
    type : [String , Number],
    default : ''
  },
  // 抽屉组件的高度，默认就是本身内容的高度
  height : {
    type : [String , Number],
    default : ''
  },
  // 抽屉组件的展示方向，bottom，top，left，right
  placement : {
    type : String,
    default : 'right'
  },
  // 抽屉组件的层级
  zIndex : {
    type : [String , Number],
    default : 100
  },
  // 抽屉组件的样式类前缀
  prefixCls : {
    type : String,
    default : 'ca-drawer'
  },
  // 抽屉body样式
  bodyStyle : {
    type : Object,
    default () {
      return {}
    }
  },
  // 抽屉header样式
  headerStyle : {
    type : Object,
    default () {
      return {}
    }
  },
  // 抽屉最外层样式
  wrapStyle : {
    type : Object,
    default () {
      return {}
    }
  }
}