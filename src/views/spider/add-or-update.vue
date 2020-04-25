<template>
  <el-container>
    <el-header height="42">
      <el-tooltip class="item" effect="light" content="保存（Ctrl+S）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="save" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="测试（Ctrl+Q）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" icon="el-icon-caret-right" circle />
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="撤销（Ctrl+Z）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="cancel" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="反撤销（Ctrl+Y）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="uncancel" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="历史版本" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="history1" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="全选（Ctrl+A）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="multi" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="剪切（Ctrl+X）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" icon="el-icon-scissors" circle />
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="复制（Ctrl+C）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="copy" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="粘贴（Ctrl+V）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="paste" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="删除（Delete）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" icon="el-icon-delete" circle @click="handleDelSelectCells" />
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="编辑 XML" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="xml" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="打印 XML" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="print" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="调试（Ctrl+Q）" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="debug" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="下一步" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="next" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="停止" placement="bottom" :open-delay="500" :enterable="false">
        <el-button type="primary" size="mini" circle>
          <template>
            <svg-icon icon-class="stop" />
          </template>
        </el-button>
      </el-tooltip>
    </el-header>
    <el-container>
      <el-aside ref="toolbarContainer" width="80px" class="toolbar-container"></el-aside>
      <el-main>
        <div ref="editorContainer" class="editor-container" />
      </el-main>
    </el-container>
    <el-footer height="200px">
      <div class="properties-container" :version="version">
        <component :is="currentTemplate" :editor="editor" :cell="selectCell"></component>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import '@/libs/codemirror/mode/spiderflow'
import 'codemirror/mode/sql/sql'
import '@/libs/codemirror/addon/placeholder'
import '@/libs/codemirror/addon/show-hint'
import { initHint } from '@/libs/codemirror/addon/spiderflow-hint'
import { SpiderEditor } from '@/libs/spidereditor/spider-editor'
import { loadShapes } from '@/libs/spidereditor/editor'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import {JsonProperty} from "../../libs/spidereditor/spider-editor";

export default {
  data() {
    return {
      version: 'latest',
      selectCell:{
        id:'',
        data:new JsonProperty()
      },
      // 图表编辑器
      editor: {}
    }
  },
  computed: {
      currentTemplate(){
        var template = '';
        if(this.selectCell.edge == 1){
            template= 'edge';
        }else if(this.selectCell.data&&this.selectCell.data.get('shape') === undefined){
            template= 'root';
        }else{
            template= this.selectCell.data.get('shape') || 'root'
        }
        return () => import(`@/views/template/${template}`);
      }
  },
  mounted() {
    this.renderSpiderEditor()
  },
  methods: {
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
        mode: 'spiderflow',	// 语法
        theme: 'idea',	// 设置样式
        placeholder: dom.getAttribute('placeholder'),
        // value: dom.getAttribute('data-value') || '',
        scrollbarStyle: 'null'	// 隐藏滚动条
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
    onSelectedCell(cell){
       this.selectCell = cell;
    },
    // 渲染 spider editor
    renderSpiderEditor() {
      const _this = this;
      const editor = new SpiderEditor({
        element: this.$refs.editorContainer,
        selectedCellListener: function(sender,evt){
            _this.onSelectedCell(sender,evt);
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
  },
  watch:{
    'selectCell.value' : {
      handler(newValue){
        if(this.selectCell.valueChanged){
          this.editor.graph.model.setValue(this.selectCell,newValue);
        }
      }
    }
  }
}
</script>

<style>
/* tab 选项卡文字大小 */
.properties-container .el-tabs__item {
  font-size: 12px !important;
}
.properties-container label {
  font-weight: 400;
}

.properties-container .el-table td div {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}
.CodeMirror-hints {
  position: absolute;
  z-index: 214483647;
  /*overflow: hidden;*/
  list-style: none;

  margin: 0;
  padding: 2px;

  -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
  -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
  box-shadow: 2px 3px 5px rgba(0,0,0,.2);
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
	color: #600100
}
.hint-grammer .hint-return span {
	color: #0000C0
}
.hint-grammer .hint-example {
	padding: 2px 5px;
	color: #000;
}
/* 图表鼠标拉框样式 */
div.mxRubberband {
	position: absolute;
	overflow: hidden;
	border-style: solid;
	border-width: 1px;
	border-color: #0000FF;
	background: #0077FF;
}
</style>

<style scoped>
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-header {
  border: solid 1px #e4e7ed;
  background-color: #fff;
  color: #333;
  line-height: 40px;
}

.el-aside {
  background-color: #F6F6F6;
  color: #333;
  min-width: 80px;
  writing-mode: vertical-lr;
}
.el-aside img{
  width: 32px;
  height: 32px;
  padding: 5px;
  margin: 2px;
  box-sizing: content-box;
}

.el-main {
  /* 50 navbar，42 header toolbar，200 footer */
  min-height: calc(100vh - 50px - 42px - 200px);
  color: #333;
  text-align: center;
  line-height: 160px;
  background-image: linear-gradient(90deg, rgba(153, 153, 153, 0.3) 1px, rgba(0, 0, 0, 0) 1px),linear-gradient(rgba(153, 153, 153, 0.3) 1px, rgba(0, 0, 0, 0) 1px);
	background-size: 8px 8px;
	overflow: auto;
  padding: 0px;
}

.el-main .editor-container {
  /* 50 navbar，42 header toolbar，200 footer */
  min-height: calc(100vh - 50px - 42px - 200px);
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-button--text {
  font-size: 13px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
