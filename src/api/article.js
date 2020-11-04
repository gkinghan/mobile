// 文章列表请求
import http from '@/utils/request.js'

/**
 * 根据id和时间戳获取推荐数据
 * @param {*} channelId 频道id
 * @param {*} timestamp 时间戳    根据当前时间戳 完成推荐推送
 * @param {*} withTop 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含    写死 1
 */
export const reqGetArticles = (channelId, timestamp) => {
  return http({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 1
    }

  })
}

/**
 * 对文章不喜欢
 * @param {*} articleId 文章id
 */
export const reqDislikeArticle = (articleId) => {
  return http({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
