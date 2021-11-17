<template>
  <div class="box">
    <div class="doc-title mb15">List 列表</div>
    <div class="doc-desc mb15">通用列表</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <List :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <Avatar slot="avatar" :src="item.avatar"></Avatar>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">带头部和底部，有边框</div>
      <List border footer="这是列表尾部" header="这是列表标题" :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <Avatar slot="avatar" :src="item.avatar"></Avatar>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">带头部和底部，无边框</div>
      <List footer="这是列表尾部" header="这是列表标题" :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <Avatar slot="avatar" :src="item.avatar"></Avatar>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">尺寸，可以是default，small，large</div>
      <List border header="这是一个正常尺寸的列表" :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
      <div style="height:50px"></div>
      <List border size="small" footer="这是列表尾部" header="这是一个小尺寸的列表" :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
      <div style="height:50px"></div>
      <List border size="large" footer="这是列表尾部" header="这是一个大尺寸的列表" :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">额外内容</div>
      <List footer="这是列表尾部" :data-source="list">
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <img slot="extra" class="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
          <ListItemMeta>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">加载更多</div>
      <List :data-source="list">
        <div slot="loadMore" :style="{ textAlign: 'center', height: '32px', lineHeight: '32px' , border : '1px solid #007aff' , width : '80px' , margin : '0 auto' , marginTop: '12px', cursor : 'pointer'}">
          <Loading v-if="loadingMore" />
          <span v-else>加载更多</span>
        </div>
        <ListItem slot="renderItem" slot-scope="item , index" :key="index">
          <ListItemMeta>
            <div slot="title">{{item.title}}</div>
            <div slot="description">{{item.description}}</div>
          </ListItemMeta>
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list : [
        {title : '这是一个标题1' , description : '这是一段描述内容1' , avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
        {title : '这是一个标题2' , description : '这是一段描述内容2' , avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
        {title : '这是一个标题3' , description : '这是一段描述内容3' , avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
        {title : '这是一个标题4' , description : '这是一段描述内容4' , avatar : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
      ],
      loadingMore : false
    }
  }
}
</script>
<style lang="less" scoped>
.logo {
  width: 200px;
}
</style>