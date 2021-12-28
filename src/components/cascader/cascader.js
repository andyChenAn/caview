export default {
  props : {
    placeholder : {
      type : String,
      default : '请选择'
    },
    // 数据
    dataSource : {
      type : Array,
      default () {
        return [];
      }
    },
    // 默认选中项
    defaultValue : {
      type : Array,
      default () {
        return [];
      }
    },
    // 选中项
    value : {
      type : Array,
      default () {
        return [];
      }
    },
    prefixCls : {
      type : String,
      default : 'ca-cascader'
    },
    children : Object,
    popupVisible : {
      type : Boolean,
      default : false
    }
  },
  render () {
    const h = this.$createElement;
    
  }
}