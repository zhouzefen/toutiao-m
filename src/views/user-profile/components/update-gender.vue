<template>
    <div class="updateGender">
        <van-picker
        title="标题"
        show-toolbar
        :default-index="value"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onchange"
        />
    </div>
</template>

<script>
import {chanename} from '@/api/user.js'
export default {
  name: 'updateGender',
  components: {},
  props: {
      value:{
        type:Number,
        required:true
      }
  },
  data () {
    return {
        columns: ['男','女'],
        num:0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      onchange(i,b,index){
          this.num = index
      },
       async onConfirm() {
           this.$toast.loading({
              message:'加载中。。。',
              forbidClick: true
            // duration:0
          })
          try{
               await chanename({
                    gender:this.num
                })
                this.$emit('input',this.num)
                this.$emit('close')
                this.$toast.success('更新成功')
                }catch(err){
                    this.$toast('修改用户名失败')
                }
       }
  }
}
</script>

<style lang="less" scoped>

</style>