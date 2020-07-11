import request from '@/util/request.js'

export const list = (params, succFun, errFun) => {
  request.send('spider/list', params, succFun, errFun)
}
