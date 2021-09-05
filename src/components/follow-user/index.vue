<template>
    <van-button
            class="follow-btn"
            round
            size="small" 
            v-if="isFollowed"
            @click="onFllow"
            :loading="isLoadingShow"
          >已关注
        </van-button>
          
          <van-button
           v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFllow"
            :loading="isLoadingShow"
          >关注
          </van-button>
</template>

<script>
import {addFollow,deleFollow} from '@/api/user.js'

export default {
  name: 'followUser',
  components: {},
  props: {
   isFollowed:{
       type:Boolean,
       required:true
   },

   artId:{
           type:[Number,String,Object],
           required:true
   }
  },
  data () {
    return {
        isLoadingShow:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      // 是否关注
      async onFllow(){
        this.isLoadingShow= true
        try{
          if(this.isFollowed){
            // 关注情况下，点击取消关注
            await deleFollow(this.artId)
          }else{
            // 不关注的情况下，点击取消关注
             await addFollow(this.artId)
          }
        // this.isFollowed = !this.isFollowed
        this.$emit('isfollow')

        }catch(err){
          let message = '操作失败，请重试'
          if(err.response && err.response.status === 400){
            message = '不能关注自己'
          }
          this.$toast(message)
        }
        this.isLoadingShow= false

      }
  }
}
</script>

<style lang="less" scoped>

</style>