<template>
  <div class="side-menu-item">
    <template v-for="item1 in menuList">
      <template v-if="item1.meta.hideInMenu != 1">
        <!-- 子菜单大于1 -->
        <a-menu
          :key="'side-menu-item' + item1.name"
          :name="item1.name"
          v-if="item1.children && item1.children.length > 1"
        >
          <template slot="title">
            <div>
              <i :class="item1.meta.icon"></i>
              <span class="item-title">{{item1.name}}</span>
            </div>
          </template>
          <side-menu-item :menu-list="item1.children"></side-menu-item>
        </a-menu>
        <!-- 子菜单等于1 -->
        <side-menu-item
          :key="'side-menu-item' + item1.name"
          :menu-list="[item1.children[0]]"
          v-else-if="item1.children && item1.children.length === 1"
        ></side-menu-item>
        <!-- 不存在子菜单 -->
        <a-menu-item
          :key="'side-menu-item' + item1.name"
          :name="item1.name"
          :to="{name:item1.name}"
          v-else
        >
          <i :class="item1.meta.icon"></i>
          <span class="item-title">{{item1.name}}</span>
        </a-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SideMenuItem',
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="less">
.side-menu-wrapper {
  .side-menu-item {
    .ivu-menu-submenu-title {
      i {
        margin-right: 6px;
      }
    }
    .item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      width: 85%;
      vertical-align: middle;
    }
  }
}
</style>
