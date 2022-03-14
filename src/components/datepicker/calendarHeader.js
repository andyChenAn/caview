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
};
export default {
  props : {
    year : [String , Number],
    month : [String , Number],
    prefixCls : String
  },
  data () {
    return {
      monthMap : monthMap
    }
  },
  methods : {
    clickMonth (evt , dir) {
      let { month } = this.$props;
      if (dir === 'prev') {
        // 上一月
        month--;
      } else {
        // 下一月
        month++;
      }
      console.log(month - 1)
      this.$emit('click-month' , evt , month - 1);
    },
    clickYear (evt , dir) {
      let { year } = this.$props;
      if (dir === 'prev') {
        // 上一年
        if (year <= 0) {
          year = 0;
        } else {
          year--;
        }
      } else {
        year++;
      }
      this.$emit('click-year' , evt , year);
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , month , year } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls)
      },
      [
        h(
          'span',
          {
            class : classNames(prefixCls + '-prev-year'),
            on : {
              click : evt => this.clickYear(evt , 'prev')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-prev-month'),
            on : {
              click : evt => this.clickMonth(evt , 'prev')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-content')
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
            class : classNames(prefixCls + '-next-month'),
            on : {
              click : evt => this.clickMonth(evt , 'next')
            }
          }
        ),
        h(
          'span',
          {
            class : classNames(prefixCls + '-next-year'),
            on : {
              click : evt => this.clickYear(evt , 'next')
            }
          }
        )
      ]
    )
  }
}