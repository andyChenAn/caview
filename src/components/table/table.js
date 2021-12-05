import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
import THead from './tHead';
import TBody from './tBody';
import ColumnManager from './columnManager';
export default {
  props : {
    columns : {
      type : Array,
      default () {
        return []
      }
    },
    dataSource : {
      type : Array,
      default () {
        return []
      }
    },
    pagination : {
      type : [Object , Boolean],
      default : false
    },
    // 表格的尺寸，可以是default,small,middle
    size : {
      type : String,
      default : 'default'
    },
    prefixCls : {
      type : String,
      default : 'ca-table'
    },
    // 如果是obejct，那么loading就是Loading组件所需的那些配置项
    loading : {
      type : [Object , Boolean],
      default : false
    },
  },
  data () {
    return {
      columnManager : new ColumnManager(this.columns)
    }
  },
  provide () {
    return {
      table : this
    }
  },
  methods : {
    renderLeftFixedTable (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-fixed-left')
        },
        [
          this.renderTable({
            columns : this.columnManager.getLeftColumns(),
            fixed : 'left'
          })
        ]
      )
    },
    renderRightFixedTable (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-fixed-right')
        },
        [
          this.renderTable({
            columns : this.columnManager.getRightColumns(),
            fixed : 'right'
          })
        ]
      )
    },
    renderTable (options) {
      const h = this.$createElement;
      const { columns , fixed } = options;
      const tableHeadProps = {
        props : _extends({} , {
          fixed : fixed,
          columns : columns,
          key : 'head'
        })
      };
      const tableBodyProps = {
        props : _extends({} , {
          columns : columns,
          fixed : fixed
        })
      }
      const tableHead = h(
        THead,
        tableHeadProps,
      );
      const tableBody = h(
        TBody,
        tableBodyProps
      );
      return [tableHead , tableBody];
    },
    renderTableWrap (prefixCls) {
      const h = this.$createElement;
      const { size } = this.$props;
      const hasFixedLeft = this.columnManager.isColumnsLeftFixed();
      const hasFixedRight = this.columnManager.isColumnsRightFixed();
      return h(
        'div',
        {
          class : classNames(prefixCls , prefixCls + '-' + size)
        },
        [
          this.renderTableTitle(prefixCls),
          h(
            'div',
            {
              class : classNames(prefixCls + '-content')
            },
            [
              this.renderTableContent(prefixCls),
              hasFixedLeft && this.renderLeftFixedTable(prefixCls),
              hasFixedRight && this.renderRightFixedTable(prefixCls)
            ]
          )
        ]
      )
    },
    renderTableTitle (prefixCls) {
      const title = this.$scopedSlots.title;
      const h = this.$createElement;
      return title && typeof title === 'function' ? title(this.$props.dataSource) : null;
    },
    renderTableContent (prefixCls) {
      const h = this.$createElement;
      const { columns } = this.$props;
      const isColumnsFixed = this.columnManager.isColumnsFixed();
      const scrollable = isColumnsFixed;
      const table = [
        this.renderTable({
          columns : columns,
          isColumnsFixed : isColumnsFixed
        }),
        this.renderTableFooter(prefixCls)
      ]
      return scrollable ? h(
        'div',
        {
          class : classNames(prefixCls + '-scroll')
        },
        [table]
      ) : table;
    },
    renderTableBody (prefixCls) {
      const h = this.$createElement;
      return h(
        'table',
        [
          this.renderTableTHead(prefixCls),
          this.renderTableTbody(prefixCls)
        ]
      )
    },
    renderTableTHead (prefixCls) {
      const h = this.$createElement;
      const { columns } = this.$props;
      const tHeadProps = {
        props : {
          columns : columns,
          prefixCls : prefixCls
        }
      }
      return h(
        THead,
        tHeadProps
      )
    },
    renderTableTbody (prefixCls) {
      const h = this.$createElement;
      const { dataSource } = this.$props;
      const tBodyProps = {
        props : {
          dataSource : dataSource,
          prefixCls : prefixCls
        }
      }
      return h(
        TBody,
        tBodyProps
      )
    },
    renderTableFooter (prefixCls) {
      const h = this.$createElement;
      const footer = this.$scopedSlots.footer;
      return footer && typeof footer === 'function' ? footer(this.$props.dataSource) : null;
    }
  },
  render () {
    const h =this.$createElement;
    const { loading , prefixCls } = this.$props;
    const loadingProps = {
      props : _extends({} , typeof loading === 'boolean' ? {loading} : loading)
    }
    return h(
      'div',
      {
        class : classNames(prefixCls + '-wrap')
      },
      [
        this.renderTableWrap(prefixCls)
      ]
    )
  }
}