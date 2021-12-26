import classNames from "classnames";
import _extends from '@babel/runtime/helpers/extends';
import TimelineItem from './timelineItem';
import cloneVNode from '../utils/cloneVnode';
export default {
  props : {
    // 是否倒序
    reverse : {
      type : Boolean,
      default : false
    },
    // 相对于内容的时间轴点的位置，可以是left,right,alternate（全部在左，全部在右，交替左右）
    mode : {
      type : String,
      default : 'left'
    },
    // 最后一个节点是否存在，或者存在内容
    pending : {
      type : [String , Boolean , Object],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-timeline'
    },
    pendingSlot : {
      type : String,
      default : ''
    }
  },
  methods : {
    getLastChild () {
      const { pending , prefixCls } = this.$props;
      const pendingSlot = this.$props.pendingSlot || this.$slots.pendingSlot;
      const h = this.$createElement;
      if ((pending && typeof pending === 'boolean' && pendingSlot) || (typeof pending === 'string' && pending)) {
        const timelineItemProps = {
          props : {
            prefixCls : prefixCls,
            pending : pending,
          },
          class : classNames(prefixCls + '-item-pending')
        };
        let children;
        if (pending && typeof pending === 'boolean' && pendingSlot) {
          children = pendingSlot;
        } else if (typeof pending === 'string' && pending) {
          children = pending;
        }
        return h(
          TimelineItem,
          timelineItemProps,
          [children]
        )  
      }
    }
  },
  render () {
    const { prefixCls , reverse , pending , mode } = this.$props;
    const h = this.$createElement;
    let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
    let newChildren = [];
    const lastChildren = this.getLastChild();
    children = reverse ? children.reverse() : children;
    children.forEach((child , index) => {
      child.componentOptions.propsData = _extends({} , (child.componentOptions && child.componentOptions.propsData) , {
        prefixCls : prefixCls,
        isLast : index === children.length - 1,
        pending : pending,
        reverse : reverse
      });
      if (mode === 'alternate') {
        child.data = _extends({} , (child.data || {}) , {
          class : index % 2 === 0 ? prefixCls + '-item-left' : prefixCls + '-item-right'
        })
      } else if (mode === 'right') {
        child.data = _extends({} , (child.data || {}) , {
          class : prefixCls + '-item-right'
        })
      }
      child = cloneVNode(child)
      newChildren.push(child);
    });
    if (lastChildren && !reverse) {
      newChildren.push(lastChildren);
    } else if (lastChildren && reverse) {
      newChildren.unshift(lastChildren);
    }
    return h(
      'div',
      {
        class : classNames(prefixCls , reverse ? prefixCls + '-reverse' : '' , mode === 'alternate' ? prefixCls + '-alternate' : mode === 'right' ? prefixCls + '-right' : '')
      },
      [newChildren]
    )
  }
}