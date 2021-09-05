<template>
  <div class="search-history">

    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-all-history',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      
      <van-icon 
      name="delete" 
      v-else
      @click="isDeleteShow=true"
      />
    </van-cell>

    <van-cell :title="item" 
    v-for="(item,index) in searchHistory"
    :key="index"
     @click="onSearchItemClick(item,index)">
     
      <van-icon name="close" 
      v-if="isDeleteShow"
     />
    </van-cell>
    
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistory:{
      type:Array,
      required:true
    }
  },
  data () {
    return {
      isDeleteShow:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearchItemClick(item,index){
      if(this.isDeleteShow){
        this.searchHistory.splice(index,1)
      }else{
        this.$emit('toResult',item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>