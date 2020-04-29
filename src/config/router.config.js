import {
  UserLayout,
  TabLayout
} from '@/components/layouts'
import config from '@/config/system.config'
import routerDev from '@/config/router.config.dev'

/**
 * 走菜单，走权限控制
 */
export const asyncRouterMap = [{
    path: '/',
    name: 'dashboard',
    component: TabLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/workplace',
    children: []
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
let addRouters = []
if (config.isDev === true) {
  addRouters = routerDev;
}
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
      path: 'login',
      name: 'login',
      component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
    }]
  },
  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/404')
  },
].concat(routerDev)