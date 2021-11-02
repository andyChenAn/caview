<template>
  <div class="box">
    <div class="doc-title mb15">Calendar 日历</div>
    <div class="doc-desc mb15">展示日历</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px;">基本使用</div>
      <Calendar @select="handleSelect" />
    </div>
  </div>
</template>
<script>
export default {
  methods : {
    handleSelect (now) {
      
    }
  }
}
</script>
<style scoped>

</style>