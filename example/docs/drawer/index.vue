<template>
  <div class="box">
    
    <div class="doc-title mb15">Drawer 抽屉</div>
    <div class="doc-desc mb15">屏幕边缘滑出的面板。</div>
    <br>
    <br>
    <div class="inner">
      <button @click="open">打开抽屉</button>
      <Drawer
        :visible="visible"
        :handle="getHandler"
      >
        <template v-slot:title>这是一个新标题</template>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
    </div>
    <!-- <div class="inner">
      <button @click="top">上</button>
      <button @click="bottom">下</button>
      <button @click="left">左</button>
      <button @click="right">右</button>
      <Drawer
        v-model="visible3"
        title="这是一个标题"
        placement="top"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
      <Drawer
        v-model="visible4"
        title="这是一个标题"
        placement="bottom"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
      <Drawer
        v-model="visible1"
        title="这是一个标题"
        placement="left"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
      <Drawer
        v-model="visible2"
        title="这是一个标题"
        placement="right"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
    </div>
    <div class="inner">
      <div id="box" style="position:relative;width:400px;height:300px;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;overflow:hidden">
        <button @click="open1">挂载点</button>
      </div>
      <Drawer
        v-model="visible5"
        title="这是一个标题"
        :getContainer="getContainer"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
    </div>
    <div class="inner">
      <button @click="open2">嵌套抽屉</button>
      <Drawer
        v-model="visible6"
        title="这是一个标题"
        width="600"
        push="180"
      >
        <button @click="open3">第二个抽屉</button>
        <div>这是内容1</div>
        <Drawer
          v-model="visible7"
          title="这是另一个标题"
          width="420"
          push="150"
        >
          <div>这是一个内容2...</div>
          <div>这是一个内容2...</div>
          <div>这是一个内容2...</div>
        </Drawer>
      </Drawer>
    </div> -->
  </div>
</template>
<script>
import { getOptionProps } from '../../../src/components/utils/props';
export default {
  data () {
    return {
      visible : false,
      visible1 : false,
      visible2 : false,
      visible3 : false,
      visible4 : false,
      visible5 : false,
      visible6 : false,
      visible7 : false,
    }
  },
  methods : {
    open () {
      this.visible = !this.visible
    },
    left () {
      this.visible1 = !this.visible1;
    },
    right () {
      this.visible2 = !this.visible2;
    },
    top () {
      this.visible3 = !this.visible3;
    },
    bottom () {
      this.visible4 = !this.visible4;
    },
    getContainer () {
      return document.getElementById('box');
    },
    open1 () {
      this.visible5 = !this.visible5;
    },
    open2 () {
      this.visible6 = !this.visible6;
    },
    open3 () {
      this.visible7 = !this.visible7;
    },
    getHandler () {
      const h = this.$createElement;
      return h('div' , ['hello world']);
    }
  }
}
</script>
<style lang="less" scoped>

</style>