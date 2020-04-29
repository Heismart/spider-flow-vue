<template>
  <div :class="theme" class="user-wrapper">
    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <a-avatar :src="getAvatar()" class="avatar" size="small" />
        <span v-if="isDesktop()">欢迎您，{{ nickname() }}</span>
      </span>
      <a-menu class="user-dropdown-menu-wrapper" slot="overlay">
        <a-menu-item @click="updatePassword" key="4">
          <a-icon type="setting" />
          <span>密码修改</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <span class="action">
      <a @click="handleLogout" class="logout_title" href="javascript:;">
        <a-icon type="logout" />
        <span v-if="isDesktop()">&nbsp;退出登录</span>
      </a>
    </span>
    <user-password ref="userPassword"></user-password>
  </div>
</template>

<script>
import UserPassword from './UserPassword'
import { mapActions, mapGetters, mapState } from 'vuex'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'UserMenu',
  mixins: [mixinDevice],
  data() {
    return {
      searchMenuOptions: [],
      searchMenuComp: 'span'
    }
  },
  components: {
    UserPassword
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  created() {
    let lists = []
    this.searchMenus(lists, this.permissionMenuList)
    this.searchMenuOptions = [...lists]
  },
  computed: {
    ...mapState({
      // 后台菜单
      permissionMenuList: state => state.user.permissionList
    })
  },
  watch: {
    device: {
      immediate: true,
      handler() {
        this.searchMenuComp = this.isMobile() ? 'a-modal' : 'span'
      }
    }
  },
  methods: {
    hiddenClick() {
      this.shows = false
    },
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    getAvatar() {
      console.log('url = ' + this.avatar())
      return require('@/' + this.avatar())
    },
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              window.location.href = '/'
              //window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    updatePassword() {
      let username = this.userInfo().username
      this.$refs.userPassword.show(username)
    },
    searchMenus(arr, menus) {
      for (let i of menus) {
        if (!i.hidden && 'layouts/RouteView' !== i.component) {
          arr.push(i)
        }
        if (i.children && i.children.length > 0) {
          this.searchMenus(arr, i.children)
        }
      }
    },
    searchMethods(value) {
      let route = this.searchMenuOptions.filter(item => item.id === value)[0]
      if (route.meta.internalOrExternal === true || route.component.includes('layouts/IframePageView')) {
        window.open(route.meta.url, '_blank')
      } else {
        this.$router.push({ path: route.path })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-wrapper .search-input {
  width: 180px;
  color: inherit;

  /deep/ .ant-select-selection {
    background-color: inherit;
    border: 0;
    border-bottom: 1px solid white;
    &__placeholder,
    &__field__placeholder {
      color: inherit;
    }
  }
}
</style>

<style scoped>
.logout_title {
  color: inherit;
  text-decoration: none;
}
</style>