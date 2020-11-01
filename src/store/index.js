import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)
// token 会往 vuex 中存一份, 便于响应式的控制视图, 便于获取

export default new Vuex.Store({
  // 存放数据的
  state: {
    // token数据
    // 使用本地存储中的数据进行初始化
    tokenInfo: getItem('tokenInfo') || {}
  },
  // 存放操作数据的方法
  mutations: {
    // 设置tokenInfo这个对象, 对象中有token信息
    setTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      // 一更新token，就往本地存一份 本地就可以实时的同步到vuex的数据
      setItem('tokenInfo', tokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})
