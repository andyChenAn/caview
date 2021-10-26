<template>
  <div class="box">
    <div class="doc-title mb15">Popconfirm 气泡确认框</div>
    <div class="doc-desc mb15">点击元素，弹出气泡确认框</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="position:relative;width:460px;">
        <div style="margin-left: 90px">
          <Popconfirm placement="topLeft">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">topLeft</button>
          </Popconfirm>
          <Popconfirm @confirm="onConfirm" @cancel="onCancel">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">top</button>
          </Popconfirm>
          <Popconfirm placement="topRight">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">topRight</button>
          </Popconfirm>
        </div>
        <div style="width: 80px">
          <Popconfirm placement="leftTop">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">leftTop</button>
          </Popconfirm>
          <Popconfirm placement="left">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">left</button>
          </Popconfirm>
          <Popconfirm placement="leftBottom">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">leftBottom</button>
          </Popconfirm>
        </div>
        <div style="margin-left: 90px">
          <Popconfirm placement="bottomLeft">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">bottomLeft</button>
          </Popconfirm>
          <Popconfirm placement="bottom">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">bottom</button>
          </Popconfirm>
          <Popconfirm placement="bottomRight">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">bottomRight</button>
          </Popconfirm>
        </div>
        <div style="width: 90px;position:absolute;right:0;top:30px">
          <Popconfirm placement="rightTop">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">rightTop</button>
          </Popconfirm>
          <Popconfirm placement="right">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">right</button>
          </Popconfirm>
          <Popconfirm placement="rightBottom">
            <template v-slot:title>想要删除这篇文章吗？</template>
            <button class="btn">rightBottom</button>
          </Popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onConfirm() {
      this.$message.success("删除成功");
    },
    onCancel() {
      this.$message.info("取消删除");
    },
  },
};
</script>
<style scoped>
.btn {
  width: 90px;
  height: 30px;
}
</style>