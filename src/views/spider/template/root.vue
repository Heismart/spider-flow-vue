<template>
  <el-tabs v-model="tabActiveName" type="card">
    <el-tab-pane label="全局配置" name="globalProperties">
      <el-form size="mini" :inline="true">
        <el-form-item label="爬虫名称：">
          <el-input v-model="cell.value" placeholder="请输入爬虫名称" />
        </el-form-item>
        <el-form-item label="提交策略：" prop="submitStrategy">
          <el-select v-model="cell.data.object.submitStrategy" placeholder="请选择提交策略">
            <el-option label="随机" value="random" />
            <el-option label="顺序" value="linked" />
            <el-option label="子优先" value="child" />
            <el-option label="父优先" value="parent" />
          </el-select>
        </el-form-item>
        <el-form-item label="最大线程数：" prop="threadCount">
          <!-- <el-input v-model="item.data.object.threadCount" placeholder="请输入最大线程数" /> -->

        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="全局参数" name="globalParameters">
      <el-table
        :data="cell.data.object.globalParameters"
        element-loading-text="加载中"
        empty-text="暂未设置全局参数"
        stripe
        border
        size="mini"
        max-height="136"
      >
        <el-table-column label="参数名称" prop="parameterNname">
          <template slot-scope="scope">
            <el-input v-model="scope.row.parameterNname" size="mini" placeholder="请输入参数名称" />
          </template>
        </el-table-column>
        <el-table-column label="参数值" prop="parameterValue">
          <template slot-scope="scope">
            <textarea ref="codemirror_parameterValue" v-model="scope.row.parameterValue" codemirror="parameterValue" placeholder="请输入参数值" />
          </template>
        </el-table-column>
        <el-table-column label="参数描述" prop="parameterDescription">
          <template slot-scope="scope">
            <el-input v-model="scope.row.parameterDescription" size="mini" placeholder="请输入参数描述" />
          </template>
        </el-table-column>
        <el-table-column align="right" width="150px">
          <template slot="header">
            <el-button type="text" @click="cell.data.object.globalParameters.push({})">添加一个</el-button>
            <!-- TODO: -->
            <el-button type="text">批量设置</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-top" circle />
            <el-button type="success" size="mini" icon="el-icon-bottom" circle />
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="cell.data.object.globalParameters.splice(scope.$index,1)" />
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全局 Cookies" name="globalCookies">
      <el-table
        :data="cell.data.object.globalCookies"
        element-loading-text="加载中..."
        empty-text="暂未设置全局 Cookies"
        stripe
        border
        size="mini"
        max-height="136"
      >
        <el-table-column label="Cookie 名称" prop="cookieName">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cookieName" size="mini" placeholder="请输入 Cookie 名称" />
          </template>
        </el-table-column>
        <el-table-column label="Cookie 值" prop="cookieValue">
          <template slot-scope="scope">
            <textarea ref="codemirror_cookieValue" v-model="scope.row.cookieValue" codemirror="cookieValue" placeholder="请输入 Cookie 值" />
          </template>
        </el-table-column>
        <el-table-column label="Cookie 描述" prop="cookieDescription">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cookieDescription" size="mini" placeholder="请输入 Cookie 描述" />
          </template>
        </el-table-column>
        <el-table-column align="right" width="150px">
          <template slot="header">
            <el-button type="text" @click="cell.data.object.globalCookies.push({})">添加一个</el-button>
            <el-button type="text">批量设置</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-top" circle />
            <el-button type="success" size="mini" icon="el-icon-bottom" circle />
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="cell.data.object.globalCookies.splice(scope.$index,1)" />
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全局 Header" name="globalHeaders">
      <el-table
        :data="cell.data.object.globalHeaders"
        element-loading-text="加载中..."
        empty-text="暂未设置全局 Header"
        stripe
        border
        size="mini"
        max-height="136"
      >
        <el-table-column label="Header 名称" prop="headerName">
          <template slot-scope="scope">
            <el-input v-model="scope.row.headerName" size="mini" placeholder="请输入 Header 名称" />
          </template>
        </el-table-column>
        <el-table-column label="Header 值" prop="headerValue">
          <template slot-scope="scope">
            <textarea ref="codemirror_headerValue" v-model="scope.row.headerValue" codemirror="headerValue" placeholder="请输入 Header 值" />
          </template>
        </el-table-column>
        <el-table-column label="Header 描述" prop="headerDescription">
          <template slot-scope="scope">
            <el-input v-model="scope.row.headerDescription" size="mini" placeholder="请输入 Header 描述" />
          </template>
        </el-table-column>
        <el-table-column align="right" width="150px">
          <template slot="header">
            <el-button type="text" @click="cell.data.object.globalHeaders.push({})">添加一个</el-button>
            <el-button type="text">批量设置</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-top" circle />
            <el-button type="success" size="mini" icon="el-icon-bottom" circle />
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="cell.data.object.globalHeaders.splice(scope.$index,1)" />
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
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
      tabActiveName: 'globalProperties'
    }
  },
  mounted() {
    this.cell.data.setDefaultValue('globalParameters', [])
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
