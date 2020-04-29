<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form @keyup.enter.native="handleSearch" layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="爬虫名称">
              <a-input clearable placeholder="请输入爬虫名称" v-model="params.name" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span class="table-page-search-submitButtons" style="float: left;overflow: hidden;">
              <a-button @click="handleSearch" icon="search" type="primary">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" icon="plus" type="primary">添加爬虫</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        :columns="columns"
        :dataSource="result.records"
        :loading="loading"
        :pagination="ipagination"
        @change="handleTableChange"
        bordered
        ref="table"
        rowKey="id"
        size="small"
      >
        <template slot="order" slot-scope="val, record, index">{{index + 1}}</template>
        <template slot="enabled" slot-scope="val, record">
          <a-switch
            :defaultChecked="val === 1"
            @change="(value) => handleSpiderSwitch(value, record)"
            checkedChildren="定时"
            unCheckedChildren="长任务"
          />
        </template>
        <template slot="running" slot-scope="val, record">
          <a-button type="link">{{ record.running }}/{{ record.executeCount }}</a-button>
        </template>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">通知设置</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">手动运行</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">日志</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getSpiderList, start, stop } from '@/api/spider'

export default {
  data() {
    return {
      result: {
        current: 1,
        pages: 1,
        size: 10,
        total: 0,
        records: []
      },
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      loading: false,
      params: {
        page: 1,
        limit: 10,
        name: ''
      },
      columns: [
        {
          title: '序号',
          align: 'center',
          width: 50,
          scopedSlots: { customRender: 'order' }
        },
        {
          title: '爬虫名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: 'cron',
          align: 'center',
          dataIndex: 'cron',
          width: 110
        },
        {
          title: '定时/长任务',
          align: 'center',
          dataIndex: 'enabled',
          width: 110,
          scopedSlots: { customRender: 'enabled' }
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createDate',
          width: 150
        },
        {
          title: '运行中/已完成',
          align: 'center',
          dataIndex: 'running',
          width: 120,
          scopedSlots: { customRender: 'running' }
        },
        {
          title: '上次执行时间',
          align: 'center',
          dataIndex: 'lastExecuteTime',
          width: 150
        },
        {
          title: '下次执行时间',
          align: 'center',
          dataIndex: 'nextExecuteTime',
          width: 150
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 170
        }
      ]
    }
  },
  methods: {
    // 加载爬虫列表
    handleSearch() {
      this.loading = true
      this.params.page = this.ipagination.current
      this.params.limit = this.ipagination.pageSize
      getSpiderList(this.params)
        .then(response => {
          this.result = response
          this.ipagination.current = response.current
          this.ipagination.pageSize = response.size
          this.ipagination.total = response.total
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    handleTableChange(pagination, filters, sorter) {
      this.ipagination = pagination
      this.handleSearch()
    },
    // 处理添加
    handleAdd() {
      this.$router.push({ path: '/spider/add' })
    },
    // 处理开关
    handleSpiderSwitch(value, row) {
      if (value) {
        start({ id: row.id })
          .then(response => {
            this.$message.success('操作成功！');
          })
          .catch(error => {
            // 设置失败后重置开关值
            row.enabled = '0'
          })
      } else {
        stop({ id: row.id }).then(response => {})
      }
    }
  },
  mounted() {
    this.handleSearch()
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less';
</style>
