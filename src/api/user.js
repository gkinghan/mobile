import store from '@/store/index.js'

/**
 * 用户axios请求
 */
import http from '@/utils/request.js'

/**
 * 用户登录（注册）
 * @param {*} mobile 手机号
 * @param {*} code 验证码  246810
 */
export const reqLogin = (mobile, code) => {
  return http({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 请求用户个人信息
 */
export const reqGetProfile = () => {
  const token = store.state.tokenInfo.token
  return http({
    method: 'get',
    url: '/app/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// 关注
export const reqFollow = (id) => {
  return http({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: id
    }
  })
}

/**
 * 取关用户
 * @param {*} id id
 */
export const reqUnFollow = (id) => {
  return http({
    method: 'delete',
    url: `/app/v1_0/user/followings/${id}`
  })
}
/**
 * 获取用户自己信息
 */
export const reqGetUser = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
