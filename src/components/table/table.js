import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
import ColumnManager from './columnManager';
import Loading from '../loading';
import Vue from 'vue';
import { flatFilter } from './utils';
function getRowSelection (props) {
  return props.rowSelection || {};
};
function getFilteredValueColumns (columns) {
  return flatFilter(columns , col => {
    return col.filteredValue !== 'undefined';
  })
};
function getColumnKey (column , index) {
  return column.key || column.dataIndex || index;
};
function getFiltersFromColumns (columns) {
  let filters = {};
  getFilteredValueColumns(columns).forEach(col => {
    let colKey = getColumnKey(col);
    filters[colKey] = col.filteredValue;
  });
  return filters;
}
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
    this.store = Vue.observable({
      selectedRowKeys : getRowSelection(this.$props).selectedRowKeys || [],
      selectionDirty : false
    });
    return _extends({} , this.getDefaultSortOrder(this.$props.columns || []) , {
      sFilters : this.getDefaultFilters(this.$props.columns)
    })
  },
  provide () {
    return {
      table : this
    }
  },
  methods : {
    // 获取过滤条件，可以有默认的过滤条件和用于自定义的过滤条件，如果同时存在那么优先使用自定义的
    getDefaultFilters (columns) {
      let filters = getFiltersFromColumns(columns);
      let defaultFilteredValueColumns = flatFilter(columns , col => {
        return typeof col.defaultFilteredValue !== 'undefined';
      });
      const defaultFilters = defaultFilteredValueColumns.reduce((obj , col) => {
        const colKey = getColumnKey(col);
        obj[colKey] = col.defaultFilteredValue;
        return obj;
      } , {});
      return _extends({} , defaultFilters , filters);
    },
    getDefaultSortOrder (columns) {
      // 获取排序状态
      let sortState = this.getSortStateFromColumns(columns);
      // 默认排序的列
      const defaultSortedColumn = flatFilter(columns || [] , col => {
        return col.defaultSortOrder != null;
      })[0];
      // 如果存在默认排序的列，并且不存在其他排序的列，那么就重新更新
      if (defaultSortedColumn && !sortState.sortedColumn) {
        sortState = {
          sSortColumn : defaultSortedColumn,
          sSortOrder : defaultSortedColumn.defaultSortOrder
        }
      };
      return sortState;
    },
    getSortStateFromColumns (columns) {
      // 遍历存在sortOrder字段的columns数据，并返回第一列sortOrder不为假的数据
      // 如果存在排序的话，那么就只能拿其中一列来排序，不能同时有几列来排序，不然都不知道以哪个为准了
      const sortedColumn = this.getSortOrderColumns(columns).filter(col => {
        return col.sortOrder;
      })[0];
      if (sortedColumn) {
        return {
          // 排序的列
          sSortColumn : sortedColumn,
          // 排序方式，升序or降序?
          sSortOrder : sortedColumn.sortOrder
        }
      };
      // 如果没有那么返回null
      return {
        sSortColumn : null,
        sSortOrder : null
      }
    },
    getSortOrderColumns (columns) {
      // 返回每一列中存在sortOrder字段的column数据
      return flatFilter(columns || [] , col => {
        return 'sortOrder' in col;
      })
    },
    getLocalData (state) {
      let filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const currentState = state || this.$data;
      const filters = currentState.sFilters;
      let dataSource = this.$props.dataSource;
      let data = dataSource || [];
      data = data.slice();
      const sortedFn = this.getSorterFn(currentState);
    },
    getSorterFn (state) {
      
    },
    renderTable (prefixCls) {
      const h = this.$createElement;
      const data = this.getCurrentPageData();

    },
    getCurrentPageData () {
      const data = this.getLocalData();
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , loading } = this.$props;
    const loadingProps = {
      props : _extends({} , typeof loading === 'boolean' ? {loading} : loading)
    };
    const table = this.renderTable(prefixCls)
    return h(
      'div',
      {
        class : classNames(prefixCls + '-wrapper')
      },
      [
        h(
          Loading,
          loadingProps,
          [table]
        )
      ]
    )
  }
}