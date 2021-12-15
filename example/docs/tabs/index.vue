<template>
  <div class="box">
    <div class="doc-title mb15">Tabs 标签页</div>
    <div class="doc-desc mb15">用于选项卡切换</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom: 20px">基本使用</div>
      <div>
        <Tabs :animate="false" defaultActiveKey="2" @prevClick="prevClick">
          <TabPane tab="tab1" key="1">tab1 content</TabPane>
          <TabPane tab="tab2234" key="2" disabled>tab2 content</TabPane>
          <TabPane tab="tab3" key="3">tab3 content</TabPane>
        </Tabs>
      </div>
    </div>
    <!-- <div class="inner">
      <div style="margin-bottom: 20px">基本使用</div>
      <div>
        <Tabs activeKey="1" @prevClick="prevClick">
          <TabPane tab="tab1" key="1">tab1 content</TabPane>
          <TabPane tab="tab2234" key="2">tab2 content</TabPane>
          <TabPane tab="tab3" key="3">tab3 content</TabPane>
        </Tabs>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab1: "tab1",
      activeKey : '1'
    };
  },
  methods: {
    prevClick() {},
  },
};
</script>
<style lang="less" scoped>
</style>