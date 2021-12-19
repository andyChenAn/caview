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
    // tab类型,支持line,card
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
    handleChange (key) {
      this.$emit('change' , key);
    },
    renderTabBar () {
      const { prefixCls , animate , tabPosition , prevArrowStyle , nextArrowStyle , size } = this.$props;
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
          nextArrowStyle : nextArrowStyle || {},
          size : size
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
    const { prefixCls , tabPosition , size , type } = this.$props;
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
        class : classNames(prefixCls , prefixCls + '-' + tabPosition , prefixCls + '-' + size , prefixCls + '-' + type)
      },
      [children]
    )
  }
}