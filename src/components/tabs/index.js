import _extends from '@babel/runtime/helpers/extends';
import TabBar from './tabBar';
import TabPane from './tabPane';
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
    }
  },
  methods : {
    renderTabBar (prefixCls) {
      const h = this.$createElement;
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
      const tabBarProps = {
        props : {
          prefixCls : prefixCls,
          tabBarExtraContent : tabBarExtraContent
        }
      }
      return h(
        TabBar,
        tabBarProps
      )
    },
    renderTabContent (prefixCls) {
      const h = this.$createElement;
      const { animate } = this.$props;
      const tabPaneProps = {
        props : {
          prefixCls : prefixCls,
          animate : animate
        }
      }
      return h(
        TabPane,
        tabPaneProps
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