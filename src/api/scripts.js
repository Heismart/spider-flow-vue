import request from '@/util/request.js'

const suffix = 'script/'

export const listAction = (succFun, errFun) => {
  request.send(suffix + 'list', null, succFun, errFun)
}

export const filesAction = (script, succFun, errFun) => {
  request.send(suffix + 'files', {
    script
  }, succFun, errFun)
}
