// 跟搜索相关的所有请求
import http from '@/utils/request.js'

/**
 * 获取联想建议
 * @param {*} q 搜索关键词
 */
export const reqGetSuggestion = (q) => {
  return http({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
