<template>
  <div class="box">
    <div class="doc-title mb15">Badge 徽标数</div>
    <div class="doc-desc mb15">图标右上角的圆形徽标数字</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px;">基本使用</div>
      <Badge count="37">
        <div style="width:100px;height:100px;background-color: #ccc;"></div>
      </Badge>
      <Badge count="3">
        <div style="width:100px;height:100px;background-color: #ccc;"></div>
      </Badge>
      <Badge count="0">
        <div style="width:100px;height:100px;background-color: #ccc;"></div>
      </Badge>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">添加动画效果</div>
      <Badge :count="count" maxCount="99">
        <div style="width:100px;height:100px;background-color:#ccc"></div>
      </Badge>
      <button @click="add">加</button>
      <button @click="remove">减</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count : 12
    }
  },
  methods : {
    add () {
      ++this.count;
    },
    remove () {
      --this.count;
    }
  }
}
</script>
<style scoped>

</style>