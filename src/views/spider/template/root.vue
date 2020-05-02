<template>
  <a-tabs size="small" v-model="tabActiveName">
    <a-tab-pane key="globalProperties" tab="全局配置">
      <a-form layout="inline">
        <a-form-item label="爬虫名称：">
          <a-input :size="itemSize" placeholder="请输入爬虫名称" v-model="cell.value" />
        </a-form-item>
        <a-form-item label="提交策略：" prop="submitStrategy">
          <a-select
            :size="itemSize"
            default-value="random"
            placeholder="请选择提交策略"
            style="width: 140px"
            v-model="cell.data.object.submitStrategy"
          >
            <a-select-option value="random">随机</a-select-option>
            <a-select-option value="linked">顺序</a-select-option>
            <a-select-option value="child">子优先</a-select-option>
            <a-select-option value="parent">父优先</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="最大线程数：" prop="threadCount">
          <a-input :size="itemSize" placeholder="请输入最大线程数" v-model="item.data.object.threadCount" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  name: 'SfRoot',
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      item: this.cell,
      // 默认激活的选项卡
      tabActiveName: 'globalProperties',
      itemSize: 'small'
    }
  },
  mounted() {
    this.cell.data.setDefaultValue('globalParameters', [])
  },
  methods: {}
}
</script>

<style scoped>
</style>
