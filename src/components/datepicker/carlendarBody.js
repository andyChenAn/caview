import classNames from "classnames";
const noop = function () {};
export default {
  props : {
    prefixCls : String,
    value : Date,
    isRangeDatePicker : Boolean,
    index : Number
  },
  data () {
    return {
      currentDate : this.value
    }
  },
  watch : {
    value (newVal) {
      this.currentDate = newVal;
    }
  },
  methods : {
    getTableHeader () {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      let weeks = ['日' , '一' , '二' , '三' , '四' , '五' , '六']
      let weekNodes = [];
      for (let i = 0 ; i < weeks.length ; i++) {
        weekNodes.push(h(
          'th',
          {
            class : classNames(prefixCls + '-th')
          },
          [
            h(
              'span',
              {
                class : classNames(prefixCls + '-week')
              },
              [weeks[i]]
            )
          ]
        ))
      }
      return h(
        'thead',
        {
          class : classNames(prefixCls + '-thead')
        },
        [
          h(
            'tr',
            weekNodes
          )
        ]
      )
    },
    getTableBody () {
      const { prefixCls } = this.$props;
      const h = this.$createElement;
      // 获取当月天数
      let days = this.getCurrentDays();
      // 获取当月第一天是星期几
      let weekOfFirstDay = this.getWeekOfFirstDay();
      return h(
        'tbody',
        {
          class : classNames(prefixCls + '-tbody')
        },
        [
          this.renderCalendar(prefixCls , days , weekOfFirstDay)
        ]
      )
    },
    // 渲染日历天数
    renderCalendar (prefixCls , days , weekOfFirstDay) {
      const h = this.$createElement;
      let displayDays = this.getDisplayDays(days , weekOfFirstDay);
      const { isRangeDatePicker } = this.$props;
      let rows = [];
      for (let i = 0 ; i < 6 ; i++) {
        rows.push(h(
          'tr',
          {
            class : classNames(prefixCls + '-rows')
          },
          displayDays.slice(i * 7 , (i + 1) * 7).map(day => {
            const dayProps = {};
            if (isRangeDatePicker) {
              dayProps.class = classNames(prefixCls + '-day-text' , day.type === 'prev' || day.type === 'next' ? prefixCls + '-text-gray' : null , this.isCurrentDate(day) ? 'selected' : null);
            } else {
              dayProps.class = classNames(prefixCls + '-day-text' , day.type === 'prev' || day.type === 'next' ? prefixCls + '-text-gray' : null , this.isCurrentDate(day) ? 'selected' : null , this.isActiveDay(day) ? 'actived' : null);
            }
            return h(
              'td',
              {
                class : classNames(prefixCls + '-day'),
                key : day.date
              },
              [
                h(
                  'div',
                  {
                    class : classNames(prefixCls + '-day-box'),
                    on : {
                      click : () => this.selectCarlendar(day)
                    }
                  },
                  [
                    h(
                      'div',
                      dayProps,
                      [day.date]
                    )
                  ]
                )
              ]
            )
          })
        ))
      };
      return rows;
    },
    selectCarlendar (item) {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let now = new Date(item.year , item.month , item.date , hours , minutes , seconds);
      this.currentDate = now;
      this.$emit('select' , this.currentDate);
    },
    isActiveDay (item) {
      const month = this.currentDate.getMonth();
      const day = this.currentDate.getDate();
      if (item.date === day && month === item.month) {
        return true;
      }
      return false;
    },
    // 获取当月天数
    getCurrentDays () {
      let date = new Date(this.currentDate);
      let currentMonth = date.getMonth();
      date.setDate(1);
      date.setMonth(currentMonth + 1);
      date.setDate(0);
      return date.getDate();
    },
    // 获取当月第一天是星期几
    getWeekOfFirstDay () {
      let date = new Date(this.currentDate);
      date.setDate(1);
      return date.getDay();
    },
    /**
     * 获取需要展示的日历
     * @param {number} days 当月天数
     * @param {number} weekOfFirstDay 当月第一天对应的星期
     */
     getDisplayDays (days , weekOfFirstDay) {
      let displayDays = [];
      const date = new Date(this.currentDate);
      date.setDate(0);
      let prevMonthDays = date.getDate();
      // 当月展示的天数
      for (let i = 1 ; i <= days ; i++) {
        displayDays.push({
          date : i,
          type : 'current',
          month : this.currentDate.getMonth(),
          year : this.currentDate.getFullYear(),
        })
      };
      // 上月展示的天数
      for (let i = 1 ; i <= weekOfFirstDay ; i++) {
        displayDays.unshift({
          date : prevMonthDays,
          type : 'prev',
          month : (this.currentDate.getMonth() - 1) < 0 ? 11 : (this.currentDate.getMonth() - 1),
          year : (this.currentDate.getMonth() - 1) < 0 ? this.currentDate.getFullYear() - 1 : this.currentDate.getFullYear(),
        });
        prevMonthDays--;
      };
      // 下月展示的天数
      let nextMonthDays = 7 * 6 - displayDays.length;
      for (let i = 1 ; i <= nextMonthDays ; i++) {
        displayDays.push({
          date : i,
          type : 'next',
          month : (this.currentDate.getMonth() + 1) > 11 ? 0 : (this.currentDate.getMonth() + 1),
          year : (this.currentDate.getMonth() + 1) > 11 ? this.currentDate.getFullYear() + 1 : this.currentDate.getFullYear()
        });
      };
      return displayDays;
    },
    // 是否为当前这一天
    isCurrentDate (item) {
      let date = new Date();
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getFullYear();
      if (month === item.month && day === item.date && year === item.year && this.index === 0) {
        return true;
      };
      return false;
    },
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls)
      },
      [
        h(
          'table',
          {
            class : classNames(prefixCls + '-table'),
            attrs : {
              cellspacing : 0
            }
          },
          [
            this.getTableHeader(),
            this.getTableBody()
          ]
        )
      ]
    )
  }
}