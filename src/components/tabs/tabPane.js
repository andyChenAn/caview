import classNames from "classnames";
export default {
  props : {
    tab : {
      type : String,
      default : ''
    },
    disabled : {
      type : Boolean,
      default : false
    },
    prefixCls : String,
    paneKey : String,
    currentKey : String
  },
  render () {
    const { prefixCls , currentKey , paneKey } = this.$props; 
    const h = this.$createElement;
    return h(
      'div',
      {
        class : classNames(prefixCls+ '-tabpane' , currentKey === paneKey ? prefixCls + '-active-tabpane' : prefixCls + '-inactive-tabpane')
      },
      [this.$slots.default]
    )
  }
}