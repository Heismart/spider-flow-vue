<template>
  <a-tabs size="small" v-model="currentKey">
    <a-tab-pane key="xxxx" tab="xxxx">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="节点名称">
              <a-input placeholder="请输入节点名称" :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="xxxx">
              <a-input placeholder="xxxx" :size="size" :defaultValue="getCellValue('xxxx')" @change="e => setCellValue('xxxx', e)" />
            </a-form-item>
          </a-col>
        </a-row>
        <table-and-modal :batchAddBtn="false" :editor="editor" :cell="cell" :config="tableConfig"></table-and-modal>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
import TableAndModal from '../components/tableAndModal.vue'
export default {
  mixins: [mixins],
  components: {
    TableAndModal
  },
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      currentKey: 'xxxx',
      bodyParameterConfig: {
        title: '参数',
        keyPrefix: 'parameter-form',
        keys: ['parameter-form-name', 'parameter-form-type', 'parameter-form-filename', 'parameter-form-value', 'parameter-form-description'],
        columns: [
          {
            title: '参数名',
            dataIndex: 'parameter-form-name',
            width: 150,
            scopedSlots: {
              customRender: 'parameter-form-name'
            }
          },
          {
            title: '参数类型',
            dataIndex: 'parameter-form-type',
            width: 90,
            scopedSlots: {
              customRender: 'parameter-form-type'
            },
            inputType: 'select',
            selectMap: {
              text: 'text',
              file: 'file'
            },
            selectDefault: 'text'
          },
          {
            title: '文件名',
            dataIndex: 'parameter-form-filename',
            width: 200,
            scopedSlots: {
              customRender: 'parameter-form-filename'
            }
          },
          {
            title: '参数值',
            dataIndex: 'parameter-form-value',
            scopedSlots: {
              customRender: 'parameter-form-value'
            }
          },
          {
            title: '参数描述',
            dataIndex: 'parameter-form-description',
            width: 200,
            scopedSlots: {
              customRender: 'parameter-form-description'
            }
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            scopedSlots: {
              customRender: 'operation'
            }
          }
        ]
      }
    }
  },
  mounted() {
    console.log(this.cell)
  }
}
</script>
