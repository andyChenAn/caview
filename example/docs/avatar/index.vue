<template>
  <div class="box">
    <div class="doc-title mb15">Avatar 头像</div>
    <div class="doc-desc mb15">用来代表用户或事物，支持图片、图标或字符展示</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本用法</div>
      <Avatar size="large">andy</Avatar>
      <Avatar>andy</Avatar>
      <Avatar size="small">andy</Avatar>
      <Avatar shape="square" size="large">andy</Avatar>
      <Avatar shape="square">andy</Avatar>
      <Avatar shape="square" size="small">andy</Avatar>
      <Avatar size="large" alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria1.jpg" />
      <Avatar alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" />
      <Avatar size="small" alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" />
      <Avatar shape="square" size="large" alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" />
      <Avatar shape="square" alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" />
      <Avatar shape="square" size="small" alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" />
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自动调整字体大小</div>
      <Avatar :style="{backgroundColor : color}">{{avatarValue}}</Avatar>
      <button @click="handleChange">change</button>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">支持图片和文本两种类型</div>
      <Avatar :size="30">an</Avatar>
      <Avatar :size="30" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar style="background-color: #87d068;" :size="30">andy</Avatar>
      <Avatar :size="30" alt="无" src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg" />
      <Avatar :size="30" shape="square">
        <span>andy</span>
      </Avatar>
    </div>
  </div>
</template>
<script>
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
export default {
  data () {
    return {
      avatarValue: UserList[0],
      color: colorList[0],
    }
  },
  methods : {
    handleChange () {
      const index = UserList.indexOf(this.avatarValue);
      this.avatarValue = index < UserList.length - 1 ? UserList[index + 1] : UserList[0];
      this.color = index < colorList.length - 1 ? colorList[index + 1] : colorList[0];
    },
    onError () {
      alert(2342)
    }
  }
}
</script>
<style scoped>

</style>