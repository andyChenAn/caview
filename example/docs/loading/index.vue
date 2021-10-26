<template>
  <div class="box">
    <div class="doc-title mb15">Loading 加载中</div>
    <div class="doc-desc mb15">用于页面或组件内容加载中效果。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本用法</div>
      <Loading tip="加载中" />
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">各种size尺寸大小</div>
      <Loading size="small" />
      <Loading />
      <Loading size="large" />
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">放入一个容器中</div>
      <div class="content">
        <Loading />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义加载提示</div>
      <div style="width:500px;">
        <Loading tip="正在加载中...">
          <div class="content">这里是展示的内容</div>
        </Loading>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">通过loading字段控制加载效果</div>
      <div style="width:500px">
        <Loading tip="正在加载中..." :loading="loading">
          <div class="content">这里是展示的内容</div>
        </Loading>
      </div>
      <div style="margin-top:20px;">
        <button @click="loading = !loading">切换loading效果</button>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">使用“slot插槽”自定义loading指示符</div>
      <div style="width:500px">
        <Loading tip="加载中">
          <div slot="indicator" class="icon-loadings"></div>
        </Loading>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">使用“render函数”自定义loading指示符，需要注意的是，如果使用render函数来自定义loading指示符，那么class样式类是需要加/deep/的，不然样式会不生效，你也可以使用style来添加样式</div>
      <div style="width:500px">
        <Loading tip="加载中" :indicator="renderIndicator">
          
        </Loading>
      </div>
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
    renderIndicator (h) {
      return h(
        'div',
        {
          class : 'icon-loadings'
        }
      )
    }
  }
}
</script>
<style scoped>
.content {
  padding: 30px;
  height: 100px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/.icon-loadings {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(150, 150, 150, 0);
  border-radius: 50%;
  border-top-color: #0057e7;
  border-left-color: #0057e7;
  border-bottom-color: #0057e7;
  animation: rotate 1s infinite linear normal;
}
@keyframes rotate {
  0%   { transform: rotate(0);      }
  100% { transform: rotate(360deg); }
}
</style>