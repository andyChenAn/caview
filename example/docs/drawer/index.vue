<template>
  <div class="box">
    
    <div class="doc-title mb15">Drawer 抽屉</div>
    <div class="doc-desc mb15">屏幕边缘滑出的面板。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="clickOpen">打开抽屉</button>
      <Drawer
        :visible="visible"
        @close="onClose"
        width="500"
        title="这是标题"
      >
        <div style="height:1000px;">这是一段内容</div>
      </Drawer>
    </div>
    <div class="inner">
      <button @click="top">上</button>
      <button @click="bottom">下</button>
      <button @click="left">左</button>
      <button @click="right">右</button>
      <Drawer
        :visible="visible1"
        title="这是一个标题"
        placement="top"
        @close="onTopClose"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
      <Drawer
        :visible="visible2"
        title="这是一个标题"
        placement="bottom"
        @close="onBottomClose"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
      <Drawer
        :visible="visible3"
        title="这是一个标题"
        placement="left"
        width="400"
        @close="onLeftClose"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
      <Drawer
        :visible="visible4"
        title="这是一个标题"
        placement="right"
        width="400"
        @close="onRightClose"
      >
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
        <div>这是一个内容...</div>
      </Drawer>
    </div>
    <div class="inner">
      <div id="box" style="position:relative;width:400px;height:300px;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;overflow:hidden">
        <button @click="open">挂载点</button>
        <Drawer
          :visible="visible5"
          title="这是一个标题"
          width="300"
          :wrapStyle="{position: 'absolute'}"
          @close="onClose1"
          getContainer="#box"
        >
          <div>这是一个内容...</div>
          <div>这是一个内容...</div>
          <div>这是一个内容...</div>
        </Drawer>
      </div>
    </div>
    <div class="inner">
      <button @click="open2">嵌套抽屉</button>
      <Drawer
        :visible="visible6"
        title="这是一个标题"
        width="600"
        @close="onClose3"
      >
        <button @click="open3">第二个抽屉</button>
        <div>这是内容1</div>
        <Drawer
          :visible="visible7"
          title="这是另一个标题"
          width="420"
          @close="onClose4"
        >
          <div>这是一个内容2...</div>
          <div>这是一个内容2...</div>
          <div>这是一个内容2...</div>
        </Drawer>
      </Drawer>
    </div>
  </div>
</template>
<script>
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
      visible7 : false
    }
  },
  methods : {
    clickOpen () {
      this.visible = true
    },
    onClose () {
      this.visible = false;
    },
    top () {
      this.visible1 = true;
    },
    bottom () {
      this.visible2 = true;
    },
    left () {
      this.visible3 = true;
    },
    right () {
      this.visible4 = true;
    },
    onTopClose () {
      this.visible1 = false;
    },
    onBottomClose () {
      this.visible2 = false;
    },
    onLeftClose () {
      this.visible3 = false;
    },
    open () {
      this.visible5 = true;
    },
    onClose1 () {
      this.visible5 = false;
    },
    onRightClose () {
      this.visible4 = false;
    },
    open2 () {
      this.visible6 = true;
    },
    open3 () {
      this.visible7 = true;
    },
    onClose3 () {
      this.visible6 = false;
    },
    onClose4 () {
      this.visible7 = false;
    }
  }
}
</script>
<style lang="less" scoped>

</style>