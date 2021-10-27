<template>
  <div class="box">
    <div class="doc-title mb15">Progress 进度条</div>
    <div class="doc-desc mb15">展示当前操作的进度</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <div style="width:400px">
        <Progress :percent="40" />
        <Progress :percent="60" />
        <Progress :percent="50" status="fail" />
        <Progress :percent="100" status="success" />
        <Progress :percent="50" :show-info="false" />
        <Progress :percent="60" status="active" />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">环形进度条</div>
      <div style="width: 600px">
        <Progress :percent="20" type="circle" :stroke-width="4" :width="120" />
        <Progress :percent="100" type="circle" :stroke-width="4" :width="120" status="success" />
        <Progress :percent="50" type="circle" :stroke-width="4" :width="120" status="fail" />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">带动画的进度条</div>
      <div style="width:600px">
        <Progress :percent="percent" :stroke-width="4" type="circle" :status="percent == 100 ? 'success' : 'normal'" />
        <button @click="remove">-</button>
        <button @click="add">+</button>
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义进度条颜色</div>
      <div style="width:400px">
        <Progress :percent="50" stroke-color="yellow" />
        <Progress :percent="60" stroke-color="red" type="circle" />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">渐变色的进度条</div>
      <div style="width: 400px">
        <Progress :percent="60" :stroke-color="{'0%' : '#108ee9' , '100%' : '#87d068'}" />
        <Progress :percent="60" type="circle" :stroke-color="{'0%' : '#108ee9' , '100%' : '#87d068'}" />
        <Progress :percent="80" type="circle" :stroke-color="{'0%' : 'red' , '100%' : 'yellow'}" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      percent : 0
    }
  },
  methods : {
    add () {
      this.percent += 10;
      this.percent = this.percent >= 100 ? 100 : this.percent;
    },
    remove () {
      this.percent -= 10;
      this.percent = this.percent <= 0 ? 0 : this.percent;
    }
  }
}
</script>
<style scoped>

</style>