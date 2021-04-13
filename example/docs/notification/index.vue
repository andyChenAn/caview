<template>
  <div class="box">
    <div class="doc-title mb15">Notification 通知提醒</div>
    <div class="doc-desc mb15">主要用于全局展示通知提醒</div>
    <br>
    <br>
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <button @click="notice">打开一个通知消息</button>
      <pre>
        <code>
  this.$notification.open({
    title : '这是一个普通的通知提示'，
    content : '这是一个普通的通知提示的描述内容'
  })
        </code>
      </pre>
    </div>
    <div class="inner">
      <button @click="success">success</button>
      <button @click="error">error</button>
      <button @click="info">info</button>
      <button @click="warning">warning</button>
      <pre>
        <code>
  this.$notification.success({
    title : '这是一个成功的通知提示',
    content : '这是一个成功的通知提示的描述内容'
  })

  this.$notification.error({
    title : '这是一个失败的通知提示',
    content : '这是一个失败的通知提示的描述内容'
  })

  this.$notification.info({
    title : '这是一个普通的通知提示',
    content : '这是一个普通的通知提示的描述内容'
  })

  this.$notification.warning({
    title : '这是一个警告的通知提示',
    content : '这是一个警告的通知提示的描述内容'
  })
        </code>
      </pre>
    </div>
    <div class="inner">
      <button @click="btn">增加按钮</button>
      <pre>
        <code>
  const notification = this.$notification.open({
    title : '这是一个标题',
    content : '这是一个描述内容',
    duration : 0,
    renderBtn (h) {
      return h('button' , {
        on : {
          click () {
            notification.close();
          }
        }
      } , '确认')
    }
  })
        </code>
      </pre>
    </div>
    <div class="inner">
      <button @click="topLeft">左上角</button>
      <button @click="topRight">右上角</button>
      <button @click="bottomLeft">左下角</button>
      <button @click="bottomRight">右下角</button>
      <pre>
        <code>
  this.$notification.open({
    title : '左上角',
    content : '这是一个左上角的描述内容',
    placement : 'topLeft',
  })

  this.$notification.open({
    title : '右上角',
    content : '这是一个右上角的描述内容',
    placement : 'topRight'
  })

  this.$notification.open({
    title : '左下角' + (i++),
    content : '这是一个左下角的描述内容',
    placement : 'bottomLeft',
  })

  this.$notification.open({
    title : '右下角',
    content : '这是一个右下角的描述内容',
    placement : 'bottomRight'
  })
        </code>
      </pre>
    </div>
    <div class="inner">
      <div>我们还可以调用`this.$notification.config`方法来进行全局配置</div>
      <br>
      <button @click="config">config全局配置</button>
      <pre>
        <code>
  this.$notification.config({
    y : 100,
    x : 100,
    placement : 'topLeft'
  });
        </code>
      </pre>
    </div>
    <br>
    <br>
    <div class="title2 mb15">API</div>
    <div class="inner">
      <div>this.$notification.open(config)</div>
      <div>this.$notification.success(config)</div>
      <div>this.$notification.error(config)</div>
      <div>this.$notification.info(config)</div>
      <div>this.$notification.warning(config)</div>
      <div>this.$notification.config(config)</div>
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
            <td>内容</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>title</td>
            <td>标题</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>x</td>
            <td>水平方向的偏移量</td>
            <td>number</td>
            <td>24</td>
          </tr>
          <tr>
            <td>y</td>
            <td>垂直方向的偏移量</td>
            <td>number</td>
            <td>24</td>
          </tr>
          <tr>
            <td>duration</td>
            <td>关闭时延，单位毫秒</td>
            <td>number</td>
            <td>3000</td>
          </tr>
          <tr>
            <td>placement</td>
            <td>位置，可以是topLeft(左上角) , topRight(右上角) , bottomLeft(左下角) , bottomRight(右下角)</td>
            <td>string</td>
            <td>topRight</td>
          </tr>
          <tr>
            <td>style</td>
            <td>内联样式</td>
            <td>object</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>customClass</td>
            <td>自定义类名</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td>onClick</td>
            <td>点击通知栏触发</td>
            <td>function</td>
            <td>-</td>
          </tr>
          <tr>
            <td>onClose</td>
            <td>通知关闭时触发</td>
            <td>function</td>
            <td>-</td>
          </tr>
          <tr>
            <td>getContainer</td>
            <td>挂载点</td>
            <td>function</td>
            <td>() => document.body</td>
          </tr>
          <tr>
            <td>renderBtn</td>
            <td>自定义按钮的渲染函数，vue的render函数写法</td>
            <td>function</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
let i = 1;
export default {
  methods : {
    notice () {
      this.$notification.open({
        title : '这是一个普通的通知提示',
        content : '这是一个普通的通知提示的描述内容，阿萨德了房间爱上快递费阿斯顿发生',
        onClick () {
          console.log('click')
        }
      });
    },
    success () {
      this.$notification.success({
        title : '这是一个普通的通知提示',
        content : '这是一个普通的通知提示的描述内容，阿萨德了房间爱上快递费阿斯顿发生'
      })
    },
    error () {
      this.$notification.error({
        title : '这是一个失败的通知提示',
        content : '这是一个失败的通知提示的描述内容'
      })
    },
    info () {
      this.$notification.info({
        title : '这是一个普通的通知提示',
        content : '这是一个普通的通知提示的描述内容'
      })
    },
    warning () {
      this.$notification.warning({
        title : '这是一个警告的通知提示',
        content : '这是一个警告的通知提示的描述内容'
      })
    },
    btn () {
      const notification = this.$notification.open({
        title : '这是一个标题',
        content : '这是一个描述内容',
        duration : 0,
        renderBtn (h) {
          return h('button' , {
            on : {
              click () {
                notification.close();
              }
            }
          } , '确认')
        }
      })
    },
    topLeft () {
      this.$notification.open({
        title : '左上角',
        content : '这是一个左上角的描述内容',
        placement : 'topLeft',
      })
    },
    topRight () {
      this.$notification.open({
        title : '右上角',
        content : '这是一个右上角的描述内容',
        placement : 'topRight'
      })
    },
    bottomLeft () {
      this.$notification.open({
        title : '左下角' + (i++),
        content : '这是一个左下角的描述内容',
        placement : 'bottomLeft',
      })
    },
    bottomRight () {
      this.$notification.open({
        title : '右下角',
        content : '这是一个右下角的描述内容',
        placement : 'bottomRight'
      })
    },
    config () {
      this.$notification.config({
        y : 100,
        x : 100,
        placement : 'topLeft'
      });
    }
  }
}
</script>
<style lang="less" scoped>

</style>