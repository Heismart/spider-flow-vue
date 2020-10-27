<template>
  <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
    <a-row>
      <a-col :span="formItemLayout.colSpan">
        <a-form-item label="节点名称">
          <a-input placeholder="请输入节点名称" :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
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
  mounted() {
    console.log(this.cell)
  }
}
</script>
