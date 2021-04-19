<template>
  <div class="box">
    <div class="doc-title mb15">Modal 对话框</div>
    <div class="doc-desc mb15">模态对话框，主要用于用户不想跳转页面去处理业务，而是直接通过一个弹框来进行处理。</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="modal">打开一个对话框</button>
      <Modal
        v-model="visible"
      >
        <div slot="header">
          <div>这是一个对话框的标题</div>
        </div>
        <div slot="content">
          <div>这是一个对话框的内容...</div>
          <div>这是一个对话框的内容...</div>
          <div>这是一个对话框的内容...</div>
        </div>
      </Modal>
      <textarea>
         <Modal v-model="visible">
            <div slot="header">
              <div>这是一个对话框的标题</div>
            </div>
            <div slot="content">
              <div>这是一个对话框的内容...</div>
              <div>这是一个对话框的内容...</div>
              <div>这是一个对话框的内容...</div>
            </div>
          </Modal>
      </textarea>
    </div>
    <div class="inner">
      <button @click="info">info</button>
      <button @click="success">success</button>
      <button @click="error">error</button>
      <button @click="warning">warning</button>
      <pre>
        <code>
  this.$modal.info({
    title : '这是一个标题',
    content : '这是一段内容',
    transition : 'scale',
    okText : 'ok',
    scrollable : false,
    onOk () {
      console.log('ok')
    },
    onCancel () {
      console.log('cancel');
    }
  })
        </code>
      </pre>
      <pre>
        <code>
  this.$modal.success({
    title : '这是一个成功标题'
  })
        </code>
      </pre>
      <pre>
        <code>
  this.$modal.error({
    title : '这是一个错误的标题'
  })
        </code>
      </pre>
      <pre>
        <code>
  this.$modal.warning({
    title : '这是一个警告的标题'
  })
        </code>
      </pre>
    </div>
    <br>
    <br>
    <div class="title2 mb15">API</div>
    <div class="inner">
      <div>this.$modal.success(config)</div>
      <div>this.$modal.error(config)</div>
      <div>this.$modal.info(config)</div>
      <div>this.$modal.warning(config)</div>
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
            <td>title</td>
            <td>标题</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>content</td>
            <td>内容</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>transition</td>
            <td>对话框过渡动画</td>
            <td>string</td>
            <td>默认为zoom，可以是scale,zoom,slide,fade</td>
          </tr>
          <tr>
            <td>okText</td>
            <td>确认按钮文本</td>
            <td>string</td>
            <td>确定</td>
          </tr>
          <tr>
            <td>cancelText</td>
            <td>取消按钮文本</td>
            <td>string</td>
            <td>取消</td>
          </tr>
          <tr>
            <td>scrollable</td>
            <td>是否允许body滚动</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>mask</td>
            <td>是否显示遮罩层</td>
            <td>boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>zIndex</td>
            <td>对话框层级</td>
            <td>number</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>fullscreen</td>
            <td>是否全屏</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>closable</td>
            <td>是否显示关闭按钮</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>loading</td>
            <td>点击确定按钮时，显示loading效果，只能手动关闭对话框，只支持用于组件，不支持用于api方法调用</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>onOk</td>
            <td>点击确定按钮回调</td>
            <td>function</td>
            <td>-</td>
          </tr>
          <tr>
            <td>onCancel</td>
            <td>点击取消按钮回调</td>
            <td>function</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="title2 mb15">Slot</div>
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
            <td>header</td>
            <td>对话框头部</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>content</td>
            <td>对话框内容</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>footer</td>
            <td>对话框尾部</td>
            <td>string</td>
            <td>-</td>
          </tr>   
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible : false,
      show : false
    }
  },
  methods : {
    handleOk () {
      console.log('ok');
      setTimeout(() => {
        this.visible = false;
      } , 2000)
    },
    info () {
      this.$modal.info({
        title : '这是一个标题',
        content : '这是一段内容',
        transition : 'scale',
        okText : 'ok',
        scrollable : false,
        onOk () {
          console.log('ok')
        },
        onCancel () {
          console.log('cancel');
        }
      })
    },
    success () {
      this.$modal.success({
        title : '这是一个成功标题',
        zIndex : 3000
      })
    },
    error () {
      this.$modal.error({
        title : '这是一个错误的标题'
      })
    },
    warning () {
      this.$modal.warning({
        title : '这是一个警告的标题'
      })
    },
    modal () {
      this.visible = !this.visible;
    }
  }
}
</script>
<style lang="less" scoped>
textarea {
  border: none;
  width: 100%;
  height: 180px;
  margin-top: 20px;
  margin-left: -55px;
  overflow: hidden;
}
</style>