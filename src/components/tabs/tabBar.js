import classNames from "classnames";
import PrevArrow from "./prevArrow";
import NextArrow from './nextArrow';
import Tab from './tab';
import _extends from "@babel/runtime/helpers/extends";
export default {
  props: {
    prefixCls: String,
    tabBarExtraContent: Object,
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    prevArrowStyle: Object,
    activeKey: String
  },
  data() {
    this.currentKey = this.$props.activeKey;
    return {
      // 是否展示左右箭头
      showArrow: false,
      // 当前选中的tab索引
      activeTabIndex: 0,
      // 下划线的宽度
      lineWidth: 0,
      // tab容器的位移距离
      tabOffset: 0
    }
  },
  methods: {
    renderPrevArrow(prefixCls) {
      const h = this.$createElement;
      const { prevArrowStyle } = this.$props;
      const { showArrow } = this.$data;
      const prevArrowProps = {
        props: {
          prefixCls: prefixCls,
          prevArrowStyle: prevArrowStyle,
        },
      }
      return h(
        'span',
        {
          class: classNames(prefixCls + '-tab-prev', showArrow ? prefixCls + '-tab-show' : ''),
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
    prevClick() {
      const width = this.$refs.tabBox.offsetWidth;
      const scrollWidth = Math.abs(this.tabOffset) - width;
      if (scrollWidth > 0) {
        this.tabOffset += width;
      } else {
        this.tabOffset = 0;
      }
      this.$emit('prevClick');
    },
    renderNextArrow(prefixCls) {
      const h = this.$createElement;
      const { nextArrowStyle } = this.$props;
      const { showArrow } = this.$data;
      const nextArrowProps = {
        props: {
          prefixCls: prefixCls,
          nextArrowStyle: nextArrowStyle
        },
      };
      return h(
        'span',
        {
          class: classNames(prefixCls + '-tab-next', showArrow ? prefixCls + '-tab-show' : ''),
          on : {
            click: this.nextClick
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
    nextClick() {
      const width = this.$refs.tabBox.offsetWidth;
      const navWidth = this.$refs.nav.offsetWidth;
      const scrollWidth = navWidth - width - Math.abs(this.tabOffset);
      // 如果scrollWidth等于0，表示已经位移都最后面了，就不需要再位移了
      if (scrollWidth !== 0) {
        if (scrollWidth - width > 0) {
          this.tabOffset -= width;
        } else {
          this.tabOffset = -(navWidth - width);
        }
      }
      this.$emit('nextClick');
    },
    // 是否展示左右箭头按钮
    disableArrow(node) {
      const { prefixCls } = this.$props;
      const tabListNode = this.tabListNode || (this.tabListNode = node);
      const tabWidth = tabListNode.getBoundingClientRect().width;
      const wrapWidth = this.$el.getBoundingClientRect().width;
      if (tabWidth > wrapWidth) {
        // 如果tab容器宽度超过了外部容器的宽度，那么就展示左右箭头，用于切换
        this.showArrow = true;
      };
      // 设置下划线的宽度
      const activeTabNode = tabListNode.querySelector('.' + prefixCls + '-tab-active');
      const width = activeTabNode.getBoundingClientRect().width;
      this.lineWidth = width;
    },
    renderTab(prefixCls) {
      const h = this.$createElement;
      const { tabs } = this.$props;
      let children = [];
      tabs.map((tab, index) => {
        children.push(h(
          'div',
          {
            class: classNames(prefixCls + '-tab', tab.tabKey === this.currentKey ? prefixCls + '-tab-active' : ''),
            attrs: {
              'data-index': index
            },
            on: {
              click: this.clickTab
            },
            key: index
          },
          [tab.tab]
        ))
      });
      return h(
        Tab,
        {
          props: {
            children(ref) {
              return ref.renderTabList()
            },
            tabList: children,
            disableArrow: this.disableArrow
          }
        }
      )
    },
    clickTab(evt) {
      const { prefixCls } = this.$props;
      const index = evt.target.getAttribute('data-index');
      this.activeTabIndex = Number(index);
      this.currentKey = this.tabs[index].tabKey;
      let tabs = document.querySelectorAll('.' + prefixCls + '-tab');
      let currentTab = tabs[this.activeTabIndex];
      this.$emit('tabClick');
      if (this.activeTabIndex !== 0) {
        let currentTabOffset = currentTab.offsetWidth + currentTab.offsetLeft;
        let tabBoxWidth = this.$refs.tabBox.offsetWidth;
        if (currentTabOffset > tabBoxWidth) {
          this.tabOffset = -(currentTabOffset - tabBoxWidth);
        }
      } else {
        this.tabOffset = 0;
      }
      // 设置下划线的宽度
      const lineWidth = currentTab.getBoundingClientRect().width;
      this.lineWidth = lineWidth;
    },
    // 选中的tab的下划线
    renderActiveLine(prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class: classNames(prefixCls + '-tab-line'),
          style: _extends({}, { width: this.lineWidth ? this.lineWidth + 'px' : '' }, this.setLineTransform(this.activeTabIndex))
        }
      )
    },
    setLineTransform(index) {
      let res = {
        transform: 'translate3d(0px,0px,0px)'
      };
      const { prefixCls } = this.$props;
      let tabs = document.querySelectorAll('.' + prefixCls + '-tab');
      if (tabs.length > 0) {
        const activeNode = tabs[index];
        let width = activeNode.offsetLeft + activeNode.offsetWidth;
        if (this.$refs.tabBox) {
          let tabBoxWidth = this.$refs.tabBox.offsetWidth;
          let offset = 0;
          if (width > tabBoxWidth) {
            offset = width - tabBoxWidth;
          }
          res.transform = `translate3d(${activeNode.offsetLeft}px , 0px , 0px)`
        }
      };
      return res;
    },
    renderContent(prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class: classNames(prefixCls + '-nav-tab'),
          ref: 'tabBox'
        },
        [
          h(
            'div',
            {
              class: classNames(prefixCls + '-nav-scroll')
            },
            [
              h(
                'div',
                {
                  class: classNames(prefixCls + '-nav'),
                  style: {
                    transform : `translate3d(${this.tabOffset}px , 0px , 0px)`
                  },
                  ref: 'nav'
                },
                [
                  this.renderTab(prefixCls),
                  this.renderActiveLine(prefixCls)
                ]
              )
            ]
          )
        ]
      )
    }
  },
  render() {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    const { showArrow } = this.$data;
    return h(
      'div',
      {
        class: classNames(prefixCls + '-bar')
      },
      [
        h(
          'div',
          {
            class: classNames(prefixCls + '-bar-container', showArrow ? prefixCls + '-bar-container-scrolling' : '')
          },
          [
            this.renderPrevArrow(prefixCls),
            this.renderNextArrow(prefixCls),
            this.renderContent(prefixCls)
          ]
        )
      ]
    )
  }
}