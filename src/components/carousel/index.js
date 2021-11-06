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
    duration : {
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
      const slideDom = this.$el.querySelector('.ca-carousel-slide-list');
      if (slideDom) {
        const { height } =  slideDom.getBoundingClientRect();
        const { width } = this.$el.getBoundingClientRect();
        this.options = _extends({} , {
          slideWidth : width || 0,
          slideHeight : height || 0
        });
      }
    })
  },
  render () {
    const h = this.$createElement;
    const props = _extends({} , this.$props);
    const { dotPosition , prefixCls } = this.$props;
    props.vertical = props.dotPosition === 'left' || props.dotPosition === 'right';
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
          class : classNames(prefixCls + '-slide-list' , props.effect === 'scroll' ? props.vertical ? prefixCls + '-vertical' : prefixCls + '-horizontal' : prefixCls + '-fade')
        },
        [vnode]
      ));
    };
    const slideProps = {
      props : _extends({} , props , {
        children : newChildren,
        ...this.options
      }),
      scopedSlots : this.$scopedSlots
    };
    return h(
      Slide,
      slideProps,
      [newChildren]
    )
  }
}