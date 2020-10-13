<template>
  <a-tabs default-active-key="1" @change="callback" size="small">
    <a-tab-pane key="1" tab="全局配置">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="爬虫名称">
              <a-input placeholder="请输入爬虫名称" :size="size" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="提交策略">
              <a-select :size="size">
                <a-select-option value="random">随机</a-select-option>
                <a-select-option value="linked">顺序</a-select-option>
                <a-select-option value="child">子优先</a-select-option>
                <a-select-option value="parent">父优先</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="最大线程数">
              <a-input-number placeholder="请输入最大线程数" :size="size" :min="1" style="width: 100%;"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="全局参数">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-item label="Field A">
              <a-input placeholder="input placeholder" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
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
      size: 'small'
    }
  },
  methods: {
    callback(key) {
      console.log(key)
    }
  }
}
</script>
