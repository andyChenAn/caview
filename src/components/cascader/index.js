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
      menus : [],
      source : []
    }
  },
  watch : {
    value (newVal) {
      this.sValue = newVal;
    },
    dataSource (newVal) {
      this.source = this.initDataSource(newVal);
    }
  },
  mounted () {
    const { dataSource } = this.$props;
    // 初始化数据源
    this.source = this.initDataSource(dataSource);
    const result = this.getMenusData(this.source);
    this.menus.push(result.list);
  },
  methods : {
    initDataSource (dataSource) {
      let level = 0;
      let res = [];
      const recursion = array => {
        level++;
        return array.map((item , index , arr) => {
          item.level = level;
          if (item.children && item.children.length > 0) {
            item.children = recursion(item.children);
          };
          if (arr.length - 1 === index) {
            level--;
          }
          return item;
        })
      }
      res = recursion(dataSource);
      return res;
    },
    getMenusData (array) {
      let res = [];
      let level;
      if (array) {
        array.forEach(item => {
          level = item.level;
          res.push(item);
        });
        return {
          list : res,
          level : level
        };
      }
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
        return h(
          'ul',
          {
            class : classNames(prefixCls + '-menu')
          },
          [items]
        )
      };
    },
    clickMenuItem (item) {
      let result = this.getMenusData(item.children);
      if (result) {
        const { list , level } = result;
        let index = this.getIndex(this.menus , level)
        if (index > -1) {
          // 如果有同一级的数据
          let menus = this.menus.slice(0 , index);
          menus.push(list);
          this.menus = menus;
        } else {
          // 没有同一级的数据
          this.menus.push(list);
        }
      }
    },
    getIndex (target , level) {
      let index = -1;
      for (let i = 0 ; i < target.length ; i++) {
        for (let j = 0 ; j < target[i].length ; j++) {
          if (target[i][j].level === level) {
            index = i;
            break;
          }
        }
      };
      return index;
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