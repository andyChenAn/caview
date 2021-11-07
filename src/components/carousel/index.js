import classNames from "classnames";
import _extends from "@babel/runtime/helpers/extends";
import Slide from './slide';
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
    }
  },
  mounted () {
    this.$nextTick(() => {
      const slideDom = this.$el.querySelector('.ca-carousel-slide-list');
      // 你得有面板吧
      if (slideDom) {
        const { height } =  slideDom.getBoundingClientRect();
        const { width } = this.$el.getBoundingClientRect();
        this.slideWidth = width || 0;
        this.slideHeight = height || 0;
        this.$forceUpdate();
      }
    })
  },
  methods : {
    getSlotPrevArrow () {
      let vnode = null;
      if (this.$slots.prevArrow) {
        vnode = this.$slots.prevArrow.filter(c => c.tag || c.text.trim() !== '');
      }
      return vnode;
    },
    getSlotNextArrow () {
      let vnode = null;
      if (this.$slots.nextArrow) {
        vnode = this.$slots.nextArrow.filter(c => c.tag || c.text.trim() !== '');
      }
      return vnode;
    },
    prev () {
      this.$refs.slide.clickPrev();
    },
    next () {
      this.$refs.slide.clickNext();
    },
    goTo (index) {
      this.$refs.slide.moveTo(index);
    }
  },
  render () {
    const h = this.$createElement;
    const props = _extends({} , this.$props);
    const { dotPosition , prefixCls } = this.$props;
    props.vertical = dotPosition === 'left' || dotPosition === 'right';
    const dotClass = prefixCls + '-dot';
    props.dotClass = classNames(dotClass , dotClass + '-' + dotPosition , {[this.dotClass] : !!this.dotClass})
    let children = this.$slots.default || [];
    children = children.filter(c => c.tag || c.text.trim() !== '');
    let newChildren = [];
    for (let i = 0 ; i < children.length ; i++) {
      let vnode = children[i];
      vnode.data = _extends({} , vnode.data , {
        style : {
          width : '100%'
        }
      });
      newChildren.push(vnode)
    };
    const slideProps = {
      props : _extends({} , props , {
        slideWidth : this.slideWidth || 0,
        slideHeight : this.slideHeight || 0,
        children : newChildren,
        prevArrow : this.getSlotPrevArrow(),
        nextArrow : this.getSlotNextArrow()
      }),
      ref : 'slide',
      scopedSlots : this.$scopedSlots
    };
    return h(
      Slide,
      slideProps,
      [newChildren]
    )
  }
}