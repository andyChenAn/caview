import _extends from "@babel/runtime/helpers/extends";
import ContainerRender from '../utils/containerRender';
import Popup from './popup';
import throttle from 'lodash/throttle';
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
  watch : {
    visible (newVal) {
      if (!newVal) {
        window.removeEventListener('resize' , this.handleResize);
        document.body.removeEventListener('mousedown' , this.handleDocumentClick);
      } else {
        this.handleResize = throttle(this.handleResize , 200);
        window.addEventListener('resize' , this.handleResize);
        document.body.addEventListener('mousedown' , this.handleDocumentClick)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderComponent();
    });
  },
  updated () {
    this.renderComponent();
    if (this.popupElement) {
      this.align(this.popupElement)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize' , this.handleResize);
    document.body.removeEventListener('mousedown' , this.handleDocumentClick);
  },
  methods : {
    contains (root , node) {
      while (node) {
        if (node === root) {
          return true;
        }
        node = node.parentNode;
      }
    },
    handleResize () {
      this.align();
    },
    popupMousedown () {
      this.hasPopupMousedown = true;
      clearTimeout(this.mousedownTimeout);
      this.mousedownTimeout = setTimeout(() => {
        this.hasPopupMousedown = false;
      } , 0);
    },
    handleDocumentClick (evt) {
      if (!this.contains(this.$el , evt.target) && !this.hasPopupMousedown) {
        this.$emit('visibleChange' , false);
      }
    },
    handleClick (evt) {
      this.target = evt.currentTarget;
      this.$emit('visibleChange' , true);
    },
    getClickTargetPosition () {
      const {width , height , top , left} = this.target.getBoundingClientRect();
      const res = {
        width : width,
        height : height,
        left : left,
        top : top
      };
      return res;
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
      let transitionProps = {
        props : {
          appear : true,
          name : 'zoomIn'
        }
      };
      return h(
        'transition',
        transitionProps,
        [
          h(
            Popup,
            {
              props : this.$props,
              directives : [
                {name : 'show' , value : this.visible}
              ],
              on : {
                align : this.align,
                popupMousedown : this.popupMousedown
              }
            },
            [this.$slots.title]
          )
        ]
      )
    },
    align (popupElement) {
      popupElement = this.popupElement || (this.popupElement = popupElement);
      const { placement } = this.$props;
      this.positionInfo = this.getClickTargetPosition();
      const rect = popupElement.getBoundingClientRect();
      const popupWidth = this.rectWidth || (this.rectWidth = rect.width * 2);
      const popupHeight = this.rectHeight || (this.rectHeight = rect.height * 2);
      let { top , left , width , height } = this.positionInfo;
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let popupLeft , popupTop = 0 , transformOrigin = '';
      top = top + scrollTop;
      left = left + scrollLeft;
      if (placement === 'top') {
        popupLeft = left - popupWidth / 2 + width / 2 + 'px';
        popupTop = top - popupHeight + 'px';
        transformOrigin = `50% ${popupHeight}px`;
      } else if (placement === 'topLeft') {
        popupLeft = left + 'px';
        popupTop = top - popupHeight + 'px';
        transformOrigin = `0px ${popupHeight}px`;
      } else if (placement === 'topRight') {
        popupLeft = left - popupWidth + width + 'px';
        popupTop = top - popupHeight + 'px';
        transformOrigin = `${popupWidth}px ${popupHeight}px`;
      } else if (placement === 'leftTop') {
        popupLeft = left - popupWidth + 'px';
        popupTop = top + 'px';
        transformOrigin = `${popupWidth}px 0px`;
      } else if (placement === 'left') {
        popupLeft = left - popupWidth + 'px';
        popupTop = top - popupHeight / 2 + height / 2 + 'px';
        transformOrigin = `${popupWidth}px 50%`;
      } else if (placement === 'leftBottom') {
        popupLeft = left - popupWidth + 'px';
        popupTop = top - popupHeight + height + 'px';
        transformOrigin = `${popupWidth}px ${popupHeight}px`;
      } else if (placement === 'bottomLeft') {
        popupLeft = left + 'px';
        popupTop = top + height + 'px';
        transformOrigin = `0px 0px`;
      } else if (placement === 'bottom') {
        popupLeft = left - popupWidth / 2 + width / 2 + 'px';
        popupTop = top + height + 'px';
        transformOrigin = `50% 0px`;
      } else if (placement === 'bottomRight') {
        popupLeft = left + width - popupWidth + 'px';
        popupTop = top + height + 'px';
        transformOrigin = `${popupWidth}px 0px`;
      } else if (placement === 'rightTop') {
        popupLeft = left + width + 'px';
        popupTop = top + 'px';
        transformOrigin = `0px 0px`;
      } else if (placement === 'right') {
        popupLeft = left + width + 'px';
        popupTop = top + height / 2 - popupHeight / 2 + 'px';
        transformOrigin = `0px 50%`;
      } else if (placement === 'rightBottom') {
        popupLeft = left + width + 'px';
        popupTop = top + height - popupHeight + 'px';
        transformOrigin = `0 ${popupHeight}px`;
      }
      popupElement.style.left = popupLeft;
      popupElement.style.top = popupTop;
      popupElement.style.transformOrigin = transformOrigin;
    }
  },
  render (h) {
    const self = this;
    let children = (this.$slots.default || []).filter(c => c.tag || c.text.trim());
    if (children.length === 0) {
      return null;
    }
    children[0].data || (children[0].data = {});
    children[0].data.on = {
      click : this.handleClick
    };
    return h(
      ContainerRender,
      {
        props : {
          visible : this.visible,
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