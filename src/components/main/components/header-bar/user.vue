<template>
  <div class="user-avatar-dropdown">
    <Dropdown trigger="click" @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar v-if="userInfo.headimg" size="large" :src="userInfo.headimg"></Avatar>
        <Avatar
          v-else-if="userInfo.nickname"
          size="large"
        >{{userInfo.nickname.length>1?userInfo.nickname.substr(0,1):userInfo.nickname}}</Avatar>
        <Avatar v-else size="large" icon="md-person"></Avatar>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          {{$t('components.header.userMessage')}}
          <Badge :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">{{$t('components.header.userLogout')}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { logout } from '@/api/user.js'
export default {
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    messageUnreadCount() {
      return 0
    }
  },
  methods: {
    handleClick(name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    },
    logout() {
      logout(data => {
        this.$store.commit('initUserInfo', this)
      }, data => {
        this.$store.commit('initUserInfo', this)
      })
    }
  }
}
</script>
<style lang="less">
.main {
  .header-bar-right {
    .user {
      &-avatar-dropdown {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        .ivu-badge-dot {
          top: 12px;
        }
      }
    }
  }
}
</style>
