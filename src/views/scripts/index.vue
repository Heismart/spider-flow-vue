<template>
  <a-card class="scripts-content">
    <a-layout>
      <a-layout-sider>
        <a-layout-header>
          <a-select :default-value="scrpitSelect" @change="scrpitHandleChange" style="width: 100%">
            <a-select-option value>请选择</a-select-option>
            <a-select-option
              :key="scrpitSelect + item"
              :value="item"
              v-for="item in scrpitFolder"
            >{{item}}</a-select-option>
          </a-select>
        </a-layout-header>
        <a-layout-content>
          <a-tree
            :replace-fields="replaceFields"
            :tree-data="currentFileList"
            @select="onTreeSelect"
          />
        </a-layout-content>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{ background: '#fff', padding: 0 }" />
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">content</div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-card>
</template>

<script>
import { listAction, filesAction } from '@/api/scripts.js'
export default {
  data() {
    return {
      scrpitFolder: [],
      scrpitSelect: '',
      currentFileList: [],
      replaceFields: {
        children: 'children',
        title: 'name'
      }
    }
  },
  computed: {
    treeList() {
      return this.currentFileList.map(item => {
        Object.assign(item, item.node)
        return item
      })
    }
  },
  methods: {
    scrpitHandleChange(value) {
      this.scrpitSelect = value
      filesAction(this.scrpitSelect, data => {
        this.currentFileList = data.data.children
      })
    },
    onTreeSelect(selectedKeys, e) {
      debugger
    },
    listAction() {
      listAction(data => {
        this.scrpitFolder = data.data
      })
    }
  },
  mounted() {
    this.listAction()
  }
}
</script>

<style lang="less">
.scripts-content {
  height: 100%;

  .ant-card-body {
    padding: 0;
    height: 100%;

    .ant-layout {
      height: 100%;
    }

    .ant-layout-header,
    .ant-layout-sider {
      background-color: #ffffff;
    }

    .ant-layout-header {
      padding: 0 10px;
    }
  }
}
</style>
