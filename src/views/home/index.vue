<template>
  <div class="home">
    <van-tabs>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList @show-more="handleShowMore" :channel="item"></ArticleList>
      </van-tab>
    </van-tabs>
        <!-- 小图标 -->
        <div @click="showChannelEdit = true" class="bar-btn">
          <van-icon name="wap-nav"/>
        </div>
        <!-- 弹出层 -->
        <van-popup v-model="showMore" :style="{ width: '80%' }">
            <MoreAction @report='report' @dislike="dislike"></MoreAction>
        </van-popup>

        <!-- action-sheet 底部栏目管理的面板 -->
        <van-action-sheet v-model="showChannelEdit" title="标题">
          <ChannelEdit></ChannelEdit>
        </van-action-sheet>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels.js'
import ChannelEdit from './channelEdit.vue'
import { reqDislikeArticle, reqReportArticle } from '@/api/article.js'
import ArticleList from './articleList.vue'
import MoreAction from './moreAction.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0, // tabs组件正在高亮的下标
      channels: [], // 当前用户的频道列表
      showMore: false, // 是否显示弹窗
      articleId: null, // 存储正在操作的id
      showChannelEdit: false
    }
  },
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const result = await reqGetChannels()
      this.channels = result.data.data.channels
    },
    handleShowMore (articleId) {
      this.showMore = true
      this.articleId = articleId
      console.log(this.articleId)
    },
    async dislike () {
      // 1 发送请求
      await reqDislikeArticle(this.articleId)
      // console.log(res)
      // 2 关闭弹窗
      this.showMore = false
      // 3 删除数据  本地删除
      // 在父组件index.vue中 删除子组件中articleList中的数据
      this.$eventBus.$emit('del-article', {
        channelId: this.channels[this.active].id,
        articleId: this.articleId
      })
    },

    async report (typeId) {
      console.log(typeId)
      // 1. 调用接口
      await reqReportArticle(this.articleId, typeId)
      // 2. 关闭弹层
      this.showMore = false
      // 3. 删除文章

      this.$eventBus.$emit('del-article', {
        articleId: this.articleId,
        channelId: this.channels[this.active].id
      })
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
  .bar-btn {
  position: fixed;
  right: 5px;
  top: 57px;
  display: flex;
  align-items: center;
  background-color: #fff;
  opacity: 0.8;
  z-index:1;
  .van-icon-wap-nav{
    font-size: 20px;
  }
}
}
</style>
