import _extends from '@babel/runtime/helpers/extends';
import Popconfirm from './popconfirm';
import classNames from 'classnames';
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
      
    },
    cancel () {

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



// import _extends from '@babel/runtime/helpers/extends';
// import Popconfirm from './popconfirm';
// import classNames from 'classnames';
// import omit from 'omit.js';
// export default {
//   name: 'Popconfirm',
//   props: {
//     title: {
//       type: [String, Object],
//       default: ''
//     },
//     okText: {
//       type: String,
//       default: '确定'
//     },
//     cancelText: {
//       type: String,
//       default: '取消'
//     },
//     icon: {
//       type: [String, Object],
//       default: 'warning'
//     },
//     placement: {
//       type: String,
//       default: ''
//     },
//     prefixCls: {
//       type: String,
//       default: 'ca-popconfirm'
//     }
//   },
//   data() {
//     return {
//       visible: false
//     }
//   },
//   methods: {
//     renderContent(prefixCls) {
//       let { title, icon, placement } = this.$props;
//       const h = this.$createElement;
//       if (!title) {
//         title = this.$slots.title;
//       };
//       return h(
//         'div',
//         [
//           h(
//             'div',
//             {
//               class: classNames(prefixCls, `${prefixCls}-${placement}`),
//             },
//             [
//               h(
//                 'div',
//                 {
//                   class: prefixCls + '-content'
//                 },
//                 [
//                   h(
//                     'div',
//                     {
//                       class: prefixCls + '-message'
//                     },
//                     [
//                       h(
//                         'i',
//                         {
//                           class: 'iconfont icon-' + icon + ' ' + prefixCls + '-' + icon
//                         }
//                       ),
//                       h(
//                         'div',
//                         {
//                           class: prefixCls + '-title'
//                         },
//                         [title]
//                       )
//                     ]
//                   ),
//                   h(
//                     'div',
//                     {
//                       class: prefixCls + '-button'
//                     },
//                     [
//                       h(
//                         'button',
//                         {
//                           class: prefixCls + '-ok',
//                           on: {
//                             click: this.confirm
//                           }
//                         },
//                         [this.$props.okText]
//                       ),
//                       h(
//                         'button',
//                         {
//                           class: prefixCls + '-cancel',
//                           on: {
//                             click: this.cancel
//                           }
//                         },
//                         [this.$props.cancelText]
//                       )
//                     ]
//                   )
//                 ]
//               )
//             ]
//           )
//         ]
//       )
//     },
//     onVisibleChange (visible) {
//       this.visible = visible;
//       this.$emit('visibleChange' , visible);
//     }
//   },
//   render() {
//     const h = this.$createElement;
//     const props = this.$props;
//     const content = this.renderContent(props.prefixCls);
//     // 除去这几个属性，因为这几个属性只会在这里会使用到，其他地方用不到
//     const otherProps = omit(props , ['title' , 'cancelText' , 'okText']);
//     const popconfirmProps = {
//       props : _extends({} , otherProps , {
//         visible : this.visible,
//         prefixCls : props.prefixCls
//       }),
//       on : {
//         visibleChange : this.onVisibleChange
//       }
//     }
//     return h(
//       Popconfirm,
//       popconfirmProps,
//       [
//         h(
//           'template',
//           {slot : 'title'},
//           [content]
//         ),
//         this.$slots.default
//       ]
//     )
//   }
// }