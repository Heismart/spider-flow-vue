<template>
  <a-card>
    <div class="table-operator">
      <a-form layout="inline">
        <a-form-item label="爬虫名称">
          <a-input placeholder="请输入爬虫名称" v-model="queryParam.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button @click="listAction(1)" icon="search" type="primary">查询</a-button>
          <a-button @click="openDetail(0)" icon="plus" type="primary">添加函数</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table
      :columns="columns"
      :data-source="data.records"
      :pagination="pagination"
      @change="handleChange"
      rowKey="id"
    >
      <template slot="name" slot-scope="val">
        <a>{{val}}</a>
      </template>
      <template slot="cron" slot-scope="val">
        <a>{{val?val:'编辑cron'}}</a>
      </template>
      <template slot="enabled" slot-scope="val,row">
        <span v-show="false">{{$set(row,'cronChecked',val === '1')}}</span>
        <a-switch
          @change="checked => handleSwitch(checked,row)"
          checked-children="定时"
          un-checked-children="长任务"
          v-model="row.cronChecked"
          :loading="row.loading"
        />
      </template>
      <template slot="runFinish" slot-scope="val,record">
        <a>{{record.running}}/{{record.executeCount?record.executeCount:0}}</a>
      </template>
      <template slot="operation" slot-scope="val">
        <a @click="openDetail(val)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          @confirm="deleteAction(val)"
          cancel-text="取消"
          ok-text="确定"
          placement="topRight"
          title="您确定要删除此函数吗？"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <cron v-model="test" />
  </a-card>
</template>

<script>
import { listRequest, startStopRequest } from '@/api/spider.js'
import Cron from 'antd-cron'

export default {
  components: {
    Cron
  },
  data() {
    return {
      test: '',
      columns: [
        {
          title: '序号',
          width: 60,
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: '爬虫名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'cron',
          dataIndex: 'cron',
          width: 200,
          scopedSlots: { customRender: 'cron' }
        },
        {
          title: '定时/长任务',
          dataIndex: 'enabled',
          width: 110,
          scopedSlots: { customRender: 'enabled' }
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          width: 160
        },
        {
          title: '上次执行时间',
          dataIndex: 'lastExecuteTime',
          width: 160
        },
        {
          title: '运行中/已完成',
          dataIndex: 'runFinish',
          width: 130,
          scopedSlots: { customRender: 'runFinish' }
        },
        {
          title: '下次执行时间',
          dataIndex: 'nextExecuteTime',
          width: 160
        },
        {
          title: '操作',
          dataIndex: 'id',
          width: 120,
          scopedSlots: { customRender: 'operation' }
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
        limit: 10,
        name: ''
      },
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      }
    }
  },
  methods: {
    listAction(page) {
      if (page) {
        this.queryParam.page = page
        this.pagination.current = page
      }
      listRequest(this.queryParam, data => {
        this.data = data
        this.pagination.total = this.data.total
        this.pagination.pageSize = this.data.size
      })
    },
    // 分页切换
    handleChange(pagination) {
      this.pagination = pagination
      this.queryParam.page = this.pagination.current
      this.queryParam.limit = this.pagination.pageSize
      this.query()
    },
    // 定时任务切换
    handleSwitch(checked, row) {
      if (!row.cron) {
        this.$message.warn('cron表达式不能为空！')
        this.$set(row, 'cronChecked', false)
      } else {
        this.$set(row, 'loading', true)
        let that = this
        startStopRequest(checked, row.id, data => {
          that.$message.success((checked ? '切换为定时任务' : '切换为长任务') + '成功')
          this.listAction(this.queryParam.page)
        }, data => {
          that.$message.error((checked ? '切换为定时任务' : '切换为长任务') + '失败')
          that.$set(row, 'loading', false)
          this.listAction(this.queryParam.page)
        })
      }
    }
  },
  mounted() {
    this.listAction(this.queryParam.page)
  }
}
</script>
