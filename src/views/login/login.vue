<template>
  <div class="login-container">
    <!-- 导航栏 --> 
    
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross"  class="esc"
      @click="$router.back()"/>
    </van-nav-bar>
    <!-- /导航栏 -->
     

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
      v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
      v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>

       
        <template #button>
             <van-count-down
                v-if="isShowCount"
                slot="button"
                :time="1000 * 60"
                format="ss s"
                @finish="isShowCount = false"
              />
              <van-button
                v-else
                slot="button"
                size="small"
                type="primary"
                round
                @click="onSumse"
              >发送验证码</van-button>

        </template>

      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import {login,getSmsCode} from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
        user:{
            mobile:'13911111111',
            code:'246810'
        },
        userFormRules:{
            mobile:[{required:true,message:"请输入手机号"},{pattern:/^1[3||5|8]\d{9}$/,message:"手机格式输入错误"}],
            code:[{required:true,message:"请输入验证码"},{pattern:/^\d{6}$/,message:"验证码格式输入错误"}]
        },
        isShowCount:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
   async onSubmit(){

       this.$toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration:0
         });

       try{
           const {data} = await login(this.user)
          //  console.log('登录成功',data);
           this.$store.commit('setUser',data.data)
           this.$toast.success('登录成功')
           this.$router.back()
        } catch (err) {
          console.log('登录失败', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
   },
   async onSumse(){
       try {
          await this.$refs.loginFrom.validate('mobile')
       }catch(err){
           return console.log('验证失败', err);
       }
       this.isShowCount = true

      try {
    await getSmsCode(this.user.mobile)
    this.$toast('发送成功')
  } catch (err) {
    // 发送失败，关闭倒计时
    this.isCountDownShow = false
    if (err.response.status === 429) {
      this.$toast('发送太频繁了，请稍后重试')
    } else {
      this.$toast('发送失败，请稍后重试')
    }
  }

   }
  

  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .esc {
    color: #000;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>