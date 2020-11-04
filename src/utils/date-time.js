// 封装用于处理时间的格式化方法
// dayjs: 日期格式化插件
// 格式化日期的方法
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// 加载语言文件
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

// 1 基本格式化时间
export function formatTime (val) {
  return dayjs(val).format('YYYY年MM月DD日 HH:mm:ss')
}

// 2 相对时间
//  to(时间) 距离某个时间过去了多久
//  toNow（）   距离现在过去了多久
export function getRelativeTime (val) {
  return dayjs(val).fromNow()
}
