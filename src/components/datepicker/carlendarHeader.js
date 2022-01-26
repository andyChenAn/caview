import classNames from "classnames";
const monthMap = {
  1 : 'Jan',
  2 : 'Feb',
  3 : 'Mar',
  4 : 'Apr',
  5 : 'May',
  6 : 'Jun',
  7 : 'Jul',
  8 : 'Aug',
  9 : 'Sep',
  10 : 'Oct',
  11 : 'Nov',
  12 : 'Dec'
}
export default {
  props : {
    year : [String , Number],
    month : [Number , String],
    prefixCls : String
  },
  methods : {
    clickYear (dir) {
      let { year } = this.$props;
      if (dir === 'prev') {
        // 上一年
        if (year <= 0) {
          year = 0;
        } else {
          year--;
        }
        this.$emit('click-year' , year);
      } else {
        // 下一年
        this.$emit('click-year' , ++year);
      }
    },
    clickMonth (dir) {
      let { month } = this.$props;
      if (dir === 'prev') {
        // 上一月
        if (month <= 1) {
          month = 12;
        } else {
          month--;
        }
        this.$emit('click-month' , month);
      } else {
        // 下一月
        if (month > 12) {
          month = 12;
        } else {
          month++;
        }
        this.$emit('click-month' , month);
      }
    }
  },
  render () {
    const { prefixCls , year , month } = this.$props;
    const h = this.$createElement;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-header')
      },
      [
        h(
          'span',
          {
            class : classNames(prefixCls + '-prev-year-btn'),
            on : {
              click : () => this.clickYear('prev')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-prev-month-btn'),
            on : {
              click : () => this.clickMonth('prev')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-select')
          },
          [
            h(
              'span',
              {
                class : classNames(prefixCls + '-month')
              },
              [monthMap[month]]
            ),
            h(
              'span',
              {
                class : classNames(prefixCls + '-year')
              },
              [year]
            ),
          ]
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-next-month-btn'),
            on : {
              click : () => this.clickMonth('next')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-next-year-btn'),
            on : {
              click : () => this.clickYear('next')
            }
          }
        ),
      ]
    )
  }
}