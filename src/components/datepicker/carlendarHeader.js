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
    clickYear (evt , dir) {
      let { year } = this.$props;
      if (dir === 'prev') {
        // 上一年
        if (year <= 0) {
          year = 0;
        } else {
          year--;
        }
        this.$emit('click-year' , evt , year);
      } else {
        // 下一年
        this.$emit('click-year' , evt , ++year);
      }
    },
    clickMonth (evt , dir) {
      let { month } = this.$props;
      if (dir === 'prev') {
        // 上一月
        if (month <= 1) {
          month = 12;
        } else {
          month--;
        }
        this.$emit('click-month' , evt , month);
      } else {
        // 下一月
        if (month > 11) {
          month = 1;
        } else {
          month++;
        }
        this.$emit('click-month' , evt , month);
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
              click : (evt) => this.clickYear(evt , 'prev')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-prev-month-btn'),
            on : {
              click : (evt) => this.clickMonth(evt , 'prev')
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
                class : classNames(prefixCls + '-year')
              },
              [year + '年']
            ),
            h(
              'span',
              {
                class : classNames(prefixCls + '-month')
              },
              [monthMap[month]]
            )
          ]
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-next-month-btn'),
            on : {
              click : (evt) => this.clickMonth(evt , 'next')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-next-year-btn'),
            on : {
              click : (evt) => this.clickYear(evt , 'next')
            }
          }
        ),
      ]
    )
  }
}