<template>
  <div class="box">
    <div class="doc-title mb15">Popover 气泡卡片</div>
    <div class="doc-desc mb15">点击/鼠标移入元素，弹出气泡式的卡片浮层</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Popover title="这是标题1">
        <button>click me</button>
        <div slot="content">
          <div>这是内容</div>
          <div>这是一段内容</div>
        </div>
      </Popover>
      <Popover trigger="hover" title="这是标题2">
        <button>hover me</button>
        <div slot="content">
          <div>这是内容</div>
          <div>这是一段内容</div>
        </div>
      </Popover>
      <Popover trigger="contextmenu" title="这是标题3">
        <button>鼠标右击</button>
        <div slot="content">
          <div>这是内容</div>
          <div>这是一段内容</div>
        </div>
      </Popover>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">使用visible(v-model)属性来控制popover显示</div>
      <Popover :visible="visible1" title="这是一个标题" @visileChange="visibleChange1">
        <button>click me</button>
        <div slot="content">
          <div>这是一个popover组件的内容</div>
          <button @click="hide">close popover</button>
        </div>
      </Popover>
      <Popover :visible="visible2" title="这是一个标题" @visileChange="visibleChange2">
        <button>click me</button>
        <div slot="content">
          <div>这是一个popover组件的内容</div>
          <button @click="hide">close popover</button>
        </div>
      </Popover>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">位置方向</div>
      <div style="position:relative;width:460px;">
        <div style="margin-left: 90px">
          <Popover trigger="hover" placement="topLeft" title="这是标题" content="这是内容">
            <button class="btn">topLeft</button>
          </Popover>
          <Popover trigger="hover" title="这是标题" content="这是内容">
            <button class="btn">top</button>
          </Popover>
          <Popover trigger="hover" placement="topRight" title="这是标题" content="这是内容">
            <button class="btn">topRight</button>
          </Popover>
        </div>
        <div style="width: 80px">
          <Popover trigger="hover" placement="leftTop" title="这是标题" content="这是内容">
            <button class="btn">leftTop</button>
          </Popover>
          <Popover trigger="hover" placement="left" title="这是标题" content="这是内容">
            <button class="btn">left</button>
          </Popover>
          <Popover trigger="hover" placement="leftBottom" title="这是标题" content="这是内容">
            <button class="btn">leftBottom</button>
          </Popover>
        </div>
        <div style="margin-left: 90px">
          <Popover trigger="hover" placement="bottomLeft" title="这是标题" content="这是内容">
            <button class="btn">bottomLeft</button>
          </Popover>
          <Popover trigger="hover" placement="bottom" title="这是标题" content="这是内容">
            <button class="btn">bottom</button>
          </Popover>
          <Popover trigger="hover" placement="bottomRight" title="这是标题" content="这是内容">
            <button class="btn">bottomRight</button>
          </Popover>
        </div>
        <div style="width: 90px;position:absolute;right:0;top:30px">
          <Popover trigger="hover" placement="rightTop" title="这是标题" content="这是内容">
            <button class="btn">rightTop</button>
          </Popover>
          <Popover trigger="hover" placement="right" title="这是标题" content="这是内容">
            <button class="btn">right</button>
          </Popover>
          <Popover trigger="hover" placement="rightBottom" title="这是标题" content="这是内容">
            <button class="btn">rightBottom</button>
          </Popover>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible1 : false,
      visible2 : false
    }
  },
  methods : {
    hide () {
      this.visible1 = false;
      this.visible2 = false;
    },
    visibleChange1 (visible) {
      this.visible2 = false;
      this.visible1 = visible;
    },
    visibleChange2 (visible) {
      this.visible1 = false;
      this.visible2 = visible;
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  width: 90px;
  height: 30px;
}
</style>