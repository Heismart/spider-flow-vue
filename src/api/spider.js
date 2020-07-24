import request from '@/util/request.js'

const suffix = 'spider/'
// 查询爬虫列表
export const listRequest = (params, succFun, errFun) => {
  request.send(suffix + 'list', params, succFun, errFun)
}
// 启动/停止定时
export const startStopRequest = (isStart, id, succFun, errFun) => {
  request.send(suffix + (isStart ? 'start' : 'stop'), {
    id
  }, succFun, errFun)
}
