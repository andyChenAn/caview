<template>
  <div v-show="showDrawer" class="ca-drawer">
    <transition name="fade">
      <div @click="clickMask" v-show="visible" class="mask" :style="{...maskStyle}"></div>
    </transition>
    <div class="drawer-wrap" :class="['drawer-' + placement]" :style="{width : width+'px'}">
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
      type : Number,
      default : 256
    },
    zIndex : {
      type : [Number , String],
      default : 1000
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
      showDrawer : false
    }
  },
  methods : {
    clickMask () {
      this.close();
    },
    onAfterLeave () {
      this.showDrawer = false;
      this.close();
    },
    close () {
      this.visible = false;
      this.$emit('input' , false);
      this.enableBodyScroll();
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