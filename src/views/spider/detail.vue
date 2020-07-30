<template>
  <a-layout class="spider-detail-container">
    <a-layout-header>
      <template v-for="(item,index) in headerBtns">
        <a-tooltip
          :key="'header-icon-' + index"
          :title="item.title"
          placement="bottom"
          v-if="item.type === 'ant'"
        >
          <a-icon :type="item.icon"></a-icon>
        </a-tooltip>
        <a-divider
          :key="'header-icon-' + index"
          type="vertical"
          v-else-if="item.type === 'divider'"
        />
      </template>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="100px"></a-layout-sider>
      <a-layout-content class="spider-content"></a-layout-content>
    </a-layout>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderBtnsJson from './json/header-btns.json'

export default {
  data() {
    return {
      queryParam: {
        flowId: ''
      },
      headerBtns: HeaderBtnsJson
    }
  },
  methods: {
    // 绑定键盘事件
    bindKeyEvent() {
      window.onkeydown = e => {
        e.preventDefault()
        let key = e.key
        this.headerBtns.forEach(element => {
          if (element.exeFunKey && element.exeFunKey.length > 0) {
            if (
              (element.exeFunKey.indexOf('ctrl') !== -1 &&
                e.ctrlKey === true &&
                element.exeFunKey.indexOf(key.toLowerCase()) !== -1) ||
              (element.exeFunKey.indexOf('alt') !== -1 &&
                e.altKey === true &&
                element.exeFunKey.indexOf(key.toLowerCase()) !== -1) ||
              element.exeFunKey.indexOf(key.toLowerCase()) !== -1
            ) {
              console.log(element.title)
            }
          }
        })
        console.log(key)
        console.log(e.keyCode)
        console.log(e.altKey)
        console.log(e.ctrlKey)
      }
    }
  },
  mounted() {
    this.queryParam.flowId = this.$route.params.flowId
    this.bindKeyEvent()
  },
  destroyed() {
    window.onkeydown = null
  }
}
</script>

<style lang="less">
@import './detail.less';
</style>
