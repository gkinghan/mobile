import http from '@/utils/request'

/**
 * 对文章进行评论
 * @param {*} articleId 编号id
 * @param {*} content 评论内容
 */
export const reqAddComment = (articleId, content) => {
  return http({
    method: 'post',
    url: '/app/v1_0/comments',
    data: {
      target: articleId,
      content
    }
  })
}

/**
 * 获取文章评论
 * @param {*} articleId
 * @param {*} offset 获取评论数据的偏移量 值为评论id，表示从此id的数据线后取 不传表示从第一页开始读取数据
 */
export const reqGetComment = (articleId, offset) => {
  return http({
    method: 'get',
    url: '/app/v1_0/comments',
    params: {
      type: 'a',
      source: articleId,
      offset
    }
  })
}