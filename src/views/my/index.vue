<template>
    <div class="my-container">
        <div class="header no_login" v-if="!user">
            <img src="@/assets/mobile.png"
            @click="$router.push('/login')">
            <span class="text">登录/注册</span>
            <!-- <span></span> -->
        </div>

        <div class="header user_info" v-else>

            <div class="base">
                <div class="base_info">
                <div class="left">
                    <van-image
                        
                        :src="userinfo.photo"
                        class="avatar" 
                        round
                        fit="cover"
                    />
                    <span>{{userinfo.name}}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round
                    to="/user/profile"
                    >编辑资料</van-button>
                </div>
            </div>
            <div class="data_start">
                <div class="data-item">
                    <span class="count">{{userinfo.art_count}}</span>
                    <span class="text">头条</span>
                </div>
                <div class="data-item">
                    <span class="count">{{userinfo.follow_count}}</span>
                    <span class="text">关注</span>
                </div>
                <div class="data-item">
                    <span class="count">{{userinfo.fans_count}}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="data-item">
                    <span class="count">{{userinfo.like_count}}</span>
                    <span class="text">获赞</span>
                </div>
            </div>

            </div>
                   
                  
        </div>

          <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item class="grid-item"> 
                <i slot="icon" class="iconfont icon-shoucang"></i>
                <span  slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item"> 
                <i slot="icon" class="iconfont icon-lishi"></i>
                <span  slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>
           <!-- 宫格导航 -->
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link  class="mb-9"/>
        <van-cell title="退出登录" class="logout-cell"
         v-if="user"
         @click="onlogout"/>
              
    </div>

</template>

<script>
import {mapState} from 'vuex'
import {getUserInfo} from '@/api/user.js'
export default {
    name:'MyPage',
    components:{},
    props:{},
 created () {
       if(this.user){
           this.loginUserInfo()
       }
   },
  mounted () {},
    watch:{},
    computed:{
        ...mapState(['user'])
    },
    data(){
        return {
            userinfo:{}
        }
    },
    methods:{

        // 退出登录
        onlogout(){
            this.$dialog.confirm({
            title: '确认退出吗？'
                        })
            .then(() => {
                this.$store.commit('setUser',null)
            })
            .catch(() => {
                console.log('取消执行这里')
            });
            },

            async loginUserInfo(){
                try {
                   const {data} = await getUserInfo()
                   this.userinfo = data.data
                   console.log(this.userinfo);
                }catch(err){
                    console.log(err)
                    this.$toast('获取数据失败')
                }
            }
        }
}
</script>

<style lang="less" scoped>
    .no_login {
        height: 361px;
        // background:url('@/assets/banner.png') ;
        background: url("~@/assets/banner.png") no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
            height: 132px;
            width: 132px;
        }
        .text {
            color: #fff;
            font-size: 28px;
        }
    }
    .user_info{
        background: url("~@/assets/banner.png") no-repeat;
        background-size: cover;
        .base_info {
            height: 231;
            // background-color: pink;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 76px 32px 23px;
            box-sizing: border-box;
            .left {
                display: flex;
                align-items: center;
                .avatar {
                    width: 132px;
                    height: 132px;
                    border: 1px solid #fff;
                    margin-right: 23px;
                }
                span {
                    font-size: 18px;
                    color: #fff;
                }
            }
        }
        .data_start {
            // height: 130px;
            // background-color: #ccc;
            display: flex;
            .data-item{
                flex: 1;
                height: 130px;
                font-size: 20px;
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

       
    } 
    .grid-nav {
        margin-bottom: 10px;
            .grid-item {
                height: 141px;
                .iconfont {
                    font-size: 40px;
                }
                span {
                    font-size: 28px;
                }
                .icon-shoucang{
                    color:#eb5253;
                }
                .icon-lishi{
                    color: #ff9d1d;
                }
            }
        }
        .logout-cell{
        margin-top: 10px;
        color:#eb5253;
        text-align: center;
        }
</style>