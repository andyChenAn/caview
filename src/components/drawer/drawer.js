const currentDrawer = {};
const Drawer = {
  props : {
    title : {
      type : String,
      default : ''
    },
    headerStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    mask : {
      type : Boolean,
      default : true
    },
    maskClosable : {
      type : Boolean,
      default : true
    },
    maskStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    getContainer : {
      type : [Function , String],
      default : 'body'
    },
    width : {
      type : [String , Number],
      default : 256
    },
    height : {
      type : [String , Number],
      default : 256
    },
    placement : {
      type : String,
      default : 'right'
    },
    prefixClass : {
      type : String,
      default : 'ca-drawer'
    },
    closable : {
      type : Boolean,
      default : true
    },
    zIndex : {
      type : [String , Number],
      default : 1000
    }
  },
  render (h) {
    return h('div' , {} , [this.$slots['default']]);
  }
};
export default Drawer;