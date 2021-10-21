import _extends from "@babel/runtime/helpers/extends";
import ContainerRender from './containerRender';
import classNames from "classnames";
export default {
  props : {
    placement : {
      type : String,
      default : 'top'
    },
    prefixCls : {
      type : String,
      default : 'ca-popconfirm'
    },
    visible : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
      sVisible : this.visible
    }
  },
  watch : {
    visible (newVal) {
      this.sVisible = newVal;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderComponent();
    })
  },
  updated () {
    this.renderComponent();
  },
  methods : {
    handleClick (evt) {
      this.positionInfo = evt.currentTarget.getBoundingClientRect();
      this.$emit('visibleChange' , true);
    },
    getContainer () {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      document.body.appendChild(container);
      this.container = container;
      return container;
    },
    getComponent () {
      const h = this.$createElement;
      const { prefixCls , placement } = this.$props;
      let transitionProps = {
        props : {
          appear : true,
          name : this.transitionName || 'zoomIn'
        }
      };
      return h(
        'transition',
        transitionProps,
        [
          h(
            'div',
            {
              class : classNames(prefixCls , prefixCls + '-placement-' + placement),
              directives : [
                {name : 'show' , value : this.visible}
              ],
              style : this.getComponentStyle(placement)
            },
            [
              h(
                'div',
                {
                  class : prefixCls + '-content'
                },
                [
                  h(
                    'div',
                    {
                      class : prefixCls + '-arrow'
                    }
                  ),
                  h(
                    'div',
                    {
                      class : prefixCls + '-inner'
                    },
                    [this.$slots.title]
                  )
                ]
              )
            ]
          )
        ]
      )
    },
    getComponentStyle (placement) {
      let res = {};
      const {width , left , top , height} = this.positionInfo;
      if (placement === 'top') {
        res = {
          left : (left + width / 2) + 'px',
          top : top - 20 + 'px'
        }
      };
      return res;
    }
  },
  render (h) {
    const self = this;
    let children = (this.$slots.default || []).filter(c => c.tag || c.text.trim());
    if (children.length === 0) {
      return null;
    }
    children[0].data.on = {
      click : this.handleClick
    };
    return h(
      ContainerRender,
      {
        props : {
          visible : this.sVisible,
          getContainer : this.getContainer,
          getComponent : this.getComponent,
          children (ref) {
            self.renderComponent = ref.renderComponent;
            return children;
          }
        }
      }
    )
  }
};