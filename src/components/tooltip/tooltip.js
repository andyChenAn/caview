import _extends from "@babel/runtime/helpers/extends";
import Trigger from "../utils/trigger";
export default {
  props : {
    placement : {
      type : String,
      default : 'top'
    },
    visible : {
      type : Boolean,
      default : false
    },
    prefixCls : {
      type : String,
      default : 'ca-tooltip'
    },
    trigger : {
      type : String,
      default : 'hover'
    }
  },
  methods : {
    popupVisibleChange (visible) {
      this.$emit('visibleChange' , visible);
      this.$emit('visibleChange1' , visible);
    }
  },
  render () {
    const h = this.$createElement;
    const { trigger } = this.$props;
    const triggerProps = {
      props : _extends({} , this.$props , {
        action : trigger,
      }),
      on : {
        popupVisibleChange : this.popupVisibleChange
      }
    };
    return h(
      Trigger,
      triggerProps,
      [
        h(
          'template',
          {
            slot : 'popup'
          },
          [this.$slots.popup]
        ),
        this.$slots.default
      ]
    )
  }
}