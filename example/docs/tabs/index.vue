<template>
  <div class="box">
    <div class="doc-title mb15">Tabs 标签页</div>
    <div class="doc-desc mb15">用于选项卡切换</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom: 20px">基本使用，默认选中第一项</div>
      <div>
        <Tabs default-active-key="1">
          <TabPane tab="tab1" key="1">tab1 content</TabPane>
          <TabPane tab="tab2" key="2">tab2 content</TabPane>
          <TabPane tab="tab3" key="3">tab3 content</TabPane>
        </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom: 20px">禁用某一项</div>
      <div>
        <Tabs default-active-key="1">
          <TabPane tab="tab1" key="1">tab1 content</TabPane>
          <TabPane tab="tab2" key="2" disabled>tab2 content</TabPane>
          <TabPane tab="tab3" key="3">tab3 content</TabPane>
        </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">带图标的标签，图标的选中颜色怎么实现，暂时不清楚</div>
      <div>
        <Tabs default-active-key="1">
          <TabPane key="1">
            <span slot="tab">
              <svg t="1639639766085" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4000" width="16" height="16"><path d="M747.4 535.7c-0.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7z m-10.6 267c-14.3 19.9-28.7 35.6-41.9 45.7-10.5 8-18.6 11.4-24 11.6-9-0.1-17.7-2.3-34.7-8.8-1.2-0.5-2.5-1-4.2-1.6-0.8-0.3-3.9-1.5-4.4-1.7-17.4-6.7-27.8-10.3-41.1-13.8-18.6-4.8-37.1-7.4-56.9-7.4-20.2 0-39.2 2.5-58.1 7.2-13.9 3.5-25.6 7.4-42.7 13.8-0.7 0.3-8.1 3.1-10.2 3.9-3.5 1.3-6.2 2.3-8.7 3.2-10.4 3.6-17 5.1-22.9 5.2-0.7 0-1.3-0.1-1.8-0.2-1.1-0.2-2.5-0.6-4.1-1.3-4.5-1.8-9.9-5.1-16-9.8-14-10.9-29.4-28-45.1-49.9-27.5-38.6-53.5-89.8-66-125.7-15.4-44.8-23-87.7-23-128.6 0-60.2 17.8-106 48.4-137.1 26.3-26.6 61.7-41.5 97.8-42.3 5.9 0.1 14.5 1.5 25.4 4.5 8.6 2.3 18 5.4 30.7 9.9 3.8 1.4 16.9 6.1 18.5 6.7 7.7 2.8 13.5 4.8 19.2 6.6 18.2 5.8 32.3 9 47.6 9 15.5 0 28.8-3.3 47.7-9.8 7.1-2.4 32.9-12 37.5-13.6 25.6-9.1 44.5-14 60.8-15.2 4.8-0.4 9.1-0.4 13.2-0.1 22.7 1.8 42.1 6.3 58.6 13.8-37.6 43.4-57 96.5-56.9 158.4-0.3 14.7 0.9 31.7 5.1 51.8 6.4 30.5 18.6 60.7 37.9 89 14.7 21.5 32.9 40.9 54.7 57.8-11.5 23.7-25.6 48.2-40.4 68.8z" p-id="4001"></path><path d="M642.3 230.7c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z" p-id="4002"></path></svg>
              tab1
            </span>
            tab1 Content
          </TabPane>
          <TabPane key="2">
            <span slot="tab">
              <svg t="1639638125889" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3144" width="16" height="16"><path d="M448.3 225.2c-18.6 0-32 13.4-32 31.9s13.5 31.9 32 31.9c18.6 0 32-13.4 32-31.9 0.1-18.4-13.4-31.9-32-31.9z" p-id="3145"></path><path d="M842.2 321.6c-13.8-13.8-32.7-21.5-53.2-21.5-3.9 0-7.4 0.4-10.7 1v-1h-3.6c-5.5-30.6-18.6-60.5-38.1-87.4-18.7-25.7-43-47.9-70.8-64.9l25.1-35.8v-3.3c0-0.8 0.4-2.3 0.7-3.8 0.6-2.4 1.4-5.5 1.4-8.9 0-18.5-13.5-31.9-32-31.9-9.8 0-19.5 5.7-25.9 15.4l-29.3 42.1c-30-9.8-62.4-15-93.8-15-31.3 0-63.7 5.2-93.8 15L389 79.4c-6.6-9.6-16.1-15.4-26-15.4-18.6 0-32 13.4-32 31.9 0 6.2 2.5 12.8 6.7 17.4l22.6 32.3c-28.7 17-53.5 39.4-72.2 65.1-19.4 26.9-32 56.8-36.7 87.4h-5.5v1c-3.2-0.6-6.7-1-10.7-1-20.3 0-39.2 7.5-53.1 21.3-13.8 13.8-21.5 32.6-21.5 53v235c0 20.3 7.5 39.1 21.4 52.9 13.8 13.8 32.8 21.5 53.2 21.5 3.9 0 7.4-0.4 10.7-1v93.5c0 29.2 23.9 53.1 53.2 53.1H331v58.3c0 20.3 7.5 39.1 21.4 52.9 13.8 13.8 32.8 21.5 53.2 21.5 20.3 0 39.2-7.5 53.1-21.3 13.8-13.8 21.5-32.6 21.5-53v-58.2H544v58.1c0 20.3 7.5 39.1 21.4 52.9 13.8 13.8 32.8 21.5 53.2 21.5 20.4 0 39.2-7.5 53.1-21.6 13.8-13.8 21.5-32.6 21.5-53v-58.2h31.9c29.3 0 53.2-23.8 53.2-53.1v-91.4c3.2 0.6 6.7 1 10.7 1 20.3 0 39.2-7.5 53.1-21.3 13.8-13.8 21.5-32.6 21.5-53v-235c-0.1-20.3-7.6-39-21.4-52.9zM246 609.6c0 6.8-3.9 10.6-10.7 10.6-6.8 0-10.7-3.8-10.7-10.6V374.5c0-6.8 3.9-10.6 10.7-10.6 6.8 0 10.7 3.8 10.7 10.6v235.1z m131.1-396.8c37.5-27.3 85.3-42.3 135-42.3s97.5 15.1 135 42.5c32.4 23.7 54.2 54.2 62.7 87.5H314.4c8.5-33.4 30.5-64 62.7-87.7z m39.3 674.7c-0.6 5.6-4.4 8.7-10.5 8.7-6.8 0-10.7-3.8-10.7-10.6v-58.2h21.2v60.1z m202.3 8.7c-6.8 0-10.7-3.8-10.7-10.6v-58.2h21.2v60.1c-0.6 5.6-4.3 8.7-10.5 8.7z m95.8-132.6H309.9V364h404.6v399.6z m85.2-154c0 6.8-3.9 10.6-10.7 10.6-6.8 0-10.7-3.8-10.7-10.6V374.5c0-6.8 3.9-10.6 10.7-10.6 6.8 0 10.7 3.8 10.7 10.6v235.1z" p-id="3146"></path><path d="M576.1 225.2c-18.6 0-32 13.4-32 31.9s13.5 31.9 32 31.9c18.6 0 32.1-13.4 32.1-32-0.1-18.6-13.4-31.8-32.1-31.8z" p-id="3147"></path></svg>
              tab2
            </span>
            tab2 Content
          </TabPane>
        </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">滑动效果</div>
      <div style="margin-bottom:20px;">
        <button @click="onClick1('top')">水平方向</button>
        <button @click="onClick1('left')">垂直方向</button>
      </div>
      <div style="width:300px;">
        <Tabs :tabPosition="tabPosition1" default-active-key="8" :style="{height : '200px'}">
          <TabPane v-for="i in 30" :key="String(i)" :tab="'tab' + i">{{i}}</TabPane>
        </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">附加内容</div>
      <div>
        <Tabs default-active-key="1">
          <TabPane key="1" tab="tab1">tab1 content</TabPane>
          <TabPane key="2" tab="tab2">tab2 content</TabPane>
          <TabPane key="3" tab="tab3">tab3 content</TabPane>
          <button slot="tabBarExtraContent">click</button>
        </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">tabs位置，可以是top，left，bottom，right</div>
      <div style="margin-bottom:20px">
        <button @click="onClick('top')">top</button>
        <button @click="onClick('bottom')">bottom</button>
        <button @click="onClick('left')">left</button>
        <button @click="onClick('right')">right</button>
      </div>
      <div style="width:500px">
        <Tabs :tabPosition="tabPosition" :active-key="activeKey">
        <TabPane key="1" tab="tab1">
          tab1 content
        </TabPane>
        <TabPane key="2" tab="tab2">tab2 content</TabPane>
        <TabPane key="3" tab="tab3">tab3 content</TabPane>
      </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">尺寸大小</div>
      <div style="margin-bottom:20px">
        <button @click="changeSize('small')">small</button>
        <button @click="changeSize('default')">default</button>
        <button @click="changeSize('large')">large</button>
      </div>
      <div>
        <Tabs :size="size" default-active-key="1">
          <TabPane key="1" tab="tab1">tab1</TabPane>
          <TabPane key="2" tab="tab2">tab2</TabPane>
          <TabPane key="3" tab="tab3">tab3</TabPane>
        </Tabs>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">卡片形式</div>
      <div>
        <Tabs type="card" default-active-key="1">
          <TabPane key="1" tab="tab1">tab1</TabPane>
          <TabPane key="2" tab="tab2">tab2</TabPane>
          <TabPane key="3" tab="tab3">tab3</TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab1: "tab1",
      activeKey : '2',
      tabPosition : 'top',
      tabPosition1 : 'top',
      size : 'default'
    };
  },
  methods: {
    prevClick() {},
    onClick (position) {
      this.tabPosition = position;
    },
    onClick1 (pos) {
      this.tabPosition1 = pos;
    },
    changeSize (size) {
      this.size = size;
    }
  }
};
</script>
<style lang="less" scoped>
</style>