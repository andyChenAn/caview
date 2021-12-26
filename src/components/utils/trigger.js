import _extends from '@babel/runtime/helpers/extends';
import omit from 'omit.js';
import ContainerRender from './containerRender';
import Popup from './popup';
import throttle from 'lodash/throttle';
export default {
  props: {
    action: String,
    visible : Boolean,
    prefixCls : String,
    placement : String
  },
  data () {
    return {
      popupVisible : this.visible
    }
  },
  watch : {
    visible (newVal) {
      this.popupVisible = newVal;
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
    })
  },
  updated () {
    this.renderComponent();
    if (this.popupElement) {
      this.align(this.popupElement)
    }
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
      if (!this.contains(this.popupElement , evt.target) && !this.hasPopupMousedown && !this.contains(this.$el , evt.target) && this.popupVisible && evt.button !== 2) {
        this.$emit('popupVisibleChange' , false);
      }
    },
    align (popupElement) {
      popupElement = this.popupElement || (this.popupElement = popupElement);
      const { placement } = this.$props;
      this.positionInfo = this.getClickTargetPosition();
      const rect = popupElement.getBoundingClientRect();
      const popupWidth = this.rectWidth || (this.rectWidth = rect.width * 1 / 0.8);
      const popupHeight = this.rectHeight || (this.rectHeight = rect.height * 1 / 0.8);
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
    },
    getClickTargetPosition () {
      const {width , height , top , left} = this.$el.getBoundingClientRect();
      const res = {
        width : width,
        height : height,
        left : left,
        top : top
      };
      return res;
    },
    getComponent () {
      const h = this.$createElement;
      const popupProps = {
        props : _extends({} , this.$props , omit(this.$props , ['action'])),
        on : {
          align : this.align,
          popupMousedown : this.popupMousedown
        },
        directives : [
          {
            name : 'show',
            value : this.popupVisible
          }
        ]
      }
      return h(
        'transition',
        {
          props : {
            name : 'zoomIn',
            appear : true
          }
        },
        [
          h(
            Popup,
            popupProps,
            [this.$slots.popup]
          )
        ]
      )
    },
    getContainer () {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      document.body.appendChild(container);
      return container;
    },
    isClickToShow () {
      const { action } = this.$props;
      return action.indexOf('click') !== -1;
    },
    isMouseEnterToShow () {
      const { action } = this.$props;
      return action.indexOf('hover') !== -1;
    },
    isMouseLeaveToShow () {
      const { action } = this.$props;
      return action.indexOf('hover') !== -1;
    },
    isFocusToShow () {
      const { action } = this.$props;
      return action.indexOf('focus') !== -1;
    },
    isBlurToShow () {
      const { action } = this.$props;
      return action.indexOf('focus') !== -1;
    },
    isContextmenuToShow () {
      const { action } = this.$props;
      return action.indexOf('contextmenu') !== -1;
    },
    onClick () {
      this.setVisible(!this.popupVisible);
    },
    onMouseenter () {
      this.setVisible(!this.popupVisible);
    },
    onMouseleave () {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setVisible(!this.popupVisible);
        clearTimeout(this.timer);
        this.timer = null;
      } , 100)
    },
    onFocus () {
      this.setVisible(!this.popupVisible);
    },
    onBlur () {
      this.setVisible(!this.popupVisible);
    },
    onContextmenu (evt) {
      evt.preventDefault();
      this.setVisible(!this.popupVisible);
    },
    setVisible (visible) {
      this.popupVisible = visible;
      this.$emit('popupVisibleChange' , visible);
    }
  },
  render () {
    const self = this;
    const h = this.$createElement;
    let children = this.$slots.default.filter(c => c.tag || c.text.trim() !== '');
    children = children.length >= 1 ? children[0] : children;
    children.data = children.data || {};
    children.data.on = {};
    if (this.isClickToShow()) {
      children.data.on.click = this.onClick;
    };
    if (this.isMouseEnterToShow()) {
      children.data.on.mouseenter = this.onMouseenter;
    };
    if (this.isMouseLeaveToShow()) {
      children.data.on.mouseleave = this.onMouseleave;
    };
    if (this.isFocusToShow()) {
      children.data.on.focus = this.onFocus
    };
    if (this.isBlurToShow()) {
      children.data.on.blur = this.onBlur;
    }
    if (this.isContextmenuToShow()) {
      children.data.on.contextmenu = this.onContextmenu;
    }
    return h(
      ContainerRender,
      {
        props : {
          parent : this,
          visible : this.popupVisible,
          getComponent : this.getComponent,
          getContainer : this.getContainer,
          children (ref) {
            self.renderComponent = ref.renderComponent;
            return children;
          }
        }
      }
    )
  }
}