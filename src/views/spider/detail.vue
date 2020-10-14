<template>
  <a-layout class="spider-detail-container">
    <a-layout-header>
      <template v-for="(item, index) in headerBtns">
        <a-tooltip :key="'header-icon-' + index" :title="item.title" placement="bottom" v-if="item.type === 'ant'">
          <a-icon :type="item.icon"></a-icon>
        </a-tooltip>
        <a-divider :key="'header-icon-' + index" type="vertical" v-else-if="item.type === 'divider'" />
      </template>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="100px">
        <div class="spider-toolbar-container" ref="spiderToolbarContainer"></div>
      </a-layout-sider>
      <a-layout-content class="spider-content">
        <div class="spider-editor-container" ref="spiderEditorContainer"></div>
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="spider-properties-container">
      <component :is="currentTemplate" :editor="editor" :cell="selectCell" />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderBtnsJson from './json/header-btns.json'
import { SpiderEditor, JsonProperty } from '@/libs/spidereditor/spider-editor'
import { loadShapes } from '@/libs/spidereditor/editor'

export default {
  data() {
    return {
      queryParam: {
        flowId: ''
      },
      headerBtns: HeaderBtnsJson,
      editor: null,
      selectCell: {
        id: '',
        data: new JsonProperty()
      }
    }
  },
  computed: {
    currentTemplate() {
      var template = ''
      if (this.selectCell.edge === 1) {
        template = 'edge'
      } else if (this.selectCell.data && this.selectCell.data.get('shape') === undefined) {
        template = 'root'
      } else {
        template = this.selectCell.data.get('shape') || 'root'
      }
      return () => import(`@/views/spider/templates/${template}`)
    }
  },
  methods: {
    // 绑定键盘事件
    bindKeyEvent() {
      // 影响了其它输入框的输入，需要改变实现
      // window.onkeydown = e => {
      //   let key = e.key
      //   let exclude = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']
      //   if (exclude.indexOf(key) === -1) {
      //     e.preventDefault()
      //   }
      //   this.headerBtns.forEach(element => {
      //     if (element.exeFunKey && element.exeFunKey.length > 0) {
      //       if (
      //         (element.exeFunKey.indexOf('ctrl') !== -1 && e.ctrlKey === true && element.exeFunKey.indexOf(key.toLowerCase()) !== -1) ||
      //         (element.exeFunKey.indexOf('alt') !== -1 && e.altKey === true && element.exeFunKey.indexOf(key.toLowerCase()) !== -1) ||
      //         element.exeFunKey.indexOf(key.toLowerCase()) !== -1
      //       ) {
      //         console.log(element.title)
      //       }
      //     }
      //   })
      // }
    },
    // 选择cell触发的方法
    onSelectedCell(cell) {
      this.selectCell = cell
    },
    // 渲染spider editor
    renderSpiderEditor() {
      let _this = this
      let editor = new SpiderEditor({
        element: this.$refs.spiderEditorContainer,
        selectedCellListener: function(sender, evt) {
          _this.onSelectedCell(sender, evt)
        }
      })
      // 加载图形
      loadShapes(editor, this.$refs.spiderToolbarContainer)
      this.editor = editor
    }
  },
  mounted() {
    this.queryParam.flowId = this.$route.params.flowId
    // 渲染面板
    this.renderSpiderEditor()
    // 绑定键盘事件
    this.bindKeyEvent()
  },
  destroyed() {
    window.onkeydown = null
  }
}
</script>

<style lang="less">
@import './detail.less';
</style>
