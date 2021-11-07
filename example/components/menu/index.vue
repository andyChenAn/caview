<template>
  <div class="menu">
    <div v-for="(item , index) in menuConfig" :key="index">
      <div class="title">{{item.title}}</div>
      <ul>
        <li class="list" :class="{selected : routePath == menu.path}" v-for="menu in item.children" :key="menu.path">
          <router-link class="link" :to="menu.path">
            <span class="span1">{{menu.name.split(' ')[0]}}</span>
            <span class="span2">{{menu.name.split(' ')[1]}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>  
</template>
<script>
import menuConfig from '@example/menu.config';
export default {
  data () {
    return {
      menuConfig,
      routePath : this.$route.path
    }
  },
  watch : {
    $route (newVal) {
      this.routePath = newVal.path;
    }
  }
}
</script>
<style lang="less" scoped>
.menu {
  max-width: 15%;
  min-width: 250px;
  overflow: auto;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    background-color: #f0f0f0;
    height: 100%;
    width: 1px;
  }
  .title {
    padding: 8px 16px;
    color: rgba(0,0,0,0.5);
    padding-left: 40px;
    margin: 16px 0;
    &:after {
      position: relative;
      top: 12px;
      display: block;
      width: calc(100% - 20px);
      height: 1px;
      background: #f0f0f0;
      content: "";
    }
  }
  .list {
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
    margin-top: 4px;
    margin-bottom: 8px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    &.selected {
      background-color: #e6f7ff;
      .link {
        .span1 , .span2 {
          color: #007aff;
        }
        &:after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          border-right: 4px solid #007aff;
          content: '';
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    .link {
      &:hover {
        .span1 , .span2 {
          transition: all 0.3s ease;
          color: #007aff;
        }
      }
      &:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: transparent;
        content: "";
      }
      .span1 {
        color: rgba(0,0,0,.85);
      }
      .span2 {
        color: rgba(0,0,0,0.6);
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
}
</style>