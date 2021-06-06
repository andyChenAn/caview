<template>
  <div class="box">
    <div class="doc-title mb15">Popconfirm 气泡确认框</div>
    <div class="doc-desc mb15">点击元素，弹出气泡确认框</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <Popconfirm
        :visible="show"
      >
        <button class="btn">点击</button>
      </Popconfirm>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show : false
    }
  },
  methods : {
    onClick () {
      this.show = true;
    }
  }
}
</script>
<style lang="less" scoped>

</style>