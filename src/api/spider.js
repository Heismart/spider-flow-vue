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
// 修改cron表达式
export const cronRequest = (params, succFun, errFun) => {
  request.send(suffix + 'cron', params, succFun, errFun)
}
// 删除爬虫
export const removeRequest = (id, succFun, errFun) => {
  request.send(suffix + 'remove', {
    id
  }, succFun, errFun)
}
// 手动运行爬虫
export const runRequest = (id, succFun, errFun) => {
  request.send(suffix + 'run', {
    id
  }, succFun, errFun)
}
