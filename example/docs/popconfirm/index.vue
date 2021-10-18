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
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <template v-slot:title>are you ok now?</template>
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
      
    },
    onConfirm () {},
    onCancel () {}
  }
}
</script>
<style lang="less" scoped>

</style>