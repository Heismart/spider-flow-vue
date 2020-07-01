<template>
  <a-layout class="main">
    <a-layout-sider
      class="side-menu"
      ref="mainSider"
      v-model="isCollapsed"
    >
      <side-menu :active-name="$route.name" :is-collapsed="isCollapsed" :menu-list="menuList"></side-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header-con">
        <header-bar :is-collapsed="isCollapsed" @on-collapsed-sider="collapsedSider"></header-bar>
      </a-layout-header>
      <a-layout-content class="main-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import './main.less'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'

export default {
  components: {
    SideMenu,
    HeaderBar
  },
  data() {
    return {
      // 是否展开侧边栏
      isCollapsed: false
    }
  },
  computed: {
    // 导航菜单列表
    menuList() {
      return this.$store.state.routesConfig
    }
  },
  methods: {
    // 展开侧边栏
    collapsedSider() {
      this.$refs.mainSider.toggleCollapse()
    }
  }
}
</script>
