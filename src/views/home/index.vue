<template>
    <div class="home-container">
         <van-nav-bar class="page-nav-bar"  fixed>
             <van-button slot="title" type="info" class="searchBtn"
             size="mini"
             round
             icon="search"
             to="/search">
             搜索
             </van-button>
        </van-nav-bar>

        <van-tabs class="channel_tabs" v-model="active" swipeable animated>
            <van-tab 
            v-for="channel in channels"
            :key="channel.id"
            :title="channel.name">
                <article-list :channel="channel"/>
            </van-tab>
            
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="humberge" @click="isChannelShow=true">
                <i class="iconfont icon-gengduo"></i>
            </div>
        </van-tabs>

        <van-popup
            v-model="isChannelShow"
            closeable
            position="bottom"
            close-icon-position="top-left"
            :style="{ height: '100%' }"
        >
        <channnel-edit 
        :user-channels="channels"
        :active="active"
        @onUndate="onUpdate"
        >
        </channnel-edit>
        </van-popup>

    </div>
</template>

<script>
import {getUserChannels} from '@/api/user.js'
import ArticleList from './component/article-list.vue'
import ChannnelEdit from './component/channel-edit.vue'
export default {
    name:'home',
    components:{
        ArticleList,
        ChannnelEdit
    },
    props:{
        
    },
    created () {
        this.channelLoader()
    },
  mounted () {},
    watch:{},
    computed:{},
    data(){
        return {
            active:0,
            channels:[],
            isChannelShow:false
        }
    },
    methods:{
       async channelLoader(){
             try{
                    const {data} = await getUserChannels()
                    this.channels = data.data.channels
                    console.log(this.channels);
                }catch(err){
                    this.$toast('获取用户频道失败')
                }
        },
        onUpdate(index,isChannelShow=true){
            this.active = index
            this.isChannelShow = isChannelShow
        }
        
       
    }
}
</script>

<style lang="less" scoped>
    .home-container {
  
  .searchBtn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    color: #fff;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
    /deep/ .channel_tabs {
        .van-tab_warp {
            height: 82px;

        }
        .van-tabs__nav {
            padding-bottom: 0;
        }
        .van-tab--active {
            color: #333333!important;
        }
        .van-tab {
            border-right: 1px solid #edeff3;
            min-width: 200px;
            font-size: 30px;
            color: #777777;
        }
        .van-tabs__line {
            width: 32px;
            height: 5px;
            background-color: #3296fa;
            bottom: 8px;

        }
        .placeholder {
            flex-shrink: 0;
            width: 66px;
            height: 82px;
            }
        .humberge {
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            opacity: 0.902;
            i.toutiao {
                font-size: 33px;
            }
            &:before {
                content: "";
                position: absolute;
                left: 0;
                width: 1px;
                height: 100%;
                background-image: url(~@/assets/gradient-gray-line.png);
                background-size: contain;
            }
        }
    }
  }
  
</style>