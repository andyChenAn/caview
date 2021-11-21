<template>
  <div class="box">
    <div class="doc-title mb15">Popover 气泡卡片</div>
    <div class="doc-desc mb15">点击/鼠标移入元素，弹出气泡式的卡片浮层</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Popover title="这是标题1">
        <button>click me</button>
        <div slot="content">
          <div>这是内容</div>
          <div>这是一段内容</div>
        </div>
      </Popover>
      <Popover trigger="hover" title="这是标题2">
        <button>hover me</button>
        <div slot="content">
          <div>这是内容</div>
          <div>这是一段内容</div>
        </div>
      </Popover>
      <Popover trigger="contextmenu" title="这是标题3">
        <button>鼠标右击</button>
        <div slot="content">
          <div>这是内容</div>
          <div>这是一段内容</div>
        </div>
      </Popover>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">使用visible属性来控制弹框展示</div>
      <Popover v-model="visible" title="这是一个标题">
        <button>click me</button>
        <div slot="content">
          <div>这是一个popover组件的内容</div>
          <button @click="aa">close popover</button>
        </div>
      </Popover>
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
    aa () {
      this.visible = false;
    },
    change (visible) {
      console.log(visible)
    }
  }
}
</script>
<style lang="less" scoped>

</style>