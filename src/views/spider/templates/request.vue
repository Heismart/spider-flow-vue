<template>
  <a-tabs size="small" v-model="currentKey">
    <a-tab-pane key="baseConfig" tab="基本配置">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="节点名称">
              <a-input :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="循环变量">
              <a-input :size="size" :defaultValue="getCellValue('loopVariableName')" @change="e => setCellValue('loopVariableName', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="循环次数">
              <a-input :size="size" :defaultValue="getCellValue('loopCount')" @change="e => setCellValue('loopCount', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="请求方法">
              <a-select :size="size" :defaultValue="getCellValue('method', 'GET')" @change="val => setCellValue('method', val)">
                <a-select-option value="GET">GET</a-select-option>
                <a-select-option value="POST">POST</a-select-option>
                <a-select-option value="PUT">PUT</a-select-option>
                <a-select-option value="DELETE">DELETE</a-select-option>
                <a-select-option value="PATCH">PATCH</a-select-option>
                <a-select-option value="HEAD">HEAD</a-select-option>
                <a-select-option value="OPTIONS">OPTIONS</a-select-option>
                <a-select-option value="TRACE">TRACE</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item label="URL" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
              <a-input :size="size" :defaultValue="getCellValue('url')" @change="e => setCellValue('url', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="延迟时间">
              <a-input :size="size" :defaultValue="getCellValue('sleep')" @change="e => setCellValue('sleep', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="超时时间">
              <a-input :size="size" :defaultValue="getCellValue('timeout')" @change="e => setCellValue('timeout', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="页面编码">
              <a-input :size="size" :defaultValue="getCellValue('response-charset')" @change="e => setCellValue('response-charset', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="重试次数">
              <a-input :size="size" :defaultValue="getCellValue('retryCount')" @change="e => setCellValue('retryCount', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="重试间隔">
              <a-input :size="size" :defaultValue="getCellValue('retryInterval')" @change="e => setCellValue('retryInterval', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="代理">
              <a-input :size="size" :defaultValue="getCellValue('proxy')" @change="e => setCellValue('proxy', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item label="请求设置" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
              <a-checkbox-group :options="requestConfig" :default-value="requestConfigValueHandle()" @change="requestConfigValueHandle" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
export default {
  name: 'SStart',
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      currentKey: 'baseConfig',
      requestConfig: [
        {
          label: '跟随重定向',
          value: 'follow-redirect',
          defaultVal: '1'
        },
        {
          label: 'TLS证书验证',
          value: 'tls-validate',
          defaultVal: '1'
        },
        {
          label: '自动管理Cookie',
          value: 'cookie-auto-set',
          defaultVal: '1'
        },
        {
          label: '自动去重',
          value: 'repeat-enable',
          defaultVal: '0'
        },
        {
          label: '重复不执行后续节点',
          value: 'repeat-ignore-execute',
          defaultVal: '0'
        }
      ]
    }
  },
  methods: {
    // 处理请求设置选中的值和初始化值
    requestConfigValueHandle(selectValues) {
      let arrs = []
      if (selectValues === undefined) {
        this.requestConfig.forEach(element => {
          if (this.getCellValue(element.value, element.defaultVal) === '1') {
            arrs.push(element.value)
            this.setCellValue(element.value, '1')
          } else {
            this.setCellValue(element.value, '0')
          }
        })
      } else if (selectValues.length > 0) {
        this.requestConfig.forEach(element => {
          if (selectValues.indexOf(element.value) === -1) {
            this.setCellValue(element.value, '0')
          } else {
            this.setCellValue(element.value, '1')
          }
        })
      }
      return arrs
    }
  },
  mounted() {
    console.log(this.cell)
  }
}
</script>
