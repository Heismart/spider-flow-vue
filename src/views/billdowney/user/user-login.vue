<template>
  <a-row align="middle" class-name="user-login" justify="center" type="flex">
    <a-col>
      <a-card :padding="40" style="width:400px;">
        <h1 slot="title" style="padding:20px;text-align:center;">{{appName}}</h1>
        <a-form :model="formParams" :rules="ruleValidate" label-position="top" ref="formParams">
          <a-form-item label="用户名" prop="username">
            <a-input @keyup.enter.native="handleLogin" allowClear v-model="formParams.username">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item label="密码" prop="password">
            <a-input
              @keyup.enter.native="handleLogin"
              allowClear
              type="password"
              v-model="formParams.password"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
        </a-form>
        <Button
          :loading="loading"
          @click="handleLogin"
          long
          shape="circle"
          size="large"
          type="primary"
        >登录</Button>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { login } from '@/api/user.js'

export default {
  data() {
    return {
      formParams: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  computed: {
    appName() {
      return this.$config.appName
    }
  },
  methods: {
    handleLogin() {
      this.$refs.formParams.validate(valid => {
        if (valid) {
          this.loading = true
          login(
            this.formParams,
            data => {
              this.$store.commit('setUserInfo', data.data)
              this.$router.push({ name: this.$config.homeRouteName })
            },
            data => {
              this.$Message.error(data.msg)
              this.loading = false
            }
          )
        }
      })
    }
  }
}
</script>
<style lang="less">
.user-login {
  height: 100%;
  width: 100%;
  background: url('../../../assets/images/email-pattern.png');
}
</style>
