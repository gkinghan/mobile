<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading" />
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail" v-else>
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image :src="article.aut_photo" round width="1rem" height="1rem" fit="fill" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relative}}</p>
        </div>
        <van-button
        @click="toggleFollow"
          round
          size="small"
          type="info"
        >{{ article.is_followed ? '取关' : '+ 关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content">

      </div>
      <van-divider>END</van-divider>
      <div class="zan">
        <van-button
            @click="toggleLike"
            round size="small"
            hairline
            type="primary"
            plain
            :icon="article.attitude === 1 ? 'good-job' : 'good-job-o'">
            {{article.attitude === 1 ? '取消点赞' : '点赞'}}
        </van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
            @click="toggleDislike"
            round size="small"
            hairline
            type="danger"
            plain
            icon="delete">
            {{ article.attitude === 0 ? '取消不喜欢' : '不喜欢' }}
        </van-button>
      </div>
    </div>
    <!-- /文章详情 -->

  </div>
</template>

<script>
import { reqGetArticleDetail, reqDelLike, reqAddLike, reqDeleteDisLike, reqAddDisLike } from '@/api/article.js'
import { reqFollow, reqUnFollow } from '@/api/user'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: { } // 默认空对象
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const res = await reqGetArticleDetail(this.$route.params.id)
      console.log(res)
      // 保存文章详情
      this.article = res.data.data
      // 取消加载状态
      this.loading = false
    },
    async toggleFollow () {
      try {
        if (this.article.is_followed) {
        // true 说明已经关注了   取关操作
          await reqUnFollow(this.article.aut_id)

          this.$toast.success('取关成功')
        } else {
        // 没关注   关注操作
          await reqFollow(this.article.aut_id)

          this.$toast.success('关注成功')
        }
        // 成功后更新视图, 直接更新状态即可
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('失败')
      }
    },
    // 切换点赞状态 1点赞了, 取消就是恢复成 -1
    async toggleLike () {
      try {
        // console.log(this.article.art_id.toString())
        if (this.article.attitude === 1) {
        // 点击时取消点赞
          await reqDelLike(this.article.art_id.toString())
          this.$toast.success('取消成功')
          this.article.attitude = -1
        } else {
        // 点赞
          await reqAddLike(this.article.art_id.toString())
          this.$toast.success('点赞成功')
          this.article.attitude = 1
        }
      } catch (e) {
        console.log(e)
        this.$toast.fail('失败')
      }
    },
    async toggleDislike () {
      try {
        if (this.article.attitude === 0) {
          await reqDeleteDisLike(this.article.art_id.toString())
          this.article.attitude = -1
        } else {
          await reqAddDisLike(this.article.art_id.toString())
          this.article.attitude = 0
        }
        this.$toast.success('成功')
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style lang='scss' scoped>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size:14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    ::v-deep img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}

</style>
