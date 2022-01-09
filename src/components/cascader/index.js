import classNames from "classnames";
import Cascader from './cascader';
import _extends from '@babel/runtime/helpers/extends';
import omit from 'omit.js';
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
    },
    // 选中即改变视图
    changeOnSelect : {
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
      // value值
      sValue : sValue,
      // placehoder
      placeHolderText : placeHolderText,
      // 是否显示弹框
      sPopupVisible : popupVisible,
      menus : [],
      // 数据源
      source : [],
      // 箭头向下还是向上
      arrowRotate : false,
      // 输入框是否获得焦点
      isFocus : false,
    }
  },
  watch : {
    value (newVal) {
      this.sValue = newVal;
    },
    dataSource (newVal) {
      this.source = this.initDataSource(newVal);
    },
    sPopupVisible (newVal) {
      if (!newVal) {
        this.arrowRotate = false;
        // 就先这样吧
        setTimeout(() => {
          // 如果没有值，那么就重置到默认状态
          if (!this.changeOnSelect) {
            if (this.sValue.length == 0) {
              this.source = this.resetSelected(this.source);
              this.menus = this.getMenusList();
            } else if (this.sValue.length > 0) {
              this.source = this.getSelectedForValue();
              this.menus = this.getMenusList();
            }
          }
        } , 300);
      } else {
        this.arrowRotate = true;
      }
    }
  },
  mounted () {
    const { dataSource } = this.$props;
    // 初始化数据源,主要是添加level和selected字段，用于后续逻辑处理
    this.source = this.initDataSource(dataSource);
    // 用于展示的级联数据(this.menus)
    this.menus = this.getMenusList();
  },
  methods : {
    getSelectedForValue () {
      const { sValue , source } = this.$data;
      const step = array => {
        return array.map(item => {
          item.selected = false;
          if (sValue.indexOf(item.value) > -1) {
            item.selected = true;
          }
          if (item.children && item.children.length > 0) {
            item.children = step(item.children);
          }
          return item;
        })
      }
      return step(source)
    },
    getMenusList () {
      const { source } = this.$data;
      let res = [];
      res.push(source);
      const step = array => {
        array.map(item => {
          if (item.selected) {
            if (item.children && item.children.length > 0) {
              res.push(item.children);
            }
          }
          if (item.children && item.children.length > 0) {
            step(item.children);
          }
        })
      };
      step(source);
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
    resetSelected (arr) {
      const step = arr => {
        return arr.map(item => {
          item.selected = false;
          if (item.children && item.children.length > 0) {
            item.children = step(item.children);
          }
          return item;
        })
      }
      return step(arr);
    },
    initDataSource (dataSource) {
      let level = 0;
      let res = [];
      const { sValue } = this.$data;
      const recursion = array => {
        level++;
        return array.map((item , index , arr) => {
          this.$set(item , 'level' , level);
          this.$set(item , 'selected' , false);
          if (sValue.indexOf(item.value) > -1) {
            item.selected = true;
          }
          if (item.children && item.children.length > 0) {
            this.$set(item , 'isLeaf' , false);
            item.children = recursion(item.children);
          } else {
            this.$set(item , 'isLeaf' , true);
          }
          if (arr.length - 1 === index) {
            level--;
          }
          return item;
        })
      }
      res = recursion(dataSource);
      return res;
    },
    renderInput () {
      const h = this.$createElement;
      const { prefixCls , showSearch } = this.$props;
      const placeholder = this.getPlaceholder();
      const inputProps = {
        class : classNames(prefixCls + '-input'),
        attrs : {
          placeholder : placeholder,
          type : 'text'
        },
        on : {
          focus : this.onFocus,
          blur : this.onBlur,
          input : this.onChange
        }
      };
      if (!showSearch) {
        inputProps.attrs.readonly = true;
      };
      return h(
        'input',
        inputProps
      )
    },
    onFocus () {
      this.isFocus = true;
    },
    onBlur () {
      this.isFocus = false;
    },
    onChange (evt) {
      this.prevSValue = this.prevSValue || JSON.parse(JSON.stringify(this.sValue));
      const value = evt.target.value.trim();
      if (value) {
        this.sValue = [];
      } else {
        this.sValue = this.prevSValue;
      }
      this.searchKeyword(value);
    },
    searchKeyword (value) {
      let res = [];
      const data = JSON.parse(JSON.stringify(this.source));
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
      const { arrowRotate } = this.$data;
      return h(
        'i',
        {
          class : classNames('iconfont icon-arrow-down' , prefixCls + '-arrow' , arrowRotate ? prefixCls + '-arrow-rotate' : '')
        }
      )
    },
    renderClearIcon () {
      const h =this.$createElement;
      const { prefixCls } = this.$props;
      const { sValue } = this.$data;
      return sValue.length > 0 && h(
        'i',
        {
          class : classNames('iconfont icon-error' , prefixCls + '-clear-icon'),
          on : {
            click : this.clearValue
          }
        }
      )
    },
    clearValue (evt) {
      evt.stopPropagation();
      this.sValue = [];
      this.source = this.resetSelected(this.source);
      this.menus = this.getMenusList();
      this.sPopupVisible = false;
    },
    getContent () {
      const h = this.$createElement;
      const { prefixCls , showSearch } = this.$props;
      const { isFocus } = this.$data;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-picker' , showSearch ? prefixCls +'-picker-show-search' : '' , isFocus ? prefixCls + '-picker-focused' : '')
        },
        [
          this.renderInput(),
          this.renderValue(),
          this.renderClearIcon(),
          this.renderArrow()
        ]
      )
    },
    getValue () {
      const { source , sValue } = this.$data;
      let res = [];
      const step = array => {
        array.map(item => {
          if (sValue.indexOf(item.value) > -1) {
            res.push(item.label);
          };
          if (item.children && item.children.length > 0) {
            step(item.children);
          }
        })
      }
      step(source);
      return res.join(' / ');
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
              class : classNames(prefixCls + '-menu-item' , item.selected ? 'selected' : '' , item.disabled ? prefixCls + '-menu-item-disabled' : ''),
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
              item.children && h(
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
      if (item.disabled) {
        return;
      }
      // 先将同一级和同一级下的所有子元素的选中状态设置为false
      for (let i = 0 ; i < this.menus.length ; i++) {
        for (let j = 0 ; j < this.menus[i].length ; j++) {
          if (this.menus[i][j].level === item.level) {
            this.menus[i][j].selected = false;
            if (item.children && item.children.length > 0) {
              const step = array => {
                array.map(item => {
                  item.selected = false;
                  if (item.children && item.children.length > 0) {
                    step(item.children);
                  }
                })
              }
              step(item.children);
            }
          }
        }
      }
      // 设置选中状态
      item.selected = true;
      let result = this.getMenusData(item.children);
      if (result) {
        const { list , level } = result;
        let index = this.getIndex(this.menus , level);
        if (index > -1) {
          // 如果有同一级的数据
          let menus = this.menus.slice(0 , index);
          menus.push(list);
          this.menus = menus;
        } else {
          // 没有同一级的数据
          this.menus.push(list);
        }
        if (this.changeOnSelect) {
          this.sValue = this.getArrayValue(this.menus);
          const selectedData = this.getSelectedData(this.menus);
          this.$emit('change' , this.sValue , selectedData);
        }
      } else {
        // 点击的是最后一级了
        this.sValue = this.getArrayValue(this.menus);
        const selectedData = this.getSelectedData(this.menus);
        this.sPopupVisible = false;
        this.$emit('change' , this.sValue , selectedData);
      }
    },
    getSelectedData (arr) {
      let res = [];
      for (let i = 0 ; i < arr.length ; i++) {
        for (let j = 0 ; j < arr[i].length ; j++) {
          if (arr[i][j].selected) {
            res.push(arr[i][j]);
          }
        }
      };
      return res;
    },
    getArrayValue (arr) {
      let res = [];
      for (let i = 0 ; i < arr.length ; i++) {
        for (let j = 0 ; j < arr[i].length ; j++) {
          if (arr[i][j].selected) {
            res.push(arr[i][j].value);
          }
        }
      };
      return res;
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
    const children = this.$slots.default || this.getContent();
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