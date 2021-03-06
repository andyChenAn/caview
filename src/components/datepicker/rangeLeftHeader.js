import classNames from "classnames";
const monthMap = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};
export default {
  props : {
    year : [String , Number],
    month : [String , Number],
    prefixCls : String,
    currentValue : Array
  },
  data() {
    return {
      monthMap: monthMap,
      showArrow : true
    }
  },
  watch : {
    currentValue : {
      immediate : true,
      handler (newVal) {
        const first = newVal[0];
        const last = newVal[1];
        if (
          (first.getFullYear() === last.getFullYear() && first.getMonth() + 1 === last.getMonth()) ||
          (first.getFullYear() +1 === last.getFullYear() && first.getMonth() === 11 && last.getMonth() === 0)
        ) {
          this.showArrow = false;
        } else {
          this.showArrow = true;
        }
      }
    }
  },
  methods : {
    clickMonth(evt, dir) {
      let { month } = this.$props;
      if (dir === 'prev') {
        // 上一月
        month--;
      } else {
        // 下一月
        month++;
      }
      this.$emit('click-month', evt, month - 1);
    },
    clickYear(evt, dir) {
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
      this.$emit('click-year', evt, year);
    }
  },
  render() {
    const h = this.$createElement;
    const { prefixCls, month, year } = this.$props;
    return h(
      'div',
      {
        class: classNames(prefixCls)
      },
      [
        h(
          'span',
          {
            class: classNames(prefixCls + '-prev-year'),
            on: {
              click: evt => this.clickYear(evt, 'prev')
            }
          }
        ),
        h(
          'span',
          {
            class: classNames(prefixCls + '-prev-month'),
            on: {
              click: evt => this.clickMonth(evt, 'prev')
            }
          }
        ),
        h(
          'span',
          {
            class: classNames(prefixCls + '-content')
          },
          [
            h(
              'span',
              {
                class: classNames(prefixCls + '-year')
              },
              [year + '年']
            ),
            h(
              'span',
              {
                class: classNames(prefixCls + '-month')
              },
              [monthMap[month]]
            )
          ]
        ),
        this.showArrow && h(
          'span',
          {
            class: classNames(prefixCls + '-next-month'),
            on: {
              click: evt => this.clickMonth(evt, 'next')
            }
          }
        ),
        this.showArrow && h(
          'span',
          {
            class: classNames(prefixCls + '-next-year'),
            on: {
              click: evt => this.clickYear(evt, 'next')
            }
          }
        )
      ]
    )
  }
}