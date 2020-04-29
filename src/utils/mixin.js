// import Vue from 'vue'
import {
  mapState
} from "vuex";
import config from "@/defaultSettings";

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  data() {
    return {
      layoutMode: config.layout,
      navTheme: config.navTheme,
      primaryColor: config.primaryColor,
      colorWeak: config.colorWeak,
      fixedHeader: config.fixedHeader,
      fixSiderbar: config.fixSiderbar,
      contentWidth: config.contentWidth,
      autoHideHeader: config.autoHideHeader
    }
  },
  computed: {
    ...mapState({
      sidebarOpened: state => state.user.sidebar.opened
    })
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.user.device,
    })
  },
  methods: {
    isMobile() {
      return this.device === 'mobile'
    },
    isDesktop() {
      return this.device === 'desktop'
    }
  }
}

export {
  mixin,
  mixinDevice
}