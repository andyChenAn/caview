import classNames from "classnames";
let index = 0;
export default {
  props : {
    // 进度条组件类型，可以是line，circle
    type : {
      type : String,
      default : 'line'
    },
    // 百分比
    percent : {
      type : Number,
      default : 0
    },
    // 格式化进度条展示内容
    format : Function,
    // 描边的颜色
    strokeColor : {
      type : [String , Object],
      default : ''
    },
    // 进度条的状态，可以是success，fail，normal
    status : {
      type : String,
      default : 'normal'
    },
    prefixCls : {
      type : String,
      default : 'ca-progress'
    },
    // 线宽
    strokeWidth : {
      type : Number,
      default : 8
    },
    // 是否展示百分比内容
    showInfo : {
      type : Boolean,
      default : true
    },
    // 当是环形进度条时，圆的直径
    width : {
      type : Number,
      default : 100
    }
  },
  methods : {
    renderPercentText (text) {
      const { format , status , prefixCls } = this.$props;
      const h = this.$createElement;
      if (status === 'success') {
        text = h(
          'i',
          {
            class : classNames('iconfont icon-success' , prefixCls + '-icon')
          }
        );
        return text;
      } else if (status === 'fail') {
        text = h(
          'i',
          {
            class : classNames('iconfont icon-error' , prefixCls + '-icon')
          }
        );
        return text;
      }
      if (format && typeof format === 'function') {
        return format(text);
      } else if (this.$slots.format) {
        return this.$slots.format;
      };
      return text + '%';
    },
    renderLineProgress (prefixCls) {
      const h = this.$createElement;
      const { status , percent , strokeWidth , showInfo , strokeColor } = this.$props;
      // 设置颜色
      let color = {};
      if (typeof strokeColor === 'object') {
        let temp = [];
        for (let key in strokeColor) {
          temp.push(`${strokeColor[key]} ${key}`);
        }
        color = {
          backgroundImage : `linear-gradient(to right , ${temp.join(',')})`
        }
      } else {
        color = {
          backgroundColor : strokeColor
        }
      }
      return h(
        'div',
        {
          class : classNames(prefixCls , prefixCls + '-line' , prefixCls + '-' + status)
        },
        [
          h(
            'div',
            {
              class : prefixCls + '-box'
            },
            [
              h(
                'div',
                {
                  class : prefixCls + '-inner'
                },
                [
                  h(
                    'div',
                    {
                      class : prefixCls + '-bar',
                      style : {
                        width : percent + '%',
                        height : strokeWidth + 'px',
                        ...color
                      }
                    }
                  )
                ]
              )
            ]
          ),
          h(
            'span',
            {
              class : classNames(prefixCls + '-text')
            },
            [showInfo ? this.renderPercentText(percent) : null]
          )
        ]
      )
    },
    renderCircleProgress (prefixCls) {
      const h = this.$createElement;
      let {strokeColor , status , percent , strokeWidth , width , showInfo } = this.$props;
      let color = status === 'success' ? '#19be6b' : status === 'fail' ? '#ed4014' : '#1890ff';
      // 设置渐变色svg
      let gradidentNodes = [];
      if (typeof strokeColor === 'object' ) {
        index++;
        color = `url(#gradient-${index})`;
        for (let key in strokeColor) {
          gradidentNodes.push(h(
            'stop',
            {
              attrs : {
                offset : key,
                'stop-color' : strokeColor[key]
              }
            }
          ))
        }
      } else {
        color = strokeColor || color;
      }
      // 圆的周长
      let circleLength = Math.PI * 94;
      return h(
        'div',
        {
          class : classNames(prefixCls , prefixCls + '-circle' , prefixCls + '-' + status)
        },
        [
          h(
            'div',
            {
              class : prefixCls + '-inner',
              style : {
                width : width + 'px',
                height : width + 'px'
              }
            },
            [
              h(
                'svg',
                {
                  class : prefixCls + '-circle',
                  attrs : {
                    viewBox : '0 0 100 100'
                  }
                },
                [
                  typeof strokeColor === 'object' && h(
                    'defs',
                    [
                      h(
                        'linearGradient',
                        {
                          attrs : {
                            id : 'gradient-' + index,
                            x1 : '100%',
                            x2 : '0%',
                            y1 : '0%',
                            y2 : '0%'
                          }
                        },
                        gradidentNodes
                      )
                    ]
                  ),
                  h(
                    'path',
                    {
                      attrs : {
                        d : "M 50,50 m 0 , -47 a 47,47 0 1 1 0 , 94 a 47,47 0 1 1 0 -94",
                        'fill-opacity' : 0,
                        stroke : '#eee',
                        'stroke-linecap' : 'round',
                        'stroke-width' : strokeWidth
                      }
                    }
                  ),
                  h(
                    'path',
                    {
                      attrs : {
                        d : "M 50,50 m 0 , -47 a 47,47 0 1 1 0 , 94 a 47,47 0 1 1 0 -94",
                        'fill-opacity' : 0,
                        stroke : percent === 0 ? 'transparent' : color,
                        'stroke-width' : strokeWidth,
                        'stroke-linecap' : 'round',
                        'stroke-dasharray' : `${((percent / 100) * circleLength).toFixed(2)}px ${circleLength.toFixed(2)}px`,
                        opacity : 1
                      },
                      style : {
                        transition : `stroke-dasharray 0.3s ease , stroke 0.3s ease , opacity 0.3s ease`
                      }
                    }
                  )
                ]
              ),
              h(
                'span',
                {
                  class : prefixCls + '-circle-text'
                },
                [showInfo ? this.renderPercentText(percent) : null]
              )
            ]
          )
        ]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { type , prefixCls } = this.$props;
    let vnode = null;
    if (type === 'line') {
      vnode = this.renderLineProgress(prefixCls);
    } else if (type === 'circle') {
      vnode = this.renderCircleProgress(prefixCls);
    }
    return vnode;
  }
};