/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  icon: (null) 该页面在左侧菜单、面包屑和标签导航处显示的图标
 *  desc: (null) 当前页面的描述
 *  hideInBread: (0) 设为1后此级路由将不会出现在面包屑中
 *  hideInMenu: (0) 设为1后在左侧菜单不会显示该页面选项
 *  notCache: (0) 设为1后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  login: (0) 设为1后该页面需要登录才能访问
 * }
 */
export default [{
  path: '/_home',
  name: '_home',
  component: () => import('@/components/main'),
  meta: {
    title: '_首页',
    icon: 'ivu-icon ivu-icon-md-home',
    hideInBread: 1
  },
  children: [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/billdowney/home/home.vue'),
    meta: {
      title: '首页',
      icon: 'ivu-icon ivu-icon-md-home',
      hideInBread: 1,
      login: 1
    }
  }]
}, {
  path: '/user_login',
  name: 'user_login',
  component: () => import('@/views/billdowney/user/user-login.vue'),
  meta: {
    title: '用户登录',
    icon: 'ivu-icon ivu-icon-md-person',
    hideInBread: 1,
    hideInMenu: 1
  }
}, {
  path: '/user_manage',
  name: 'user_manage',
  component: () => import('@/components/main'),
  meta: {
    title: '用户管理',
    icon: 'ivu-icon ivu-icon-md-person'
  },
  children: [{
    path: '/user_list',
    name: 'user_list',
    component: () => import('@/views/billdowney/user/user-list.vue'),
    meta: {
      title: '用户列表',
      icon: 'ivu-icon ivu-icon-md-person',
      login: 1
    }
  }]
}]
