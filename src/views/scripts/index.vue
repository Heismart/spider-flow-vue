<template>
  <a-card class="scripts-content">
    <a-layout>
      <a-layout-sider width="300">
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
          <a-dropdown :trigger="['contextmenu']">
            <a-tree
              :expandedKeys="expandedKeys"
              :selectedKeys="selectedKeys"
              :treeData="treeData"
              @expand="onTreeExpand"
              @select="onTreeSelect"
              autoExpandParent
              show-icon
            >
              <a-icon slot="folder" type="folder" />
              <a-icon slot="file" type="file" />
            </a-tree>
          </a-dropdown>
        </a-layout-content>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="btns-group">
          <a-form layout="inline">
            <a-form-item>
              <a-button type="primary" v-show="isSelectFile() === false">新建脚本</a-button>
              <a-dropdown :trigger="['click']" v-show="isSelectFile()">
                <a-menu @click="handleMenuClick" slot="overlay">
                  <a-menu-item key="newFile" v-show="currentFile.directory">新建文件</a-menu-item>
                  <a-menu-item key="newFolder" v-show="currentFile.directory">新建文件夹</a-menu-item>
                  <a-menu-item key="rename">重命名</a-menu-item>
                  <a-menu-item key="delete">删除</a-menu-item>
                </a-menu>
                <a-button type="primary">
                  操作
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
              <a-button type="primary">重载文件</a-button>
              <a-button type="primary">保存当前文件</a-button>
            </a-form-item>
            <a-form-item label="选中文件名">{{currentFile.name}}</a-form-item>
            <a-form-item label="运行参数">
              <a-input placeholder="请输入运行参数"></a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary">测试运行</a-button>
            </a-form-item>
          </a-form>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">content</div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-modal
      :title="modal.title"
      @ok="handleModal"
      cancel-text="取消"
      ok-text="确认"
      v-model="modal.show"
    >
      <input v-model="modal.value" />
    </a-modal>
  </a-card>
</template>

<script>
import { listRequest, filesRequest, removeRequest } from '@/api/scripts.js'
export default {
  data() {
    return {
      scrpitFolder: [],
      scrpitSelect: '',
      currentFileList: [],
      selectedKeys: [],
      expandedKeys: [],
      currentFile: {
        directory: false,
        name: ''
      },
      modal: {
        title: '弹窗标题',
        value: '',
        show: false
      }
    }
  },
  computed: {
    treeData() {
      let list = getTreeNode(this.currentFileList)

      function getTreeNode(item, parentItem) {
        return item.map(element => {
          let obj = { ...element.node }
          obj.key = (parentItem ? parentItem.key + '/' : '') + obj.name
          obj.title = obj.name
          if (element.children) {
            obj.children = getTreeNode(element.children, obj)
          }
          if (element.node.directory === true) {
            obj.slots = {
              icon: 'folder'
            }
          } else {
            obj.slots = {
              icon: 'file'
            }
          }
          return obj
        })
      }
      return list
    }
  },
  methods: {
    // 切换脚本
    scrpitHandleChange(value) {
      this.scrpitSelect = value
      this.currentFileList = []
      this.selectedKeys = []
      this.expandedKeys = []
      this.currentFile.name = value
      if (value) {
        filesRequest(this.scrpitSelect, data => {
          this.expandedKeys.push(data.data.node.name)
          this.currentFileList = [data.data]
        })
      }
    },
    onTreeSelect(selectedKeys, e) {
      this.selectedKeys = selectedKeys
      this.currentFile.name = selectedKeys[0]
      if (selectedKeys.length > 0) {
        this.currentFile.directory = e.selectedNodes[0].data.props.directory
      }
    },
    onTreeExpand(expandedKeys, e) {
      this.expandedKeys = expandedKeys
    },
    listAction() {
      listRequest(data => {
        this.scrpitFolder = data.data
        this.scrpitHandleChange('')
      })
    },
    handleMenuClick(e) {
      switch (e.key) {
        case 'newFile':
          this.openModal('请输入文件名称')
          break
        case 'newFolder':
          this.openModal('请输入文件夹名称')
          break
        case 'rename':
          this.openModal('重命名')
          break
        case 'delete':
          let filePath = this.currentFile.name.split('/')
          this.$confirm({
            title: '是否删除?',
            content: '确认删除：' + filePath[filePath.length - 1],
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              let params = {}
              params.file = ''
              params.scriptName = ''
              removeRequest(params, data => {
                this.$message.success(data.message)
              })
            }
          })
          break
      }
    },
    // 当前是否选中文件
    isSelectFile() {
      if (this.currentFile.name) {
        return true
      }
      return false
    },
    openModal(title, value) {
      this.modal.title = title
      this.modal.value = value
      this.modal.show = true
    },
    handleModal() {
      debugger
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

    .ant-layout-sider {
      overflow-y: auto;
    }

    .ant-layout-header {
      padding: 0 10px;
    }

    .btns-group {
      padding: 12px;

      .ant-form-item-children button {
        margin-right: 10px;
      }
    }
  }
}
</style>
