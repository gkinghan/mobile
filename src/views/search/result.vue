<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.query.keyword + '的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        @click="$router.push('/article/' + item.art_id.toString())"
        v-for="item in list"
        :key="item.art_id.toString()"
        :title="item.title"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { reqGetSearchList } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1 // 当前页

    }
  },

  methods: {
    async onLoad () {
      // 1 发送请求 获取数据
      const res = await reqGetSearchList(this.page, this.$route.query.keyword)
      const arr = res.data.data.results
      this.list = [...this.list, ...arr]
      //
      this.page++
      // 2 关闭加塞状态（关闭节流阀） 让下次能够执行
      this.loading = false
      // 3 判断是否数据已经加载完成
      if (arr.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  .article-list {
    margin-top: 39px;
  }
}
</style>
