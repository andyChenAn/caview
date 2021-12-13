<template>
  <div class="box">
    <div class="doc-title mb15">Tabs 标签页</div>
    <div class="doc-desc mb15">用于选项卡切换</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom: 20px">基本使用</div>
      <Tabs @prevClick="prevClick">
        <TabPane :tab="tab" key="2" />
      </Tabs>
    </div>
  </div>  
</template>
<script>
export default {
  data ()  {
    return {
      tab : 'tab1'
    }
  },
  methods : {
    prevClick () {
      alert(23)
    }
  }
}
</script>
<style lang="less" scoped>

</style>