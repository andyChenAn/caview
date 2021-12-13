import classNames from "classnames";
import PrevArrow from "./prevArrow";
import NextArrow from './nextArrow';
import _extends from "@babel/runtime/helpers/extends";
export default {
  props : {
    prefixCls : String,
    tabBarExtraContent : Object,
    tabs : {
      type : Array,
      default () {
        return [];
      }
    },
    prevArrowStyle : Object
  },
  methods : {
    renderPrevArrow (prefixCls) {
      const h = this.$createElement;
      const { prevArrowStyle } = this.$props;
      const prevArrowProps = {
        props : {
          prefixCls : prefixCls,
          prevArrowStyle : prevArrowStyle
        },
        on : {
          prevClick : this.prevClick
        }
      }
      return h(
        'span',
        {
          class : this.getArrowClass('prev')
        },
        [
          h(
            PrevArrow,
            prevArrowProps
          )
        ]
      )
    },
    getArrowClass (direction) {
      const { prefixCls } = this.$props;
      return {}
    },
    prevClick () {
      this.$emit('prevClick');
    },
    renderNextArrow (prefixCls) {
      const h = this.$createElement;
      const { nextArrowStyle } = this.$props;
      const nextArrowProps = {
        props : {
          prefixCls : prefixCls,
          nextArrowStyle : nextArrowStyle
        },
        on : {
          nextClick : this.nextClick
        }
      };
      return h(
        'span',
        {
          class : this.getArrowClass('next')
        },
        [
          h(
            NextArrow,
            nextArrowProps
          )
        ]
      )
    },
    nextClick () {
      this.$emit('nextClick');
    },
    renderTab (prefixCls) {
      const h = this.$createElement;
      const { tabs } = this.$props;
      let children = [];
      tabs.map(tab => {
        children.push(h(
          'div',
          {
            class : classNames(prefixCls + '-tab')
          },
          [tab]
        ))
      });
      return children;
    },
    renderContent (prefixCls) {
      const h = this.$createElement;
      const tabProps = {
        prefixCls : prefixCls
      };
      return h(
        'div',
        {
          class : classNames(prefixCls + '-nav-content')
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-nav-scroll')
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-nav')
                },
                [
                  this.renderTab(prefixCls)
                ]
              )
            ]
          )
        ]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-nav-container')
      },
      [
        this.renderPrevArrow(prefixCls),
        this.renderNextArrow(prefixCls),
        this.renderContent(prefixCls)
      ]
    )
  }
}