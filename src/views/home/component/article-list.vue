<template>
    <div class="article-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh"
        :success-text="isloadingtext"
        success-duration="1500">
        
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
         :error.sync="error"
         error-text="请求失败，点击重新加载"
        
        @load="onLoad"
        >
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article. title" /> -->
        <article-item
        v-for="(article,index) in list" 
        :key="index"
        :article="article"
        />
        </van-list>

        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
      ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
         list: [],
        loading: false,
        finished: false,
        timestamp: null,
        error:false,
         refreshing: false,
        isloadingtext:   '加载成功'
        }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
        async onLoad(){
            try{
                // 1.获取数据
                const {data} = await getArticles({
                    channel_id:this.channel.id,
                    timestamp:this.timestamp || Date.now(),
                    with_top:1
                })
                
                // 2.赋值
                const {results} = data.data
                this.list.push(...results)
                // 3.二次加载
                this.loading=false
                // 4.停止
                if(results.length){
                    this.timestamp = data.data.pre_timestamp

                }else{
                    this.finished = true
                }

            }catch(err){
                // console.log('获取数据失败');
                this.error=true
            }
        },
        // 下拉刷新
        async onRefresh(){
            try{
                // 获取数据
                const {data} = await getArticles({
                   channel_id:this.channel.id,
                    timestamp: Date.now(),
                    with_top:1
                })
                // 加载数据
                const {results} =data.data
                this.list.unshift(...results)
                this.refreshing =false

                this.isloadingtext = `成功加载${results.length}条数据`
            }catch(err){
                // console.log('下拉数据失败');
                this.isloadingtext = '加载失败'
                this.refreshing = false
            }
        }
  }
}
</script>

<style scoped lang="less"></style>
