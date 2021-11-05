import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
import Slide from './slide';
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
    speed : {
      type : [Number , String],
      default : 500
    }
  },
  data () {
    return {
      options : {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      const { height } = this.$el.querySelector('.ca-carousel-slide-list').getBoundingClientRect();
      const { width } = this.$el.getBoundingClientRect();
      this.options = _extends({} , {
        slideWidth : width,
        slideHeight : height
      });
    })
  },
  render () {
    const h = this.$createElement;
    const props = _extends({} , this.$props);
    const { dotPosition , prefixCls } = this.$props;
    if (props.effect === 'fade') {
      props.fade = true;
    };
    props.vertical = props.dotPosition === 'left' || props.dotPosition === 'left';
    let dotClass = prefixCls + '-dot';
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
      newChildren.push(h(
        'div',
        {
          class : classNames(prefixCls + '-slide-list' , props.vertical ? prefixCls + '-vertical' : prefixCls + '-horizontal'),
        },
        [vnode]
      ));
    };
    const slideProps = {
      props : _extends({} , props , {
        children : newChildren,
        ...this.options
      }),
      scopedSlots : this.$scopedSlots,
      ref : 'slide'
    };
    return h(
      Slide,
      slideProps,
      [newChildren]
    )
  }
}