import classNames from "classnames";
export default {
  props : {
    placement : {
      type : String,
      default : ''
    },
    prefixCls : {
      type : String,
      default : ''
    },
    visible : {
      type : Boolean,
      default : false
    }
  },
  mounted () {
    this.$nextTick(() => {
      const el = this.$el;
      this.$emit('align' , el);
    })
  },
  methods : {
    onMousedown () {
      this.$emit('popupMousedown');
    }
  },
  render () {
    const h = this.$createElement;
    const { placement , prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls , prefixCls + '-placement-' + placement),
        on : {
          mousedown : this.onMousedown
        }
      },
      [
        h(
          'div',
          {
            class : prefixCls + '-content'
          },
          [
            h(
              'div',
              {
                class : prefixCls + '-arrow'
              }
            ),
            h(
              'div',
              {
                class : prefixCls + '-inner'
              },
              [this.$slots.default]
            )
          ]
        )
      ]
    )
  }
}