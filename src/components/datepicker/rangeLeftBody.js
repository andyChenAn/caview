import classNames from "classnames";
export default {
  props : {
    prefixCls : String,
    currentValue : Array,
    selectedValue : Array,
    hoverValue : Array
  },
  data () {
    return {
      dayList : [],
    }
  },
  watch : {
    currentValue () {
      this.initData();
    },
    selectedValue () {
      this.initData();
    },
    hoverValue () {
      this.initData();
    }
  },
  created () {
    this.initData();
  },
  methods : {
    initData () {
      const days = this.getCurrentMonthDayNum(this.currentValue[0]);
      const weekOfFirstDay = this.getWeekOfFirstDay(this.currentValue[0]);
      this.dayList = this.getCalendarDays(this.currentValue[0] , days , weekOfFirstDay);
    },
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
          hover : false,
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
          hover : false,
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
      if (this.selectedValue.length === 1) {
        const firstValue = this.selectedValue[0];
        let temp;
        for (let i = 0 ; i < this.hoverValue.length ; i++) {
          if (
            !(this.hoverValue[i].getFullYear() === firstValue.getFullYear() && 
              this.hoverValue[i].getMonth() === firstValue.getMonth() && 
              this.hoverValue[i].getDate() === firstValue.getDate())
            ) {
            temp = this.hoverValue[i];
          }
        }
        res.map(item => {
          item.hover = false;
          item.selected = false;
          const date = new Date(item.year, item.month , item.date);
          if (date.getTime() > firstValue.getTime()) {
            item.hover = true;
          };
          if (firstValue.getFullYear() === item.year && firstValue.getMonth() === item.month && firstValue.getDate() === item.date && item.type === 'current') {
            item.selected = true;
          };
          if (temp && temp.getFullYear() === item.year && temp.getMonth() === item.month && temp.getDate() === item.date && item.type === 'current') {
            item.selected = true;
          };
          return item;
        })
      };
      if (this.selectedValue.length === 2) {
        res.map(item => {
          item.hover = false;
          item.selected = false;
          const date = new Date(item.year, item.month , item.date);
          let selectDate1 = this.selectedValue[0];
          let selectDate2 = this.selectedValue[1];
          selectDate1 = new Date(selectDate1.getFullYear() , selectDate1.getMonth() , selectDate1.getDate());
          selectDate2 = new Date(selectDate2.getFullYear() , selectDate2.getMonth() , selectDate2.getDate());
          if (
            date.getTime() > selectDate1.getTime() && 
            date.getTime() < selectDate2.getTime()
          ) {
            item.hover = true;
          };
          this.selectedValue.map(v => {
            if (v.getFullYear() === item.year && v.getMonth() === item.month && v.getDate() === item.date && item.type === 'current') {
              item.selected = true;
            }
          })
          return item;
        })
      }
      if (this.hoverValue.length === 2) {
        res.map(item => {
          item.hover = false;
          const date = new Date(item.year, item.month , item.date);
          let hoverDate1 = this.hoverValue[0];
          let hoverDate2 = this.hoverValue[1];
          hoverDate1 = new Date(hoverDate1.getFullYear() , hoverDate1.getMonth() , hoverDate1.getDate());
          hoverDate2 = new Date(hoverDate2.getFullYear() , hoverDate2.getMonth() , hoverDate2.getDate());
          if (
            date.getTime() > hoverDate1.getTime() &&
            date.getTime() < hoverDate2.getTime() &&
            item.type === 'current'
          ) {
            item.hover = true;
          }
          return item;
        });
      }
      return res;
    },
    getNextMonthDays (currentDate , days) {
      let res = [];
      for (let i = 1 ; i <= days ; i++) {
        res.push({
          date : i,
          type : 'next',
          hover : false,
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
                click : evt => this.selectCalendar(evt , day),
                mouseenter : evt => this.handleMouseenter(evt , day),
                mouseleave : evt => this.handleMouseleave(evt , day)
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
                    class : classNames(prefixCls + '-day-box' , day.hover ? 'hover' : '')
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
    handleMouseenter (evt , data) {
      let hoverDate = new Date(data.year , data.month , data.date);
      // 当鼠标移动的时候，只会和第一个选中的日期去比较范围
      if (this.selectedValue.length === 1) {
        let rangeDate = [];
        if (hoverDate.getTime() > this.selectedValue[0].getTime()) {
          rangeDate = [this.selectedValue[0] , hoverDate];
        } else {
          rangeDate = [hoverDate , this.selectedValue[0]];
        };
        // this.dayList.map(item => {
        //   item.hover = false;
        //   const date = new Date(item.year , item.month , item.date);
        //   if (date.getTime() > rangeDate[0].getTime() && date.getTime() < rangeDate[1].getTime() && item.type === 'current') {
        //     item.hover = true;
        //   };
        //   return item;
        // });
        this.$emit('panelHover' , rangeDate);
      }
    },
    handleMouseleave (evt , data) {},
    selectCalendar (evt , data) {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const now = new Date(data.year , data.month , data.date , hours , minutes , seconds);
      this.$emit('clickPanel' , now);
      this.dayList.map(item => {
        item.selected = false;
        if (data.year === item.year && data.month === item.month && data.date === item.date && item.type === 'current') {
          item.selected = true;
        };
        return item;
      });
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