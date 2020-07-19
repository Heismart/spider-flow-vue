import request from '@/util/request.js'

export const listAction = (params, succFun, errFun) => {
  request.send('function/list', params, succFun, errFun)
}

export const deleteAction = (id, succFun, errFun) => {
  request.send('function/remove', {
    id
  }, succFun, errFun)
}

export const detailAction = (id, succFun, errFun) => {
  request.send('function/get', {
    id
  }, succFun, errFun)
}

export const saveAction = (params, succFun, errFun) => {
  delete params.createDate
  request.send('function/save', params, succFun, errFun)
}
