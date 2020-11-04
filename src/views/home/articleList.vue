<template>
  <div class="articleList">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" >
            <template #label>
              <van-grid :column-num="item.cover.images.length">
                <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                  <van-image :src="img" />
                </van-grid-item>
              </van-grid>

            <!-- 文字说明 -->
            <div class="meta">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate | relative}}</span>
              <!-- 只有登录的用户, 才能看见这个 x 按钮 -->
              <span @click="close" class="close" v-if="tokenInfo.token">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
            </template>
          </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/article.js'
import { mapState } from 'vuex'

export default {
  name: 'ArticleList',
  created () {

  },
  props: ['channel'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isRefreshing: false
    }
  },
  computed: {
    ...mapState(['tokenInfo'])
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
    },
    // 下拉刷新
    async onRefresh () {
      console.log('下拉刷新了')
      // 1. 取回最新的文章 (要传入最新的时间戳)
      const result = await reqGetArticles(this.channel.id, +new Date())
      // 2. 将数据覆盖到 list中
      this.list = result.data.data.results
      // 3. 提示更新结果
      this.$toast.success('刷新成功')
      // 4. 结束loading状态
      this.isRefreshing = false
    },
    close () {
      this.$emit('show-more')
    }
  }
}
</script>

<style lang="scss" scoped>
.articleList {
  .meta {
    span {
      margin-right:10px;
    }
    .close{
      float: right;
      margin-top: 4px;
    }
  }
}
</style>
