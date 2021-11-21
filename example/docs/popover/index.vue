<template>
  <div class="box">
    <div class="doc-title mb15">Popover 气泡卡片</div>
    <div class="doc-desc mb15">点击/鼠标移入元素，弹出气泡式的卡片浮层</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Popover trigger="contextmenu" title="这是标题" content="这是内容">
        <button>hover me</button>
      </Popover>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible : true
    }
  }
}
</script>
<style lang="less" scoped>

</style>