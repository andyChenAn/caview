import classNames from "classnames";
const noop = function () {};
export default {
  props : {
    prefixCls : String,
    value : Date,
    isRangeDatePicker : Boolean,
    // 日期面板索引数，总共两个，
    index : {
      type : Number,
      default : 0
    },
    dayList : Array,
    // 是否用户有点击面板上的日期
    isClickPanel : Boolean,
    startIndex : Number,
    endIndex : Number
  },
  data () {
    return {
      currentDate : this.value,
      // 展示的天数
      displayDays : []
    }
  },
  created () {
    this.updateDays();
  },
  watch : {
    value (newVal) {
      this.currentDate = newVal;
      this.updateDays();
    }
  },
  methods : {
    updateDays () {
      // 获取当月天数
      let days = this.getCurrentDays();
      // 获取当月第一天是星期几
      let weekOfFirstDay = this.getWeekOfFirstDay();
      this.displayDays = this.getDisplayDays(days , weekOfFirstDay);
      this.$emit('createCalendar' , this.displayDays , this.index);
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
          this.renderCalendar(prefixCls)
        ]
      )
    },
    // 渲染日历天数
    renderCalendar (prefixCls) {
      const h = this.$createElement;
      const { isRangeDatePicker } = this.$props;
      let rows = [];
      for (let i = 0 ; i < 6 ; i++) {
        rows.push(h(
          'tr',
          {
            class : classNames(prefixCls + '-rows')
          },
          this.displayDays.slice(i * 7 , (i + 1) * 7).map(day => {
            const dayProps = {};
            if (isRangeDatePicker) {
              dayProps.class = classNames(prefixCls + '-day-text' , day.type === 'prev' || day.type === 'next' ? prefixCls + '-text-gray' : null , this.isCurrentDate(day) ? 'selected' : null , day.clicked ? 'clicked' : null , day.hover ? 'hovered' : null);
            } else {
              dayProps.class = classNames(prefixCls + '-day-text' , day.type === 'prev' || day.type === 'next' ? prefixCls + '-text-gray' : null , this.isCurrentDate(day) ? 'selected' : null , this.isActiveDay(day) ? 'actived' : null);
            }
            dayProps.on = {
              click : (evt) => this.selectCarlendar(evt , day),
              mouseenter : (evt) => this.handleMouseEnter(evt , day),
              mouseleave : evt => this.handleMouseLeave(evt , day) 
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
    selectCarlendar (evt , item) {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let now = new Date(item.year , item.month , item.date , hours , minutes , seconds);
      this.currentDate = now;
      if (this.isRangeDatePicker) {
        this.dayList.map(item => {
          item.hover = false;
          item.clicked = false;
        })
        const obj = this.getRightItem(item);
        // 如果是当前月份面板的上一个月数据或者当前月份面板的下一个月的数据，那么久不让他有点击效果
        if (!((obj.type === 'prev' && obj.index === 0) || (obj.type === 'next' && obj.index === 0))) {
          obj.clicked = true;
        }
        let index = this.dayList.indexOf(obj);
        if (index === -1) {
          if (item.type === 'prev') {
            index = 0;
          } else if (item.type === 'next') {
            index = this.dayList.length;
          }
        }
        if (index > -1) {
          for (let i = index ; i < this.dayList.length ; i++) {
            this.dayList[i].hover = true;
          };
        }
        this.$emit('select' , this.currentDate , index);
      } else {
        this.$emit('select' , this.currentDate);
      }
    },
    // 获取正确的日期，因为我有可能在本月面板中点击上一个或者下一个月的数据
    getRightItem (item) {
      let res = item;
      for (let i = 0 ; i < this.dayList.length ; i++) {
        const day = this.dayList[i];
        if (day.year == item.year && day.month === item.month && day.date === item.date) {
          res = day;
          break;
        }
      };
      return res;
    },
    handleMouseEnter (evt , item) {
      if (this.isClickPanel) {
        const obj = this.getRightItem(item);
        // 如果第一次点击面板的是第二个面板的next部分数据，那么就要过滤掉，不显示效果
        if (obj.index !== 0 && obj.type !== 'next') {
          this.dayList.map(item => {
            item.hover = false;
            if (this.startIndex !== item.index) {
              item.clicked = false;
            }
          });
          if (obj.index >= this.startIndex) {
            for (let i = this.startIndex ; i <= obj.index ; i++) {
              this.dayList[i].hover = true;
            }
          } else {
            for (let i = obj.index ; i < this.startIndex ; i++) {
              this.dayList[i].hover = true;
            }
          }
          if (obj.type === 'current') {
            obj.clicked = true;
          }
        } else if (obj.index === 0 && obj.type === 'next' && this.index === 1 && this.startIndex < this.dayList.length) {
          // 如果第二次hover面板的是第二个面板的next部分数据
          this.dayList.map(item => {
            item.clicked = false;
          });
          this.dayList[this.startIndex].clicked = true;
          for (let i = this.startIndex ; i < this.dayList.length ; i++) {
            this.dayList[i].hover = true;
          }
        }
      }
    },
    handleMouseLeave (evt , item) {

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
          clicked : false,
          hover : false
        })
      };
      // 上月展示的天数
      for (let i = 1 ; i <= weekOfFirstDay ; i++) {
        displayDays.unshift({
          date : prevMonthDays,
          type : 'prev',
          month : (this.currentDate.getMonth() - 1) < 0 ? 11 : (this.currentDate.getMonth() - 1),
          year : (this.currentDate.getMonth() - 1) < 0 ? this.currentDate.getFullYear() - 1 : this.currentDate.getFullYear(),
          clicked : false,
          hover : false,
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
          year : (this.currentDate.getMonth() + 1) > 11 ? this.currentDate.getFullYear() + 1 : this.currentDate.getFullYear(),
          clicked : false,
          hover : false,
        });
      };
      displayDays.map(item => {
        item.index = 0;
        return item;
      })
      return displayDays;
    },
    // 是否为当前这一天
    isCurrentDate (item) {
      let date = new Date();
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getFullYear();
      if (month === item.month && day === item.date && year === item.year && item.type === 'current') {
        return true;
      };
      // 如果用户点击了日期，那么也要选中
      if (this.isClickPanel && month === item.month && day === item.date && year === item.year) {
        return true;
      }
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