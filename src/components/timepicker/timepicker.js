import Trigger from '../utils/trigger';
export default {
  props : {
    prefixCls : String,
    format : String,
    clearable : Boolean,
    placeholder : String,
    currentDate : Date,
    visible : Boolean,
  },
  methods : {
    popupVisibleChange (visible) {
      this.$emit('visibleChange' , visible);
      this.$emit('visibleChange1' , visible);
    }
  },
  render () {
    const { prefixCls , visible } = this.$props;
    const h = this.$createElement;
    const triggerProps = {
      props : {
        action : 'click',
        prefixCls : prefixCls,
        visible : visible,
        placement : 'bottomLeft',
        transitionName : 'scaleTop'
      },
      on : {
        popupVisibleChange : this.popupVisibleChange
      }
    }
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