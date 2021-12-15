import _extends from '@babel/runtime/helpers/extends';
import TabBar from './tabBar';
import TabContent from './tabContent';
import classNames from 'classnames';
export default {
  props : {
    // 激活的tab面板
    activeKey : String,
    // 默认激活的tab面板
    defaultActiveKey : String,
    // tab尺寸
    size : {
      type : String,
      default : 'default'
    },
    // tab bar位置，可以是top,left,bottom,right
    tabPosition : {
      type : String,
      default : 'top'
    },
    // tab bar之间的间距
    tabBarGutter : {
      type : Number,
      default : 0
    },
    // tab bar的样式
    tabBarStyle : {
      type : Object,
      default () {
        return {}
      }
    },
    // tab类型,支持line,card,editable-card
    type : {
      type : String,
      default : 'line'
    },
    prefixCls : {
      type : String,
      default : 'ca-tabs'
    },
    // tab内容是否需要动画效果
    animate : {
      type : Boolean,
      default : true
    },
    prevArrowStyle : {
      type : Object,
      default () {
        return {};
      }
    },
    nextArrowStyle : {
      type : Object,
      default () {
        return {}
      }
    }
  },
  data () {
    const currentKey = this.$props.activeKey || this.$props.defaultActiveKey;
    return {
      currentKey : currentKey
    }
  },
  methods : {
    renderTabBar (prefixCls) {
      const h = this.$createElement;
      const { currentKey } = this.$data;
      let tabBarExtraContent = null;
      if (this.$slots.tabBarExtraContent) {
        tabBarExtraContent = h(
          'div',
          {
            class : classNames(prefixCls + '-extra-content')
          },
          [this.$slots.tabBarExtraContent]
        )
      };
      let tabBarProps = {
        props : {
          prefixCls : prefixCls,
          tabBarExtraContent : tabBarExtraContent,
          tabs : [],
          activeKey : currentKey,
          activeIndex : 0
        },
        on : {
          prevClick : this.prevClick,
          nextClick : this.nextClick,
          tabClick : this.tabClick
        }
      };
      let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
      children.map((c , index) => {
        const { tab , disabled } = c.componentOptions.propsData;
        const key = c.key;
        tabBarProps.props.tabs.push({
          tab : tab,
          tabKey : key,
          disabled : !!disabled || disabled === ''
        });
        if (this.currentKey === key) {
          tabBarProps.props.activeIndex = index;
        }
      });
      return h(
        TabBar,
        tabBarProps
      )
    },
    tabClick (currentKey , currentIndex) {
      this.currentKey = currentKey;
      this.activeIndex = currentIndex;
    },
    prevClick () {
      this.$emit('prevClick');
    },
    nextClick () {
      this.$emit('nextClick');
    },
    renderTabContent (prefixCls) {
      const h = this.$createElement;
      this.$slots.default.filter(c => c.tag || c.text.trim() !== '').map((child , index) => {
        if (this.currentKey == child.key) {
          this.activeIndex = index;
        }
      })
      const tabContentProps = {
        props : {
          prefixCls : prefixCls,
          activeKey : this.currentKey,
          activeIndex : this.activeIndex,
          animate : this.animate
        }
      };
      return h(
        TabContent,
        tabContentProps,
        [this.$slots.default]
      )
    }
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
        this.renderTabBar(prefixCls),
        this.renderTabContent(prefixCls)
      ]
    )
  }
}