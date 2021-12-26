import _extends from '@babel/runtime/helpers/extends';
import classNames from "classnames";
import omit from 'omit.js';
import Tooltip from './tooltip';
export default {
  props : {
    title : {
      type : String,
      default : ''
    },
    // 这里允许visible的类型为布尔值和字符串，主要是因为我要通过这个visible来区分组件是不是使用了v-model
    visible : {
      type : [Boolean , String],
      default : ''
    },
    placement : {
      type : String,
      default : 'top'
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
  model : {
    prop : 'visible',
    event : 'visibleChange'
  },
  data () {
    let visible = this.$props.visible || false;
    return {
      sVisible : visible
    }
  },
  methods : {
    // 弹框内容
    renderPopup (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-inner-content')
        },
        [
          this.renderTitle(prefixCls),
        ]
      )
    },
    renderTitle (prefixCls) {
      const h = this.$createElement;
      const title = this.$props.title || this.$slots.title;
      return title ? h(
        'div',
        {
          class : classNames(prefixCls + '-title')
        },
        [title]
      ) : null;
    },
    visibleChange1 (visible) {
      this.sVisible = visible;
      this.$emit('visibleChange' , visible);
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    const popup = this.renderPopup(prefixCls);
    // 这里又来区分组件是否有使用v-model
    let visible = this.visible;
    if (visible !== false) {
      visible = this.sVisible;
    }
    const tooltipProps = {
      props : _extends({} , omit(this.$props , ['title']) , {
        visible : visible
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      })
    }
    return h(
      Tooltip,
      tooltipProps,
      [
        h(
          'template',
          {
            slot : 'popup'
          },
          [popup]
        ),
        this.$slots.default
      ]
    )
  }
}