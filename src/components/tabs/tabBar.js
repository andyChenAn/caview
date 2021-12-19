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
    nextArrowStyle : Object,
    size : String
  },
  data () {
    const activeIndex = this.$props.currentIndex || 0;
    // 当tabPosition为top或者bottom时，tab容器的偏移量
    this.offsetForHorizontal = 0;
    // 当tabPosition为left或者right时，tab容器的偏移量
    this.offsetForVertical = 0;
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
      this.$nextTick(() => {
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
      })
    },
    prevClick () {
      const { tabPosition } = this.$props;
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        const width = this.$refs.tabBox.offsetWidth;
        const scrollWidth = Math.abs(this.offsetForHorizontal) - width;
        if (scrollWidth > 0) {
          this.offsetForHorizontal += width;
        } else {
          this.offsetForHorizontal = 0;
        };
        this.$refs.nav.style.transform = `translate3d(${this.offsetForHorizontal}px , 0px , 0px)`;
      } else {
        const height = this.$refs.tabBox.offsetHeight;
        const scrollHeight = Math.abs(this.offsetForVertical) - height;
        if (scrollHeight > 0) {
          this.offsetForVertical += height;
        } else {
          this.offsetForVertical = 0;
        }
        this.$refs.nav.style.transform = `translate3d(0px , ${this.offsetForVertical}px , 0px)`;
      }
      this.$emit('prevClick');
    },
    nextClick () {
      const { tabPosition } = this.$props;
      if (tabPosition === 'top' || tabPosition === 'bottom') {
        const width = this.$refs.tabBox.offsetWidth;
        const navWidth = this.$refs.nav.offsetWidth;
        const scrollWidth = navWidth - width - Math.abs(this.offsetForHorizontal);
        // 如果scrollWidth等于0，表示已经位移都最后面了，就不需要再位移了
        if (scrollWidth > 0) {
          if (scrollWidth - width > 0) {
            this.offsetForHorizontal -= width;
          } else {
            this.offsetForHorizontal = -(navWidth - width);
          }
        };
        this.$refs.nav.style.transform = `translate3d(${this.offsetForHorizontal}px ,0px , 0px)`;
      } else {
        const height = this.$refs.tabBox.offsetHeight;
        const navHeight = this.$refs.nav.offsetHeight;
        const scrollHeight = navHeight - height - Math.abs(this.offsetForVertical);
        if (scrollHeight > 0) {
          if (scrollHeight - height > 0) {
            this.offsetForVertical -= height;
          } else {
            this.offsetForVertical = -(navHeight - height)
          }
        };
        this.$refs.nav.style.transform = `translate3d(0px ,${this.offsetForVertical}px , 0px)`;
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
      this.$emit('change' , currentKey);
    },
    setTabBoxTransform (index , tabPosition) {
      this.$refs.nav.style.transform = '';
      const currentTab = this.getCurrentTab(index);
      this.$nextTick(() => {
        if (index > 0) {
          if (tabPosition === 'top' || tabPosition === 'bottom') {
            const currentTabOffset = currentTab.offsetWidth + currentTab.offsetLeft;
            const tabBoxWidth = this.$refs.tabBox.offsetWidth;
            if (currentTabOffset > tabBoxWidth + Math.abs(this.offsetForHorizontal)) {
              this.offsetForHorizontal = -(currentTabOffset - tabBoxWidth);
            } else if (currentTab.offsetLeft < Math.abs(this.offsetForHorizontal)) {
              let offset = -(Math.abs(this.offsetForHorizontal) - currentTab.offsetLeft);
              this.offsetForHorizontal = -(Math.abs(this.offsetForHorizontal) + offset);
            }
            this.$refs.nav.style.transform = `translate3d(${this.offsetForHorizontal}px , 0px , 0px)`;
          } else {
            const currentTabOffset = currentTab.offsetHeight + currentTab.offsetTop;
            const tabBoxHeight = this.$refs.tabBox.offsetHeight;
            if (currentTabOffset > tabBoxHeight + Math.abs(this.offsetForVertical)) {
              this.offsetForVertical = -(currentTabOffset - tabBoxHeight);
            } else if (currentTab.offsetTop < Math.abs(this.offsetForVertical)) {
              let offsetForVertical = -(Math.abs(this.offsetForVertical) - currentTab.offsetTop);
              this.offsetForVertical = -(Math.abs(this.offsetForVertical) + offsetForVertical);
            }
            this.$refs.nav.style.transform = `translate3d(0px , ${this.offsetForVertical}px , 0px)`;
          }
        } else {
          this.offsetForHorizontal = 0;
          this.offsetForVertical = 0;
          this.$refs.nav.style.transform = `translate3d(0px , 0px , 0px)`;
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
      const { prefixCls , size } = this.$props; 
      return h(
        'div',
        {
          class : classNames(prefixCls + '-nav-tab' , prefixCls + '-nav-tab-' + size),
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