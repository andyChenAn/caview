<template>
  <div class="box">
    
    <div class="doc-title mb15">Drawer 抽屉</div>
    <div class="doc-desc mb15">屏幕边缘滑出的面板。</div>
    <br>
    <br>
    <div class="inner">
      <button @click="clickOpen">打开抽屉</button>
      <Drawer
        :visible="visible"
        title="这是一个标题"
        @close="handleClose"
        :width="300"
      >
        <div>这是内容...</div>
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
        :visible="visible6"
        title="这是一个标题"
        width="600"
        push="180"
      >
        <button @click="open3">第二个抽屉</button>
        <div>这是内容1</div>
        <Drawer
          :visible="visible7"
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
export default {
  data () {
    return {
      visible : false
    }
  },
  methods : {
    clickOpen () {
      this.visible = true
    },
    handleClose () {
      this.visible = false;
    }
  }
}
</script>
<style lang="less" scoped>

</style>