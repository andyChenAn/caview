<template>
  <div class="box">
    <div class="doc-title mb15">Collapse 折叠面板</div>
    <div class="doc-desc mb15">可以折叠/展开的内容区域</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Collapse accordion :activeKey="aa">
        <CollapsePanel key="a" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="b" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
      </Collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      aa : ""
    }
  }
}
</script>
<style lang="less" scoped>

</style>