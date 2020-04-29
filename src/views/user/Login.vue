<template>
  <div class="main">
    <a-form :form="form" class="user-layout-login" id="formLogin" ref="formLogin">
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登陆">
          <a-form-item>
            <a-input
              placeholder="请输入帐户名"
              size="large"
              type="text"
              v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
            >
              <a-icon :style="{ color: 'rgba(0,0,0,.25)' }" slot="prefix" type="user" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              autocomplete="false"
              placeholder="密码"
              size="large"
              type="password"
              v-decorator="['password',validatorRules.password]"
            >
              <a-icon :style="{ color: 'rgba(0,0,0,.25)' }" slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <!-- <a-form-item>
        <a-checkbox
          v-decorator="['rememberMe', {initialValue: true, valuePropName: 'checked'}]"
        >自动登陆</a-checkbox>
        <router-link :to="{ name: 'alteration'}" class="forge-password" style="float: right;">忘记密码</router-link>
        <router-link
          :to="{ name: 'register'}"
          class="forge-password"
          style="float: right;margin-right: 10px"
        >注册账户</router-link>
      </a-form-item>-->

      <a-form-item style="margin-top:24px">
        <a-button
          :disabled="loginBtn"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          class="login-button"
          htmlType="submit"
          size="large"
          type="primary"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import Vue from 'vue'
import { ACCESS_TOKEN, ENCRYPTED_STRING } from '@/store/mutation-types'
import { putAction, postAction, getAction } from '@/api/manage'
import store from '@/store/'
import { USER_INFO } from '@/store/mutation-types'
import config from '@/config/system.config'

export default {
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      form: this.$form.createForm(this),
      validatorRules: {
        username: { rules: [{ required: true, message: '请输入用户名!' }, { validator: this.handleUsernameOrEmail }] },
        password: { rules: [{ required: true, message: '请输入密码!', validator: 'click' }] }
      },
      currdatetime: ''
    }
  },
  created() {
    this.currdatetime = new Date().getTime()
    Vue.ls.remove(ACCESS_TOKEN)
    this.getRouterData()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        this.loginType = 0
      } else {
        this.loginType = 1
      }
      callback()
    },
    handleTabClick(key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit() {
      if (config.isDev === true) {
        this.loginSuccess()
        return
      }
      let that = this
      let loginParams = {}
      that.loginBtn = true
      // 使用账户密码登陆
      if (that.customActiveKey === 'tab1') {
        that.form.validateFields(['username', 'password'], { force: true }, (err, values) => {
          if (!err) {
            loginParams.username = values.username
            loginParams.password = values.password
            console.log('登录参数', loginParams)
            that
              .Login(loginParams)
              .then(res => {
                this.loginSuccess()
              })
              .catch(err => {
                that.requestFailed(err)
              })
          } else {
            that.loginBtn = false
          }
        })
      }
    },
    loginSuccess() {
      this.$router.push({ name: 'dashboard' })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '登录失败',
        description: ((err.response || {}).data || {}).message || err.message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.loginBtn = false
    },
    getRouterData() {
      this.$nextTick(() => {
        if (this.$route.params.username) {
          this.form.setFieldsValue({
            username: this.$route.params.username
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
<style>
.valid-error .ant-select-selection__placeholder {
  color: #f5222d;
}
</style>