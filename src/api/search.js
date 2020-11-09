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

/**
 * 获取搜索结果
 * @param {*} page  页码  第几页
 * @param {*} q 搜索关键字
 */
export const reqGetSearchList = (page, q) => {
  return http({
    method: 'get',
    url: '/app/v1_0/search',
    params: {
      page,
      q
    }
  })
}
