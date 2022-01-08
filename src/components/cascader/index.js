import classNames from "classnames";
import Cascader from './cascader';
import _extends from '@babel/runtime/helpers/extends';
import omit from 'omit.js';
// function recursion (array) {
//   let res = [];
//   array.map(item => {
//     res.push({
//       label : item.label,
//       value : item.value
//     })
//   });
//   return res;
// }
export default {
  props : {
    placeholder : {
      type : String,
      default : '请选择'
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
    },
    popupVisible : {
      type : Boolean,
      default : false
    },
    // 弹框位置，可以是bottomLeft，bottomRight , topLeft , topRight，默认为bottomLeft
    popupPlacement : {
      type : String,
      default : 'bottomLeft'
    },
    // 是否在选择框中显示搜索框
    showSearch : {
      type : Boolean,
      default : false
    }
  },
  model : {
    prop : 'popupVisible',
    event : 'visibleChange'
  },
  data () {
    const { value , defaultValue } = this.$props;
    const sValue = value.length > 0 ? value : defaultValue.length > 0 ? defaultValue : [];
    const placeHolderText = this.$props.placeholder;
    const popupVisible = this.$props.popupVisible || false;
    return {
      sValue : sValue,
      placeHolderText : placeHolderText,
      sPopupVisible : popupVisible,
      menus : []
    }
  },
  watch : {
    value (newVal) {
      this.sValue = newVal;
    }
  },
  mounted () {
    const { dataSource } = this.$props;
    this.menus = this.getMenusData(dataSource);
  },
  methods : {
    getMenusData (array) {
      let res = [];
      array.forEach(item => {
        res.push(item);
      });
      return [res];
    },
    renderInput () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const placeholder = this.getPlaceholder();
      return h(
        'input',
        {
          class : classNames(prefixCls + '-input'),
          attrs : {
            placeholder : placeholder,
            readonly : true,
            type : 'text'
          }
        }
      )
    },
    renderValue () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      const value = this.getValue();
      return h(
        'span',
        {
          class : classNames(prefixCls + '-value')
        },
        [value]
      )
    },
    renderArrow () {
      const h =this.$createElement;
      const { prefixCls } = this.$props;
      return h(
        'i',
        {
          class : classNames('iconfont icon-arrow-down' , prefixCls + '-arrow')
        }
      )
    },
    getContent () {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-picker')
        },
        [
          this.renderInput(),
          this.renderValue(),
          this.renderArrow()
        ]
      )
    },
    getValue () {
      let { sValue } = this.$data;
      return sValue.join(' / ');
    },
    getPlaceholder () {
      const { placeholder } = this.$props;
      const { sValue } = this.$data;
      return sValue.length > 0 ? '' : placeholder
    },
    getPopupContent () {
      const h = this.$createElement;
      const { menus } = this.$data;
      let content = [];
      menus.forEach(item => {
        content.push(this.renderMenu(item));
      });
      return content;
    },
    renderMenu (data) {
      const h = this.$createElement;
      const { prefixCls } = this.$props;
      let items = [];
      if (data && data.length > 0) {
        data.forEach(item => {
          items.push(h(
            'li',
            {
              class : classNames(prefixCls + '-menu-item'),
              attrs : {
                title : item.label
              },
              on : {
                click : () => this.clickMenuItem(item)
              },
              key : item.label
            },
            [
              item.label,
              h(
                'i',
                {
                  class : classNames('iconfont icon-arrow-right' , prefixCls + '-arrow-icon')
                }
              )
            ]
          ))
        });
      };
      return h(
        'ul',
        {
          class : classNames(prefixCls + '-menu')
        },
        [items]
      )
    },
    clickMenuItem (item) {
      const children = this.getMenusData(item.children);
      this.menus = this.menus.concat(children);
    },
    visibleChange1 (visible) {
      this.sPopupVisible = visible;
      this.$emit('visileChange' , visible);
    },
  },
  render () {
    const h =this.$createElement;
    const children = this.getContent();
    const cascaderProps = {
      props : _extends({} , omit(this.$props , ['placeholder' , 'dataSource' , 'defaultValue' , 'value' , 'showSearch' , 'popupVisible' , 'popupPlacement']) , {
        visible : this.sPopupVisible,
        trigger : 'click',
        placement : this.popupPlacement,
      }),
      on : _extends({} , this.$listeners , {
        visibleChange1 : this.visibleChange1
      })
    };
    const popup = this.getPopupContent();
    return h(
      Cascader,
      cascaderProps,
      [
        h(
          'template',
          {
            slot : 'popup'
          },
          [popup]
        ),
        children
      ]
    )
  }
}