<template>
  <div class="box">
    <div class="doc-title mb15">Card 卡片</div>
    <div class="doc-desc mb15">通用卡片容器</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px;">基本使用</div>
      <Card title="这是一个标题" style="width:300px;">
        <div slot="extra">more</div>
        <div>这是内容</div>
        <div>这是内容</div>
        <div>这是内容</div>
      </Card>
      <br>
      <br>
      <Card size="small" title="这是一个标题" style="width:300px;">
        <div slot="extra">more</div>
        <div>这是内容</div>
        <div>这是内容</div>
        <div>这是内容</div>
      </Card>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">无边框卡片</div>
      <div style="background-color:#ccc; padding:20px;display:inline-block">
        <Card :border="false" title="这是一个标题" style="width:300px;">
          <div>这是内容</div>
          <div>这是内容</div>
          <div>这是内容</div>
        </Card>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">loading效果</div>
      <Card :loading="loading" title="这是一个标题" style="width:300px;">
        <div>这是内容</div>
      </Card>
      <br>
      <button @click="change">change</button>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">卡片悬停效果</div>
      <Card hoverable title="这是一个标题" style="width:300px;">
        <div>这是内容</div>
      </Card>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">更灵活的内容展示</div>
      <Card hoverable style="width:300px">
        <img slot="cover" src="https://img.syt5.com/2021/0607/20210607042123800.jpg.260.343.jpg" alt="">
        <CardMeta title="这是一个美女">
          <div slot="description">这个美女来自湖南</div>
        </CardMeta>
      </Card>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">内部卡片</div>
      <Card title="卡片标题" style="width:300px;">
        <Card title="内部卡片标题1">
          <div slot="extra">more</div>
          <div>这是内容</div>
        </Card>
        <Card title="内部卡片标题2" style="margin-top:16px;">
          <div slot="extra">more</div>
          <div>这是内容</div>
        </Card>
      </Card>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">
        <Card hoverable style="width:300px;">
          <img slot="cover" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          <CardMeta title="andy">
            <Avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div slot="description">this is a description</div>
          </CardMeta>
          <template slot="actions">
            <svg t="1637567679441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2484" width="20" height="20"><path d="M565 928.5H458.6c-22.7 0-41.2-17.7-42.3-40.4-0.8-18.4-1.6-36.4-2.4-53.8-20.8-6.8-40.9-15.7-59.9-26.7l-39.9 37.5c-16.8 15.7-42.6 15.3-58.8-0.9L180.1 769c-16-16-16.6-41.7-1.3-58.4 15-16.5 29.8-32.7 44.1-48.2-7.6-16.9-13.6-34.4-18.1-52.3l-67.8-2.2c-23-0.8-41-19.4-41-42.4V459.1c0-22.7 17.7-41.2 40.4-42.3 28.3-1.3 55.7-2.5 81.7-3.6 5.2-13 11.3-25.7 18.3-37.9l-57-60.7c-15.7-16.8-15.3-42.6 0.9-58.8l75.2-75.2c16-16 41.7-16.6 58.4-1.3 24 21.9 47 43 68.6 62.9 9.6-4.3 19.5-8.2 29.4-11.5 1.3-29.5 2.7-61 4.3-93.9 1.1-22.6 19.6-40.3 42.3-40.3H565c22.9 0 41.5 18 42.3 40.9l3.1 92.8c10.4 3.4 20.7 7.4 30.8 11.9 21.6-19.9 44.8-41 68.9-62.9 16.7-15.2 42.4-14.6 58.4 1.4l75.3 75.3c16.2 16.2 16.7 42.1 1 58.8l-56.9 60.9c6.9 12.1 12.9 24.7 18.1 37.5 26 1.1 53.5 2.4 81.9 3.8 22.6 1.1 40.3 19.6 40.3 42.3v106.5c0 22.9-18 41.5-40.9 42.3l-67.9 2.3c-4.5 17.8-10.5 35.3-18 52 14.2 15.5 29 31.7 44.1 48.4 15.2 16.7 14.6 42.4-1.4 58.4l-75.3 75.3c-16.2 16.2-42.1 16.7-58.8 1l-40-37.5c-19.3 11.1-39.7 20.2-60.8 27l-1.7 52.9c-0.9 22.7-19.5 40.7-42.5 40.7z m-214.9-161l10.5 6.6c22.8 14.4 47.5 25.4 73.3 32.8l11.1 3.2 0.5 11.5c0.9 20.8 1.9 42.7 2.9 65 0.3 5.5 4.8 9.8 10.3 9.8H565c5.6 0 10.1-4.4 10.3-10l2.4-76.1 11.3-3.2c26.2-7.4 51.2-18.5 74.3-33.1l10.4-6.6 57.9 54.2c4.1 3.8 10.4 3.7 14.3-0.2l75.3-75.3c3.9-3.9 4-10.1 0.3-14.2-17.7-19.5-35-38.4-51.3-56.2l-7.4-8 4.8-9.8c10.4-21.2 18.1-43.7 23-66.8l2.6-12.3 92.7-3.1c5.6-0.2 10-4.7 10-10.3V459.1c0-5.5-4.3-10-9.8-10.3-32.2-1.5-63.2-3-92.2-4.2l-10.7-0.5-3.7-10c-6.6-18.2-15.2-35.8-25.4-52.3l-6.4-10.4 73.5-78.6c3.8-4.1 3.7-10.4-0.2-14.3l-75.3-75.3c-3.9-3.9-10.1-4-14.2-0.3-27 24.5-52.8 48.1-76.6 70l-8.1 7.4-9.8-4.8c-15-7.3-30.7-13.4-46.7-18l-11.2-3.2-3.8-115.8c-0.2-5.6-4.7-10-10.3-10H458.6c-5.5 0-10 4.3-10.3 9.8-1.8 37-3.4 72.3-4.7 104.9l-0.5 11.5-11 3.2c-15.5 4.5-30.8 10.5-45.3 17.6l-9.8 4.8-8.1-7.4c-23.8-21.9-49.5-45.5-76.4-70.1-4.1-3.7-10.3-3.6-14.2 0.3L203 278.5c-4 4-4.1 10.3-0.2 14.3l73.6 78.5-6.5 10.4c-10.3 16.6-18.9 34.3-25.5 52.6l-3.7 10.1-10.7 0.4c-29 1.2-60 2.6-92.1 4-5.5 0.3-9.8 4.8-9.8 10.3v106.4c0 5.6 4.4 10.1 10 10.3l92.7 3 2.6 12.3c4.9 23.2 12.6 45.8 23.1 67.1l4.8 9.8-7.4 8.1c-16.5 17.9-33.7 36.8-51.3 56-3.7 4.1-3.6 10.3 0.3 14.2l75.2 75.2c4 4 10.3 4.1 14.3 0.2l57.7-54.2z" p-id="2485" fill="#999999"></path><path d="M518.5 666.2c-77.3 0-140.3-63.1-140.3-140.6S441.1 385 518.5 385c77.3 0 140.3 63.1 140.3 140.6s-62.9 140.6-140.3 140.6z m0-249.2c-59.7 0-108.3 48.7-108.3 108.6 0 59.9 48.6 108.6 108.3 108.6 59.7 0 108.3-48.7 108.3-108.6 0-59.9-48.6-108.6-108.3-108.6z" p-id="2486" fill="#999999"></path></svg>
            <svg t="1637567762578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3781" width="20" height="20"><path d="M908.785955 492.415966c-11.04966 0-20.008706 8.958022-20.008706 20.008706l0 338.328565c0 38.614459-31.416524 70.030983-70.030983 70.030983L202.707748 920.78422c-38.614459 0-70.030983-31.416524-70.030983-70.030983l0-676.303067c0-38.614459 31.416524-70.030983 70.030983-70.030983l362.378308 0c11.04966 0 20.008706-8.958022 20.008706-20.008706 0-11.050684-8.959046-20.008706-20.008706-20.008706L202.707748 64.401776c-60.681034 0-110.049418 49.367361-110.049418 110.049418l0 676.303067c0 60.681034 49.367361 110.049418 110.049418 110.049418l616.038518 0c60.681034 0 110.049418-49.367361 110.049418-110.049418L928.795685 512.425695C928.795685 501.373988 919.836639 492.415966 908.785955 492.415966z" p-id="3782" fill="#999999"></path><path d="M942.576549 117.985158 907.20597 82.614579c-23.405059-23.405059-61.486376-23.400966-84.891436 0l-422.369633 422.36861c-1.295506 1.296529-2.407839 2.76395-3.304256 4.363378L269.318842 736.416166c-4.457522 7.951089-2.977821 17.909905 3.598968 24.221658 3.830235 3.675716 8.823969 5.572926 13.859659 5.572926 3.613294 0 7.247054-0.977257 10.488889-2.973728l219.285309-135.104047c1.327228-0.816598 2.552126-1.784646 3.654226-2.885723l422.369633-422.36861C965.979562 179.471534 965.979562 141.390217 942.576549 117.985158zM418.556794 552.080857l55.42124 55.279001-132.025942 81.343633L418.556794 552.080857zM914.279063 174.579107 505.926678 582.930469l-63.748906-63.586201L850.612021 110.912066c7.798617-7.800663 20.493753-7.804756 28.29544 0l35.371602 35.371602C922.081773 154.084331 922.081773 166.777421 914.279063 174.579107z" p-id="3783" fill="#999999"></path></svg>
            <svg t="1637569071531" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4686" width="20" height="20"><path d="M288 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4687" fill="#999999"></path><path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4688" fill="#999999"></path><path d="M736 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4689" fill="#999999"></path></svg>
          </template>
        </Card>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">简易卡片</div>
      <Card style="width:300px;">
        <div>这是内容</div>
        <div>这是内容</div>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading : false
    }
  },
  methods : {
    change () {
      this.loading = !this.loading;
    }
  }
}
</script>
<style lang="less" scoped>

</style>