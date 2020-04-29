import {
  axios
} from '@/utils/request'

// 获取爬虫列表
export function getSpiderList(params) {
  return axios({
    url: '/spider/list',
    method: 'get',
    params
  })
}

// 开启定时任务
export function start(params) {
  return axios({
    url: '/spider/start',
    method: 'get',
    params
  })
}

// 关闭定时任务
export function stop(params) {
  return axios({
    url: '/spider/stop',
    method: 'get',
    params
  })
}

// 获取所有的 grammers
export function getGrammers(data) {
  return axios({
    url: '/spider/grammers',
    method: 'post',
    data
  })
}
