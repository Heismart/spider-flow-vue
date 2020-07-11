<template>
  <div>
    <a-table :columns="columns" :data-source="data.records"></a-table>
  </div>
</template>

<script>
import { list } from '@/api/variables.js'
export default {
  data() {
    return {
      columns: [
        {
          title: '序号',
          width: '10',
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: '变量名',
          dataIndex: 'name'
        },
        {
          title: '变量值',
          dataIndex: 'value'
        },
        {
          title: '变量描述',
          dataIndex: 'description'
        },
        {
          title: '创建时间',
          dataIndex: 'createDate'
        }
      ],
      data: {
        current: 1,
        pages: 1,
        records: [],
        searchCount: true,
        size: 10,
        total: 1
      },
      queryParam: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    query() {
      list(this.queryParam, data => {
        this.data = data
      })
    }
  },
  mounted() {
    this.query()
  }
}
</script>
