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
      <Badge :count="count" maxCount="99" :showZero="false">
        <div style="width:100px;height:100px;background-color:#ccc"></div>
      </Badge>
      <button @click="add">加</button>
      <button @click="remove">减</button>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">小红点</div>
      <Badge :dot="showDot">
        <div style="width:100px;height:100px;background-color:#ccc"></div>
      </Badge>
      <button @click="onChange">change</button>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">各种徽标状态(success，error，processing，warning，default)</div>
      <Badge status="success">
        <div style="width:50px;height:50px;background-color:#ccc"></div>
      </Badge>
      <Badge status="error">
        <div style="width:50px;height:50px;background-color:#ccc"></div>
      </Badge>
      <Badge status="warning">
        <div style="width:50px;height:50px;background-color:#ccc"></div>
      </Badge>
      <Badge status="default">
        <div style="width:50px;height:50px;background-color:#ccc"></div>
      </Badge>
      <Badge status="processing">
        <div style="width:50px;height:50px;background-color:#ccc"></div>
      </Badge>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义标徽颜色和偏移位置</div>
      <Badge count="23" color="#007aff">
        <div style="width:100px;height:100px;background-color:#ccc"></div>
      </Badge>
      <Badge count="23" color="#007aff" :offset="[10 , 10]">
        <div style="width:100px;height:100px;background-color:#ccc"></div>
      </Badge>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count : 12,
      showDot : true
    }
  },
  methods : {
    add () {
      ++this.count;
    },
    remove () {
      --this.count;
    },
    onChange () {
      this.showDot = !this.showDot;
    }
  }
}
</script>
<style scoped>

</style>