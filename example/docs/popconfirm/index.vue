<template>
  <div class="box">
    <div class="doc-title mb15">Popconfirm 气泡确认框</div>
    <div class="doc-desc mb15">点击元素，弹出气泡确认框</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <Popconfirm placement="topLeft">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">topLeft</button>
      </Popconfirm>
      <Popconfirm @confirm="onConfirm" @cancel="onCancel">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">top</button>
      </Popconfirm>
      <Popconfirm placement="topRight">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">topRight</button>
      </Popconfirm>
      <Popconfirm placement="leftTop">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">leftTop</button>
      </Popconfirm>
      <Popconfirm placement="left">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">left</button>
      </Popconfirm>
      <Popconfirm placement="leftBottom">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">leftBottom</button>
      </Popconfirm>
      <Popconfirm placement="bottomLeft">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">bottomLeft</button>
      </Popconfirm>
      <Popconfirm placement="bottom">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">bottom</button>
      </Popconfirm>
      <Popconfirm placement="bottomRight">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">bottomRight</button>
      </Popconfirm>
      <Popconfirm placement="rightTop">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">rightTop</button>
      </Popconfirm>
      <Popconfirm placement="right">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">right</button>
      </Popconfirm>
      <Popconfirm placement="rightBottom">
        <template v-slot:title>Are you sure delete this task?</template>
        <button class="btn">rightBottom</button>
      </Popconfirm>
    </div>
    <div class="inner">
      <Popconfirm
        title="Are you sure delete this task?"
        placement="leftTop"
      >
        <div style="height:100px;border:1px solid #ddd;width:200px">
          <span>阿斯顿发拉设计费打算，。阿法法师的</span>
          <span>sdfasljkfasfa</span>
        </div>
      </Popconfirm>
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
    onConfirm() {},
    onCancel() {},
  },
};
</script>
<style lang="less" scoped>
</style>