import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store/'
import {
  VueAxios
} from "@/utils/request"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'
import '@/permission' // permission control
import '@/utils/filter' // base filter
/*import '@babel/polyfill'*/
import {
  ACCESS_TOKEN
} from "@/store/mutation-types"
import hasPermission from '@/utils/hasPermission'

Vue.config.productionTip = false
Vue.use(Storage)
Vue.use(Antd)
Vue.use(VueAxios, router)
Vue.use(hasPermission)

new Vue({
  router,
  store,
  mounted() {
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
  },
  render: h => h(App)
}).$mount('#app')