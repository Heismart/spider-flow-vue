import request from '@/util/request.js'

export const listAction = (params, succFun, errFun) => {
  request.send('variable/list', params, succFun, errFun)
}

export const deleteAction = (id, succFun, errFun) => {
  request.send('variable/delete', {
    id
  }, succFun, errFun)
}

export const detailAction = (id, succFun, errFun) => {
  request.send('variable/get', {
    id
  }, succFun, errFun)
}

export const saveAction = (params, succFun, errFun) => {
  delete params.createDate
  request.send('variable/save', params, succFun, errFun)
}
