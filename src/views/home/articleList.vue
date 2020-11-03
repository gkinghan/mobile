<template>
  <div class="articleList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" />
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

<style>

</style>
