import classNames from "classnames";

// table的thead的单元格
export default {
  props : {
    colData : {
      type : Object,
      default () {
        return {}
      }
    },
    prefixCls : String,
    // 排序函数
    sorter : [Function , Boolean]
  },
  methods : {
    renderCol (prefixCls) {
      const h = this.$createElement;
      const { colData } = this.$props;
      return h(
        'div',
        [
          h(
            'span',
            {
              class : classNames(prefixCls + '-column-title')
            },
            [colData.title]
          )
        ]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-header-column')
      },
      [this.renderCol(prefixCls)]
    )
  }
};