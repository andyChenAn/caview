import classNames from "classnames";
import _extends from "@babel/runtime/helpers/extends";
const noop = function () {};
export default {
  props: {
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 是否显示面板指示点
    dot: {
      type: Boolean,
      default: false
    },
    // 是否显示切换箭头
    arrow: {
      type: Boolean,
      default: true
    },
    // 动画效果，可以是css3过渡动画的那几种常见效果，或者是贝塞尔曲线
    easing: {
      type: String,
      default: 'linear'
    },
    // 动画方式，可以是scroll，fade
    effect: {
      type: String,
      default: 'scroll'
    },
    // 样式前缀
    prefixCls: {
      type: String,
      default: 'ca-carousel'
    },
    // 面板指示点位置
    dotPosition: {
      type: String,
      default: 'bottom'
    },
    // 自定义的面板指示点的样式类
    dotClass: {
      type: String,
      default: ''
    },
    // 动画时长
    duration: {
      type: [String, Number],
      default: 300
    },
    // 自动播放时，切换动画的时长
    interval: {
      type: [String, Number],
      default: 3000
    },
    // 面板切换前的回调
    beforeChange : {
      type : Function,
      default : noop
    },
    // 面板切换后的回调
    afterChange : {
      type : Function,
      defualt : noop
    },
    // 面板切换方向是否为垂直方向，可以是水平，也可以是垂直
    vertical : {
      type : Boolean,
      default : false
    },
    slideWidth : {
      type : Number,
      default : 0
    },
    slideHeight : {
      type : Number,
      default : 0
    },
    children : {
      type : Array,
      default : []
    },
    prevArrow : [Array , Object],
    nextArrow : [Array , Object]
  },
  data () {
    return {
      // 是否正在执行动画
      isAnimate : false,
      // 当前面板的索引，用于控制跳转到对应的面板，默认是第一个面板
      currentIndex : 1,
      // 当前指示点的索引
      dotIndex : 0,
      // 鼠标放在面板上是否显示箭头
      showArrow : true
    }
  },
  beforeDestroy () {
    clearInterval(this.timeout);
    this.timeout = null;
  },
  mounted () {
    this.$nextTick(() => {
      this.autoPlay();
    })
  },
  methods : {
    clickNext () {
      if (this.isAnimate) {
        return;
      }
      this.isAnimate = true;
      const { effect , children } = this.$props;
      const count = children.length;
      if (this.currentIndex <= count) {
        this.currentIndex++;
        if (this.currentIndex > count) {
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
    clickPrev () {
      if (this.isAnimate) {
        return;
      }
      this.isAnimate = true;
      const { effect , children } = this.$props;
      const count = children.length;
      if (this.currentIndex > 0) {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
          this.dotIndex = count - 1;
          if (effect === 'fade') {
            this.currentIndex = count;
          }
        } else {
          this.dotIndex--;
        }
      } else {
        this.currentIndex = count - 1;
      }
    },
    onTransitionend () {
      const { effect , children } = this.$props;
      this.isAnimate = false;
      if (effect === 'scroll') {
        const count = children.length;
        if (this.currentIndex === count + 1) {
          this.currentIndex = 1;
        } else if (this.currentIndex === 0) {
          this.currentIndex = count;
        }
      }
    },
    renderPrevArrow (prefixCls) {
      const h = this.$createElement;
      const { arrow , vertical , prevArrow } = this.$props;
      let arrowDir = vertical ? 'up' : 'left';
      if (arrow) {
        if (prevArrow) {
          let prevArrowNode = prevArrow.length >= 1 ? prevArrow[0] : prevArrow;
          prevArrowNode.data = _extends({} , (prevArrowNode.data || {}) , {
            on : {
              click : this.clickPrev
            }
          });
          return prevArrowNode;
        } else {
          return h(
            'span',
            {
              class : classNames(`iconfont icon-arrow-${arrowDir}` , prefixCls + '-arrow-icon'),
              on : {
                click : this.clickPrev
              }
            }
          )
        }
      } else {
        return null;
      }
    },
    renderNextArrow (prefixCls) {
      const h = this.$createElement;
      const { arrow , vertical , nextArrow } = this.$props;
      let arrowDir = vertical ? 'down' : 'right';
      if (arrow) {
        if (nextArrow) {
          let nextArrowNode = nextArrow.length >= 1 ? nextArrow[0] : nextArrow;
          nextArrowNode.data = _extends({} , (nextArrowNode.data || {}) , {
            on : {
              click : this.clickNext
            }
          });
          return nextArrowNode;
        } else {
          return h(
            'span',
            {
              class : classNames(`iconfont icon-arrow-${arrowDir}` , prefixCls + '-arrow-icon'),
              on : {
                click : this.clickNext
              }
            }
          )
        }
      } else {
        return null;
      }
    },
    renderContent (prefixCls) {
      const { effect } = this.$props;
      // 根据不同的动画方式，我们渲染不同的面板内容
      if (effect === 'scroll') {
        // 如果动画效果是滚动
        return this.renderScrollContent(prefixCls)
      } else if (effect === 'fade') {
        // 如果动画效果是渐显
        return this.renderFadeContent(prefixCls);
      }
    },
    renderScrollContent (prefixCls) {
      const h = this.$createElement;
      const { effect , vertical } = this.$props;
      const count = this.children.length;
      let newChildren = [];
      let firstSlide = this.children[0];
      let lastSlide = this.children[count - 1];
      for (let i = 0 ; i < count ; i++) {
        let slide = this.children[i];
        newChildren.push(h(
          'div',
          {
            class : classNames(prefixCls + '-slide-list' , effect === 'scroll' ? prefixCls + `-${vertical ? 'vertical' : 'horizontal'}` : prefixCls + '-fade'),
            style : {
              width : this.slideWidth + 'px'
            }
          },
          [slide]
        ));
      };
      newChildren.unshift(h(
        'div',
        {
          class : classNames(prefixCls + '-slide-list' , effect === 'scroll' ? prefixCls + `-${vertical ? 'vertical' : 'horizontal'}` : prefixCls + '-fade'),
          style : {
            width : this.slideWidth + 'px'
          }
        },
        [firstSlide]
      ));
      newChildren.push(h(
        'div',
        {
          class : classNames(prefixCls + '-slide-list' , effect === 'scroll' ? prefixCls + `-${vertical ? 'vertical' : 'horizontal'}` : prefixCls + '-fade'),
          style : {
            width : this.slideWidth + 'px'
          }
        },
        [lastSlide]
      ));
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
              style : this.getScrollSlideInnerStyle(newChildren.length),
              on : {
                transitionend : this.onTransitionend
              }
            },
            newChildren
          )
        ]
      )
    },
    renderFadeContent (prefixCls) {
      const h = this.$createElement;
      const { children , slideWidth , effect } = this.$props;
      const count = children.length;
      let newChildren = [];
      for (let i = 0 ; i < count ; i++) {
        let slide = children[i];
        newChildren.push(h(
          'div',
          {
            class : classNames(prefixCls + '-slide-list' , effect === 'scroll' ? prefixCls + `-${vertical ? 'vertical' : 'horizontal'}` : prefixCls + '-fade'),
            style : this.getFadeSlideStyle(i)
          },
          [slide]
        ));
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
              style : this.getFadeSlideInnerStyle(count),
              on : {
                transitionend : this.onTransitionend
              }
            },
            newChildren
          )
        ]
      )
    },
    getFadeSlideInnerStyle (count) {
      const { slideWidth } = this.$props;
      const style = {};
      style.width = count * slideWidth + 'px';
      return style;
    },
    getFadeSlideStyle (index) {
      const style = {};
      const { slideWidth , easing , duration } = this.$props;
      style.width = slideWidth + 'px';
      style.position = 'relative';
      style.left = -(index * slideWidth) + 'px';
      style.opacity = `${this.currentIndex === (index + 1) ? 1 : 0}`;
      style.transition = `opacity ${duration}ms ${easing} , visibility ${duration}ms ${easing}`
      return style;
    },
    // 计算面板最外层容器的样式，当动画方式为scroll时
    getSlideBoxStyle () {
      const style = {};
      const { vertical , slideHeight } = this.$props;
      vertical && (style.height = slideHeight + 'px');
      return style;
    },
    // 计算面板容器的样式，当动画方式为scroll时
    getScrollSlideInnerStyle (slideCount) {
      const style = {};
      let transform , transition;
      const { vertical , duration , easing , slideHeight , slideWidth } = this.$props;
      const { currentIndex } = this.$data;
      if (vertical) {
        style.height = slideCount * slideHeight + 'px';
        transform = `translate3d(0 , ${-slideHeight * currentIndex}px , 0)`;
      } else {
        style.width = slideCount * slideWidth + 'px'; 
        transform = `translate3d(${-slideWidth * currentIndex}px , 0 , 0)`;
      };
      if (this.isAnimate) {
        transition = `transform ${duration}ms ${easing}`
      } else {
        transition = 'none';
      };
      style.transform = transform;
      style.transition = transition;
      return style;
    },
    // 渲染指示点
    renderDot (prefixCls) {
      const h = this.$createElement;
      const { dotClass , children , duration } = this.$props;
      const { dotIndex } = this.$data;
      let count = children.length;
      let dots = [];
      if (this.$scopedSlots.dot) {
        // 存在作用域插槽
        for (let i = 0 ; i < count ; i++) {
          let dotNodes = this.$scopedSlots.dot({index : i});
          let dotNode = Array.isArray(dotNodes) && dotNodes.length >= 1 ? dotNodes[0] : (dotNodes || {});
          dotNode.data = _extends({} , dotNode.data , {
            attrs : {
              'data-index' : i
            },
            on : {
              click : this.clickDot
            }
          });
          dots.push(dotNode);
        }
      } else {
        // 不存在作用域插槽
        for (let i = 0 ; i < count ; i++) {
          dots.push(h(
            'span',
            {
              class : classNames(prefixCls + '-dot-item' , dotIndex == i ? 'actived' : null),
              attrs : {
                'data-index' : i
              },
              style : {
                'transition-duration' : `${duration}ms`
              },
              on : {
                click : this.clickDot
              }
            }
          ))
        }
      };
      return h(
        'div',
        {
          class : dotClass
        },
        dots
      )
    },
    // 点击指示点，跳转到相应的面板
    clickDot (evt) {
      const index = Number(evt.currentTarget.dataset.index);
      this.moveTo(index);
    },
    moveTo (index) {
      if (this.dotIndex !== index) {
        this.dotIndex = index;
        this.currentIndex = index + 1;
        this.isAnimate = true;
      }
    },
    // 自动播放
    autoPlay () {
      const { autoplay , interval } = this.$props;
      if (autoplay) {
        clearInterval(this.timeout);
        this.timeout = setInterval(() => {
          this.clickNext();
        } , interval)
      }
    },
    handleMouseover () {
      clearInterval(this.timeout);
    },
    handleMouseleave () {
      this.autoPlay();
    },
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
            this.renderContent(prefixCls),
            this.renderNextArrow(prefixCls),
            this.renderDot(prefixCls)
          ]
        )
      ]
    )
  }
};