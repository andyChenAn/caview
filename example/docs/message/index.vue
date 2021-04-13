<template>
  <div class="box">
    <div class="doc-title mb15">Message 全局消息提示</div>
    <div class="doc-desc mb15">全局消息提示主要用于用户操作后的反馈提示。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="info">普通提示</button>
      <pre>
        <code>
  this.$message.info('这是一条普通的提示');
        </code>
      </pre>
      <pre>
        <code>
  this.$message.info({
    content : '这是一条普通的提示'
  });
        </code>
      </pre>
    </div>
    <div class="inner">
      <button @click="success">成功提示</button>
      <button @click="error">失败提示</button>
      <button @click="warning">警告提示</button>
      <pre>
        <code>
  this.$message.success({
    content : '这是一条成功的提示'
  })
        </code>
        <code>
  this.$message.error({
    content : '这是一条失败的提示'
  })
        </code>
        <code>
  this.$message.warning({
    content : '这是一条警告的提示'
  })
        </code>
      </pre>
    </div>
    <div class="inner">
      <button @click="vnode">render渲染内容</button>
      <pre>
        <code>
  this.$message.info({
    render (h) {
      return h('span' , {
        style : {
          color : '#007aff'
        }
      } , 'hello andy')
    }
  })
        </code>
      </pre>
    </div>
    <br>
    <br>
    <div class="title2 mb15">options参数</div>
    <div class="inner">
      <table>
        <th>
          <td>属性</td>
          <td>说明</td>
          <td>类型</td>
          <td>默认值</td>
        </th>
        <tbody>
          <tr>
            <td>content</td>
            <td>提示内容</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>duration</td>
            <td>提示关闭时延</td>
            <td>number</td>
            <td>1500</td>
          </tr>
          <tr>
            <td>customClass</td>
            <td>自定义样式类</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>style</td>
            <td>style内联样式</td>
            <td>object</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>offset</td>
            <td>消息提示距离顶部的偏移量</td>
            <td>number</td>
            <td>20</td>
          </tr>
          <tr>
            <td>onClose</td>
            <td>关闭时的回调</td>
            <td>function</td>
            <td>-</td>
          </tr>
          <tr>
            <td>render</td>
            <td>自定义提示内容，使用Vue的render函数</td>
            <td>function</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  methods : {
    info () {
      this.$message.info({
        content : '这是一条普通的提示',
      });
    },
    success () {
      this.$message.success({
        content : '这是一条成功的提示'
      })
    },
    error () {
      this.$message.error({
        content : '这是一条失败的提示'
      })
    },
    warning () {
      this.$message.warning({
        content : '这是一条警告的提示'
      })
    },
    vnode () {
      this.$message.info({
        render (h) {
          return h('span' , {
            style : {
              color : '#007aff'
            }
          } , 'hello andy')
        }
      })
    }
  }
}
</script>
<style lang="less">

</style>