<template>
  <div class="ca-modal">
    <transition name="fade">
      <div class="mask" v-if="visible"></div>
    </transition>
    <div v-show="visible" class="modal-wrap">
    <transition name="zoomIn">
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
                <button class="cancel">
                  <span>取消</span>
                </button>
                <button class="confirm">
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
    value : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
      visible : this.value,
      width : 520,
      transformOrigin : '',
      title : 'asfasdfa',
      content : 'sfs'
    }
  },
  watch : {
    value (newVal) {
      this.visible = newVal;
      this.transformOrigin = this.getTransformOrigin();
      console.log(this.transformOrigin);
    }
  },
  mounted () {
    document.body.addEventListener('mousedown' , evt => {
      evt.stopPropagation();
      evt.preventDefault();
      this.offset = {
        offsetX : evt.clientX,
        offsetY : evt.clientY,
        clientWidth : document.body.clientWidth
      };
    });
  },
  methods : {
    getTransformOrigin () {
      let width = parseInt(this.$refs.modal.style.width);
      let x = Math.abs(this.offset.clientWidth / 2 - width / 2 - this.offset.offsetX);
      let y = this.offset.offsetY - 100;
      if (this.offset.offsetX < this.offset.clientWidth / 2) {
        x = -x;
      };
      return `${x}px ${y}px`;
    },
  }
}
</script>