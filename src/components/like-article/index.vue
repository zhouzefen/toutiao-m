<template>
    <van-icon
        color="#777"
        :name="value === 1 ? 'good-job':'good-job-o'"
        :class="value ===1 ? 'collected' : ''"
        :loading = 'loading'
        @click="onlike"
      /> 
</template>

<script>
import {likeArticle,unlikeArticle} from '@/api/article.js'
export default {
  name: 'likeArticle',
  components: {},
  props: {
      value:{
          type:[Number,String],
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
     async onlike(){
         this.loading = true
         let status = -1
        try{
            if(this.value == 1){
                await unlikeArticle(this.artId)
                
            }else{
                await likeArticle(this.artId)
                status = 1
            }
            this.$emit('input',status)
        }catch(err){
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