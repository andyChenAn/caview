<template>
  <div class="ca-modal">
    <transition name="fade">
      <div @click="clickMask" class="mask" v-show="visible" v-if="mask" :style="{zIndex : zIndex}"></div>
    </transition>
    <div @click="clickWrap" v-show="showContent" class="modal-wrap" :style="{zIndex : zIndex}">
      <transition :name="transition" @after-leave="onAfterLeave">
        <div 
          v-show="visible" 
          ref="modal" 
          class="modal" 
          :style="{width : width + 'px' , transformOrigin : transformOrigin}"
          :class="[fullscreen ? 'modal-fullscreen' : '']"
        >
          <div class="modal-content">
            <i v-if="closable" @click="onCancel" class="iconfont icon-remove"></i>
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
                  <button @click="onCancel" class="cancel">
                    <span>{{cancelText}}</span>
                  </button>
                  <button @click="onOk" class="confirm">
                    <i v-if="showLoading" class="iconfont icon-loading"></i>
                    <span>{{okText}}</span>
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
    // 是否显示modal
    value : {
      type : Boolean,
      default : false
    },
    // 宽度
    width : {
      type : [String , Number],
      default : 520
    },
    // 弹框标题
    title : {
      type : String,
      default : ''
    },
    // 弹框内容
    content : {
      type : String,
      default : ''
    },
    // 是否显示遮罩层
    mask : {
      type : Boolean,
      default : true
    },
    // 是否显示右上角的关闭按钮
    closable : {
      type : Boolean,
      default : true
    },
    // 是否允许点击遮罩层关闭弹框
    maskClosable : {
      type : Boolean,
      default : true
    },
    // 是否锁定页面滚动
    lockScroll : {
      type : Boolean,
      default : true
    },
    // 确定按钮的文本
    okText : {
      type : String,
      default : '确定'
    },
    // 取消按钮的文本
    cancelText : {
      type : String,
      default : '取消'
    },
    // modal的z-index层级
    zIndex : {
      type : [Number , String],
      default : 1000
    },
    // 是否全屏展示
    fullscreen : {
      type : Boolean,
      default : false
    },
    // modal的动画效果，zoom，fade，slide，scale
    transition : {
      type : String,
      default : 'zoom'
    },
    // 点击确定按钮时，确定按钮是否显示 loading 状态
    loading : {
      type : Boolean,
      default : false
    }
  },
  data () {
    return {
      // 是否显示modal
      visible : this.value,
      // 过渡位置
      transformOrigin : '',
      // 是否显示内容，现在的html结构有点恶心，导致要多加一个这样的属性去判断
      showContent : false,
      // 是否显示loading
      showLoading : false
    }
  },
  watch : {
    value (newVal) {
      this.visible = newVal;
      if (newVal) {
        if (this.transition == 'scale') {
          this.transformOrigin = this.getTransformOrigin();
        }
        this.showContent = true;
        if (this.lockScroll) {
          this.disabelBodyScroll();
        }
      }
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
    close () {
      this.enableBodyScroll();
      this.visible = false;
      this.$emit('input' , false);
      this.$emit('onCancel');
    },
    clickMask () {
      if (this.maskClosable && this.mask) {
        this.close();
      }
    },
    onCancel () {
      this.close();
    },
    onOk () {
      if (!this.loading) {
        this.visible = false;
        this.$emit('input' , false);
      };
      if (this.loading) {
        this.showLoading = true;
      }
      this.$emit('onOk');
    },
    onAfterLeave () {
      this.showContent = false;
      this.showLoading = false;
    },
    clickWrap (evt) {
      const className = evt.target.getAttribute('class');
      if (className && className.indexOf('modal-wrap') > -1) {
        this.clickMask();
      }
    },
    disabelBodyScroll () {
      document.body.setAttribute('style' , 'overflow:hidden;paddingLeft:17px;');
    },
    enableBodyScroll () {
      document.body.setAttribute('style' , '');
    }
  }
}
</script>