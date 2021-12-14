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
    activeKey : String
  },
  data () {
    this.currentKey = this.$props.activeKey;
    return {
      // 是否展示左右箭头
      showArrow : false,
      // 当前选中的tab索引
      activeTabIndex : 0
    }
  },
  mounted () {
    this.setArrowClass(this.$el);
  },
  methods: {
    setArrowClass (el) {

    },
    renderPrevArrow(prefixCls) {
      const h = this.$createElement;
      const { prevArrowStyle } = this.$props;
      const { showArrow } = this.$data;
      const prevArrowProps = {
        props: {
          prefixCls: prefixCls,
          prevArrowStyle: prevArrowStyle
        },
        on: {
          prevClick: this.prevClick
        }
      }
      return h(
        'span',
        {
          class: classNames(prefixCls + '-tab-prev' , showArrow ? prefixCls + '-tab-show' : '')
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
        on: {
          nextClick: this.nextClick
        }
      };
      return h(
        'span',
        {
          class: classNames(prefixCls + '-tab-next' , showArrow ? prefixCls + '-tab-show' : '')
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
      this.$emit('nextClick');
    },
    // 是否展示左右箭头按钮
    disableArrow (node) {
      const tabListNode = this.tabListNode || (this.tabListNode = node);
      const tabWidth = tabListNode.getBoundingClientRect().width;
      const wrapWidth = this.$el.getBoundingClientRect().width;
      if (tabWidth > wrapWidth) {
        // 如果tab容器宽度超过了外部容器的宽度，那么就展示左右箭头，用于切换
        this.showArrow = true;
      }
    },
    renderTab(prefixCls) {
      const h = this.$createElement;
      const { tabs } = this.$props;
      let children = [];
      tabs.map((tab , index) => {
        children.push(h(
          'div',
          {
            class: classNames(prefixCls + '-tab' , tab.tabKey === this.currentKey ? prefixCls + '-tab-active' : ''),
            attrs : {
              'data-index' : index
            },
            on : {
              click : this.clickTab
            },
            key : index
          },
          [tab.tab]
        ))
      });
      return h(
        Tab,
        {
          props : {
            children (ref) {
              return ref.renderTabList()
            },
            tabList : children,
            disableArrow : this.disableArrow
          }
        }
      )
    },
    clickTab (evt) {
      const index = evt.target.getAttribute('data-index');
      this.activeTabIndex = index;
      this.currentKey = this.tabs[index].tabKey;
      this.$emit('tabClick');
    },
    // 选中的tab的下划线
    renderActiveLine (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-tab-line'),
          style : _extends({} , this.getLineWidth() , this.setLineTransform(this.activeTabIndex))
        }
      )
    },
    getLineWidth () {
      const { prefixCls } = this.$props;
      if (this.tabListNode) {
        const activeTabNode = this.tabListNode.querySelector('.' + prefixCls + '-tab-active');
        const width = activeTabNode.getBoundingClientRect().width;
        return {
          width : width + 'px'
        }
      }
    },
    setLineTransform (index) {
      let res = {
        transform : 'translate3d(0px,0px,0px)'
      };
      const { prefixCls } = this.$props;
      let tabs = document.querySelectorAll('.' + prefixCls + '-tab');
      if (tabs.length > 0) {
        const activeNode = tabs[index];
        let width = activeNode.offsetLeft + activeNode.offsetWidth;
        let tabBoxWidth = this.$refs.tabBox.offsetWidth;
        let offset = 0;
        if (width > tabBoxWidth) {
          offset = width - tabBoxWidth;
        }
        res.transform = `translate3d(${activeNode.offsetLeft}px , 0px , 0px)`
      };
      return res;
    },
    getNavStyle (index) {
      // let res = {
      //   transform : 'translate3d(0px,0px,0px)'
      // };
      // const { prefixCls } = this.$props;
      // let tabs = document.querySelectorAll('.' + prefixCls + '-tab');
      // if (tabs.length > 0) {
      //   const activeNode = tabs[index];
      //   let width = activeNode.offsetLeft + activeNode.offsetWidth;
      //   let tabBoxWidth = this.$refs.tabBox.offsetWidth;
      //   let offset = 0;
      //   if (width > tabBoxWidth) {
      //     offset = width - tabBoxWidth;
      //   }
      //   res.transform = `translate3d(${activeNode.offsetLeft}px , 0px , 0px)`
      // };
      // return res;
    },
    renderContent(prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class: classNames(prefixCls + '-nav-tab'),
          ref : 'tabBox'
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
                  style : this.getNavStyle(this.activeTabIndex),
                  ref : 'nav'
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
            class: classNames(prefixCls + '-bar-container' , showArrow ? prefixCls + '-bar-container-scrolling' : '')
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