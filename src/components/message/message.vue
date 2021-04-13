<template>
  <transition name="message-fade" @after-leave="onAfterEnter">
    <div 
      v-show="visible" 
      :class="['ca-message' , customClass]" 
      :style="{top : offset + 'px' , ...style}"
    >
      <i class="iconfont" :class="['icon-' + type]"></i>
      <span class="content">{{content}}</span>
      <render-fn :render="render" />
    </div>
  </transition>
</template>
<script>
import renderFn from './renderFn';
export default {
  components : {
    renderFn
  },
  data () {
    return {
      // 提示内容
      content : '',
      // 自定义类名
      customClass : '',
      // 自动关闭的时延
      duration : 1500,
      // 自定义style样式
      style : {},
      // 提示关闭时的回调
      onClose : null,
      // 是否显示提示内容
      visible : false,
      // 消息提示距离顶部的偏移量
      offset : 20,
      // 是否已关闭消息提示
      closed : false,
      // 渲染函数，可以调用该函数创建vnode的方式创建提示内容
      render : function () {}
    }
  },
  mounted () {
    this.countdown();
  },
  watch : {
    closed (newVal) {
      newVal && (this.visible = false);
    }
  },
  methods : {
    onAfterEnter () {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    // 倒计时关闭消息提示
    countdown () {
     if (this.duration > 0) {
       this.timer = setTimeout(() => {
         if (!this.closed) {
           this.close();
         }
       } , this.duration)
     }
    },
    // 关闭消息提示
    close () {
      this.closed = true;
      if (typeof this.onClose == 'function') {
        this.onClose(this);
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>