/**
 * 包含n个日期处理的工具函数模块
 */
export function formateDate(time: number | string) {
  if(!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}