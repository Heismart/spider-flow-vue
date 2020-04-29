## 介绍
平台以流程图的方式定义爬虫,是一个高度灵活可配置的爬虫平台

开源框架
<br/>https://www.antdv.com/docs/vue/introduce-cn/</br>
<br/>https://pro.loacg.com/</br>

## 开发介绍
### 1、目录介绍
- ├─api 接口
- ├─assets 资源文件
- │  └─less 样式
- ├─components 公用组件（非页面）
- │  ├─layouts 布局
- │  ├─menu 菜单
- │  ├─page 页面模块
- │  ├─setting 设置
- │  ├─tools 工具
- │  └─_util 工具包
- ├─config 配置信息
- ├─router 路由
- ├─store 全局变量
- │  └─modules 变量模块
- ├─utils 工具包
- │  └─encryption 加密工具
- └─views 视图页面

### 2、添加开发者菜单
<br/>src\config\router.config.dev.js</br>
格式和说明
----

```javascript
/**
 * 路由配置说明：
 * 建议：sider menu 请不要超过三级菜单，若超过三级菜单，则应该设计为顶部主菜单 配合左侧次级菜单
 *
 **/
 {
  redirect: noredirect,
  name: 'router-name',
  hidden: true,
  meta: {
    title: 'title',
    icon: 'a-icon',
    keepAlive: true,
    hiddenHeaderContent: true,
  }
}
```

`{ Route }` 对象

| 参数     | 说明                                      | 类型    | 默认值 |
| -------- | ----------------------------------------- | ------- | ------ |
| hidden   | 控制路由是否显示在 sidebar                | boolean | falase |
| redirect | 重定向地址, 访问这个路由时,自定进行重定向 | string  | -      |
| name     | 路由名称, 建议设置,且不能重名             | string  | -      |
| meta     | 路由元信息（路由附带扩展信息）            | object  | {}     |

`{ Meta }` 路由元信息对象
| 参数                | 说明                                                         | 类型    | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------- | ------ |
| title               | 路由标题, 用于显示面包屑, 页面标题 *推荐设置                 | string  | -      |
| icon                | 路由在 menu 上显示的图标，支持ant design官网图标               | string  | -      |
| keepAlive           | 缓存该路由                                                   | boolean | false  |
| hiddenHeaderContent | *特殊 隐藏 [PageHeader](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/layout/PageHeader.vue#L14) 组件中的页面带的 面包屑和页面标题栏 | boolean | false  |
| permission          | 与项目提供的权限拦截匹配的权限，如果不匹配，则会被禁止访问该路由页面 | array   | []     |

### 3、页面添加位置
全部的页面都放在src\views里建一个文件夹

