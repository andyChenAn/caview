import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
export default {
  props : {
    // 是否自动轮播
    autoPlay : {
      type : Boolean,
      default : false
    },
    // 是否显示点
    dot : {
      type : Boolean,
      default : false
    },
    // 是否展示切换箭头
    arrow : {
      type : Boolean,
      default : false
    },
    // 动画效果
    easing : {
      type : String,
      default : 'linear'
    },
    // 动画方式，可以是scrollX , fade
    effect : {
      type : String,
      default : 'scrollX'
    },
    prefixCls : {
      type : String,
      default : 'ca-carousel'
    },
    // 小圆点的位置，可以是top,left,bottom,right，如果是top,bottom那么就是竖向滚动，如果是left,right那么就是横向滚动
    dotPosition : {
      type : String,
      default : 'bottom'
    },
    // 小圆点的样式类
    dotClass : {
      type : String,
      default : ''
    },
    fade : {
      type : Boolean,
      default : false
    },
    vertical : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
      options : {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      const { height } = this.$el.querySelector('.slide').getBoundingClientRect();
      const { width } = this.$el.getBoundingClientRect();
      this.options = _extends({} , this.$props , {
        slideWidth : width,
        slideHeight : height
      });
    })
  },
  methods : {
    renderPrevArrow (prefixCls) {
      const h = this.$createElement;
      const { arrow } = this.$props;
      if (arrow && this.$slots.prevArrow) {
        return this.$slots.prevArrow;
      } else if (arrow) {
        return h(
          'span',
          {
            class : classNames('iconfont icon-arrow-left' , prefixCls + '-prev-btn')
          }
        )
      };
      return null;
    },
    renderNextArrow (prefixCls) {
      const h = this.$createElement;
      const { arrow } = this.$props;
      if (arrow && this.$slots.nextArrow) {
        return this.$slots.nextArrow;
      } else if (arrow) {
        return h(
          'span',
          {
            class : classNames('iconfont icon-arrow-right' , prefixCls + '-next-btn')
          }
        )
      };
      return null;
    },
    renderDot (prefixCls) {
      const h = this.$createElement;
      const { dotClass } = this.$props;
      let children = this.$slots.default || [];
      let dotLength = children.length;
      let dotNodes = [];
      for (let i = 0 ; i < dotLength ; i++) {
        dotNodes.push(h(
          'span',
          {
            class : classNames(prefixCls + '-dot-item')
          }
        ))
      };
      return h(
        'div',
        {
          class : dotClass
        },
        dotNodes
      )
    },
    renderSlideContent (prefixCls) {
      const h = this.$createElement;
      this.$slots.default = this.$slots.default.map(item => {
        item.data = _extends(item.data , {
          style : this.getSlideStyle(this.options)
        });
        return item;
      });
      return h(
        'div',
        {
          class : classNames(prefixCls + '-slide'),
          ref : 'aa'
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-slide-inner')
            },
            this.$slots.default
          )
        ]
      )
    },
    getSlideStyle (options) {
      console.log(options);
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
          'div',
          {
            class : classNames(prefixCls + '-inner')
          },
          [
            this.renderPrevArrow(prefixCls),
            this.renderSlideContent(prefixCls),
            this.renderNextArrow(prefixCls),
            this.renderDot(prefixCls) 
          ]
        )
      ]
    )
  }
}