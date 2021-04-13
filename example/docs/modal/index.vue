<template>
  <div class="box">
    <div class="doc-title mb15">Modal 对话框</div>
    <div class="doc-desc mb15">模态对话框，主要用于用户不想跳转页面去处理业务，而是直接通过一个弹框来进行处理。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="modal">modal</button>
      <Modal v-model="visible">
        <div slot="header">我是头部</div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible : false
    }
  },
  methods : {
    modal () {
      this.visible = !this.visible;
      console.log(this.visible)
    }
  }
}
</script>
<style lang="less" scoped>

</style>