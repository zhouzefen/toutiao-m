<template>
    <van-icon
        color="#777"
        :name="value ? 'star' : 'star-o'"
        :class="value ? 'collected' : ''"
        @click="oncollect"
        :loading="loading"
      /> 
</template>

<script>
import {addCollectArticle,deleCollectArticle} from '@/api/article.js'
export default {
  name: 'collectArticle',
  components: {},
  props: {
      value:{
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
        loading:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async oncollect(){
          this.loading = true
          try{
              if(this.value){
                //   已关注，点击取消收藏
                await deleCollectArticle(this.artId)
              }else{
                //   未关注，点击关注
                await addCollectArticle(this.artId)
              }
              this.$emit('changeCollect',!this.value)
          }catch{
              this.$toast('操作失败，请重试')
          }
          this.loading = false

      }
  }
}
</script>

<style lang="less" scoped>
.collected{
    color: orange!important;
}
</style>