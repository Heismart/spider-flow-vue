<template>
  <div :class="['user-layout-wrapper', device]" id="userLayout">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img alt="logo" class="logo" src="~@/assets/logo.png" />
            <span class="title">Spider&nbsp;Flow</span>
          </a>
        </div>
        <div class="desc">新一代爬虫平台，以图形化方式定义爬虫流程，不写代码即可完成爬虫</div>
      </div>
      <div class="main">
        <keep-alive>
          <router-view v-if="keepAlive" />
        </keep-alive>
        <router-view v-if="!keepAlive" />
      </div>
      <global-footer />
    </div>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import GlobalFooter from '@/components/page/GlobalFooter'

export default {
  name: 'UserLayout',
  components: { GlobalFooter },
  mixins: [mixinDevice],
  data() {
    return {}
  },
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive
    }
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
            'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;
    }
  }
}
</style>