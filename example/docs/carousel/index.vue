<template>
  <div class="box">
    <div class="doc-title mb15">Carousel 跑马灯</div>
    <div class="doc-desc mb15">轮播</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Carousel :arrow='true' dotPosition="bottom">
        <div class="slide">
          <span>1</span>
        </div>
        <div class="slide">
          <span>2</span>
        </div>
        <div class="slide">
          <span>3</span>
        </div>
        <div class="slide">
          <span>4</span>
        </div>
      </Carousel>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="less">
.slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
  span {
    color: #fff;
  }
}
</style>