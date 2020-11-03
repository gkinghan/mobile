// 频道相关的请求
import http from '@/utils/request.js'

/**
 * 获取用户信息
 */
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
