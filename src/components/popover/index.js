import _extends from '@babel/runtime/helpers/extends';
import classNames from "classnames";
import omit from 'omit.js';
import Popover from './popover';
export default {
  props : {
    title : {
      type : String,
      default : ''
    },
    content : {
      type : String,
      default : ''
    },
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
      default : 'ca-popover'
    },
    trigger : {
      type : String,
      default : 'click'
    }
  },
  model : {
    prop : 'visible',
    event : 'visibleChange'
  },
  data () {
    let visible = this.visible || false;
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
          this.renderContent(prefixCls)
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
    renderContent (prefixCls) {
      const h = this.$createElement;
      const content = this.$props.content || this.$slots.content;
      return content ? h(
        'div',
        {
          class : classNames(prefixCls + '-inner-box')
        },
        [content]
      ) : null;
    },
    visibleChange (visible) {
      this.sVisible = visible;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    const popup = this.renderPopup(prefixCls);
    const popoverProps = {
      props : _extends({} , omit(this.$props , ['title' , 'content']) , {
        visible : this.sVisible
      }),
      on : {
        visibleChange : this.visibleChange
      }
    }
    return h(
      Popover,
      popoverProps,
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