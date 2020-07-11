import request from '@/util/request.js'

export const list = (params, succFun, errFun) => {
  request.get('variable/list', params, succFun, errFun)
}
