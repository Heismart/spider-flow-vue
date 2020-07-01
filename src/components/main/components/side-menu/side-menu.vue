<template>
  <Layout class="side-menu-wrapper">
    <Header class="header">
      <h1 v-show="!isCollapsed">{{appName}}</h1>
    </Header>
    <Content class="content">
      <!-- 组装菜单 -->
      <Menu
        v-show="!isCollapsed"
        theme="dark"
        accordion
        width="auto"
        :active-name="activeName"
        :open-names="openNames"
      >
        <side-menu-item :menu-list="menuList"></side-menu-item>
      </Menu>
      <div class="side-menu-collapsed" v-show="isCollapsed">
        <template v-for="item in menuList">
          <template v-if="item.meta.hideInMenu != 1">
            <!-- 子菜单大于1 -->
            <side-collapsed-menu
              v-if="item.children && item.children.length > 1"
              :item="item"
              hide-title
              :key="`drop-menu-${item.name}`"
            ></side-collapsed-menu>
            <!-- 子菜单等于1 -->
            <Tooltip
              transfer
              v-else-if="item.children && item.children.length === 1"
              :content="item.children[0].name"
              placement="right"
              :key="`drop-menu-${item.children[0].name}`"
            >
              <router-link :to="{name: item.children[0].name}" class="drop-menu-a">
                <i :class="item.children[0].meta.icon" style="font-size: 20px"></i>
              </router-link>
            </Tooltip>
            <!-- 不存在子菜单 -->
            <Tooltip
              transfer
              v-else
              :content="item.name"
              placement="right"
              :key="`drop-menu-${item.name}`"
            >
              <router-link :to="{name: item.name}" class="drop-menu-a">
                <i :class="item.meta.icon" style="font-size: 20px"></i>
              </router-link>
            </Tooltip>
          </template>
        </template>
      </div>
    </Content>
  </Layout>
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
  methods: {
  }
}
</script>
<style lang="less">
@import "./side-menu.less";
</style>
