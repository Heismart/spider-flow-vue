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
              <a-input :size="size" :defaultValue="jsonObjHandle('loopVariableName')" @change="e => jsonObjHandle('loopVariableName', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="循环次数">
              <a-input :size="size" :defaultValue="jsonObjHandle('loopCount')" @change="e => jsonObjHandle('loopCount', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="请求方法">
              <a-select :size="size" :defaultValue="jsonObjHandle('method')" @change="val => jsonObjHandle('method', val)">
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
              <a-input :size="size" :defaultValue="jsonObjHandle('url')" @change="e => jsonObjHandle('url', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="延迟时间">
              <a-input :size="size" :defaultValue="jsonObjHandle('sleep')" @change="e => jsonObjHandle('sleep', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="超时时间">
              <a-input :size="size" :defaultValue="jsonObjHandle('timeout')" @change="e => jsonObjHandle('timeout', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="页面编码">
              <a-input :size="size" :defaultValue="jsonObjHandle('response-charset')" @change="e => jsonObjHandle('response-charset', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="重试次数">
              <a-input :size="size" :defaultValue="jsonObjHandle('retryCount')" @change="e => jsonObjHandle('retryCount', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="重试间隔">
              <a-input :size="size" :defaultValue="jsonObjHandle('retryInterval')" @change="e => jsonObjHandle('retryInterval', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="代理">
              <a-input :size="size" :defaultValue="jsonObjHandle('proxy')" @change="e => jsonObjHandle('proxy', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="请求设置">
              <a-input :size="size" :defaultValue="jsonObjHandle('xxxx')" @change="e => jsonObjHandle('xxxx', e)" />
              <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
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
      currentKey: 'baseConfig'
    }
  },
  mounted() {
    console.log(this.cell)
  }
}
</script>
