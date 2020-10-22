<template>
  <div>
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
        <a-button type="link" :size="size" @click="globalParamsMove()">添加一个参数</a-button>
        <a-button type="link" :size="size" @click="hideModal(true)">批量设置参数</a-button>
        <a-table :columns="globalParamsColumns" :data-source="globalParamsData" bordered :size="size" :pagination="false">
          <template v-for="col in ['parameter-name', 'parameter-value', 'parameter-description']" :slot="col" slot-scope="text, record">
            <a-input :key="col" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record, col)" :size="size" />
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span>
                <a @click="globalParamsMove(index, -1)">上移</a>
                <a-divider type="vertical" />
                <a @click="globalParamsMove(index, 1)">下移</a>
                <a-divider type="vertical" />
                <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="globalParamsMove(index, 0)">
                  <a>删除</a>
                </a-popconfirm>
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
    <a-modal v-model="visibleModel" title="请输入参数" ok-text="设置" cancel-text="关闭" @ok="hideModal(false)">
      <a-textarea v-model="modelValue" placeholder="一行一个，冒号(:)、等号（=）、空格或tab分割name和value" :auto-size="{ minRows: 8, maxRows: 20 }" />
    </a-modal>
  </div>
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
      visibleModel: false,
      modelValue: '',
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
          scopedSlots: { customRender: 'parameter-name' }
        },
        {
          title: '参数值',
          dataIndex: 'parameter-value',
          width: 250,
          scopedSlots: { customRender: 'parameter-value' }
        },
        {
          title: '参数描述',
          dataIndex: 'parameter-description',
          scopedSlots: { customRender: 'parameter-description' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          scopedSlots: { customRender: 'operation' }
        }
      ],
      globalParamsData: []
    }
  },
  watch: {
    globalParamsData: {
      handler: function(val, oldVal) {
        let params = {
          'parameter-name': [],
          'parameter-description': [],
          'parameter-value': []
        }
        val.forEach(element => {
          for (let key in element) {
            if (key !== 'key' && element[key]) {
              params[key].push(element[key])
            }
          }
        })
        for (let key in params) {
          this.jsonObjHandle(key, params[key])
        }
      },
      deep: true
    }
  },
  methods: {
    // 获取cell中的值
    jsonObjHandle(key, val) {
      if (val) {
        val = val.target ? val.target.value : val
        this.cell.data.set(key, val)
      }
      return this.cell.data.get(key)
    },
    // 全局参数修改值
    globalParamsMove(index, oper) {
      switch (oper) {
        case -1: // 上移
          if (index > 0) {
            let temp = this.globalParamsData.splice(index, 1)
            this.globalParamsData.splice(index - 1, 0, temp[0])
          }
          break
        case 1: // 下移
          if (index < this.globalParamsData.length) {
            let temp = this.globalParamsData.splice(index, 1)
            this.globalParamsData.splice(index + 1, 0, temp[0])
          }
          break
        case 0: // 删除
          this.globalParamsData.splice(index, 1)
          break
        default:
          // 添加
          this.globalParamsData.push({
            key: this.globalParamsData.length,
            'parameter-name': '',
            'parameter-description': '',
            'parameter-value': ''
          })
          break
      }
    },
    // 列修改框修改值
    handleChange(value, record, col) {
      record[col] = value
    },
    // 数据转数组
    changeDataToArray(target, objData, length) {
      let that = this
      let tempKeys = []
      for (const key in objData) {
        tempKeys.push(key)
      }
      for (let index = 0; index < length; index++) {
        let tempData = {
          key: index
        }
        tempKeys.forEach(key => {
          tempData[key] = objData[key][index]
        })
        that.globalParamsData.push(tempData)
      }
    },
    // 弹窗确认按钮
    hideModal(show) {
      this.visibleModel = show
      if (show === false) {
        let inputDatas = this.modelValue.split('\n')
        inputDatas.forEach(element => {
          const splitChar = [':', '=', ' ', '\t']
          for (const index in splitChar) {
            let inputIndex = element.indexOf(splitChar[index])
            if (inputIndex !== -1) {
              let temp = {
                key: this.globalParamsData.length,
                'parameter-name': element.substring(0, inputIndex),
                'parameter-description': '',
                'parameter-value': element.substring(inputIndex + 1)
              }
              // 添加
              this.globalParamsData.push(temp)
              break
            }
          }
        })
      }
      this.modelValue = ''
    }
  },
  mounted() {
    let paramsData = {
      'parameter-name': this.jsonObjHandle('parameter-name'),
      'parameter-description': this.jsonObjHandle('parameter-description'),
      'parameter-value': this.jsonObjHandle('parameter-value')
    }
    this.changeDataToArray(this.globalParamsData, paramsData, paramsData['parameter-name'] ? paramsData['parameter-name'].length : 0)
  }
}
</script>
