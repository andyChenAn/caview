<template>
  <div class="box">
    <div class="doc-title mb15">Tooltip 文字提示</div>
    <div class="doc-desc mb15">气泡文字提示</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Tooltip trigger="click">
        <div slot="title">这是一个提示</div>
        <button>click</button>
      </Tooltip>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">位置方向</div>
      <div style="position:relative;width:460px;">
        <div style="margin-left: 90px">
          <Tooltip trigger="hover" placement="topLeft" title="这是一个提示内容">
            <button class="btn">topLeft</button>
          </Tooltip>
          <Tooltip trigger="hover" title="这是一个提示内容">
            <button class="btn">top</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="topRight" title="这是一个提示内容">
            <button class="btn">topRight</button>
          </Tooltip>
        </div>
        <div style="width: 80px">
          <Tooltip trigger="hover" placement="leftTop" title="这是一个提示内容">
            <button class="btn">leftTop</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="left" title="这是一个提示内容">
            <button class="btn">left</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="leftBottom" title="这是一个提示内容">
            <button class="btn">leftBottom</button>
          </Tooltip>
        </div>
        <div style="margin-left: 90px">
          <Tooltip trigger="hover" placement="bottomLeft" title="这是一个提示内容">
            <button class="btn">bottomLeft</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="bottom" title="这是一个提示内容">
            <button class="btn">bottom</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="bottomRight" title="这是一个提示内容">
            <button class="btn">bottomRight</button>
          </Tooltip>
        </div>
        <div style="width: 90px;position:absolute;right:0;top:30px">
          <Tooltip trigger="hover" placement="rightTop" title="这是一个提示内容">
            <button class="btn">rightTop</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="right" title="这是一个提示内容">
            <button class="btn">right</button>
          </Tooltip>
          <Tooltip trigger="hover" placement="rightBottom" title="这是一个提示内容">
            <button class="btn">rightBottom</button>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.btn {
  width: 90px;
  height: 30px;
}
</style>