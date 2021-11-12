<template>
  <div class="box">
    <div class="doc-title mb15">List 列表</div>
    <div class="doc-desc mb15">通用列表</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <List>
        <ListItem>
          <ListItemMeta>
            <div slot="title">这是一个标题1</div>
            <Avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div slot="description">这是一段描述内容1</div>
          </ListItemMeta>
        </ListItem>
        <ListItem>
          <ListItemMeta>
            <div slot="title">这是一个标题2</div>
            <Avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div slot="description">这是一段描述内容2</div>
          </ListItemMeta>
        </ListItem>
        <ListItem>
          <ListItemMeta>
            <div slot="title">这是一个标题3</div>
            <Avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div slot="description">这是一段描述内容3</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>

</style>