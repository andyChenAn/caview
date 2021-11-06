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
      default : 'ease'
    },
    // 动画方式，可以是scroll , fade
    effect : {
      type : String,
      default : 'scroll'
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
    duration : {
      type : [Number , String],
      default : 500
    },
    interval : {
      type : [Number , String],
      default : 3000
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
      // 底部选中的小圆点的索引
      dotIndex : 0,
      // 鼠标放上去是否显示箭头
      showArrow : true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.play();
    })
  },
  methods : {
    play () {
      const { autoPlay } = this.$props;
      if (autoPlay) {
        const { interval } = this.$props;
        clearInterval(this.timeout);
        this.timeout = setInterval(() => {
          this.clickNext();
        } , interval);
      }
    },
    clickPrev () {
      if (this.stop) {
        return;
      };
      this.stop = true;
      this.isAnimate = true;
      const { effect } = this.$props;
      const slideCount = this.children.length;
      if (this.currentIndex > 0) {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
          this.dotIndex = slideCount - 1;
          if (effect === 'fade') {
            this.currentIndex = slideCount;
          }
        } else {
          this.dotIndex--;
        }
      } else {
        this.currentIndex = slideCount - 1;
      }
    },
    clickNext () {
      if (this.stop) {
        return;
      };
      this.stop = true;
      this.isAnimate = true;
      const { effect } = this.$props;
      const slideCount = this.children.length;
      if (this.currentIndex <= slideCount) {
        this.currentIndex++;
        if (this.currentIndex > slideCount) {
          this.dotIndex = 0;
          if (effect === 'fade') {
            this.currentIndex = 1;
          }
        } else {
          this.dotIndex++;
        }
      } else {
        this.currentIndex = 1;
      }
    },
    clickDot (evt) {
      const index = Number(evt.currentTarget.dataset.index);
      if (this.dotIndex !== index) {
        this.dotIndex = index;
        this.currentIndex = index + 1;
        this.isAnimate = true;
      }
    },
    onTransitionend () {
      const { effect } = this.$props;
      this.isAnimate = false;
      this.stop = false;
      if (effect === 'scroll') {
        const slideCount = this.children.length;
        if (this.currentIndex === slideCount + 1) {
          this.currentIndex = 1;
        } else if (this.currentIndex === 0) {
          this.currentIndex = slideCount;
        }
      }
    },
    renderPrevArrow (prefixCls) {
      const h = this.$createElement;
      const { arrow , vertical } = this.$props;
      if (arrow && this.$slots.prevArrow) {
        return this.$slots.prevArrow;
      } else if (arrow && !vertical) {
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
      const { arrow , vertical } = this.$props;
      if (arrow && this.$slots.nextArrow) {
        return this.$slots.nextArrow;
      } else if (arrow && !vertical) {
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
      if (this.$scopedSlots.dot) {
        for (let i = 0 ; i < dotLength ; i++) {
          let vnode = this.$scopedSlots.dot({i})[0];
          vnode.data = _extends({} , vnode.data , {
            attrs : {
              'data-index' : i
            },
            on : {
              click : this.clickDot
            }
          })
          dotNodes.push(vnode)
        }
      } else {
        for (let i = 0 ; i < dotLength ; i++) {
          dotNodes.push(h(
            'span',
            {
              class : classNames(prefixCls + '-dot-item' , this.dotIndex == i ? 'actived' : null),
              attrs : {
                'data-index' : i
              },
              style : {
                'transition-duration' : `${this.$props.duration}ms`
              },
              on : {
                click : this.clickDot
              }
            }
          ))
        };
      }
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
      const { vertical , effect , duration , easing } = this.$props;
      if (effect === 'scroll') {
        if (vertical) {
          style.height = newChildren.length * this.slideHeight + 'px';
        } else {
          style.width = newChildren.length * this.slideWidth + 'px';
        };
        style.transform = `translate3d(${!vertical ? -this.slideWidth * this.currentIndex : 0}px , ${vertical ? -this.slideHeight * this.currentIndex : 0}px , 0)`;
        if (this.isAnimate) {
          style.transition = `transform ${duration}ms ease`;
        } else {
          style.transition = 'none';
        }
      } else if (effect === 'fade') {
        style.width = newChildren.length * this.slideWidth + 'px';
        // 懒得改了，就这样吧，这里的写法应该是通过修改数据来实现样式的，不应该直接修改样式
        if (this.$el) {
          const slideNodes = this.$el.querySelectorAll('.ca-carousel-slide-list');
          if (slideNodes.length > 0) {
            slideNodes.forEach((node , index) => {
              node.style.position = 'relative';
              node.style.left = -(index * this.slideWidth) + 'px';
              node.style.opacity = `${this.currentIndex === (index + 1) ? 1 : 0}`;
              node.style.transition = `opacity ${duration}ms ${easing} , visibility ${duration}ms ${easing}`
            });
          }
        }
      }
      return style;
    },
    handleMouseover () {
      clearInterval(this.timeout);
    },
    handleMouseleave () {
      this.play();
    },
    // 渲染渐显效果时的dom
    renderSlideFadeContent (prefixCls) {
      const { children } = this.$props;
      const h = this.$createElement;
      const slideCount = children.length;
      let newChildren = [];
      for (let i = 0 ; i < slideCount ; i++) {
        let slide = children[i];
        slide.data = _extends({} , slide.data , {
          style : {
            width : this.slideWidth + 'px'
          }
        });
        newChildren.push(slide);
      };
      return h(
        'div',
        {
          class : classNames(prefixCls + '-slide')
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
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , effect } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls),
        on : {
          mouseover : this.handleMouseover,
          mouseleave : this.handleMouseleave
        }
      },
      [
        h(
          'div',
          {
            class : classNames(prefixCls + '-inner')
          },
          [
            this.renderPrevArrow(prefixCls),
            effect === 'scroll' ? this.renderSlideContent(prefixCls) : this.renderSlideFadeContent(prefixCls),
            this.renderNextArrow(prefixCls),
            this.renderDot(prefixCls) 
          ]
        )
      ]
    )
  }
}