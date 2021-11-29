import classNames from "classnames";
import HeaderCol from './headerCol';
export default {
  props : {
    columns : {
      type : Array,
      default () {
        return []
      }
    },
    prefixCls : String
  },
  methods : {
    renderHeaderCol (prefixCls) {
      const h = this.$createElement;
      const { columns } = this.$props;
      let ths = [];
      columns.forEach(col => {
        const headerColProps = {
          props : {
            colData : col,
            prefixCls : prefixCls
          }
        };
        ths.push(h(
          'th',
          {
            attrs : {
              key : col.key
            }
          },
          [
            h(
              HeaderCol,
              headerColProps
            )
          ]
        ))
      });
      return ths;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'thead',
      {
        class : classNames(prefixCls + '-thead')
      },
      [
        h(
          'tr',
          [
            this.renderHeaderCol(prefixCls)
          ]
        )
      ]
    )
  }
}