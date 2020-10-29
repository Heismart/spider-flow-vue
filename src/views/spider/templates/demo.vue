<template>
  <a-tabs size="small" v-model="currentKey">
    <a-tab-pane key="xxxx" tab="xxxx">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="xxxx">
              <a-input placeholder="xxxx" :size="size" :defaultValue="getCellValue('xxxx')" @change="e => setCellValue('xxxx', e)" />
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
      currentKey: 'xxxx'
    }
  },
  mounted() {
    console.log(this.cell)
  }
}
</script>
