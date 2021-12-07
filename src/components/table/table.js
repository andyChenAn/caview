import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import ColumnManager from './columnManager';
import Loading from '../loading';
import Vue from 'vue';
import { flatFilter , treeMap } from './utils';
function getRowSelection (props) {
  return props.rowSelection || {};
};
function getFilteredValueColumns (columns) {
  return flatFilter(columns , col => {
    return typeof col.filteredValue !== 'undefined';
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
};
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
    // 树形结构的子树的字段名称，比如树形结构一般都会用children作为字段名
    childrenColumnName : String,
    rowSelection : Object
  },
  data () {
    this.store = Vue.observable({
      selectedRowKeys : getRowSelection(this.$props).selectedRowKeys || [],
      selectionDirty : false
    });
    return _extends({} , this.getDefaultSortOrder(this.$props.columns || []) , {
      sFilters : this.getDefaultFilters(this.$props.columns),
      filterDataCnt : 0,
      sPagination : this.getDefaultPagination()
    })
  },
  provide () {
    return {
      table : this
    }
  },
  methods : {
    // 获取分页配置数据
    getDefaultPagination () {
      let pagination = typeof  this.$props.pagination === 'object' ? this.$props.pagination : {};
      let current , pageSize;
      if ('current' in pagination) {
        current = pagination.current;
      } else if ('defaultCurrent' in pagination) {
        current = pagination.defaultCurrent;
      };
      if ('pageSize' in pagination) {
        pageSize = pagination.pageSize;
      } else if ('defaultPageSize' in pagination) {
        pageSize = pagination.defaultPageSize;
      };
      return this.hasPagination() ? _extends({} , pagination , {
        current : current || 1,
        pageSize : pageSize || 10
      }) : {};
    },
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
      // 排序函数，是通过column中的sorter函数来实现的
      const sortedFn = this.getSorterFn(currentState);
      if (sortedFn) {
        data = this.recursiveSort([].concat(_toConsumableArray(data)) , sortedFn);
      };
      // 筛选
      if (filter && filters) {
        Object.keys(filters).forEach(colKey => {
          let col = this.findColumn(colKey);
          if (!col) {
            return;
          }
          let values = filters[colKey] || [];
          if (values.length === 0) {
            return;
          }
          const onFilter = col.onFilter;
          data = onFilter ? data.filter(item => {
            return values.some(val => onFilter(val , item))
          }) : data;
        })
      };
      return data;
    },
    // 通过column中的key去查找对应的column
    findColumn (colKey) {
      let column = null;
      treeMap(this.columns , col => {
        if (getColumnKey(col) === colKey) {
          column = col;
        }
      })
      return column;
    },
    recursiveSort (data , sortedFn) {
      const childrenColumnName = this.childrenColumnName === undefined ? 'children' : this.childrenColumnName;
      return data.sort(sortedFn).map(item => {
        return item[childrenColumnName] ? _extends({} , item , {
          childrenColumnName : this.recursiveSort([].concat(_toConsumableArray(item[childrenColumnName])) , sortedFn)
        }) : item;
      })
    },
    getSorterFn (state) {
      state = state || this.$data;
      let sortOrder = state.sSortOrder;
      let sortColumn = state.sSortColumn;
      if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
        return;
      };
      return function (a , b) {
        let result = sortColumn.sorter(a , b , sortOrder);
        if (result !== 0) {
          return sortOrder === 'descend' ? -result : result;
        }
        return 0;
      }
    },
    renderTable (prefixCls) {
      const h = this.$createElement;
      let data = this.getCurrentPageData();
      
    },
    getCurrentPageData () {
      let data = this.getLocalData();
      this.fitlerDataCnt = data.length;
      let current , pageSize;
      // 没有分页，那么默认展示全部
      if (!this.hasPagination()) {
        current = 1;
        pageSize = Number.MAX_VALUE;
      } else {
        current = this.getMaxCurrent(this.sPagination.total || data.length)
        pageSize = this.sPagination.pageSize;
      }
      if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
        data = data.slice((current - 1) * pageSize , current * pageSize);
      };
      return data;
    },
    // 获取当前页码
    getMaxCurrent (total) {
      if ((this.sPagination.current - 1) * this.sPagination.pageSize >= total) {
        return Math.floor((total - 1) / pageSize) + 1;
      }
      return this.sPagination.current;
    },
    hasPagination () {
      return this.$props.pagination !== false;
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