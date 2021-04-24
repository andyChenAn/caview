<template>
  <div v-show="showDrawer" class="ca-drawer" :style="{...positionStyle}">
    <transition name="drawer-fade">
      <div @click="clickMask" v-show="visible" class="mask" :style="{...maskStyle}"></div>
    </transition>
    <div 
      class="drawer-wrap" 
      :class="['drawer-' + placement]" 
      :style="computedStyle"
    >
      <transition :name="placement" @after-leave="onAfterLeave">
        <div v-show="visible" class="drawer">
          <div class="content">
            <div class="header">
              <div class="title" v-html="title"></div>
            </div>
            <div class="body">
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>  
</template>
<script>
export default {
  props : {
    // 是否显示drawer
    value : {
      type : Boolean,
      default : false
    },
    // 标题
    title : {
      type : String,
      default : ''
    },
    // 显示位置，默认是右边，可以是left,top,right,bottom
    placement : {
      type : String,
      default : 'right'
    },
    // 是否显示遮罩层
    mask : {
      type : Boolean,
      default : true
    },
    // 是否允许点击遮罩层隐藏抽屉
    maskClosable : {
      type : Boolean,
      default : true
    },
    // 遮罩层样式
    maskStyle : {
      type : Object,
      default : () => {}
    },
    // 宽度
    width : {
      type : [Number , String],
      default : 256
    },
    // 层级
    zIndex : {
      type : [Number , String],
      default : 1000
    },
    // 高度
    height : {
      type : [Number , String],
      default : 256
    },
    // 挂载点，默认是body
    getContainer : {
      type : Function,
      default : () => {
        return document.body;
      }
    },
    push : {
      type : [Number , String],
      default : 180
    }
  },
  computed : {
    computedStyle () {
      let style = {};
      if (this.placement == 'left' || this.placement == 'right') {
        style.width = this.width + 'px';
      } else if (this.placement == 'top' || this.placement == 'bottom') {
        style.height = this.height + 'px';
      };
      return style;
    }
  },
  watch : {
    value (newVal) {
      if (newVal) {
        this.visible = newVal;
        this.showDrawer = true;
        this.disabelBodyScroll();
      }
    }
  },
  data () {
    return {
      visible : this.value,
      showDrawer : false,
      positionStyle : {},
      pushStyle : {},
    }
  },
  mounted () {
    this.positionStyle = this.getPositionStyle();
  },
  methods : {
    getPositionStyle () {
      let style = {};
      const target = this.getContainer();
      if (target) {
        if (target.nodeName.toLowerCase() !== 'body') {
          style.position = 'absolute';
        };
      }
      return style;
    },
    clickMask () {
      this.close();
    },
    onAfterLeave () {
      this.enableBodyScroll();
      this.showDrawer = false;
      this.close();
    },
    close () {
      this.visible = false;
      this.$emit('input' , false);
    },
    disabelBodyScroll () {
      document.body.setAttribute('style' , 'overflow:hidden;');
    },
    enableBodyScroll () {
      document.body.setAttribute('style' , '');
    }
  }
}
</script>