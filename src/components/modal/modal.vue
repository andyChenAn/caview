<template>
  <div class="ca-modal">
    <transition name="fade">
      <div class="mask" v-if="visible"></div>
    </transition>
    <div class="modal-wrap">
      <transition name="zoomIn" @after-leave="onAfterLeave">
        <div v-show="visible" ref="modal" class="modal" :style="{width : width + 'px' , transformOrigin : transformOrigin}">
          <div class="modal-content">
            <i class="iconfont icon-remove"></i>
            <div class="header">
              <slot name="header">
                <div class="modal-title" v-html="title"></div>
              </slot>
            </div>
            <div class="content">
              <slot name="content">
                <div v-html="content"></div>
              </slot>
            </div>
            <div class="footer">
              <slot name="footer">
                <template>
                  <button @click="cancel" class="cancel">
                    <span>取消</span>
                  </button>
                  <button @click="ok" class="confirm">
                    <span>确定</span>
                  </button>
                </template>
              </slot>
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
    value : Boolean
  },
  data () {
    return {
      visible : this.value,
      width : 520,
      title : '',
      content : '',
      transformOrigin : '',
      lockScroll : true,
      onCancel : '',
      onOk : '',
      isClosed : false
    }
  },
  watch : {
    visible (newVal) {
      console.log(newVal , 'asda')
      if (newVal && this.lockScroll) {
        document.body.style.cssText = 'overflow:hidden;padding-right:17px';
      };
      if (newVal) {
        this.transformOrigin = this.getTransformOrigin();
      }
    },
    isClosed (newVal) {
      if (newVal) {
        this.close();
      }
    }
  },
  methods : {
    getTransformOrigin () {
      let width = parseInt(this.$refs.modal.style.width);
      let x = Math.abs(this.clientWidth / 2 - width / 2 - this.offsetX);
      let y = this.offsetY - 100;
      if (this.offsetX < this.clientWidth / 2) {
        x = -x;
      };
      return `${x}px ${y}px`;
    },
    close () {
      this.visible = false;
    },
    cancel () {
      this.isClosed = true;
    },
    ok () {},
    onAfterLeave () {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}
</script>