import classNames from "classnames";
import HeaderCol from './headColumn';
export default {
  props : {
    columns : {
      type : Array,
      default () {
        return []
      }
    },
    fixed : {
      type : [String , Boolean],
      default : ''
    }
  },
  inject : {
    table : {
      default : {},
      from : 'table'
    }
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
    const prefixCls = this.table.prefixCls;
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