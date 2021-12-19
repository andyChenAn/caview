import classNames from "classnames";
import _extends from "@babel/runtime/helpers/extends";
import TabList from './tabList';
import PrevArrow from "./prevArrow";
import NextArrow from './nextArrow';
export default {
  props : {
    prefixCls : String,
    tabBarExtraContent : {
      type : [Object , String],
      default : ''
    },
    children : Array,
    currentKey : String,
    currentIndex : [String , Number],
    animate : Boolean,
    tabPosition : String,
    prevArrowStyle : Object,
    nextArrowStyle : Object
  },
  data () {
    const activeIndex = this.$props.currentIndex || 0;
    // tab容器的偏移量
    this.offset = 0;
    // 当tabPosition为top或者bottom时，下划线的偏移量
    this.lineLeft = 0;
    // 当tabPosition为left或者right时，下划线的偏移量
    this.lineTop = 0;
    return {
      // 是否展示左右箭头
      showArrow : false,
      // 当前选中的tab索引
      activeIndex : activeIndex
    }
  },
  watch : {
    tabPosition (value) {
      if (value === 'top' || value === 'bottom') {
        this.setTabActiveLineStyle('width');
      } else {
        this.setTabActiveLineStyle('height');
      }
      this.setTabActiveLineTransform(this.activeIndex , value);
      this.setTabBoxTransform(this.activeIndex , value);
    },
    currentIndex (value) {
      const { tabPosition } = this.$props;
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        this.setTabActiveLineStyle('width');
      } else {
        this.setTabActiveLineStyle('height');
      }
      this.setTabActiveLineTransform(value , tabPosition);
      this.setTabBoxTransform(value , tabPosition);
    }
  },
  methods : {
    // tabbar挂载完成之后的回调
    tabBarMounted (tabBarNode) {
      const { tabPosition } = this.$props;
      tabBarNode = this.tabBarNode || (this.tabBarNode = tabBarNode);
      const tabBarWidth = tabBarNode.getBoundingClientRect().width;
      const wrapWidth = this.$el.getBoundingClientRect().width;
      if (tabBarWidth > wrapWidth) {
        // 如果tab容器宽度超过了外部容器的宽度，那么就展示左右箭头，用于切换
        this.showArrow = true;
      };
      // 计算并设置选中的tab对应的下划线的样式
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        this.setTabActiveLineStyle('width');
      } else {
        this.setTabActiveLineStyle('height');
      }
      this.setTabActiveLineTransform(this.activeIndex , tabPosition);
      this.setTabBoxTransform(this.activeIndex , tabPosition);
    },
    getCurrentTab (index) {
      const tabListNode = this.tabBarNode.children;
      return tabListNode[index];
    },
    // 设置下划线的样式，主要是宽度和高度，根据tabPosition来设置
    setTabActiveLineStyle (attrName) {
      this.$refs.line.style.width = '';
      this.$refs.line.style.height = '';
      const { currentKey } = this.$props;
      const tabListNode = this.tabBarNode.children;
      for (let i = 0 ; i < tabListNode.length ; i++) {
        let tab = tabListNode[i];
        if (tab.key == currentKey) {
          const rect = tab.getBoundingClientRect();
          this.$refs.line.style[attrName] = rect[attrName] + 'px';
        }
      }
    },
    prevClick () {
      const { tabPosition } = this.$props;
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        const width = this.$refs.tabBox.offsetWidth;
        const scrollWidth = Math.abs(this.offset) - width;
        if (scrollWidth > 0) {
          this.offset += width;
        } else {
          this.offset = 0;
        };
        this.$refs.nav.style.transform = `translate3d(${this.offset}px , 0px , 0px)`;
      }
      this.$emit('prevClick');
    },
    nextClick () {
      const { tabPosition } = this.$props;
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        const width = this.$refs.tabBox.offsetWidth;
        const navWidth = this.$refs.nav.offsetWidth;
        const scrollWidth = navWidth - width - Math.abs(this.offset);
        // 如果scrollWidth等于0，表示已经位移都最后面了，就不需要再位移了
        if (scrollWidth > 0) {
          if (scrollWidth - width > 0) {
            this.offset -= width;
          } else {
            this.offset = -(navWidth - width);
          }
        };
        this.$refs.nav.style.transform = `translate3d(${this.offset}px ,0px , 0px)`;
      }
      this.$emit('nextClick');
    },
    clickTab (evt) {
      const { tabPosition } = this.$props;
      const currentTab = evt.currentTarget;
      const currentKey = currentTab.key;
      this.activeIndex = currentTab.index;
      // 计算并设置选中的tab对应的下划线的样式
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        this.setTabActiveLineStyle('width');
      } else {
        this.setTabActiveLineStyle('height');
      };
      this.setTabActiveLineTransform(this.activeIndex , tabPosition);
      this.setTabBoxTransform(this.activeIndex , tabPosition);
      this.$emit('tabClick' , currentKey);
    },
    setTabBoxTransform (index , tabPosition) {
      this.$refs.nav.style.transform = '';
      const currentTab = this.getCurrentTab(index);
      this.$nextTick(() => {
        if (index > 0) {
          if (tabPosition === 'top' || tabPosition === 'bottom') {
            const currentTabOffset = currentTab.offsetWidth + currentTab.offsetLeft;
            const tabBoxWidth = this.$refs.tabBox.offsetWidth;
            if (currentTabOffset > tabBoxWidth + Math.abs(this.offset)) {
              this.offset = -(currentTabOffset - tabBoxWidth);
            } else if (currentTab.offsetLeft < Math.abs(this.offset)) {
              let offset = -(Math.abs(this.offset) - currentTab.offsetLeft);
              this.offset = -(Math.abs(this.offset) + offset);
            }
            this.$refs.nav.style.transform = `translate3d(${this.offset}px , 0px , 0px)`;
          } else {
            const currentTabOffset = currentTab.offsetHeight + currentTab.offsetTop;
            const tabBoxHeight = this.$refs.tabBox.offsetHeight;
          }
        } else {
          this.offset = 0;
          this.$refs.nav.style.transform = `translate3d(${this.offset}px , 0px , 0px)`;
        }
      })
    },
    setTabActiveLineTransform (index , tabPosition) {
      this.$nextTick(() => {
        const tabListNode = this.tabBarNode.children;
        if (tabListNode.length > 0) {
          const currentNode = tabListNode[index];
          if (tabPosition === 'top' || tabPosition === 'bottom') {
            this.lineLeft =  currentNode.offsetLeft;
            this.$refs.line.style.transform = `translate3d(${this.lineLeft}px , 0px , 0px)`;
          } else {
            this.lineTop = currentNode.offsetTop;
            this.$refs.line.style.transform = `translate3d(0px , ${this.lineTop}px , 0px)`;
          }
        }
      })
    },
    renderPrevArrow () {
      const h = this.$createElement;
      const { prefixCls , prevArrowStyle , tabPosition } = this.$props;
      const { showArrow } = this.$data;
      const prevArrowProps = {
        props : {
          prefixCls : prefixCls,
          prevArrowStyle : prevArrowStyle,
          tabPosition : tabPosition
        }
      };
      return h(
        'span',
        {
          class : classNames(prefixCls + '-tab-prev' , showArrow ? prefixCls + '-tab-show' : ''),
          on : {
            click : this.prevClick
          }
        },
        [
          h(
            PrevArrow,
            prevArrowProps
          )
        ]
      )
    },
    renderNextArrow () {
      const h = this.$createElement;
      const { prefixCls , nextArrowStyle , tabPosition } = this.$props;
      const { showArrow } = this.$data;
      const nextArrowProps = {
        props : {
          prefixCls : prefixCls,
          nextArrowStyle : nextArrowStyle,
          tabPosition : tabPosition
        }
      };
      return h(
        'span',
        {
          class : classNames(prefixCls + '-tab-next' , showArrow ? prefixCls + '-tab-show' : ''),
          on : {
            click : this.nextClick
          }
        },
        [
          h(
            NextArrow,
            nextArrowProps
          )
        ]
      )
    },
    renderTabBarList () {
      const h = this.$createElement;
      const { prefixCls } = this.$props; 
      return h(
        'div',
        {
          class : classNames(prefixCls + '-nav-tab'),
          ref : 'tabBox'
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-nav-scroll'),
              ref : 'navScroll'
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-nav'),
                  ref : 'nav'
                },
                [
                  this.renderTabList(),
                  this.renderActiveLine()
                ]
              )
            ]
          )
        ]
      )
    },
    renderTabList () {
      const h = this.$createElement;
      const { children , currentKey , prefixCls } = this.$props;
      let tabList = [];
      children.forEach((child , index) => {
        let events = {};
        if (!child.disabled) {
          events.click = this.clickTab;
        }
        tabList.push(h(
          'div',
          {
            class : classNames(prefixCls + '-tab' , child.tabKey == currentKey ? prefixCls + '-tab-active' : '' , child.disabled ? prefixCls + '-tab-disabled' : ''),
            on : events,
            key : child.tabKey,
            domProps : {
              key : child.tabKey,
              index : index
            }
          },
          [child.tab]
        ))
      });
      const tabListProps = {
        props : {
          tabList : tabList,
          children (ref) {
            return ref.renderTabList();
          },
          tabBarMounted : this.tabBarMounted
        }
      }
      return h(
        TabList,
        tabListProps
      )
    },
    renderActiveLine () {
      const h = this.$createElement;
      const { animate , prefixCls } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-tab-line' , animate ? prefixCls + '-tab-line-animate' : '-tab-line-no-animate'),
          ref : 'line'
        }
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , tabPosition , tabBarExtraContent } = this.$props;
    const { showArrow } = this.$data;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-bar' , prefixCls + '-bar-' + tabPosition)
      },
      [
        tabBarExtraContent && h(
          'div',
          {
            class : classNames(prefixCls + '-extra-content')
          },
          [tabBarExtraContent]
        ),
        h(
          'div',
          {
            class : classNames(prefixCls + '-bar-container' , showArrow ? prefixCls + '-bar-container-scrolling' : '')
          },
          [
            this.renderPrevArrow(),
            this.renderNextArrow(),
            this.renderTabBarList()
          ]
        )
      ]
    )
  }
}

// import classNames from "classnames";
// import PrevArrow from "./prevArrow";
// import NextArrow from './nextArrow';
// import Tab from './tab';
// import _extends from "@babel/runtime/helpers/extends";
// export default {
//   props: {
//     prefixCls: String,
//     tabBarExtraContent: Object,
//     tabs: {
//       type: Array,
//       default() {
//         return [];
//       }
//     },
//     prevArrowStyle: Object,
//     activeKey: String,
//     activeIndex: Number,
//     animate: Boolean,
//     tabPosition: String
//   },
//   data() {
//     this.currentKey = this.$props.activeKey;
//     const activeTabIndex = this.$props.activeIndex;
//     return {
//       // 是否展示左右箭头
//       showArrow: false,
//       // 当前选中的tab索引
//       activeTabIndex: activeTabIndex,
//       // 下划线的宽度
//       lineWidth: 0,
//       // tab容器的位移距离
//       tabOffset: 0,
//       lineTransform : {}
//     }
//   },
//   watch: {
//     activeIndex(value) {
//       this.activeTabIndex = value;
//     },
//     tabPosition(value) {
//       const { prefixCls } = this.$props;
//       let tabs = this.$refs.nav.querySelectorAll('.' + prefixCls + '-tab');
//       let currentTab = tabs[this.activeTabIndex];
//       // 设置下划线的宽度
//       const rect = currentTab.getBoundingClientRect();
//       if (value === 'left' || value === 'right') {
//         this.lineWidth = rect.height;
//       } else {
//         this.lineWidth = rect.width;
//       }
//     }
//   },
//   updated () {
//     // if (this.$refs.nav) {
//     //   let res = {
//     //     transform: 'translate3d(0px,0px,0px)'
//     //   };
//     //   const { prefixCls, tabPosition } = this.$props;
//     //   let tabs = this.$refs.nav.querySelectorAll('.' + prefixCls + '-tab');
//     //   if (tabs.length > 0) {
//     //     const activeNode = tabs[index];
//     //     let width = activeNode.offsetLeft + activeNode.offsetWidth;
//     //     let height = activeNode.offsetTop + activeNode.offsetHeight;
//     //     if (this.$refs.tabBox) {
//     //       if (tabPosition === 'top' || tabPosition === 'bottom') {
//     //         let tabBoxWidth = this.$refs.tabBox.offsetWidth;
//     //         if (width > tabBoxWidth) {
//     //           offset = width - tabBoxWidth;
//     //         }
//     //         res.transform = `translate3d(${activeNode.offsetLeft}px , 0px , 0px)`
//     //       } else {
//     //         let tabBoxHeight = this.$refs.tabBox.offsetHeight;
//     //         if (height > tabBoxHeight) {
//     //           offset = activeNode.offsetTop;
//     //         }
//     //         res.transform = `translate3d(0px , ${activeNode.offsetTop}px , 0px)`
//     //       }
//     //     }
//     //   };
//     //   return res;
//     // }
//     this.$nextTick(() => {
//       console.log(this.$refs.line)
//     })
//   },
//   methods: {
//     renderPrevArrow(prefixCls) {
//       const h = this.$createElement;
//       const { prevArrowStyle } = this.$props;
//       const { showArrow } = this.$data;
//       const prevArrowProps = {
//         props: {
//           prefixCls: prefixCls,
//           prevArrowStyle: prevArrowStyle,
//         },
//       }
//       return h(
//         'span',
//         {
//           class: classNames(prefixCls + '-tab-prev', showArrow ? prefixCls + '-tab-show' : ''),
//           on: {
//             click: this.prevClick
//           }
//         },
//         [
//           h(
//             PrevArrow,
//             prevArrowProps
//           )
//         ]
//       )
//     },
//     prevClick() {
//       const width = this.$refs.tabBox.offsetWidth;
//       const scrollWidth = Math.abs(this.tabOffset) - width;
//       if (scrollWidth > 0) {
//         this.tabOffset += width;
//       } else {
//         this.tabOffset = 0;
//       }
//       this.$emit('prevClick');
//     },
//     renderNextArrow(prefixCls) {
//       const h = this.$createElement;
//       const { nextArrowStyle } = this.$props;
//       const { showArrow } = this.$data;
//       const nextArrowProps = {
//         props: {
//           prefixCls: prefixCls,
//           nextArrowStyle: nextArrowStyle
//         },
//       };
//       return h(
//         'span',
//         {
//           class: classNames(prefixCls + '-tab-next', showArrow ? prefixCls + '-tab-show' : ''),
//           on: {
//             click: this.nextClick
//           }
//         },
//         [
//           h(
//             NextArrow,
//             nextArrowProps
//           )
//         ]
//       )
//     },
//     nextClick() {
//       const width = this.$refs.tabBox.offsetWidth;
//       const navWidth = this.$refs.nav.offsetWidth;
//       const scrollWidth = navWidth - width - Math.abs(this.tabOffset);
//       // 如果scrollWidth等于0，表示已经位移都最后面了，就不需要再位移了
//       if (scrollWidth !== 0) {
//         if (scrollWidth - width > 0) {
//           this.tabOffset -= width;
//         } else {
//           this.tabOffset = -(navWidth - width);
//         }
//       }
//       this.$emit('nextClick');
//     },
//     // 是否展示左右箭头按钮
//     disableArrow(node) {
//       const { prefixCls, tabPosition } = this.$props;
//       const tabListNode = this.tabListNode || (this.tabListNode = node);
//       const tabWidth = tabListNode.getBoundingClientRect().width;
//       const wrapWidth = this.$el.getBoundingClientRect().width;
//       if (tabWidth > wrapWidth) {
//         // 如果tab容器宽度超过了外部容器的宽度，那么就展示左右箭头，用于切换
//         this.showArrow = true;
//       };
//       // 设置下划线的宽度
//       const activeTabNode = tabListNode.querySelector('.' + prefixCls + '-tab-active');
//       const rect = activeTabNode.getBoundingClientRect();
//       if (tabPosition === 'left' || tabPosition === 'right') {
//         this.lineWidth = rect.height;
//       } else {
//         this.lineWidth = rect.width;
//       }
//     },
//     renderTab(prefixCls) {
//       const h = this.$createElement;
//       const { tabs } = this.$props;
//       let children = [];
//       tabs.map((tab, index) => {
//         let events = {};
//         if (!tab.disabled) {
//           events.click = this.clickTab;
//         }
//         children.push(h(
//           'div',
//           {
//             class: classNames(prefixCls + '-tab', tab.tabKey == this.currentKey ? prefixCls + '-tab-active' : '', tab.disabled ? prefixCls + '-tab-disabled' : ''),
//             attrs: {
//               'data-index': index
//             },
//             ref: 'tab',
//             on: events,
//             key: index
//           },
//           [tab.tab]
//         ))
//       });
//       return h(
//         Tab,
//         {
//           props: {
//             children(ref) {
//               return ref.renderTabList()
//             },
//             tabList: children,
//             disableArrow: this.disableArrow
//           }
//         }
//       )
//     },
//     clickTab(evt) {
//       if (this.$refs.nav) {
//         const { prefixCls, tabPosition } = this.$props;
//         const index = evt.currentTarget.getAttribute('data-index');
//         this.activeTabIndex = Number(index);
//         this.currentKey = this.tabs[index].tabKey;
//         let tabs = this.$refs.nav.querySelectorAll('.' + prefixCls + '-tab');
//         let currentTab = tabs[this.activeTabIndex];
//         this.$emit('tabClick', this.currentKey, this.activeTabIndex);
//         if (this.activeTabIndex !== 0) {
//           if (tabPosition === 'top' || tabPosition === 'bottom') {
//             let currentTabOffset = currentTab.offsetWidth + currentTab.offsetLeft;
//             let tabBoxWidth = this.$refs.tabBox.offsetWidth;
//             if (currentTabOffset > tabBoxWidth + Math.abs(this.tabOffset)) {
//               this.tabOffset = -(currentTabOffset - tabBoxWidth);
//             } else if (currentTab.offsetLeft < Math.abs(this.tabOffset)) {
//               let offset = -(Math.abs(this.tabOffset) - currentTab.offsetLeft);
//               this.tabOffset = -(Math.abs(this.tabOffset) + offset);
//             }
//           } else {
            
//             // let currentTabOffset = currentTab.offsetHeight + currentTab.offsetTop;
//             // let tabBoxHeight = this.$refs.tabBox.offsetHeight;
//             // if (currentTabOffset > tabBoxHeight + this.tabOffset) {
//             //   this.tabOffset = currentTabOffset - tabBoxHeight;
//             // } else if (currentTab.offsetTop > this.tabOffset) {
//             //   let offset = this.tabOffset - currentTab.offsetLeft;
//             //   this.tabOffset = this.tabOffset + offset;
//             // }
//           }
//         } else {
//           this.tabOffset = 0;
//         }
//         // 设置下划线的宽度
//         const rect = currentTab.getBoundingClientRect();
//         if (tabPosition === 'left' || tabPosition === 'right') {
//           this.lineWidth = rect.height;
//         } else {
//           this.lineWidth = rect.width;
//         }
//       }

//     },
//     // 选中的tab的下划线
//     renderActiveLine(prefixCls) {
//       const h = this.$createElement;
//       const { tabPosition } = this.$props;
//       const style = {};
//       if (tabPosition === 'top' || tabPosition === 'bottom') {
//         style.width = this.lineWidth + 'px';
//       } else if (tabPosition === 'left' || tabPosition === 'right') {
//         style.height = this.lineWidth + 'px';
//       }
//       return h(
//         'div',
//         {
//           class: classNames(prefixCls + '-tab-line', this.animate ? prefixCls + '-tab-line-animate' : prefixCls + '-tab-line-no-animate'),
//           style: _extends({}, style , this.setLineTransform(this.activeTabIndex)),
//           ref : 'line'
//         }
//       )
//     },
//     setLineTransform(index) {
//       if (this.$refs.nav) {
//         let res = {
//           transform: 'translate3d(0px,0px,0px)'
//         };
//         const { prefixCls, tabPosition } = this.$props;
//         let tabs = this.$refs.nav.querySelectorAll('.' + prefixCls + '-tab');
//         if (tabs.length > 0) {
//           const activeNode = tabs[index];
//           let width = activeNode.offsetLeft + activeNode.offsetWidth;
//           let height = activeNode.offsetTop + activeNode.offsetHeight;
//           let offset = 0;
//           if (this.$refs.tabBox) {
//             if (tabPosition === 'top' || tabPosition === 'bottom') {
//               let tabBoxWidth = this.$refs.tabBox.offsetWidth;
//               if (width > tabBoxWidth) {
//                 offset = width - tabBoxWidth;
//                 res.transform = `translate3d(${offset}px , 0px , 0px)`
//               } else {
//                 res.transform = `translate3d(${activeNode.offsetLeft}px , 0px , 0px)`
//               }
//             } else {
//               let tabBoxHeight = this.$refs.tabBox.offsetHeight;
//               if (height > tabBoxHeight) {
//                 offset = activeNode.offsetTop;
//               }
//               res.transform = `translate3d(0px , ${activeNode.offsetTop}px , 0px)`
//             }
//           }
//         };
//         return res;
//       }
//     },
//     renderContent(prefixCls) {
//       const h = this.$createElement;
//       return h(
//         'div',
//         {
//           class: classNames(prefixCls + '-nav-tab'),
//           ref: 'tabBox'
//         },
//         [
//           h(
//             'div',
//             {
//               class: classNames(prefixCls + '-nav-scroll')
//             },
//             [
//               h(
//                 'div',
//                 {
//                   class: classNames(prefixCls + '-nav'),
//                   style: {
//                     transform: `translate3d(${this.tabOffset}px , 0px , 0px)`
//                   },
//                   ref: 'nav'
//                 },
//                 [
//                   this.renderTab(prefixCls),
//                   this.renderActiveLine(prefixCls)
//                 ]
//               )
//             ]
//           )
//         ]
//       )
//     }
//   },
//   render() {
//     const h = this.$createElement;
//     const { prefixCls, tabPosition } = this.$props;
//     const { showArrow } = this.$data;
//     return h(
//       'div',
//       {
//         class: classNames(prefixCls + '-bar', prefixCls + '-bar-' + tabPosition)
//       },
//       [
//         h(
//           'div',
//           {
//             class: classNames(prefixCls + '-extra-content')
//           },
//           [this.tabBarExtraContent]
//         ),
//         h(
//           'div',
//           {
//             class: classNames(prefixCls + '-bar-container', showArrow ? prefixCls + '-bar-container-scrolling' : '')
//           },
//           [
//             this.renderPrevArrow(prefixCls),
//             this.renderNextArrow(prefixCls),
//             this.renderContent(prefixCls)
//           ]
//         )
//       ]
//     )
//   }
// }