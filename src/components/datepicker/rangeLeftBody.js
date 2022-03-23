import classNames from "classnames";

export default {
  props : {
    prefixCls : String,
    currentValue : Array,
    selectedValue : Array
  },
  data () {
    return {
      dayList : [],
    }
  },
  watch : {
    currentValue (newVal) {
      const days = this.getCurrentMonthDayNum(newVal[0]);
      const weekOfFirstDay = this.getWeekOfFirstDay(newVal[0]);
      this.dayList = this.getCalendarDays(newVal[0] , days , weekOfFirstDay);
    },
    selectedValue (newVal) {
      if (newVal.length === 0) {
        this.dayList.map(item => {
          item.selected = false;
          return item;
        })
      }
    }
  },
  created () {
    const days = this.getCurrentMonthDayNum(this.currentValue[0]);
    const weekOfFirstDay = this.getWeekOfFirstDay(this.currentValue[0]);
    this.dayList = this.getCalendarDays(this.currentValue[0] , days , weekOfFirstDay);
  },
  methods : {
    // 获取当月的天数
    getCurrentMonthDayNum (currentDate) {
      let date = new Date(currentDate);
      let month = date.getMonth();
      // 这里做了这一步操作，比如当月有31天，下一个月可能只有28天，如果我是在29号，那么下个月就没有29号，就直接会跳到下下个月去了
      date.setDate(1);
      date.setMonth(month + 1);
      // 设置成上个月的最后一天
      date.setDate(0);
      return date.getDate();
    },
    // 获取当月第一天是星期几
    getWeekOfFirstDay (currentDate) {
      let date = new Date(currentDate);
      date.setDate(1);
      return date.getDay();
    },
    getCalendarDays (currentDate , dayNum , weekOfFirstDay) {
      let list = [];
      // 当前月份的上一个月需要展示的天数
      let prevMonthDays = this.getPrevMonthDays(currentDate , weekOfFirstDay);
      // 当前月份需要展示的天数
      let currentMonthDays = this.getCurrentMonthDays(currentDate , dayNum)
      // 当前月份的下一个月需要展示的天数
      let nextDays = 7 * 6 - (prevMonthDays.length + currentMonthDays.length);
      let nextMonthDays = this.getNextMonthDays(currentDate , nextDays);
      list = list.concat(prevMonthDays , currentMonthDays , nextMonthDays);
      return list;
    },
    getPrevMonthDays (currentDate , weekOfFirstDay) {
      let res = [];
      let date = new Date(currentDate);
      date.setDate(0);
      let prevMonthDays = date.getDate();
      for (let i = 1 ; i <= weekOfFirstDay ; i++) {
        res.unshift({
          date : prevMonthDays,
          type : 'prev',
          selected : false,
          month : (currentDate.getMonth() - 1) < 0 ? 11 : (currentDate.getMonth() - 1),
          year : (currentDate.getMonth() - 1) < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear(),
        });
        prevMonthDays--;
      };
      return res;
    },
    getCurrentMonthDays (currentDate , days) {
      let res = [];
      for (let i = 1 ; i <= days ; i++) {
        res.push({
          date : i,
          type : 'current',
          selected : false,
          month : currentDate.getMonth(),
          year : currentDate.getFullYear()
        })
      };
      // 默认选中的这一天就是当前这一天
      res.map(item => {
        item.selected = false;
        if (this.isSelectedDay(item)) {
          item.selected = true;
        }
        return item;
      });
      return res;
    },
    getNextMonthDays (currentDate , days) {
      let res = [];
      for (let i = 1 ; i <= days ; i++) {
        res.push({
          date : i,
          type : 'next',
          selected : false,
          month : (currentDate.getMonth() + 1) > 11 ? 0 : (currentDate.getMonth() + 1),
          year : (currentDate.getMonth() + 1) > 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear(),
        })
      };
      return res;
    },
    isSelectedDay (item) {
      const date = new Date(this.currentDate);
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
      if (month === item.month && day === item.date && year === item.year) {
        return true;
      };
      return false;
    },
    // 是否为当前这一天
    isCurrentDate (item) {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
      if (month === item.month && day === item.date && year === item.year && item.type === 'current') {
        return true;
      };
      return false;
    },
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
      return h(
        'tbody',
        {
          class : classNames(prefixCls + '-tbody')
        },
        [
          this.renderCalendarContent(prefixCls)
        ]
      )
    },
    renderCalendarContent (prefixCls) {
      const h = this.$createElement;
      let rows = [];
      for (let i = 0 ; i < 6 ; i++) {
        rows.push(h(
          'tr',
          {
            class : classNames(prefixCls + '-rows')
          },
          this.dayList.slice(i * 7 , (i + 1) * 7).map(day => {
            const dayProps = {
              class : classNames(prefixCls + '-day-text' , this.isCurrentDate(day) ? 'current' : '' , day.selected ? 'selected' : '' , day.type === 'prev' || day.type === 'next' ? prefixCls + '-text-gray' : ''),
              on : {
                click : evt => this.selectCalendar(evt , day)
              }
            };
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
                    class : classNames(prefixCls + '-day-box')
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
    selectCalendar (evt , data) {
      data.selected = true;
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const now = new Date(data.year , data.month , data.date , hours , minutes , seconds);
      this.$emit('clickPanel' , now);
    }
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