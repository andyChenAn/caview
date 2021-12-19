import _extends from '@babel/runtime/helpers/extends';
import classNames from 'classnames';
import TabBar from './tabBar';
import TabContent from './tabContent';
export default {
  props : {
    // 激活的tab面板
    activeKey: {
      type : String,
      default : ''
    },
    // 默认激活的tab面板
    defaultActiveKey: {
      type : [String , Number],
      default : ''
    },
    // tab尺寸
    size: {
      type: String,
      default: 'default'
    },
    // tab bar位置，可以是top,left,bottom,right
    tabPosition: {
      type: String,
      default: 'top'
    },
    // tab bar之间的间距
    tabBarGutter: {
      type: Number,
      default: 0
    },
    // tab bar的样式
    tabBarStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // tab类型,支持line,card,editable-card
    type: {
      type: String,
      default: 'line'
    },
    prefixCls: {
      type: String,
      default: 'ca-tabs'
    },
    // tab内容是否需要动画效果
    animate: {
      type: Boolean,
      default: true
    },
    // 左箭头的样式
    prevArrowStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 右箭头的样式
    nextArrowStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch : {
    activeKey (value) {
      this.currentKey = value;
      this.currentIndex = this.getCurrentTabIndex(value);
    }
  },
  model : {
    prop : 'activeKey',
    event : 'change'
  },
  data () {
    const { activeKey , defaultActiveKey } = this.$props;
    // 如果默认也没有的话，那么就默认第一个tab为选中的tab
    const currentKey = activeKey || defaultActiveKey || '1';
    const currentIndex = this.getCurrentTabIndex(currentKey);
    return {
      currentKey : currentKey,
      currentIndex : currentIndex
    }
  },
  methods : {
    getCurrentTabIndex (currentKey) {
      let currentIndex;
      const children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
      children.map((child, index) => {
        if (currentKey === child.key) {
          currentIndex = index;
        }
      });
      return currentIndex;
    },
    prevClick () {
      this.$emit('prevClick');
    },
    nextClick () {
      this.$emit('nextClick');
    },
    tabClick (key) {
      this.currentKey = key;
      this.currentIndex = this.getCurrentTabIndex(key);
    },
    handleChange () {},
    renderTabBar () {
      const { prefixCls , animate , tabPosition , prevArrowStyle , nextArrowStyle } = this.$props;
      const { currentKey , currentIndex } = this.$data;
      let { tabBarExtraContent } = this.$slots;
      const h = this.$createElement;
      if (tabBarExtraContent) {
        tabBarExtraContent = h(
          'div',
          {
            class: classNames(prefixCls + '-extra-content')
          },
          [tabBarExtraContent]
        )
      };
      const tabBarProps = {
        props : {
          prefixCls : prefixCls,
          tabBarExtraContent : tabBarExtraContent,
          children : [],
          currentKey : currentKey,
          currentIndex : currentIndex,
          animate : animate,
          tabPosition : tabPosition,
          prevArrowStyle : prevArrowStyle || {},
          nextArrowStyle : nextArrowStyle || {}
        },
        on : {
          prevClick : this.prevClick,
          nextClick : this.nextClick,
          tabClick : this.tabClick,
          change : this.handleChange
        }
      };
      let children = this.$slots.default.filter(c => c.tag || c.text.trim('') !== '');
      children.forEach((child , index) => {
        let { tab , disabled } = child.componentOptions.propsData;
        let arr = [];
        child.componentOptions.children.forEach(item => {
          if (item.children && item.children.length > 0) {
            if (item.data && item.data.slot === 'tab') {
              if (item.data.attrs && item.data.attrs.slot) {
                // 删除掉slot属性，不然会展示在html上
                delete item.data.attrs.slot;
              };
              if (item.tag === 'template') {
                arr.push(item.children);
              } else {
                arr.push(item);
              }
              tab = arr;
            }
          };
        });
        const key = child.key || String(index++);
        tabBarProps.props.children.push({
          tab : tab,
          tabKey : key,
          disabled : disabled || disabled === ''
        });
      });
      return h(
        TabBar,
        tabBarProps
      )
    },
    renderTabContent () {
      const h = this.$createElement;
      const { prefixCls , animate , tabPosition } = this.$props;
      const { currentKey , currentIndex } = this.$data;
      const children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
      const tabContentProps = {
        props : {
          prefixCls : prefixCls,
          currentKey : currentKey,
          animate : animate,
          tabPosition : tabPosition,
          currentIndex : currentIndex
        }
      };
      return h(
        TabContent,
        tabContentProps,
        [children]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , tabPosition } = this.$props;
    let children = [
      this.renderTabBar(),
      this.renderTabContent()
    ];
    if (tabPosition === 'bottom') {
      children = [
        this.renderTabContent(),
        this.renderTabBar()
      ]
    }
    return h(
      'div',
      {
        class : classNames(prefixCls , prefixCls + '-' + tabPosition)
      },
      [children]
    )
  }
}

// import _extends from '@babel/runtime/helpers/extends';
// import TabBar from './tabBar';
// import TabContent from './tabContent';
// import classNames from 'classnames';
// export default {
//   props: {
//     // 激活的tab面板
//     activeKey: String,
//     // 默认激活的tab面板
//     defaultActiveKey: String,
//     // tab尺寸
//     size: {
//       type: String,
//       default: 'default'
//     },
//     // tab bar位置，可以是top,left,bottom,right
//     tabPosition: {
//       type: String,
//       default: 'top'
//     },
//     // tab bar之间的间距
//     tabBarGutter: {
//       type: Number,
//       default: 0
//     },
//     // tab bar的样式
//     tabBarStyle: {
//       type: Object,
//       default() {
//         return {}
//       }
//     },
//     // tab类型,支持line,card,editable-card
//     type: {
//       type: String,
//       default: 'line'
//     },
//     prefixCls: {
//       type: String,
//       default: 'ca-tabs'
//     },
//     // tab内容是否需要动画效果
//     animate: {
//       type: Boolean,
//       default: true
//     },
//     prevArrowStyle: {
//       type: Object,
//       default() {
//         return {};
//       }
//     },
//     nextArrowStyle: {
//       type: Object,
//       default() {
//         return {}
//       }
//     }
//   },
//   model: {
//     prop: 'activeKey',
//     event: 'change'
//   },
//   data() {
//     const currentKey = this.$props.activeKey || this.$props.defaultActiveKey;
//     const children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
//     const currentIndex = this.getCurrentIndex();
//     return {
//       currentKey: currentKey,
//       currentIndex : currentIndex
//     }
//   },
//   watch: {
//     activeKey(key) {
//       this.currentKey = key;
//       this.currentIndex = this.getCurrentIndex();
//     }
//   },
//   methods: {
//     getCurrentIndex () {
//       let currentIndex;
//       const children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
//       children.map((child, index) => {
//         if (this.currentKey === child.key) {
//           currentIndex = index;
//         }
//       });
//       return currentIndex;
//     },
//     renderTabBar(prefixCls) {
//       const h = this.$createElement;
//       let tabBarExtraContent = null;
//       if (this.$slots.tabBarExtraContent) {
//         tabBarExtraContent = h(
//           'div',
//           {
//             class: classNames(prefixCls + '-extra-content')
//           },
//           [this.$slots.tabBarExtraContent]
//         )
//       };
//       let tabBarProps = {
//         props: {
//           prefixCls: prefixCls,
//           tabBarExtraContent: tabBarExtraContent,
//           tabs: [],
//           activeKey: this.currentKey,
//           activeIndex: 0,
//           animate: this.animate,
//           tabPosition : this.$props.tabPosition
//         },
//         on: {
//           prevClick: this.prevClick,
//           nextClick: this.nextClick,
//           tabClick: this.tabClick,
//         }
//       };
//       let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
//       children.map((c, index) => {
//         let { tab, disabled } = c.componentOptions.propsData;
//         const cChildren = c.componentOptions.children;
//         if (cChildren[0].children && cChildren[0].children.length > 0) {
//           let arr = [];
//           cChildren.forEach(child => {
//             if (child.data && child.data.slot === 'tab') {
//               // 删除掉slot属性，不然会展示在html上
//               if (child.data.attrs && child.data.attrs.slot) {
//                 delete child.data.attrs.slot;
//               }
//               if (child.tag === 'template') {
//                 arr.push(child.children);
//               } else {
//                 arr.push(child);
//               }
//             }
//           });
//           tab = arr;
//         }
//         const key = c.key;
//         tabBarProps.props.tabs.push({
//           tab: tab,
//           tabKey: key,
//           disabled: !!disabled || disabled === ''
//         });
//         if (this.currentKey == key) {
//           tabBarProps.props.activeIndex = index;
//         }
//       });
//       return h(
//         TabBar,
//         tabBarProps
//       )
//     },
//     tabClick(currentKey, currentIndex) {
//       this.currentKey = currentKey;
//       this.activeIndex = currentIndex;
//     },
//     prevClick() {
//       this.$emit('prevClick');
//     },
//     nextClick() {
//       this.$emit('nextClick');
//     },
//     renderTabContent(prefixCls) {
//       const h = this.$createElement;
//       this.$slots.default.filter(c => c.tag || c.text.trim() !== '').map((child, index) => {
//         if (this.currentKey == child.key) {
//           this.activeIndex = index;
//         }
//       })
//       const tabContentProps = {
//         props: {
//           prefixCls: prefixCls,
//           activeKey: this.currentKey,
//           activeIndex: this.activeIndex,
//           animate: this.animate,
//           tabPosition : this.$props.tabPosition
//         }
//       };
//       return h(
//         TabContent,
//         tabContentProps,
//         [this.$slots.default]
//       )
//     }
//   },
//   render() {
//     const h = this.$createElement;
//     const { prefixCls, tabPosition } = this.$props;
//     let children = [
//       this.renderTabBar(prefixCls),
//       this.renderTabContent(prefixCls)
//     ];
//     children = tabPosition === 'bottom' ? children.reverse() : children;
//     return h(
//       'div',
//       {
//         class: classNames(prefixCls, prefixCls + '-' + tabPosition)
//       },
//       children
//     )
//   }
// }