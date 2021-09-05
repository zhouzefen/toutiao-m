<template>
    <div class="updateBirthday">
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onconfirm"
        />
    </div>
</template>

<script>
import {chanename} from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'updateGender',
  components: {},
  props: {
      value:{
          type:String,
          required:true
      }

  },
  data () {
    return {
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
     async onconfirm(){
        // //  console.log('f');
        //  this.$toast.loading({
        //       message:'加载中。。。',
        //       forbidClick: true
        //     // duration:0
        //   })
          try{
              const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
              await chanename({
                  birthday:currentDate
              })
              this.$emit('input',currentDate)
              this.$emit('close')
              this.$toast.success('修改成功')

          }catch(err){
              this.$toast('修改失败')
          }
     }
  }
}
</script>

<style lang="less" scoped>

</style>