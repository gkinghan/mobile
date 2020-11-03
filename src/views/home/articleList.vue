<template #label>
  <div class="articleList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" >

            <van-grid :column-num="item.cover.images.length">
              <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                <van-image :src="img" />
              </van-grid-item>
            </van-grid>

          <!-- 文字说明 -->
          <div class="meta">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate}}</span>
          </div>
        </van-cell>
    </van-list>
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  created () {

  },
  props: ['channel'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 1 在一进入页面发现数据不够会触发。2 滑动到底部时自动触发
    async onLoad () {
      if (!this.timestamp) {
        this.timestamp = +new Date()
      }
      // 1 发送请求获取数据
      const res = await reqGetArticles(this.channel.id, this.timestamp)
      // 更新时间戳
      this.timestamp = res.data.data.pre_timestamp
      // 2 将数据追加
      const arr = res.data.data.results
      this.list = [...this.list, ...arr]
      // 3
      this.loading = false
      // 4 全部加载完成   finished改成true
      if (arr.length === 0) {
        this.finished = true
      }
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.articleList {
  .meta {
    span{
      margin-right: 10px;
    }
  }
}
</style>
