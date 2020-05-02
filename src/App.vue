<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  isDevelopment
} from '@/util/util.js'
export default {
  name: 'App',
  methods: {
    ...mapMutations(['setRoutesConfig']),
    loadDefaultRoutes() {
      let loadRoutes = this.$config.loadRoutes || []
      // 加入开发者配置路由
      if (isDevelopment() && this.$config.development.loadRoutes.length && this.$config.development.loadRoutes.length > 0) {
        loadRoutes = loadRoutes.concat(this.$config.development.loadRoutes)
      }
      loadRoutes.forEach(element => {
        import('@/' + element).then(data => {
          this.setRoutesConfig(data.default)
        })
      })
    }
  },
  mounted() {
    this.loadDefaultRoutes()
  }
}
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
