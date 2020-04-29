/**
 * 开发者模式导入的路由，所有的开发者菜单应添加到children里
 */
export default [{
  path: '/',
  name: 'dashboard',
  component: () => import('@/components/layouts/TabLayout'),
  meta: {
    title: '首页'
  },
  redirect: '/dashboard/analysis',
  children: [{
    path: '/dashboard/analysis',
    name: 'analysis',
    component: () => import('@/views/dashboard/Analysis'),
    meta: {
      title: '首页',
      icon: 'home'
    }
  }, {
    path: '/spider',
    component: () => import('@/components/layouts/RouteView'),
    meta: {
      title: '爬虫',
      icon: 'bug'
    },
    children: [{
      path: 'list',
      name: 'SpiderList',
      component: () => import('@/views/spider/list'),
      meta: {
        title: '爬虫列表',
        icon: 'ordered-list'
      }
    }, {
      path: 'add',
      name: 'AddOrUpdate',
      component: () => import('@/views/spider/add-or-update'),
      meta: {
        title: '添加爬虫',
        icon: '',
        activeMenu: '/spider/index'
      },
      hidden: true
    }]
  }]
}, {
  "path": "*",
  "redirect": "/404",
  "hidden": true
}]