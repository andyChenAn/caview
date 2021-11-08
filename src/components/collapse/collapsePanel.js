import classNames from "classnames";
const noop = function () {};
export default {
  props : {
    header : {
      type : [String , Object],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-collapse'
    },
    isActive : {
      type : Boolean,
      default : false
    },
    accordion : {
      type : Boolean,
      default : false
    },
    expandIcon : {
      type : Function,
      default : noop
    }
  },
  data () {
    return {

    }
  },
  methods : {
    renderCollapseHeader (prefixCls) {
      const h = this.$createElement;
      let { header } = this.$props;
      header = header || this.$slots.header;
      if (header) {
        return h(
          'div',
          {
            class : classNames(prefixCls + '-header')
          },
          [header]
        )
      };
      return null;
    },
    renderCollapseContent (prefixCls) {
      const h = this.$createElement;
      const { isActive } = this.$props;
      return h(
        'transition',
        {
          attrs : {
            name : 'collapse-slide'
          }
        },
        [
          h(
            'div',
            {
              directives : [
                {
                  name : 'show',
                  value : isActive
                }
              ],
              class : classNames(prefixCls + '-content')
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-content-inner')
                },
                [this.$slots.default]
              )
            ]
          )
        ]
      )
    }
  },
  render () {
    const { prefixCls } = this.$props;
    const h = this.$createElement;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-item')
      },
      [
        this.renderCollapseHeader(prefixCls),
        this.renderCollapseContent(prefixCls)
      ]
    )
  }
}