<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- 输入框 -->
    <van-cell-group>
        <van-field
            v-model="mobile"
            required
            label="手机号"
            placeholder="请输入手机号"
            placehodlder="请输入手机号"
            :error-message="mobile_errmsg"
        />
        <van-field
            v-model="code"
            required
            label="验证码"
            placeholder="请输入验证码"
            :error-message="code_errmsg"
        />
    </van-cell-group>
    <div class="btn-wrap">
        <van-button @click="login" type="info">登录</van-button>
        <!-- <van-button @click="getInfo" type="info">获取用户信息</van-button> -->
    </div>
  </div>
</template>

<script>
import { reqLogin, reqGetProfile } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '13912345678',
      code: '246810',
      mobile_errmsg: '',
      code_errmsg: ''
    }
  },
  methods: {
    ...mapMutations(['setTokenInfo']),
    // 自定义一个校验方法   校验mobile和code的值
    validate () {
      if (this.mobile.trim() === '') {
        this.mobile_errmsg = '手机号不能为空'
        return false
      }
      if (!/^1\d{10}$/.test(this.mobile)) {
        this.mobile_errmsg = '手机号格式错误'
        return false
      }
      this.mobile_errmsg = ''

      if (this.code.trim() === '') {
        this.code_errmsg = '验证码不能为空'
        return false
      }
      this.code_errmsg = ''

      return true
    },
    async login () {
      // 登录之前做校验
      if (!this.validate()) { return }
      this.$toast.loading({
        duration: 0, // 持续展示 toast,永远不会关闭
        overlay: true, // 整体添加一个遮罩
        message: '加载中...',
        forbidClick: true
      })

      const res = await reqLogin(this.mobile, this.code)
      this.setTokenInfo(res.data.data)
      console.log(res.data)
      this.$toast.success('登录成功')
      this.$router.push('/')
    },
    async getInfo () {
      const res = await reqGetProfile()
      console.log(res.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
    .btn-wrap{
        padding: 20px;
        .van-button{
            width: 100%;
            height: 40px;
            border-radius: 5px;
        }
    }
}
</style>
