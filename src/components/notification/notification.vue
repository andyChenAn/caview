<template>
  <transition :name="placement" @after-leave="onAfterLeave">
    <div 
      v-show="visible"
      class="ca-notification" 
      :class="[customClass]"
      :style="{...placementStyle , ...style}"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="handleClick"
    >
      <div class="inner">
        <i class="iconfont notification-icon" :class="['icon-' + type]"></i>
        <div class="notification">
          <div class="title" :class="[type ? 'with-icon' : '']" v-html="title"></div>
          <div class="content" :class="[type ? 'with-icon' : '']" v-html="content"></div>
          <render-btn :render="renderBtn" />
        </div>
        <i class="iconfont icon-remove" @click.stop="handleClose"></i>
      </div>
    </div>
  </transition>
</template>
<script>
import renderBtn from './renderBtn';
export default {
  components : {
    renderBtn
  },
  data () {
    return {
      visible : false,
      type : '',
      x : 24,
      y : 24,
      closeBtn : '',
      title : '',
      content : '',
      icon : '',
      key : '',
      duration : 3000,
      placement : 'topRight',
      style : {},
      customClass : '',
      onClick : '',
      onClose : '',
      getContainer : function () {
        return document.body;
      },
      renderBtn : function () {} 
    }
  },
  computed : {
    placementStyle () {
      let map = {
        topRight : {
          top : `${this.y}px`,
          right : `${this.x}px`,
          bottom : 'auto'
        },
        topLeft : {
          top : `${this.y}px`,
          left : `${this.x}px`,
          bottom : 'auto'
        },
        bottomLeft : {
          top : 'auto',
          bottom : `${this.y}px`,
          left :  `${this.x}px`
        },
        bottomRight : {
          top : 'auto',
          bottom : `${this.y}px`,
          right : `${this.x}px`
        }
      };
      return map[this.placement];
    }
  },
  mounted () {
    // 倒计时关闭通知
    this.countdown();
  },
  methods : {
    onAfterLeave () {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    countdown () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.isClosed) {
            this.close();
          }
        } , this.duration);
      }
    },
    close () {
      this.visible = false;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    onMouseEnter () {
      clearTimeout(this.timer);
    },
    onMouseLeave () {
      this.countdown();
    },
    handleClose () {
      this.close();
    },
    handleClick () {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    }
  }
}
</script>