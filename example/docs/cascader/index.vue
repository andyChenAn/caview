<template>
  <div class="box">
    <div class="doc-title mb15">Cascader 级联选择</div>
    <div class="doc-desc mb15">级联选择器</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基础使用</div>
      <Cascader :dataSource="dataSource" />
    </div>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      dataSource: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    }
  }
}
</script>
<style lang="less" scoped>

</style>