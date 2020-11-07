// 封装存储模块 使用 localStorage 对vuex 中的数据进行本地保存（持久化）
// localStorage 的三个 api
// 1 设置
const historyKey = 'hm-mobile-70-history'
export const setItem = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj))
}
// 2 获取
export const getItem = name => {
  return JSON.parse(localStorage.getItem(name))
}

// 清除
export const removeItem = name => {
  localStorage.removeItem(name)
}
// 4 获取历史
export const getHistory = () => {
  return JSON.parse(localStorage.getItem(historyKey)) || []
}

// 5 设置历史
export const setHistory = (arr) => {
  localStorage.setItem(historyKey, JSON.stringify(arr))
}
