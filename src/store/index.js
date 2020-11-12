import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utils/storage.js'
import { reqGetChannels, reqGetAllChannels } from '@/api/channels.js'

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
    },
    // 移出tokenInfo的信息, 恢复成空对象
    removeItem (state) {
      state.tokenInfo = {}
      // 更新到本地, 本地可以清掉token信息
      removeItem()
    },
    // 设置channels数据 (给我什么channels数组, 就设置什么)
    setChannels (state, channels) {
      state.channels = channels
    },
    // 往channels后面追加一项
    addChannel (state, channel) {
      state.channels.push(channel)
    },
    // 删除一项
    delChannel (state, channel) {
      state.channels = state.channels.filter(item => item.id !== channel.id)
    },

    // 设置allChannels数据 (给我什么channels数组, 就设置什么)
    setAllChannels (state, allChannels) {
      state.allChannels = allChannels
    }
  },
  actions: {
    // 获取channels数据, 存到vuex中
    async getChannelsAsync (context) {
      // 发送请求, 获取channels的数据
      const res = await reqGetChannels()
      context.commit('setChannels', res.data.data.channels)
    },

    // 获取allChannels全部频道数据, 存到vuex中
    async getAllChannelsAsync (context) {
      const res = await reqGetAllChannels()
      context.commit('setAllChannels', res.data.data.channels)
    }
  },
  modules: {
  },
  getters: {
    // 可选频道
    optionalChannels: (state) => {
      const arr = state.allChannels.filter(item => {
        // item 如果在 channels 中不存在, 就需要保留下来
        // 尝试能找到 id 相同的项
        const index = state.channels.findIndex(channel => channel.id === item.id)
        // index 只要是 -1 表示不存在, 才保留
        return index === -1
      })
      return arr
    }
  }
})
