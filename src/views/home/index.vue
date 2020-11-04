<template>
  <div class="home">
    <van-tabs>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList @show-more="handleShowMore" :channel="item"></ArticleList>
        <van-popup v-model="showMore" :style="{ width: '80%' }">
            <MoreAction></MoreAction>
        </van-popup>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      channels: [], // 当前用户的频道列表
      showMore: false // 是否显示弹窗
    }
  },
  components: {
    ArticleList,
    MoreAction
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const result = await reqGetChannels()
      this.channels = result.data.data.channels
    },
    handleShowMore () {
      this.showMore = true
    }

  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  padding-top: 46px;
  box-sizing: border-box;
  overflow: hidden;

  .van-tabs {
    height: 100%;
    padding-top: 50px;
    // 导航部分
    .van-tabs__wrap {
      position:fixed;
      top: 46px;
      left: 0px;
      right: 30px;
    }
    // 内容部分
    .van-tabs__content {
      height: 100%;
      overflow: scroll;
      .van-tab__pane {
        padding-bottom: 100px;
      }
    }
  }
}
</style>
