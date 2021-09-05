<template>
  <div >
    <van-cell class="article-item"
      :to="`/article/${article.art_id}`"
    >
        <div slot="title"
        class="title van-multi-ellipsis--l2">{{article.title}}</div>

        <div slot="label">
            <div v-if="article.cover.type == 3" class="cover-warp">
               <div v-for="(img,index) in article.cover.images"
                    :key="index"
                    class="cover-item"
               > 
                 <van-image
                   class="cover-img-item"
                   :src="img"
                  />
               </div>
            </div>

            <div class="label-span">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}</span>
              <span>{{article.pubdate | relativeTime}}</span>
            </div>
        </div>

        <van-image
        class="right-cover"
        v-if="article.cover.type == 1"
        slot="default"
        :src="article.cover.images"
          fit="cover"
        />

    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 30px;
    color:#3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    margin-left: 25px;
    width: 232px;
    height: 146px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-span span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 15px;
  }
  .cover-warp {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex:1;
      height: 146px;
      &:not(:last-child){
        padding-right: 10px;
      }
    }
    .cover-img-item {
      
      width: 100%;
      height: 146px;
      
    }

  }
 
}
</style>
