export default {
  props : {
    // 激活的tab面板
    activeKey : String,
    // 默认激活的tab面板
    defaultActiveKey : String,
    // tab尺寸
    size : {
      type : String,
      default : 'default'
    },
    // tab bar位置，可以是top,left,bottom,right
    tabPosition : {
      type : String,
      default : 'top'
    },
    // tab bar之间的间距
    tabBarGutter : {
      type : Number,
      default : 0
    },
    // tab bar的样式
    tabBarStyle : Object,
    // tab类型,支持line,card
    type : {
      type : String,
      default : 'line'
    }
  },
  render () {
    const h = this.$createElement;
  }
}