<template>
  <div class="box">
    <div class="doc-title mb15">Tag 标签</div>
    <div class="doc-desc mb15">用于标记分类</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px;">基本使用</div>
      <Tag>标签1</Tag>
      <Tag closable>可关闭的标签</Tag>
      <Tag>标签2</Tag>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">可选中的标签</div>
      <Tag checkable @change="change" checked>标签1</Tag>
      <Tag checkable>标签2</Tag>
      <Tag checkable>标签3</Tag>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义标签颜色</div>
      <Tag color="#f50">标签1</Tag>
      <Tag color="#2db7f5">标签2</Tag> 
      <Tag color="#87d068">标签3</Tag> 
      <Tag color="#108ee9">标签4</Tag> 
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">通过visible来控制标签关闭</div>
      <Tag closable v-model="visible">标签</Tag>
      <button @click="onClick">toggle</button>
    </div>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      visible : true
    }
  },
  methods : {
    change (checked) {
      console.log(checked)
    },
    onClick () {
      this.visible = !this.visible
    }
  }
}
</script>
<style lang="less" scoped>

</style>