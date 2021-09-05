<template>
    <div class="commentList">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <comment-item v-for="(item,index) in list" :key="index" 
        :comment="item"
         />
        </van-list>
    </div>
</template>

<script>
import {getComments} from '@/api/comment.js'
import commentItem from '@/components/comment-list/comment-item.vue'
export default {
  name: 'commentList',
  components: {
      commentItem
  },
  props: {
      artId:{
          type:[Number,String,Object],
          required:true
      },
      list:{
          type:Array,
          default:()=>[]
      }
  },
  data () {
    return {
        loading: false,
        finished: false,
        offset:null,
        limit:10
    }
  },
  computed: {},
  watch: {},
  created () {
      this.onLoad()
  },
  mounted () {},
  methods: {
       async onLoad() {
           try{
        //1、发起请求
        //2、将数据加载到列表
        //3、关闭加载
        //4、判断还有数据吗
            const {data} = await getComments({
                type:'a',
                source:this.artId,
                offset:this.offset,
                limit:this.limit
            })
            const {results} =data.data
            this.$emit('comment-count',data.data)
            this.list.push(...results)
            // console.log(data);
            this.loading = false
            if(results.length){
                this.offset = data.data.last_id
            }else{
                this.finished = true
            }
           }catch(err){
               this.$toast('加载失败')
           }
      
    }
  }
}
</script>

<style lang="less" scoped>

</style>
