<template>
  <div class="main">
    <Header />
    <div class="content">
      <Menu />
      <div class="inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@example/components/header";
import Menu from "@example/components/menu";
export default {
  name: "App",
  components: {
    Header,
    Menu,
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    height: calc(100% - 64px);
    .inner {
      flex: 1;
      overflow: auto;
      height: 100%;
    }
  }
}
</style>