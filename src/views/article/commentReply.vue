<template>
<div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count + '条回复'">
      <van-icon @click="$emit('close')" slot="left" name="cross" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论 -->
    <van-cell title="当前评论">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}}</span>
      <div slot="label">
        <p style="color: #363636;">{{ comment.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{ comment.pubdate | relative }}</span>
          <van-button
            size="mini"
            type="default"
          >回复 {{ comment.reply_count }}</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->
    <van-divider>全部回复</van-divider>

    <!-- 对当前评论 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item"
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
            <span style="margin-right: 10px;">{{item.pubdate | relative }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入回复内容"
        v-model.trim="content"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="addApply"
        >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
</div>

</template>
<script>
import { reqAddCommentReply } from '@/api/comment.js'
export default {
  name: 'CommentReply',
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      content: ''
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      console.log('获取数据了')
      try {
        this.finished = true
      } catch (e) {
        console.log(e)
      }
    },
    async addApply () {
      if (this.content === '') return
      // 1 发送请求，添加评论
      const res = await reqAddCommentReply(this.comment.com_id.toString(), this.content, this.articleId)
      // 2 更新视图
      this.list.unshift(res.data.data.new_obj)
      // 3 回复的数量 +1
      this.comment.reply_count++
      // 4 清空评论区
      this.content = ''
      // 5 给提示
      this.$toast.success('成功!')
    }
  }
}
</script>
<style lang="scss" scoped>
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
