<template>
  <a-layout style="height: 100%;">
    <a-layout-header>
      <template v-for="(item,index) in config.headerBtns">
        <a-tooltip :key="'tool_' + index" placement="bottom">
          <template slot="title">
            <span>{{item.tooltip}}</span>
          </template>
          <a-button @click="getMethod(item.click)" shape="circle" size="default" type="primary">
            <a-icon :type="item.icon" />
          </a-button>
        </a-tooltip>
      </template>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="toolbar-container" ref="toolbarContainer" width="50" />
      <a-layout-content>
        <div class="editor-container" ref="editorContainer" />
      </a-layout-content>
    </a-layout>
    <a-layout-footer>
      <div :version="version" class="properties-container">
        <component :cell="selectCell" :editor="editor" :is="currentTemplate" />
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import spiderflow from '@/libs/codemirror/mode/spiderflow'
import 'codemirror/mode/sql/sql'
import '@/libs/codemirror/addon/placeholder'
import '@/libs/codemirror/addon/show-hint'
import { initHint } from '@/libs/codemirror/addon/spiderflow-hint'
import { SpiderEditor } from '@/libs/spidereditor/spider-editor'
import { loadShapes } from '@/libs/spidereditor/editor'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import { JsonProperty } from '../../libs/spidereditor/spider-editor'
import headerBtns from './jsonConfig/headerBtns'

export default {
  data() {
    return {
      version: 'latest',
      selectCell: {
        id: '',
        data: new JsonProperty()
      },
      // 图表编辑器
      editor: {},
      config: { headerBtns }
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
      return () => import(`@/views/spider/template/${template}.vue`)
    }
  },
  watch: {
    'selectCell.value': {
      handler(newValue) {
        if (this.selectCell.valueChanged) {
          this.editor.graph.model.setValue(this.selectCell, newValue)
        }
      }
    }
  },
  mounted() {
    this.renderSpiderEditor()
  },
  methods: {
    getMethod(methodName) {
      this[methodName]()
    },
    // 处理添加一行全局参数
    handleAddGlobalParameter() {
      var gp = {}
      this.globalParameters.push(gp)
      // DOM 渲染完毕后调用
      this.$nextTick(() => this.renderCodeMirrors(this.$refs.codemirror_parameterValue, 'parameterValue', gp))
    },
    // 处理删除一行全局参数
    handleDelGlobalParameter(index) {
      this.globalParameters.splice(index, 1)
    },
    // 处理添加一行全局 Cookie
    handleAddGlobalCookie() {
      var gc = {}
      this.globalCookies.push(gc)
      this.$nextTick(() => this.renderCodeMirrors(this.$refs.codemirror_cookieValue, 'cookieValue', gc))
    },
    // 处理删除一行全局 Cookie
    handleDelGlobalCookie(index) {
      this.globalCookies.splice(index, 1)
    },
    // 处理添加一行全局 Header
    handleAddGlobalHeader() {
      var gh = {}
      this.globalHeaders.push(gh)
      this.$nextTick(() => this.renderCodeMirrors(this.$refs.codemirror_headerValue, 'headerValue', gh))
    },
    // 处理删除一行全局 Header
    handleDelGlobalHeader(index) {
      this.globalHeaders.splice(index, 1)
    },
    // 渲染 codemirror
    /**
     * @param ref codemirror textarea dom
     * @param name codemirror textarea data name
     * @param gp 表格中的一行的实例
     */
    renderCodeMirrors(ref, name, gp) {
      var dom = ref
      var codemirror = CodeMirror.fromTextArea(dom, {
        mode: 'spiderflow', // 语法
        theme: 'idea', // 设置样式
        placeholder: dom.getAttribute('placeholder'),
        // value: dom.getAttribute('data-value') || '',
        scrollbarStyle: 'null' // 隐藏滚动条
      })
      codemirror.setSize('auto', '28px')
      // 初始化 show-hint
      initHint(codemirror)
      // change 事件
      codemirror.on('change', function() {
        gp[name] = codemirror.getValue()
        if (dom.getAttribute('codemirror') === 'condition') {
          // TODO:
          // var $select = $('select[name="exception-flow"]')
          // $select.siblings('div.layui-form-select').find('dl dd[lay-value=' + $select.val() + ']').click()
        }
        // serializeForm()
      })
      // 将 codemirror 的生命周期交由 vue 管理
      gp.codemirror = codemirror
    },
    onSelectedCell(cell) {
      this.selectCell = cell
    },
    // 渲染 spider editor
    renderSpiderEditor() {
      const _this = this
      const editor = new SpiderEditor({
        element: this.$refs.editorContainer,
        selectedCellListener: function(sender, evt) {
          _this.onSelectedCell(sender, evt)
        }
      })
      // 加载图形
      loadShapes(editor, this.$refs.toolbarContainer.$el)
      this.editor = editor
    },
    // 处理删除图形
    handleDelSelectCells() {
      this.editor.deleteSelectCells()
    }
  }
}
</script>

<style lang="less" scoped>
@import './add-or-update.less';
</style>

<style>
.toolbar-container img {
  width: 32px;
  height: 32px;
  padding: 5px;
  margin: 2px;
  box-sizing: content-box;
}
/* 图表鼠标拉框样式 */
div.mxRubberband {
  position: absolute;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  border-color: #0000ff;
  background: #0077ff;
}

.CodeMirror-hints {
  position: absolute;
  z-index: 214483647;
  /*overflow: hidden;*/
  list-style: none;

  margin: 0;
  padding: 2px;

  -webkit-box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  border: 1px solid silver;

  background: white;
  font-size: 90%;
  font-family: monospace;

  max-height: 20em;
  overflow-y: auto;
}

.CodeMirror-hint {
  margin: 0;
  padding: 0 4px;
  border-radius: 2px;
  /*white-space: pre;*/
  color: black;
  cursor: pointer;
}

li.CodeMirror-hint-active {
  background: #08f;
  color: white;
}
.hint-grammer {
  width: 100%;
  color: #333;
}
.hint-grammer:not(:first-child) {
  border-top: 1px solid #ccc;
  margin-top: 5px;
  padding-top: 5px;
}
.hint-grammer .hint-owner span {
  color: #600100;
}
.hint-grammer .hint-return span {
  color: #0000c0;
}
.hint-grammer .hint-example {
  padding: 2px 5px;
  color: #000;
}
</style>
