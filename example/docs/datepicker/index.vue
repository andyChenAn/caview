<template>
  <div class="box">
    <div class="doc-title mb15">DatePicker 日期选择器</div>
    <div class="doc-desc mb15">选择日期</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px;">基础使用</div>
      <DatePicker format="YYYY-MM-DD" />
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">日期范围</div>
      <RangeDatePicker @change="handleChange" />
    </div>
  </div>
</template>
<script>
export default {
  methods : {
    handleChange (date) {
      console.log(date)
    }
  }
}
</script>
<style lang="less" scoped>

</style>