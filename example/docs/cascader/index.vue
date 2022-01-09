<template>
  <div class="box">
    <div class="doc-title mb15">Cascader 级联选择</div>
    <div class="doc-desc mb15">级联选择器</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基础使用</div>
      <div class="cascader-wrap">
        <Cascader 
          placeholder="请输入"
          :dataSource="JSON.parse(JSON.stringify(dataSource))" 
        />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">选择即改变</div>
      <div class="cascader-wrap">
        <Cascader 
          placeholder="请输入"
          :change-on-select="true"
          :dataSource="JSON.parse(JSON.stringify(dataSource))" 
        />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">默认值</div>
      <div class="cascader-wrap">
        <Cascader 
          placeholder="请输入"
          :default-value="['hunan' , 'changsha']"
          :dataSource="JSON.parse(JSON.stringify(dataSource))" 
        />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义显示方式</div>
      <span>{{text}}</span>
      <Cascader
        placeholder="请输入"
        :change-on-select="true"
        :dataSource="JSON.parse(JSON.stringify(dataSource))" 
        @change="handleChange"
      >
        <span class="btn">选择城市</span>
      </Cascader>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">禁用选项</div>
      <div class="cascader-wrap">
        <Cascader 
          placeholder="请输入"
          :dataSource="dataSource1" 
        />
      </div>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">搜索(暂时还没有实现该功能)</div>
      <div class="cascader-wrap">
        <Cascader 
          placeholder="请输入"
          :showSearch="true"
          :dataSource="JSON.parse(JSON.stringify(dataSource))"
        />
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      dataSource: [
        {
          value: 'hunan',
          label: '湖南',
          children: [
            {
              value: 'changsha',
              label: '长沙',
              children: [
                {
                  value: 'wuyi square',
                  label: '五一广场',
                },
                {
                  value : 'hunan daxue',
                  label : '湖南大学'
                },
                {
                  value : 'zhongnan daxue',
                  label : '中南大学'
                },
                {
                  value : 'bb',
                  label : '橘子洲头'
                }
              ],
            },
            {
              value : 'huaihua',
              label : '怀化',
              children : [
                {
                  value : 'mayang',
                  label : '麻阳'
                },
                {
                  value : 'hecheng',
                  label : '鹤城区'
                },
                {
                  value : 'yuanling',
                  label : '沅陵'
                }
              ]
            }
          ],
        },
        {
          value: 'guangdong',
          label: '广东',
          children: [
            {
              value: 'guangzhou',
              label: '广州',
              children: [
                {
                  value: 'daxuecheng',
                  label: '大学城',
                },
                {
                  value : 'zhengjia',
                  label : '正佳广场'
                },
                {
                  value : 'tianhuan',
                  label : '天环广场'
                }
              ],
            },
          ],
        },
      ],
      dataSource1: [
        {
          value: 'hunan',
          label: '湖南',
          children: [
            {
              value: 'changsha',
              label: '长沙',
              disabled : true,
              children: [
                {
                  value: 'wuyi square',
                  label: '五一广场',
                },
                {
                  value : 'hunan daxue',
                  label : '湖南大学'
                },
                {
                  value : 'zhongnan daxue',
                  label : '中南大学'
                },
                {
                  value : 'bb',
                  label : '橘子洲头'
                }
              ],
            },
            {
              value : 'huaihua',
              label : '怀化',
              children : [
                {
                  value : 'mayang',
                  label : '麻阳',
                  disabled : true,
                },
                {
                  value : 'hecheng',
                  label : '鹤城区'
                },
                {
                  value : 'yuanling',
                  label : '沅陵'
                }
              ]
            }
          ],
        },
        {
          value: 'guangdong',
          label: '广东',
          disabled : true,
          children: [
            {
              value: 'guangzhou',
              label: '广州',
              children: [
                {
                  value: 'daxuecheng',
                  label: '大学城',
                },
                {
                  value : 'zhengjia',
                  label : '正佳广场'
                },
                {
                  value : 'tianhuan',
                  label : '天环广场'
                }
              ],
            },
          ],
        },
      ],
      text : ''
    }
  },
  methods : {
    handleChange (value , selectedData) {
      this.text = selectedData.map(o => o.label).join(', ');
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  color: #007aff;
  cursor: pointer;
}
.cascader-wrap {
  width: 300px;
}
</style>