<template>
  <div>
    <a-tabs size="small" v-model="currentKey">
      <a-tab-pane key="globalConfig" tab="全局配置">
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
      <a-tab-pane key="globalParamsConfig" tab="全局参数">
        <a-button type="link" :size="size" @click="moveData()">添加一个参数</a-button>
        <a-button type="link" :size="size" @click="hideModal(true)">批量设置参数</a-button>
        <a-table :columns="globalParamsConfig.columns" :data-source="allData.globalParamsConfig" bordered :size="size" :pagination="false">
          <template v-for="col in globalParamsConfig.keys" :slot="col" slot-scope="text, record">
            <a-input :key="col" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record, col)" :size="size" />
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span>
                <a @click="moveData(index, -1)">上移</a>
                <a-divider type="vertical" />
                <a @click="moveData(index, 1)">下移</a>
                <a-divider type="vertical" />
                <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="moveData(index, 0)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="globalCookieConfig" tab="全局Cookie">
        <a-button type="link" :size="size" @click="moveData()">添加一个Cookie</a-button>
        <a-button type="link" :size="size" @click="hideModal(true)">批量设置Cookie</a-button>
        <a-table :columns="globalCookieConfig.columns" :data-source="allData.globalCookieConfig" bordered :size="size" :pagination="false">
          <template v-for="col in globalCookieConfig.keys" :slot="col" slot-scope="text, record">
            <a-input :key="col" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record, col)" :size="size" />
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span>
                <a @click="moveData(index, -1)">上移</a>
                <a-divider type="vertical" />
                <a @click="moveData(index, 1)">下移</a>
                <a-divider type="vertical" />
                <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="moveData(index, 0)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="globalHeaderConfig" tab="全局Header">
        <a-button type="link" :size="size" @click="moveData()">添加一个Header</a-button>
        <a-button type="link" :size="size" @click="hideModal(true)">批量设置Header</a-button>
        <a-table :columns="globalHeaderConfig.columns" :data-source="allData.globalHeaderConfig" bordered :size="size" :pagination="false">
          <template v-for="col in globalHeaderConfig.keys" :slot="col" slot-scope="text, record">
            <a-input :key="col" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record, col)" :size="size" />
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span>
                <a @click="moveData(index, -1)">上移</a>
                <a-divider type="vertical" />
                <a @click="moveData(index, 1)">下移</a>
                <a-divider type="vertical" />
                <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="moveData(index, 0)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model="visibleModel" title="请输入参数" ok-text="设置" cancel-text="关闭" @ok="hideModal(false)">
      <a-textarea v-model="modelValue" placeholder="一行一个，冒号(:)、等号（=）、空格或tab分割name和value" :auto-size="{ minRows: 8, maxRows: 20 }" />
    </a-modal>
  </div>
</template>

<script>
import data from './root-data.json'
import mixins from '../mixins/spider-mixins.js'

export default {
  name: 'SRoot',
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return data
  },
  methods: {
    // 设置所有的参数
    setAllDataToCell() {
      let val = this.allData
      for (const key in val) {
        const objData = val[key]
        const keys = this[key].keys
        // 初始化数组值
        let params = {}
        keys.forEach(element => {
          params[element] = []
        })
        // 放入值
        objData.forEach(element => {
          for (let key in element) {
            if (key !== 'key') {
              params[key].push(element[key])
            }
          }
        })
        // 写入值到cell
        for (let key2 in params) {
          if (params[key2].length > 0) {
            this.jsonObjHandle(key2, params[key2])
          }
        }
      }
      console.log(this.cell)
    },
    // 全局参数修改值
    moveData(index, oper) {
      switch (oper) {
        case -1: // 上移
          if (index > 0) {
            let temp = this.allData[this.currentKey].splice(index, 1)
            this.allData[this.currentKey].splice(index - 1, 0, temp[0])
          }
          break
        case 1: // 下移
          if (index < this.allData[this.currentKey].length) {
            let temp = this.allData[this.currentKey].splice(index, 1)
            this.allData[this.currentKey].splice(index + 1, 0, temp[0])
          }
          break
        case 0: // 删除
          this.allData[this.currentKey].splice(index, 1)
          break
        default:
          // 添加
          this.allData[this.currentKey].push({
            key: this.currentKey + this.allData[this.currentKey].length
          })
          break
      }
    },
    // 列修改框修改值
    handleChange(value, record, col) {
      record[col] = value
      this.setAllDataToCell()
    },
    // 数据转数组
    changeDataToArray(targetKey, target, objData, length) {
      let tempKeys = []
      target = []
      for (const key in objData) {
        tempKeys.push(key)
      }
      for (let index = 0; index < length; index++) {
        let tempData = {
          key: targetKey + index
        }
        tempKeys.forEach(key => {
          tempData[key] = objData[key][index]
        })
        target.push(tempData)
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
                key: this.allData[this.currentKey].length
              }
              temp[this[this.currentKey].keyPrefix + '-name'] = element.substring(0, inputIndex)
              temp[this[this.currentKey].keyPrefix + '-value'] = element.substring(inputIndex + 1)
              temp[this[this.currentKey].keyPrefix + '-description'] = ''
              // 添加
              this.allData[this.currentKey].push(temp)
              break
            }
          }
        })
      }
      this.modelValue = ''
      this.setAllDataToCell()
    }
  },
  mounted() {
    let allParamsKeys = ['globalParamsConfig', 'globalCookieConfig', 'globalHeaderConfig']
    allParamsKeys.forEach(element1 => {
      let paramsData = {}
      let length = 0
      this[element1].keys.forEach(element2 => {
        paramsData[element2] = this.jsonObjHandle(element2)
        length = paramsData[element2] ? paramsData[element2].length : 0
      })
      this.changeDataToArray(element1, this.allData[element1], paramsData, length)
    })
    console.log(this.cell)
  }
}
</script>
