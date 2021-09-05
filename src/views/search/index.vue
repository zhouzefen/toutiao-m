<template>
  <div class="search-container">
      <form action="/">
        <van-search
            v-model="searchSth"
            show-action
            background="#3296fa"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow=false"
        />
    </form>
    <!-- 结果 -->
    <search-result 
    v-if="isResultShow"
    :searchText="searchSth"
    />
    <!-- /结果 -->

    <!-- 联想建议 -->
    <search-suggestion 
    v-else-if="searchSth"
    :searchText="searchSth"
    @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史 -->
    <search-history 
    :searchHistory="searchHistorys"
    @toResult="onSearch"
    @clear-all-history="searchHistorys=[]"
    v-else/>
    <!--/ 搜索历史 -->

    
    
  </div>
</template>

<script>
import searchHistory from './component/search-history.vue'
import SearchResult from './component/search-result.vue'
import searchSuggestion from './component/search-suggestion.vue'
import {getToken,setToken} from '@/utils/storage.js'
  export default {
    name: "SearchPage",
    components: {
        searchHistory,
        SearchResult,
        searchSuggestion
    },
    props: {},
    data() {
      return {
          searchSth:'',
          isResultShow:false,
          searchHistorys:getToken('TOUTIAO_SEARCH_HISTORY') || []
      };
    },
    computed: {},
    watch: {
        searchHistorys(value){
            setToken('TOUTIAO_SEARCH_HISTORY',value)
        }
    },
    created() {},
    methods: {
        onSearch(val){
            this.searchSth= val

            const index = this.searchHistorys.indexOf(val)
            if(index !== -1){
                this.searchHistorys.splice(index,1)
            }
            this.searchHistorys.unshift(val)

            this.isResultShow = true
            // console.log(this.searchSth)
        },
        onCancel(){
            console.log('cancel')
            this.$router.back()
        }
    }
  };
</script>

<style scoped></style>