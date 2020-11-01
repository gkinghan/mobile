// 封装存储模块 使用 localStorage 对vuex 中的数据进行本地保存（持久化）
// localStorage 的三个 api
// 1 设置
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
