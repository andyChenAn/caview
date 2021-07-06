import classnames from 'classnames';
import _extends from '@babel/runtime/helpers/extends';
import Popconfirm from './popconfirm';
export default {
  name: 'Popconfirm',
  props: {
    // 标题
    title: '',
    // 确认按钮的文本描述
    okText: '确认',
    // 取消按钮的文本描述
    cancelText: '取消',
    // 图标
    icon: '',
    // 点击取消按钮的回调
    cancel: Function,
    // 点击确认按钮的回调
    confirm: Function,
    // 显示与隐藏的回调
    visibleChange: Function,
    // 位置
    placement: {
      type: String,
      default: 'top'
    },
    // 是否显示气泡确认框
    visible: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'ca-popover'
    }
  },
  methods : {
    renderContent (prefixCls) {
      const h = this.$createElement;
      let { title , icon , okText , cancelText } = this.$props;
      if (!title) {
        title = this.$slots.title;
      };
      if (!okText) {
        okText = this.$slots.okText
      };
      if (!cancelText) {
        cancelText = this.$slots.cancelText;
      }
      return h(
        'div',
        {
          class : prefixCls + '-content'
        },
        [
          h(
            'div',
            {
              class : prefixCls + '-message'
            },
            [
              h(
                'i',
                {
                  class : 'iconfont icon-' + icon + ' ' + prefixCls + '-' + icon
                }
              ),
              h(
                'div',
                {
                  class : prefixCls + '-title'
                },
                [title]
              )
            ]
          ),
          h(
            'div',
            {
              class : prefixCls + '-button'
            },
            [
              h(
                'button',
                {
                  class : prefixCls + '-ok',
                  on : {
                    click : this.confirm
                  }
                },
                [okText]
              ),
              h(
                'button',
                {
                  class : prefixCls + '-cancel',
                  on : {
                    click : this.cancel
                  }
                },
                [cancelText]
              )
            ]
          )
        ]
      )
    }
  },
  render() {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    const content = this.renderContent(prefixCls);
    return h(
      Popconfirm,
      {
        props : this.$props
      },
      [
        h(
          'template',
          { slot : 'title' },
          [content]
        ),
        this.$slots.default
      ]
    )
  }
}