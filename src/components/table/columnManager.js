class ColumnManager {
  constructor (columns) {
    this.cache = {};
    this.columns = columns;
  }
  isColumnsFixed () {
    this.columns.some(col => {
      return !!col.fixed;
    })
  }
  isColumnsLeftFixed () {
    this.columns.some(col => {
      return col.fixed === 'left' || col.fixed === true;
    })
  }
  isColumnsRightFixed () {
    this.columns.some(col => {
      return col.fixed === 'right';
    })
  },
  getLeftColumns
}