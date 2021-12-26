import classNames from "classnames";

export default {
  props : {
    placeholder : {
      type : String,
      default : ''
    },
    // 数据
    dataSource : {
      type : Array,
      default () {
        return [];
      }
    },
    // 默认选中项
    defaultValue : {
      type : Array,
      default () {
        return [];
      }
    },
    // 选中项
    value : {
      type : Array,
      default () {
        return [];
      }
    },
    prefixCls : {
      type : String,
      default : 'ca-cascader'
    }
  },
  methods : {
    renderInput () {
      const h = this.$createElement;
    },
    renderValue () {},
    renderArrow () {}
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
        this.renderInput(),
        this.renderValue(),
        this.renderArrow()
      ]
    )
  }
}