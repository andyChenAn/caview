<template>
  <div class="box">
    <div class="doc-title mb15">Modal 对话框</div>
    <div class="doc-desc mb15">模态对话框，主要用于用户不想跳转页面去处理业务，而是直接通过一个弹框来进行处理。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="info">info</button>
      <button @click="success">success</button>
      <button @click="error">error</button>
      <button @click="warning">warning</button>
      <button @click="modal1">modal1</button>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <button @click="info">info</button>
      <button @click="modal1">modal1</button>
      <Modal 
        v-model="visible"
        title="我是一个头部"
        zIndex="2000"
        width="1000"
        loading
        transition="slide"
        @onOk="handleOk"
      >
        <div slot="content">
          <p>我是内容</p>
        </div>
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
    info () {
      this.$modal.info({
        title : '这是一个标题',
        content : '这是一段内容',
        transition : 'scale',
        okText : 'ok',
        scrollable : false,
        onOk () {
          console.log('ok')
        },
        onCancel () {
          console.log('cancel');
        }
      })
    },
    success () {
      this.$modal.success({
        title : '这是一个成功标题'
      })
    },
    error () {},
    warning () {},
    modal1 () {
      this.visible = !this.visible;
    }
  }
}
</script>
<style lang="less" scoped>

</style>