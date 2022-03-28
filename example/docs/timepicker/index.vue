<template>
  <div class="box">
    <div class="doc-title mb15">TimePicker 时间选择器</div>
    <div class="doc-desc mb15">选择时间</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本用法</div>
      <TimePicker @change="handleChange" />
    </div>
  </div>
</template>
<script>
export default {
  methods : {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped>

</style>