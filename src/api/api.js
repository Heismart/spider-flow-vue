import {
  getAction,
  deleteAction,
  putAction,
  postAction
} from '@/api/manage'


//权限管理
const getPermissionList = (params) => getAction("/sys/permission/list", params);
const queryPermissionsByUser = (params) => getAction("/sys/permission/getUserPermissionByToken", params);

export {
  getPermissionList,
  queryPermissionsByUser
}