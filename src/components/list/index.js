import _extends from '@babel/runtime/helpers/extends';
import List from './list';
export default {
  props : {
    header : {
      type : [String , Object],
      default : ''
    },
    footer : {
      type : [String , Object],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-list'
    },
    border : {
      type : Boolean,
      default : false
    },
    split : {
      type : Boolean,
      default : true
    },
    dataSource : {
      type : Array,
      default () {
        return [];
      }
    },
    size : {
      type : String,
      default : 'default'
    },
    extra : {
      type : [String , Object],
      default : ''
    },
    loadMore : {
      type : [String , Array],
      default : ''
    }
  },
  render () {
    const h = this.$createElement;
    const listProps = {
      props : _extends({} , this.$props , {
        loadMore : this.$props.loadMore || this.$slots.loadMore
      }),
      scopedSlots : this.$scopedSlots
    };
    return h(
      List,
      listProps,
      [this.$slots.default]
    )
  }
}