<template>
  <a-tabs default-active-key="1" size="small">
    <a-tab-pane key="1" tab="全局配置">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="爬虫名称">
              <a-input placeholder="请输入爬虫名称" :size="size" :defaultValue="jsonObjHandle('spiderName')" @change="e => jsonObjHandle('spiderName', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="提交策略">
              <a-select :size="size" :defaultValue="jsonObjHandle('submit-strategy')" @change="val => jsonObjHandle('submit-strategy', val)">
                <a-select-option value="random">随机</a-select-option>
                <a-select-option value="linked">顺序</a-select-option>
                <a-select-option value="child">子优先</a-select-option>
                <a-select-option value="parent">父优先</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="最大线程数">
              <a-input-number placeholder="请输入最大线程数" :defaultValue="jsonObjHandle('threadCount')" @change="e => jsonObjHandle('threadCount', e)" :size="size" :min="1" style="width: 100%;" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="全局参数">
      <a-table :columns="globalParamsColumns" :data-source="globalParamsData" bordered :size="size" :pagination="false">
        <template slot="edit-cell" slot-scope="text, record">
          <a-input style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.key, col)" :size="size" />
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="globalParamsMove(index, -1)">上移</a>
              <a-divider type="vertical" />
              <a @click="globalParamsMove(index, 1)">下移</a>
              <a-divider type="vertical" />
              <a @click="globalParamsMove(index, 0)">删除</a>
            </span>
          </div>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="3" tab="全局Cookie">
      Content of Tab Pane 3
    </a-tab-pane>
    <a-tab-pane key="4" tab="全局Header">
      Content of Tab Pane 3
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  name: 'SRoot',
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        colSpan: 8
      },
      size: 'small',
      globalParamsColumns: [
        {
          title: '参数名',
          dataIndex: 'parameter-name',
          width: 150,
          scopedSlots: { customRender: 'edit-cell' }
        },
        {
          title: '参数值',
          dataIndex: 'parameter-value',
          width: 250,
          scopedSlots: { customRender: 'edit-cell' }
        },
        {
          title: '参数描述',
          dataIndex: 'parameter-description',
          scopedSlots: { customRender: 'edit-cell' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  computed: {
    globalParamsData() {
      return [{}]
    }
  },
  methods: {
    jsonObjHandle(key, val) {
      if (val) {
        val = val.target ? val.target.value : val
        this.cell.data.set(key, val)
      }
      return this.cell.data.get(key)
    }
  }
}
</script>
