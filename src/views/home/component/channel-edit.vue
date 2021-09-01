<template>
  <div class="channel-edit">
      <van-cell title="我的频道" class="channel-title">
          <van-button 
          size="mini"
            round
            type="danger"
             plain
             class="edit-btn"
             @click="iseditor = !iseditor"
            >
        {{iseditor ?  '完成':'编辑'}}
        </van-button>
      </van-cell>

      <van-grid :gutter="10" class="my-grid" >

        <van-grid-item 
        class="grid-item"
        v-for="(channel,index) in userChannels" 
        :key="index" 
        @click="onUserChannel(channel,index)">

        <van-icon name="close" 
         slot="icon" 
         class="close-icon"
         v-show="iseditor"/>
         <span slot="text" class="text"
      :class="{active : index === active}"
      >{{channel.name}}</span>

        </van-grid-item>

    </van-grid>

     <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
       class="grid-item"
        v-for="(channels,index) in recommendChannels"
        :key="index"
        :text="channels.name"
        @click="addChannel(channels)"
      >
      <van-icon name="add-o" slot="icon" v-show="iseditor"></van-icon>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {getChannelList,addUserChannel} from '@/api/channel.js'
import {mapState} from '@/store.js'
import {setToken} from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
      userChannels:{
            type:Array,
            required:true
        },
        active:{
            type:Array,
            required:true
        }
  },
  data () {
    return {
        allChannels:[],
        iseditor:false,
    }
  },
  computed: {
    //   ...mapState(['user']),
      recommendChannels(){
          const channels =[]
          this.allChannels.forEach(achannels => {
              const ret = this.userChannels.find(uchannels =>{
                  return uchannels.id === achannels.id
              })
              if(!ret){
                  return channels.push(achannels)
              }
          })
          return channels
      }
  },
  watch: {},
  created () {
      this.getAllChannel()
  },
  mounted () {},
  methods: {
    //   获取所有频道
      async getAllChannel(){
            try{
                const {data} = await getChannelList()
                this.allChannels = data.data.channels
            }catch(err){
                console.log('获取频道失败');
            }
        },

       

        // 添加频道
       async addChannel(channel){
           try{
                if(this.iseditor){
                this.userChannels.push(channel)
                }

                if(this.user){
                    await addUserChannel([{
                        id: channel.id, // 频道 id
                        seq: this.userChannels.length // 频道的 序号
                    }])
                }else{
                    // 处理未登录状态
                    setToken('TOUTIAO_CHANNELS',this.userChannels)
                }
           }catch(err){
               console.log(err)
               this.$toast('添加频道失败')
           }
            
        },

        // 编辑频道
        onUserChannel(channel,index){
            if(this.iseditor){
                // 编辑执行删除
                // console.log(channel);
                if(index < this.active){
                    this.$emit('onUndate',this.active - 1,true)
                }
                this.userChannels.splice(index,1)
            }else{
                // 完成
                this.$emit('onUndate',index,false)
            }
        }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 100px 0;
    .channel-title {
        font-size: 32px;
        color: #333333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85989;
    }
    /deep/.grid-item {
        width: 160px;
        height: 86px;
        // position: relative;
        .van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text,.text {
                font-size: 28px;
                color: #222;
            }
        }
       
    }
    /deep/.my-grid {
        .van-grid-item__icon-wrapper {
            position: unset;
        }
        .grid-item{
            .close-icon {
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
            .van-grid-item__text {
                 margin-top: 0;
            }
            .active {
                color: red;
            }
        }
    }

    /deep/.recommend-grid{
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon {
                    font-size: 28px;
                    margin-right: 5px;
                }
                .van-grid-item__text {
                    margin-top: 0;
                }
            }
        }
    }
}

</style>