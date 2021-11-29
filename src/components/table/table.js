import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
import Loading from '../loading';
import THead from './tHead';
import TBody from './tBody';
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
  methods : {
    renderTable (prefixCls) {
      const h = this.$createElement;
      const { size } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls , prefixCls + '-' + size)
        },
        [
          this.renderTableTitle(prefixCls),
          this.renderTableContent(prefixCls)
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
      return h(
        'div',
        {
          class : classNames(prefixCls + '-content')
        },
        [
          this.renderTableBody(prefixCls),
          this.renderTableFooter(prefixCls)
        ]
      )
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
    console.log(loadingProps)
    return h(
      'div',
      {
        class : classNames(prefixCls + '-wrap')
      },
      [
        this.renderTable(prefixCls)
      ]
    )
  }
}