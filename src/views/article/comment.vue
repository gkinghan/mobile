<template>
  <div class="article-comments">
    <!-- 评论列表 -->
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="(item, index) in list"
    :key="index"
  >
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px;"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
    <div slot="label">
      <p style="color: #363636;">{{item.content}}</p>
      <p>
        <span style="margin-right: 10px;">{{ item.pubdate | relative }}</span>
        <van-button size="mini" type="default">回复</van-button>
      </p>
    </div>
    <van-icon slot="right-icon" name="like-o" />
  </van-cell>
</van-list>
<!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model="content"
      >
        <van-button @click="addComment" slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { reqAddComment, reqGetComment } from '@/api/comment.js'

export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: '', // 内容
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    async onLoad () {
      // console.log('加载更多')
      const res = await reqGetComment(this.articleId, this.offset)
      const arr = res.data.data.result
      this.list = [...this.list, ...arr]
      this.loading = false
      if (arr.length === 0) {
        this.finished = true
      }
      this.offset = res.data.data.last_id
    },
    async addComment () {
      if (this.content === '') return
      try {
        const res = await reqAddComment(this.articleId, this.content)
        this.list.unshift(res.data.data.new_obj)
        console.log(this.list)
        this.content = ''
        this.$totast.success('发布成功')
      } catch (e) {
        console.log(e)
        this.$totast.fail('失败，评论已关闭')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
