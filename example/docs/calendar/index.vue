<template>
  <div class="box">
    <div class="doc-title mb15">Calendar 日历</div>
    <div class="doc-desc mb15">展示日历</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px;">基本使用</div>
      <Calendar />
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">卡片模式，套在一个容器里使用</div>
      <div style="width:500px;border:1px solid #ccc">
        <Calendar :fullscreen="false" />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">使用dateCellRender和monthCellRender来自定义渲染数据</div>
      <Calendar>
        <template slot="dateCellRender" slot-scope="value">
          <div>
            <div v-for="(item , index) in getListData(value)" :key="index">
              {{item.content}}
            </div>
          </div>
        </template>
        <template slot="monthCellRender" slot-scope="value">
          <div>
            <div>{{getMonthData(value)}}</div>
          </div>
        </template>
      </Calendar>
    </div>
  </div>
</template>
<script>
export default {
  methods : {
    getListData(value) {
      let listData;
      switch (value.getDate()) {
        case 8:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event。。....' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }
      return listData || [];
    },
    getMonthData (value) {
      if (value.getMonth() === 8) {
        return 'hello andy';
      }
    }
  },
  data () {
    return {
      now : new Date(2000 , 1,1)
    }
  }
}
</script>
<style scoped>

</style>