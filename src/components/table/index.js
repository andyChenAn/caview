import T from './table';
import _extends from '@babel/runtime/helpers/extends';
export default {
  props : T.props,
  render () {
    const h = this.$createElement;
    return h(
      T,
      {
        props : _extends({} , this.$props)
      }
    )
  }
}