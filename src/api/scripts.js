import request from '@/util/request.js'

const suffix = 'script/'

export const listRequest = (succFun, errFun) => {
  request.send(suffix + 'list', null, succFun, errFun)
}

export const filesRequest = (script, succFun, errFun) => {
  request.send(suffix + 'files', {
    script
  }, succFun, errFun)
}

export const removeRequest = (params, succFun, errFun) => {
  request.send(suffix + 'remove/file', params, succFun, errFun)
}
