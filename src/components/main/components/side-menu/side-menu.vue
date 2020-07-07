<template>
  <a-layout class="side-menu-wrapper">
    <a-layout-header class="header">
      <h1>{{appName}}</h1>
    </a-layout-header>
    <a-layout-content class="content">
      <!-- 组装菜单 -->
      <a-menu mode="inline" v-show="!isCollapsed">
        <side-menu-item :menu-list="menuList"></side-menu-item>
      </a-menu>
      <div class="side-menu-collapsed" v-show="isCollapsed">
        <template v-for="item in menuList">
          <template v-if="item.meta.hideInMenu != 1">
            <!-- 子菜单大于1 -->
            <side-collapsed-menu
              :item="item"
              :key="`drop-menu-${item.name}`"
              hide-title
              v-if="item.children && item.children.length > 1"
            ></side-collapsed-menu>
            <!-- 子菜单等于1 -->
            <a-tooltip
              :content="item.children[0].name"
              :key="`drop-menu-${item.children[0].name}`"
              placement="right"
              transfer
              v-else-if="item.children && item.children.length === 1"
            >
              <router-link :to="{name: item.children[0].name}" class="drop-menu-a">
                <i :class="item.children[0].meta.icon" style="font-size: 20px"></i>
              </router-link>
            </a-tooltip>
            <!-- 不存在子菜单 -->
            <a-tooltip
              :content="item.name"
              :key="`drop-menu-${item.name}`"
              placement="right"
              transfer
              v-else
            >
              <router-link :to="{name: item.name}" class="drop-menu-a">
                <i :class="item.meta.icon" style="font-size: 20px"></i>
              </router-link>
            </a-tooltip>
          </template>
        </template>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import SideCollapsedMenu from './side-collapsed-menu.vue'

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem,
    SideCollapsedMenu
  },
  props: {
    // 需要展示的菜单
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否展开
    isCollapsed: Boolean
  },
  computed: {
    appName() {
      return this.$config.appName
    },
    activeName() {
      return this.$route.name
    },
    openNames() {
      let openNames = []
      for (let i = 0; i < this.$route.matched.length; i++) {
        openNames.push(this.$route.matched[i].name)
      }
      return openNames
    }
  },
  mounted() {
    console.log(this.menuList)
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
