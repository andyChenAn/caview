<template>
  <div class="box">
    <div class="doc-title mb15">Checkbox 多选框</div>
    <div class="doc-desc mb15">多选</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <!-- <div class="inner">
      <div style="margin-bottom:20px">基础使用</div>
      <Checkbox :default-checked="checked">苹果</Checkbox>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">禁用</div>
      <Checkbox disabled>禁用</Checkbox>
      <Checkbox disabled :default-checked="checked">选中禁用</Checkbox>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">多选框组</div> 
      <div style="margin-bottom:20px;">
        <CheckboxGroup :options="options" v-model="value"></CheckboxGroup>
      </div>
      <div style="margin-bottom:20px;">
        <CheckboxGroup :options="options" :default-value="['苹果']"></CheckboxGroup>
      </div>
      <div style="margin-bottom:20px;">
        <CheckboxGroup :options="options" :value="['柚子']"></CheckboxGroup>
      </div>
      <div style="margin-bottom:20px">
        <CheckboxGroup :options="options" disabled :value="['葡萄' , '苹果']"></CheckboxGroup>
      </div>
    </div> -->
    <div class="inner">
      <div style="margin-bottom:20px">
        <CheckboxGroup :options="options1" :value="['香蕉']"></CheckboxGroup>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  data () {
    return {
      disabled : false,
      checked : true,
      options : ['苹果' , '葡萄' , '柚子'],
      value : [],
      options1 : [
        {label : '苹果' , value : '苹果'},
        {label : '梨子' , value : '梨子'},
        {label : '香蕉' , value : '香蕉'}
      ]
    }
  },
  methods : {
    add () {
      this.value.push('柚子')
    },
    remove () {
      this.value.pop();
    }
  },
  mounted () {
    setTimeout(() => {
      this.disabled = true;
    } , 2000)
  }
}
</script>
<style lang="less" scoped>

</style>