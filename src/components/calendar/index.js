import classNames from "classnames";
const noop = function () {};
export default {
  props : {
    value : {
      type : Date,
      default () {
        return new Date()
      }
    },
    valueFormat : {
      type : String,
      default : 'YYYY-MM-DD'
    },
    fullscreen : {
      type : Boolean,
      default : true
    },
    prefixCls : {
      type : String,
      default : 'ca-calendar'
    }
  },
  model : {
    prop : 'value',
    event : 'change'
  },
  data () {
    return {
      currentLable : '月',
      currentDate : this.value,
      // 当前日期，用于选中效果
      currentDay : new Date(this.value),
      // 月份
      monthArr : ['1月' , '2月' , '3月' , '4月' , '5月' , '6月' , '7月' , '8月' , '9月' , '10月' , '11月' , '12月'],
      // 是否展示月份下拉列表
      showMonthList : false,
      // 月份的下拉列表的宽度
      monthWidth : 0
    }
  },
  watch : {
    value (newVal) {
      if (!newVal instanceof Date) {
        this.$message.warning('不是日期格式的数据');
        return;
      }
      this.currentDate = newVal;
    }
  },
  mounted () {
    window.addEventListener('click' , this.onBodyClick);
  },
  beforeDestroy () {
    window.removeEventListener('click' , this.onBodyClick);
  },
  methods : {
    onBodyClick (evt) {
      this.showMonthList = false;
    },
    // 渲染日历头部
    renderCalendarHeader (prefixCls) {
      const h = this.$createElement;
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-header')
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-year-select')
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-year-inner')
                },
                [
                  h(
                    'div',
                    {
                      class : classNames(prefixCls + '-year-text')
                    },
                    [year + '年']
                  ),
                  h(
                    'span',
                    {
                      class : classNames(prefixCls + '-icon')
                    },
                    [
                      h(
                        'svg',
                        {
                          attrs : {
                            viewBox : '0 0 1024 1024',
                            width : '1em',
                            height : '1em'
                          }
                        },
                        [
                          h(
                            'path',
                            {
                              attrs : {
                                fill : 'rgba(0,0,0,0.25)',
                                d : 'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'
                              }
                            }
                          )
                        ]
                      )
                    ]
                  )
                ]
              ),
            ]
          ),
          h(
            'div',
            {
              class : classNames(prefixCls + '-month-select'),
              on : {
                click : this.clickMonth
              }
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-month-inner')
                },
                [
                  h(
                    'div',
                    {
                      class : classNames(prefixCls + '-month-text')
                    },
                    [month + '月']
                  ),
                  h(
                    'span',
                    {
                      class : classNames(prefixCls + '-icon')
                    },
                    [
                      h(
                        'svg',
                        {
                          attrs : {
                            viewBox : '0 0 1024 1024',
                            width : '1em',
                            height : '1em'
                          }
                        },
                        [
                          h(
                            'path',
                            {
                              attrs : {
                                fill : 'rgba(0,0,0,0.25)',
                                d : 'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'
                              }
                            }
                          )
                        ]
                      )
                    ]
                  )
                ]
              ),
              h(
                'transition',
                {
                  attrs : {
                    name : 'zoom-slide'
                  }
                },
                [
                  h(
                    'div',
                    {
                      class : classNames(prefixCls + '-month-list-box'),
                      style : {
                        width : this.monthWidth + 'px'
                      },
                      ref : 'monthListBox',
                      directives : [
                        {
                          name : 'show',
                          value : this.showMonthList
                        }
                      ]
                    },
                    [
                      h(
                        'ul',
                        {
                          class : classNames(prefixCls + '-month-ul'),
                          ref : 'monthUl'
                        },
                        [
                          this.monthArr.map((item , i) => {
                            return h(
                              'li',
                              {
                                class : classNames(prefixCls + '-month-list' , month === i + 1 ? 'selected' : null),
                                on : {
                                  click : (evt) => this.clickMonthList(evt , i)
                                }
                              },
                              [item]
                            )
                          })
                        ]
                      )
                    ]
                  )
                ]
              )
            ]
          ),
          h(
            'div',
            {
              class : classNames(prefixCls + '-group')
            },
            [
              h(
                'span',
                {
                  class : classNames(prefixCls + '-month-lable' , {active : this.currentLable === '月'}),
                  on : {
                    click : () => this.clickLable('月')
                  }
                },
                ['月']
              ),
              h(
                'span',
                {
                  class : classNames(prefixCls + '-year-lable' , {active : this.currentLable === '年'}),
                  on : {
                    click : () => this.clickLable('年')
                  }
                },
                ['年']
              )
            ]
          )
        ]
      )
    },
    clickMonthList (evt , month) {
      evt.stopPropagation();
      let date = new Date(this.currentDate);
      date.setMonth(month);
      this.currentDate = date;
      this.showMonthList = false;
    },
    clickMonth (evt) {
      evt.stopPropagation();
      const { width } = evt.currentTarget.getBoundingClientRect();
      this.monthWidth = width;
      this.showMonthList = true;
    },
    // 渲染星期一到星期日
    renderTableHeader (prefixCls) {
      const h = this.$createElement;
      let weeks = ['星期日' , '星期一' , '星期二' , '星期三' , '星期四' , '星期五' , '星期六']
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
    // 获取当月天数
    getCurrentDays () {
      let date = new Date(this.currentDate);
      let currentMonth = date.getMonth();
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
      date.setDate(0)
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
      if (month == item.month && day == item.date && year == item.year) {
        return true;
      };
      return false;
    },
    // 渲染日历天数
    renderCalendar (prefixCls , days , weekOfFirstDay) {
      const h = this.$createElement;
      let displayDays = this.getDisplayDays(days , weekOfFirstDay);
      const dateCellRender = this.$scopedSlots.dateCellRender || noop;
      let rows = [];
      for (let i = 0 ; i < 6 ; i++) {
        rows.push(h(
          'tr',
          {
            class : classNames(prefixCls + '-rows')
          },
          displayDays.slice(i * 7 , (i + 1) * 7).map(day => {
            return h(
              'td',
              {
                class : classNames(prefixCls + '-day')
              },
              [
                h(
                  'div',
                  {
                    class : classNames(prefixCls + '-day-box' , this.isCurrentDate(day) ? 'selected' : null),
                    on : {
                      click : () => this.selectCalendar(day)
                    }
                  },
                  [
                    h(
                      'div',
                      {
                        class : classNames(prefixCls + '-day-text' , day.type === 'prev' || day.type === 'next' ? prefixCls + '-text-gray' : null)
                      },
                      [day.date < 10 ? '0' + day.date : day.date]
                    ),
                    h(
                      'div',
                      {
                        class : classNames(prefixCls + '-day-content')
                      },
                      [dateCellRender(this.currentDate)]
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
    // 点击选择某个日历
    selectCalendar (item) {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let now = new Date(item.year , item.month , item.date , hours , minutes , seconds);
      this.currentDate = now;
      this.$emit('select' , now);
    },
    // 渲染table内容
    renderTableBody (prefixCls) {
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
    renderMonthTableBody (prefixCls) {
      const h = this.$createElement;
      let monthArr = JSON.parse(JSON.stringify(this.monthArr));
      let rows = [];
      let monthCellRender = this.$scopedSlots.monthCellRender || noop;
      for (let i = 0 ; i < 4 ; i++) {
        rows.push(
          h(
            'tr',
            {
              class : classNames(prefixCls + '-month-rows')
            },
            monthArr.slice(i * 3 , (i + 1) * 3).map(month => {
              return h(
                'td',
                {
                  class : classNames(prefixCls + '-month-td')
                },
                [
                  h(
                    'div',
                    {
                      class : classNames(prefixCls + '-month-box'),
                      on : {
                        click : () => this.selectMonthCalendar(month)
                      }
                    },
                    [
                      h(
                        'div',
                        {
                          class : classNames(prefixCls + '-month-texts')
                        },
                        [month]
                      ),
                      h(
                        'div',
                        {
                          class : classNames(prefixCls + '-month-content')
                        },
                        [monthCellRender(this.currentDate)]
                      )
                    ]
                  )
                ]
              )
            })
          )
        )
      }
      return rows;
    },
    selectMonthCalendar (month) {

    },
    // 渲染日历内容
    renderCalendarContent (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-content')
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-body')
            },
            [
              this.currentLable === '月' ? h(
                'table',
                {
                  class : classNames(prefixCls + '-table'),
                  attrs : {
                    cellspacing : '0'
                  }
                },
                [
                  this.renderTableHeader(prefixCls),
                  this.renderTableBody(prefixCls)
                ]
              ) : h(
                'table',
                {
                  class : classNames(prefixCls + '-month-table'),
                  attrs : {
                    cellspacing : '0'
                  }
                },
                [
                  h(
                    'tbody',
                    {
                      class : classNames(prefixCls + '-month-tbody')
                    },
                    [this.renderMonthTableBody(prefixCls)]
                  )
                ]
              )
            ]
          )
        ]
      )
    },
    clickLable (lableName) {
      this.currentLable = lableName;

    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , fullscreen } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls , fullscreen ? prefixCls + '-fullscreen' : null)
      },
      [this.renderCalendarHeader(prefixCls) , this.renderCalendarContent(prefixCls)]
    )
  }
}