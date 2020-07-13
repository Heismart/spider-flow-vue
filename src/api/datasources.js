import request from '@/util/request.js'

export const listAction = (params, succFun, errFun) => {
  request.send('datasource/list', params, succFun, errFun)
}

export const deleteAction = (id, succFun, errFun) => {
  request.send('datasource/delete', {
    id
  }, succFun, errFun)
}

export const detailAction = (id, succFun, errFun) => {
  request.send('datasource/get', {
    id
  }, succFun, errFun)
}

export const saveAction = (params, succFun, errFun) => {
  delete params.createDate
  request.send('datasource/save', params, succFun, errFun)
}

export const testAction = (params, succFun, errFun) => {
  delete params.createDate
  request.send('datasource/test', params, succFun, errFun)
}
