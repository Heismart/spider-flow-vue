<template>
  <Dropdown ref="dropdown" :transfer="true" :placement="placement" @on-click="goPage">
    <a
      @click="goPage(item)"
      @mouseover="handleMousemove($event, item.children)"
      class="drop-menu-a"
      type="text"
    >
      <i :class="item.meta.icon" style="font-size: 20px"></i>
      <span class="menu-title" v-if="!hideTitle">{{ item.name }}</span>
      <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in item.children">
        <collapsed-menu v-if="child.children" :item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
          <i :class="item.meta.icon" style="font-size: 16px"></i>
          <span class="menu-title">{{ child.name }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  props: {
    // 是否展开
    isCollapsed: Boolean,
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      placement: 'right-end'
    }
  },
  methods: {
    handleMousemove(event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    },
    goPage(name) {
      if (typeof name === 'string') {
        for (let i = 0; i < this.item.children.length; i++) {
          if (name === this.item.children[i].name) {
            this.$router.push({ name: this.item.children[i].name })
          }
        }
      } else {
        this.$router.push({ name: this.item.name })
      }
    }
  }
}
</script>
