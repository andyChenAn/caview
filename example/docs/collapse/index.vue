<template>
  <div class="box">
    <div class="doc-title mb15">Collapse 折叠面板</div>
    <div class="doc-desc mb15">可以折叠/展开的内容区域</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Collapse v-model="collapse1">
        <CollapsePanel key="a" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="b" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="c" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">手风琴效果</div>
      <Collapse accordion v-model="collapse2">
        <CollapsePanel key="1" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="2" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="3" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">禁用某个面板</div>
      <Collapse accordion v-model="collapse3">
        <CollapsePanel key="4" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="5" header="这是一个标题2" disabled>
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="6" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">嵌套面板</div>
      <Collapse accordion v-model="collapse4">
        <CollapsePanel key="7" header="这是一个标题1">
          <Collapse v-model="collapse5">
            <CollapsePanel key="10" header="这是嵌套面板标题1">
              <div>这是嵌套面板内容</div>
            </CollapsePanel>
          </Collapse>
        </CollapsePanel>
        <CollapsePanel key="8" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="9" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collapse1 : ['a'],
      collapse2 : ['1'],
      collapse3 : ['4'],
      collapse4 : ['7'],
      collapse5 : ['10']
    }
  }
}
</script>
<style lang="less" scoped>

</style>