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
        <div class="slide">
          <span>5</span>
        </div>
      </Carousel>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">小圆点位置方向可以是left，right，top，bottom</div>
      <div style="margin-bottom:20px;">
        <button @click="changeDot('bottom')">bottom</button>
        <button @click="changeDot('top')">top</button>
        <button @click="changeDot('left')">left</button>
        <button @click="changeDot('right')">right</button>
      </div>
      <Carousel :arrow='false' :dotPosition="dotPosition">
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
        <div class="slide">
          <span>5</span>
        </div>
      </Carousel>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">渐显效果</div>
      <Carousel effect="fade">
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
        <div class="slide">
          <span>5</span>
        </div>
      </Carousel>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自动轮播</div>
      <Carousel autoPlay>
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
        <div class="slide">
          <span>5</span>
        </div>
      </Carousel>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义小圆点</div>
      <Carousel dotClass="dot-slide">
        <div slot="dot" slot-scope="props">
          <img :src="getImgUrl(props.i)">
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/abstract01.jpg" alt="">
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/abstract02.jpg" alt="">
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/abstract03.jpg" alt="">
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/abstract04.jpg" alt="">
        </div>
      </Carousel>
    </div>
  </div>
</template>
<script>
const baseUrl =
  'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/';
export default {
  data () {
    return {
      dotPosition : 'bottom',
      baseUrl
    }
  },
  methods : {
    changeDot (dir) {
      this.dotPosition = dir;
    },
    getImgUrl(i) {
      return `${baseUrl}abstract0${i + 1}.jpg`;
    },
  }
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
img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.carousel-box {
  width: 23%;
  display: inline-block;
}
/deep/.ca-carousel {
  .dot-slide {
    div {
      width: 60px;
      height: 45px;
      display: inline-block;
    }
    img {
      border: none;
    }
  }
} 
</style>