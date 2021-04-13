<template>
  <div class="box">
    <div class="doc-title mb15">Modal 对话框</div>
    <div class="doc-desc mb15">模态对话框，主要用于用户不想跳转页面去处理业务，而是直接通过一个弹框来进行处理。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="modal">modal</button>
      <Modal 
        v-model="visible" 
        title="我是一个头部"
        :maskClosable="false"
        zIndex="2000"
        width="1000"
        @onOk="handleOk"
        loading
      >
        <div slot="content">
          <p>我是内容</p>
        </div>
      </Modal>
      <Modal v-model="show">
        <p slot="header">我是标题3</p>
        <p slot="content">我是内容</p>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible : false,
      show : false
    }
  },
  methods : {
    modal () {
      this.visible = !this.visible;
    },
    handleOk () {
      setTimeout(() => {
        this.visible = false;
      } , 2000)
    }
  }
}
</script>
<style lang="less" scoped>

</style>