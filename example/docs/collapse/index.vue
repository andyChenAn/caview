<template>
  <div class="box">
    <div class="doc-title mb15">Collapse 折叠面板</div>
    <div class="doc-desc mb15">可以折叠/展开的内容区域</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基本使用</div>
      <Collapse v-model="collapse1">
        <CollapsePanel key="a" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="b" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="c" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">手风琴效果</div>
      <Collapse accordion v-model="collapse2">
        <CollapsePanel key="1" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="2" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="3" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">禁用某个面板</div>
      <Collapse accordion v-model="collapse3">
        <CollapsePanel key="4" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="5" header="这是一个标题2" disabled>
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="6" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">嵌套面板</div>
      <Collapse accordion v-model="collapse4">
        <CollapsePanel key="7" header="这是一个标题1">
          <Collapse v-model="collapse5">
            <CollapsePanel key="10" header="这是嵌套面板标题1">
              <div>这是嵌套面板内容</div>
            </CollapsePanel>
          </Collapse>
        </CollapsePanel>
        <CollapsePanel key="8" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="9" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">不带边框的折叠面板</div>
      <Collapse accordion v-model="collapse6" :border="false">
        <CollapsePanel key="11" header="这是一个标题1">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="12" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="13" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">自定义面板样式</div>
      <Collapse accordion v-model="collapse7" :border="false">
        <template v-slot:expandIcon="props">
          <svg t="1636599174426" :style="{transform : `rotate(${props.isActive ? 90 : 0}deg)`}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1896" width="18" height="18"><path d="M384 704V320l256 192z" p-id="1897" fill="#333333"></path></svg>
        </template>
        <CollapsePanel key="14" header="这是一个标题1" :style="customStyle">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="15" header="这是一个标题2" :style="customStyle">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="16" header="这是一个标题3" :style="customStyle">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">取消箭头</div>
      <Collapse accordion v-model="collapse8">
        <CollapsePanel key="17" header="这是一个标题1" :showArrow="false">
          <div>这是内容区域1</div>
        </CollapsePanel>
        <CollapsePanel key="18" header="这是一个标题2">
          <div>这是内容区域2</div>
        </CollapsePanel>
        <CollapsePanel key="19" header="这是一个标题3">
          <div>这是内容区域3</div>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">添加额外的节点</div>
      <Collapse accordion v-model="collapse9">
        <CollapsePanel key="20" header="这是一个标题1">
          <div>这是内容区域1</div>
          <svg slot="extra" t="1636601301833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2438" width="18" height="18"><path d="M880.48 451.488l-14.72-64 54.96-94.976-117.6-146.464-105.28 32L637.92 149.6 597.472 48H409.248l-40.464 101.6-59.904 28.544-105.28-32.064-117.616 146.448 54.96 94.976-14.72 64-90.976 61.872 42.016 182.864 108.944 16.512 41.312 51.456-8.016 109.216 169.696 80.976L470.064 880h66.592l80.864 74.4L787.2 873.328l-8-109.168 41.296-51.424 108.96-16.496 42-182.864-90.992-61.888z m-16.816 173.808l-86 13.056-80.576 100.32 6.336 86.16-71.664 34.08L567.808 800h-128.896l-63.968 58.912-71.664-34.176 6.336-86.112-80.576-100.304-86-13.04-17.568-76.528 71.696-48.768 28.8-125.28-43.296-74.832 49.424-61.552 83.248 25.328 116.224-55.408L463.52 128h79.664l31.952 80.24 116.224 55.488 83.248-25.36 49.424 61.536-43.296 74.816 28.8 125.28 71.712 48.752-17.6 76.544zM504.88 336c-92.64 0-167.968 75.36-167.968 168s75.36 168 168 168 168-75.36 168-168S597.536 336 504.88 336z m0.032 256a88.112 88.112 0 0 1-88-88c0-23.504 9.152-45.6 25.76-62.224A87.392 87.392 0 0 1 504.928 416c48.512 0 88 39.488 88 88s-39.488 88-88 88z" fill="#333333" p-id="2439"></path></svg>
        </CollapsePanel>
        <CollapsePanel key="21" header="这是一个标题2">
          <div>这是内容区域2</div>
          <svg slot="extra" t="1636601301833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2438" width="18" height="18"><path d="M880.48 451.488l-14.72-64 54.96-94.976-117.6-146.464-105.28 32L637.92 149.6 597.472 48H409.248l-40.464 101.6-59.904 28.544-105.28-32.064-117.616 146.448 54.96 94.976-14.72 64-90.976 61.872 42.016 182.864 108.944 16.512 41.312 51.456-8.016 109.216 169.696 80.976L470.064 880h66.592l80.864 74.4L787.2 873.328l-8-109.168 41.296-51.424 108.96-16.496 42-182.864-90.992-61.888z m-16.816 173.808l-86 13.056-80.576 100.32 6.336 86.16-71.664 34.08L567.808 800h-128.896l-63.968 58.912-71.664-34.176 6.336-86.112-80.576-100.304-86-13.04-17.568-76.528 71.696-48.768 28.8-125.28-43.296-74.832 49.424-61.552 83.248 25.328 116.224-55.408L463.52 128h79.664l31.952 80.24 116.224 55.488 83.248-25.36 49.424 61.536-43.296 74.816 28.8 125.28 71.712 48.752-17.6 76.544zM504.88 336c-92.64 0-167.968 75.36-167.968 168s75.36 168 168 168 168-75.36 168-168S597.536 336 504.88 336z m0.032 256a88.112 88.112 0 0 1-88-88c0-23.504 9.152-45.6 25.76-62.224A87.392 87.392 0 0 1 504.928 416c48.512 0 88 39.488 88 88s-39.488 88-88 88z" fill="#333333" p-id="2439"></path></svg>
        </CollapsePanel>
        <CollapsePanel key="22" header="这是一个标题3">
          <div>这是内容区域3</div>
          <svg slot="extra" t="1636601301833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2438" width="18" height="18"><path d="M880.48 451.488l-14.72-64 54.96-94.976-117.6-146.464-105.28 32L637.92 149.6 597.472 48H409.248l-40.464 101.6-59.904 28.544-105.28-32.064-117.616 146.448 54.96 94.976-14.72 64-90.976 61.872 42.016 182.864 108.944 16.512 41.312 51.456-8.016 109.216 169.696 80.976L470.064 880h66.592l80.864 74.4L787.2 873.328l-8-109.168 41.296-51.424 108.96-16.496 42-182.864-90.992-61.888z m-16.816 173.808l-86 13.056-80.576 100.32 6.336 86.16-71.664 34.08L567.808 800h-128.896l-63.968 58.912-71.664-34.176 6.336-86.112-80.576-100.304-86-13.04-17.568-76.528 71.696-48.768 28.8-125.28-43.296-74.832 49.424-61.552 83.248 25.328 116.224-55.408L463.52 128h79.664l31.952 80.24 116.224 55.488 83.248-25.36 49.424 61.536-43.296 74.816 28.8 125.28 71.712 48.752-17.6 76.544zM504.88 336c-92.64 0-167.968 75.36-167.968 168s75.36 168 168 168 168-75.36 168-168S597.536 336 504.88 336z m0.032 256a88.112 88.112 0 0 1-88-88c0-23.504 9.152-45.6 25.76-62.224A87.392 87.392 0 0 1 504.928 416c48.512 0 88 39.488 88 88s-39.488 88-88 88z" fill="#333333" p-id="2439"></path></svg>
        </CollapsePanel>
      </Collapse>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">修改箭头的位置，可以是left，right</div>
      <div style="margin-bottom:20px;">
        <button @click="clickLeft">left</button>
        <button @click="clickRight">right</button>
      </div>
      <Collapse accordion v-model="collapse10" :expandIconPosition="expandIconPosition">
        <CollapsePanel key="20" header="这是一个标题1">
          <div>这是内容区域1</div>
          <svg slot="extra" t="1636601301833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2438" width="18" height="18"><path d="M880.48 451.488l-14.72-64 54.96-94.976-117.6-146.464-105.28 32L637.92 149.6 597.472 48H409.248l-40.464 101.6-59.904 28.544-105.28-32.064-117.616 146.448 54.96 94.976-14.72 64-90.976 61.872 42.016 182.864 108.944 16.512 41.312 51.456-8.016 109.216 169.696 80.976L470.064 880h66.592l80.864 74.4L787.2 873.328l-8-109.168 41.296-51.424 108.96-16.496 42-182.864-90.992-61.888z m-16.816 173.808l-86 13.056-80.576 100.32 6.336 86.16-71.664 34.08L567.808 800h-128.896l-63.968 58.912-71.664-34.176 6.336-86.112-80.576-100.304-86-13.04-17.568-76.528 71.696-48.768 28.8-125.28-43.296-74.832 49.424-61.552 83.248 25.328 116.224-55.408L463.52 128h79.664l31.952 80.24 116.224 55.488 83.248-25.36 49.424 61.536-43.296 74.816 28.8 125.28 71.712 48.752-17.6 76.544zM504.88 336c-92.64 0-167.968 75.36-167.968 168s75.36 168 168 168 168-75.36 168-168S597.536 336 504.88 336z m0.032 256a88.112 88.112 0 0 1-88-88c0-23.504 9.152-45.6 25.76-62.224A87.392 87.392 0 0 1 504.928 416c48.512 0 88 39.488 88 88s-39.488 88-88 88z" fill="#333333" p-id="2439"></path></svg>
        </CollapsePanel>
        <CollapsePanel key="21" header="这是一个标题2">
          <div>这是内容区域2</div>
          <svg slot="extra" t="1636601301833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2438" width="18" height="18"><path d="M880.48 451.488l-14.72-64 54.96-94.976-117.6-146.464-105.28 32L637.92 149.6 597.472 48H409.248l-40.464 101.6-59.904 28.544-105.28-32.064-117.616 146.448 54.96 94.976-14.72 64-90.976 61.872 42.016 182.864 108.944 16.512 41.312 51.456-8.016 109.216 169.696 80.976L470.064 880h66.592l80.864 74.4L787.2 873.328l-8-109.168 41.296-51.424 108.96-16.496 42-182.864-90.992-61.888z m-16.816 173.808l-86 13.056-80.576 100.32 6.336 86.16-71.664 34.08L567.808 800h-128.896l-63.968 58.912-71.664-34.176 6.336-86.112-80.576-100.304-86-13.04-17.568-76.528 71.696-48.768 28.8-125.28-43.296-74.832 49.424-61.552 83.248 25.328 116.224-55.408L463.52 128h79.664l31.952 80.24 116.224 55.488 83.248-25.36 49.424 61.536-43.296 74.816 28.8 125.28 71.712 48.752-17.6 76.544zM504.88 336c-92.64 0-167.968 75.36-167.968 168s75.36 168 168 168 168-75.36 168-168S597.536 336 504.88 336z m0.032 256a88.112 88.112 0 0 1-88-88c0-23.504 9.152-45.6 25.76-62.224A87.392 87.392 0 0 1 504.928 416c48.512 0 88 39.488 88 88s-39.488 88-88 88z" fill="#333333" p-id="2439"></path></svg>
        </CollapsePanel>
        <CollapsePanel key="22" header="这是一个标题3">
          <div>这是内容区域3</div>
          <svg slot="extra" t="1636601301833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2438" width="18" height="18"><path d="M880.48 451.488l-14.72-64 54.96-94.976-117.6-146.464-105.28 32L637.92 149.6 597.472 48H409.248l-40.464 101.6-59.904 28.544-105.28-32.064-117.616 146.448 54.96 94.976-14.72 64-90.976 61.872 42.016 182.864 108.944 16.512 41.312 51.456-8.016 109.216 169.696 80.976L470.064 880h66.592l80.864 74.4L787.2 873.328l-8-109.168 41.296-51.424 108.96-16.496 42-182.864-90.992-61.888z m-16.816 173.808l-86 13.056-80.576 100.32 6.336 86.16-71.664 34.08L567.808 800h-128.896l-63.968 58.912-71.664-34.176 6.336-86.112-80.576-100.304-86-13.04-17.568-76.528 71.696-48.768 28.8-125.28-43.296-74.832 49.424-61.552 83.248 25.328 116.224-55.408L463.52 128h79.664l31.952 80.24 116.224 55.488 83.248-25.36 49.424 61.536-43.296 74.816 28.8 125.28 71.712 48.752-17.6 76.544zM504.88 336c-92.64 0-167.968 75.36-167.968 168s75.36 168 168 168 168-75.36 168-168S597.536 336 504.88 336z m0.032 256a88.112 88.112 0 0 1-88-88c0-23.504 9.152-45.6 25.76-62.224A87.392 87.392 0 0 1 504.928 416c48.512 0 88 39.488 88 88s-39.488 88-88 88z" fill="#333333" p-id="2439"></path></svg>
        </CollapsePanel>
      </Collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collapse1 : ['a'],
      collapse2 : ['1'],
      collapse3 : ['4'],
      collapse4 : ['7'],
      collapse5 : ['10'],
      collapse6 : '',
      collapse7 : '',
      collapse8 : '',
      collapse9 : '',
      collapse10 : '',
      customStyle : {
        backgroundColor : '#ccc',
        marginBottom : '20px'
      },
      expandIconPosition : 'left'
    }
  },
  methods : {
    clickLeft () {
      this.expandIconPosition = 'left';
    },
    clickRight () {
      this.expandIconPosition = 'right';
    }
  }
}
</script>
<style lang="less" scoped>

</style>