<template>
    <div class="updateName"> 
         <van-nav-bar
        title="设置昵称"
       left-text="取消"
       right-text="完成"
       @click-left="$emit('close')"
       @click-right="onchanename"
        />
        <div class="cnamebg">
            <van-field
            v-model.trim="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
        />
        </div>
        
    </div>
</template>

<script>
import {chanename} from '@/api/user.js'
export default {
  name: 'updateName',
  components: {},
  props: {
      value:{
          type:String,
          required:true
      }
  },
  data () {
    return {
        message:this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async onchanename(){
          this.$toast.loading({
              message:'加载中。。。',
              forbidClick: true
            // duration:0
          })
          try{
          const cname = this.message

             if(!this.message.length){
                    this.$toast('请输入昵称')
                    return
                }
               await chanename({
                    name:cname
                })
                this.$emit('input',cname)
                this.$emit('close')
          }catch(err){
              this.$toast('修改用户名失败')
          }
         
      }
  }
}
</script>

<style lang="less" scoped>
.ischangeName {
    color: #000;
}
.cnamebg {
    padding: 10px;
}
</style>