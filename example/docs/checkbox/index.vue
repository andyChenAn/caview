<template>
  <div class="box">
    <div class="doc-title mb15">Checkbox 多选框</div>
    <div class="doc-desc mb15">多选</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基础使用</div>
      <Checkbox :default-checked="checked" @change="onChange1">苹果</Checkbox>
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
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">全选效果</div>
      <Checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onChangeAll">
          全选
        </Checkbox>
        <div style="margin-bottom:20px"></div>
        <CheckboxGroup @change="onChange2" :options="options1" v-model="checkedList"></CheckboxGroup>
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
      ],
      checkAll : false,
      checkedList : ['苹果'],
      indeterminate : true
    }
  },
  methods : {
    add () {
      this.value.push('柚子')
    },
    remove () {
      this.value.pop();
    },
    handleChange (values) {
      console.log(values)
    },
    onChange1 (value) {
      console.log(value)
    },
    onChange2 () {
      this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.options1.length;
      this.checkAll = this.checkedList.length === this.options1.length;
    },
    onChangeAll (checked) {
      Object.assign(this, {
        checkedList: checked ? ['苹果' , '梨子' , '香蕉'] : [],
        indeterminate: false,
        checkAll: checked,
      });
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