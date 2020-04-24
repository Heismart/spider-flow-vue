<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="params.name" size="small" placeholder="请输入爬虫名称" clearable />
      </el-col>
      <el-col :span="18">
        <el-button
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="handleSearch"
        >查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="handleAdd"
        >添加爬虫</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          v-loading="loading"
          :data="result.records"
          row-key="id"
          element-loading-text="加载中"
          stripe
          border
          size="small"
          highlight-current-row
        >
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="爬虫名称" prop="name">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.name }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="cron" width="110" align="center" prop="cron">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.cron }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="定时/长任务" width="110" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabled"
                class="switch-text-inner"
                active-color="#13ce66"
                active-text="定时"
                inactive-text="长任务"
                active-value="1"
                inactive-value="0"
                @change="(value) => handleSpiderSwitch(value, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createDate" width="150" align="center" />
          <el-table-column label="运行中/已完成" width="100" align="center">
            <template slot-scope="scope">
              <el-link type="primary">{{ scope.row.running }}/{{ scope.row.executeCount }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="上次执行时间" prop="lastExecuteTime" width="150" align="center" />
          <el-table-column label="下次执行时间" prop="nextExecuteTime" width="150" align="center" />
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="查看" placement="top" :open-delay="800" :enterable="false">
                <el-button
                  size="mini"
                  icon="el-icon-search"
                  type="primary"
                  circle
                  @click="handleEdit(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="通知设置" placement="top" :open-delay="800" :enterable="false">
                <el-button
                  size="mini"
                  icon="el-icon-bell"
                  type="warning"
                  circle
                  @click="handleMessage(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="手动运行" placement="top" :open-delay="800" :enterable="false">
                <el-button
                  size="mini"
                  icon="el-icon-caret-right"
                  type="success"
                  circle
                  @click="handleRun(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="日志" placement="top" :open-delay="800" :enterable="false">
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-time"
                  circle
                  @click="handleLog(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="删除" placement="top" :open-delay="800" :enterable="false">
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  circle
                  @click="handleDelete(scope.$index, scope.row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          :current-page.sync="params.page"
          :background="true"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="params.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="result.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
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
      loading: true,
      params: {
        page: 1,
        limit: 10,
        name: ''
      }
    }
  },
  created() {
    this.fetchSpiderList()
  },
  methods: {
    // 加载爬虫列表
    fetchSpiderList() {
      this.loading = true
      getSpiderList(this.params).then(response => {
        this.result = response
        this.params.page = response.current
        this.params.limit = response.size
        this.loading = false
      })
      // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.loading = false
        })
    },
    // 处理 limit 变化
    handleSizeChange(size) {
      this.params.limit = size
      this.fetchSpiderList()
    },
    // 处理 current 变化
    handleCurrentChange(current) {
      this.params.page = current
      this.fetchSpiderList()
    },
    // 处理查询
    handleSearch() {
      this.fetchSpiderList()
    },
    // 处理添加
    handleAdd() {
      this.$router.push({ path: '/spider/add' })
    },
    // 处理开关
    handleSpiderSwitch(value, row) {
      if (value === '1') {
        start({ 'id': row.id }).then(response => {})
        // eslint-disable-next-line handle-callback-err
          .catch(error => {
            // 设置失败后重置开关值
            row.enabled = '0'
          })
      } else if (value === '0') {
        stop({ 'id': row.id }).then(response => {})
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>

<style>
/* 没选中 */
.switch-text-inner .el-switch__label {
  position: absolute;
  display: none;
  color: #999;
}
.switch-text-inner.el-switch .el-switch__core {
  background-color: #fff;
  border-color: #d2d2d2;
}
.switch-text-inner.el-switch .el-switch__core::after {
  background-color: #d2d2d2;
  top: 2px;
}

/* 选中 */
.switch-text-inner.is-checked .el-switch__label {
  color: #fff;
}
.switch-text-inner.is-checked .el-switch__core::after {
  background-color: #fff;
}

/* 默认 */
.switch-text-inner .el-switch__label--left {
  z-index: 9;
  left: 8px;
}
.switch-text-inner .el-switch__label--right {
  z-index: 9;
  left: -14px;
}
.switch-text-inner .el-switch__label.is-active {
  display: block;
}
.switch-text-inner.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 70px !important;
  height: 22px !important;
}
</style>
