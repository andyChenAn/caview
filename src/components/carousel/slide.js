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
    },
    children : {
      type : Array,
      defualt () {
        return []
      }
    },
    slideWidth : {
      type : Number,
      default : 0
    },
    slideHeight : {
      type : Number,
      default : 0
    },
    speed : {
      type : [Number , String],
      default : 500
    }
  },
  data () {
    return {
      // 是否执行过渡动画
      isAnimate : false,
      // 当前的索引，用于跳转到哪个slide
      currentIndex : 1,
      // 是否停止点击
      stop : false,
    }
  },
  methods : {
    clickPrev () {
      if (this.stop) {
        return;
      };
      this.stop = true;
      const slideCount = this.children.length;
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = slideCount - 1;
      }
      this.isAnimate = true;
    },
    clickNext () {
      if (this.stop) {
        return;
      };
      this.stop = true;
      const slideCount = this.children.length;
      if (this.currentIndex <= slideCount) {
        this.currentIndex++;
      } else {
        this.currentIndex = 1;
      }
      this.isAnimate = true;
    },
    onTransitionend () {
      this.isAnimate = false;
      this.stop = false;
      const slideCount = this.children.length;
      if (this.currentIndex === slideCount + 1) {
        this.currentIndex = 1;
      } else if (this.currentIndex === 0) {
        this.currentIndex = slideCount;
      }
    },
    renderPrevArrow (prefixCls) {
      const h = this.$createElement;
      const { arrow } = this.$props;
      if (arrow && this.$slots.prevArrow) {
        return this.$slots.prevArrow;
      } else if (arrow) {
        return h(
          'span',
          {
            class : classNames('iconfont icon-arrow-left' , prefixCls + '-prev-btn'),
            on : {
              click : this.clickPrev
            }
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
            class : classNames('iconfont icon-arrow-right' , prefixCls + '-next-btn'),
            on : {
              click : this.clickNext
            }
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
      const slideCount = this.children.length;
      let newChildren = [];
      let firstNode , lastNode;
      for (let i = 0 ; i < slideCount ; i++) {
        let slide = this.children[i];
        slide.data = _extends({} , slide.data , {
          style : {
            width : this.slideWidth + 'px'
          }
        });
        newChildren.push(slide);
        if (i === 0) {
          firstNode = slide;
        } else if (i === slideCount - 1) {
          lastNode = slide
        }
      };
      newChildren.unshift(lastNode);
      newChildren.push(firstNode);
      return h(
        'div',
        {
          class : classNames(prefixCls + '-slide'),
          style : this.getSlideBoxStyle()
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-slide-inner'),
              style : this.getSlideInnerStyle(newChildren),
              on : {
                transitionend : this.onTransitionend
              }
            },
            newChildren
          )
        ]
      )
    },
    getSlideBoxStyle () {
      let style = {};
      const { vertical , slideHeight } = this.$props;
      vertical && (style.height = slideHeight + 'px');
      return style;
    },
    getSlideInnerStyle (newChildren) {
      let style = {};
      const { vertical } = this.$props;
      if (vertical) {
        style.height = newChildren.length * this.slideHeight + 'px';
      } else {
        style.width = newChildren.length * this.slideWidth + 'px';
      }
      style.transform = `translate3d(${!vertical ? -this.slideWidth * this.currentIndex : 0}px , ${vertical ? -this.slideHeight * this.currentIndex : 0}px , 0)`;
      if (this.isAnimate) {
        style.transition = `transform ${this.speed}ms ease`;
      } else {
        style.transition = 'none';
      }
      return style;
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