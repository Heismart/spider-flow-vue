let isDev = true
if (process.env.NODE_ENV === 'production') {
  isDev = false
}
export default {
  /**
   * 是否开发模式
   */
  isDev
}