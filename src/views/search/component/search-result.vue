<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search.js'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText:{
      type:String,
      required:true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      perPage:20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    
    async onLoad(){
      try{
        const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索关键字
      })
        
        // console.log(data);
        const {results} = data.data
        this.list.push(...results)

        this.loading = false
        if(results.length){
          this.page++
        }else{
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }

      }catch(err){
        this.$toast('搜索失败')
        // console.log(this.searchText);
      }
    }
  }

}
</script>

<style scoped lang="less"></style>