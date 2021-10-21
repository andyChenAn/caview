import _extends from '@babel/runtime/helpers/extends';
import Popconfirm from './popconfirm';
import omit from 'omit.js';
export default {
  props : {
    title : String,
    okText : {
      type : String,
      default : '确定'
    },
    cancelText : {
      type : String,
      default : '取消'
    },
    placement : {
      type : String,
      default : 'top'
    },
    prefixCls : {
      type : String,
      default : 'ca-popconfirm'
    }
  },
  data () {
    return {
      sVisible : false
    }
  },
  methods : {
    renderContent (prefixCls) {
      const h = this.$createElement;
      let { title } = this.$props;
      if (!title) {
        title = this.$slots.title;
      }
      return h(
        'div',
        {
          class : prefixCls + '-inner-content'
        },
        [
          h(
            'div',
            {
              class : prefixCls + '-message'
            },
            [
              h(
                'div',
                {
                  class : prefixCls + '-message-title'
                },
                [title]
              )
            ]
          ),
          h(
            'div',
            {
              class : prefixCls + '-buttons'
            },
            [
              h(
                'button',
                {
                  class: prefixCls + '-ok',
                  on: {
                    click: this.confirm
                  }
                },
                [this.$props.okText]
              ),
              h(
                'button',
                {
                  class: prefixCls + '-cancel',
                  on: {
                    click: this.cancel
                  }
                },
                [this.$props.cancelText]
              )
            ]
          )
        ]
      )
    },
    confirm () {
      this.setVisible(true);
    },
    cancel () {
      this.setVisible(false);
    },
    onVisibleChange (visible) {
      this.setVisible(visible);
    },
    setVisible (visible) {
      this.sVisible = visible;
      this.$emit('visibleChange' , visible);
    }
  },
  render () {
    const h = this.$createElement;
    const title = this.renderContent(this.$props.prefixCls);
    const props = omit(this.$props , ['title' , 'okText' , 'cancelText']);
    const popconfirmProps = {
      props : _extends({} , props , {
        visible : this.sVisible
      }),
      on : {
        visibleChange : this.onVisibleChange
      }
    }
    return h(
      Popconfirm,
      popconfirmProps,
      [
        h(
          'template',
          {slot : 'title'},
          [title]
        ),
        this.$slots.default
      ]
    )
  }
};