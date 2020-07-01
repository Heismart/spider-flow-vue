<template>
  <div class="header-bar">
    <a-icon
      :class="rotateIcon"
      :style="{margin: '0 20px'}"
      @click.native="collapsedSider"
      size="24"
      type="md-menu"
    ></a-icon>
    <custom-bread-crumb :list="$route.matched"></custom-bread-crumb>
    <div class="header-bar-right">
      <user></user>
    </div>
  </div>
</template>
<script>
import CustomBreadCrumb from './custom-bread-crumb.vue'
import User from './user.vue'
export default {
  components: {
    CustomBreadCrumb,
    User
  },
  props: {
    // 是否展开
    isCollapsed: Boolean
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    }
  },
  methods: {
    collapsedSider() {
      this.$emit('on-collapsed-sider')
    }
  }
}
</script>
<style lang="less">
.main {
  .header-bar {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .header-bar-right {
    float: right;
    height: auto;
    & > * {
      float: right;
    }
  }
  .menu-icon {
    transition: all 0.3s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
}
</style>
