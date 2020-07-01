<template>
  <div class="side-menu-item">
    <template v-for="item1 in menuList">
      <template v-if="item1.meta.hideInMenu != 1">
        <!-- 子菜单大于1 -->
        <Submenu
          v-if="item1.children && item1.children.length > 1"
          :name="item1.name"
          :key="'side-menu-item' + item1.name"
        >
          <template slot="title">
            <div>
              <i :class="item1.meta.icon"></i>
              <span class="item-title">{{item1.name}}</span>
            </div>
          </template>
          <side-menu-item :menu-list="item1.children"></side-menu-item>
        </Submenu>
        <!-- 子菜单等于1 -->
        <side-menu-item
          v-else-if="item1.children && item1.children.length === 1"
          :key="'side-menu-item' + item1.name"
          :menu-list="[item1.children[0]]"
        ></side-menu-item>
        <!-- <MenuItem
          v-else-if="item1.children && item1.children.length === 1"
          :name="item1.children[0].name"
          :key="item1.children[0].name"
          :to="{name:item1.children[0].name}"
        >
          <i :class="item1.children[0].meta.icon"></i>
          <span class="item-title">{{item1.children[0].name}}</span>
        </MenuItem>-->
        <!-- 不存在子菜单 -->
        <MenuItem
          v-else
          :name="item1.name"
          :key="'side-menu-item' + item1.name"
          :to="{name:item1.name}"
        >
          <i :class="item1.meta.icon"></i>
          <span class="item-title">{{item1.name}}</span>
        </MenuItem>
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
