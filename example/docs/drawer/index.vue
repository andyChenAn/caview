<template>
  <div class="box">
    <div class="doc-title mb15">Drawer 抽屉</div>
    <div class="doc-desc mb15">屏幕边缘滑出的面板。</div>
    <br>
    <br>
    <div class="inner">
      <button @click="open">打开抽屉</button>
      <Drawer
        v-model="visible"
        title="这是一个标题"
        :maskStyle="maskStyle"
        placement="right"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible : false,
      maskStyle : {
        
      }
    }
  },
  methods : {
    open () {
      this.visible = !this.visible;
    }
  }
}
</script>
<style lang="less" scoped>

</style>