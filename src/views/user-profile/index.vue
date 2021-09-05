<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="files" @change="changePhoto"> 
    <!-- 个人信息 -->
    <van-cell class="avatar-cell" title="头像" is-link center>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="userList.photo"
        @click="$refs.files.click()"

      />
    </van-cell>
    <van-cell title="昵称" :value="userList.name" is-link  @click="ischangeName=true"/>
    <van-cell title="性别"  
    :value="userList.gender===0 ? '男' :'女'" is-link 
    @click="ischangeGender = true"/>
    <van-cell title="生日" 
    :value="userList.birthday" 
    @click="ischangeBirthday=true"
    is-link />
    <!-- /个人信息 -->
    <!-- 弹出层 -->
    <!-- 1.修改昵称 -->
    <van-popup v-model="ischangeName" position="bottom" :style="{ height: '100%' }">
      <update-name 
      v-if="ischangeName" 
      @close="ischangeName=false" 
      v-model="userList.name"
      @input="userList.name=$event"
      />
    </van-popup>

    <!-- 2.修改性别 -->
   <van-popup v-model="ischangeGender" position="bottom" >
        <update-gender 
        v-if="ischangeGender"
        @close="ischangeGender=false" 
        @input="userList.gender=$event"
        v-model="userList.gender"/>
    </van-popup>

    <!-- 3.修改生日 -->
    <van-popup v-model="ischangeBirthday" position="bottom" >
        <update-birthday 
        v-if="ischangeBirthday"
        v-model="userList.birthday"
        @close="ischangeBirthday=false"
        />
    </van-popup>

    <!-- 4.修改头像 -->
    <van-popup v-model="ischangePhoto" position="bottom" :style="{ height: '100%' }" >
        <update-photo 
        v-if="ischangePhoto"
        :img="img" 
        @close='ischangePhoto=false' 
        @update-photo="userList.photo=$event"
        />
    </van-popup>
    <!--/ 弹出层 -->
 
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user.js'
import updateName from './components/update-name.vue'
import updateGender from './components/update-gender.vue'
import updateBirthday from './components/update-birthday.vue'
import updatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  props: {},
  data () {
    return {
      userList:[],
      ischangeName:false,
      ischangeGender:false,
      ischangeBirthday:false,
      ischangePhoto:false,
      img:null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoadUserProfile()
  },
  mounted () {},
  methods: {
    async onLoadUserProfile(){
      try{
        const {data} = await getUserProfile()
        // console.log(data);
        this.userList = data.data
      }catch(err){
        this.$toast('获取用户信息失败')
      }
    },

    // 修改用户头像
    changePhoto(){
      const file = this.$refs.files.files[0]
      this.img = window.URL.createObjectURL(file)
      // console.log(data);
      this.ischangePhoto = true
      this.$refs.files.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
.van-popup {
  background-color: rgba(248, 244, 244, 0.993);
}

</style>
