<template>
  <div class="search-suggestion">
    <van-cell 
    v-for="(item,index) in suggestions"
    :key="index"
    icon="search"
    @click="$emit('search',item)">
    <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
   
  </div>
</template>

<script>
import {debounce} from 'loadsh'
import {getSearchSuggestion} from '@/api/search.js'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText:{
      type:String,
      require:true
    }
  },
  data () {
    return {
      suggestions:[]
    }
  },
  computed: {},
  watch: {
    searchText:{
      // handler(value){
      //   // console.log(value);
      //   this.showSuggestion(value)
      // },
      handler:debounce(function(value){
        this.showSuggestion(value)
      },1000),
       immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
   async showSuggestion(b){
        try{
         const {data} =  await getSearchSuggestion(b)
          // console.log(data.data);
          this.suggestions = data.data.options
        }catch(err){
          this.$toast('提示失败')
        }
    },

    // 高亮显示
    highlight(text){
      // console.log(text);
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText,'gi')
      return text.replace(reg,highlightStr)
    }
  }

}
</script>

<style scoped lang="less">
.search-suggestion{
 /deep/ span.active{
    color: plum;
  }
}
</style>