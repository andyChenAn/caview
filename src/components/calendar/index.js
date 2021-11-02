import classNames from "classnames";
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
  methods : {
    // 渲染日历头部
    renderCalendarHeader (prefixCls) {
      const h = this.$createElement;
      const { value } = this.$props;
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
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
                    [year]
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
              class : classNames(prefixCls + '-month-select')
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
            ]
          )
        ]
      )
    },
    // 渲染日历内容
    renderCalendarContent (prefixCls) {

    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , fullscreen } = this.$props;
    return h(
      'div',
      {
        class : classNames(fullscreen ? prefixCls + '-fullscreen' : null)
      },
      [this.renderCalendarHeader(prefixCls) , this.renderCalendarContent(prefixCls)]
    )
  }
}