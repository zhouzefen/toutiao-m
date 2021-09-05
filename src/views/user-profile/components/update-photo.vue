<template>
    <div class="updatePhoto">
        <img :src="img" alt="" ref="photo">
        <div class="toolbar">
            <div class="cancel"
            @click="$emit('close')">取消</div>
            <div class="confirm"
            @click="onconfirm"
            >完成</div>
        </div>
    </div>
</template>

<script>
import {changePhoto} from '@/api/user.js'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
export default {
  name: 'updatePhoto',
  components: {},
  props: {
      img:{
          type:[String,Object],
          required:true
      }

  },
  data () {
    return {
       cropper:null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.photo
    this.cropper = new Cropper(image, {
    viewMode: 1,
    dragMode: 'move',
    aspectRatio: 1,
    autoCropArea: 1,
    cropBoxMovable: false,
    cropBoxResizable: false,
    background: false,
    movable: true
  
  
});
  },
  methods: {
    onconfirm(){
        
        // console.log(this.cropper);
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {

            this.userPhoto(blob)
        // const formData = new FormData();
        // formData.append('photo', blob);
        // const {data} = await changePhoto(formData)
        // console.log(data);

        // this.$emit('close')
        // this.$emit('update-photo',data.data.photo)
    })
  },
  async userPhoto(blob){
      this.$toast.loading({
            message:'加载中...',
            duration:0
        })
      try{
        const formData = new FormData();
        formData.append('photo', blob);
        const {data} = await changePhoto(formData)
        console.log(data);
        this.$emit('close')
        this.$emit('update-photo',data.data.photo)
        this.$toast.success('更换成功')
      }catch(err){
          this.$toast('更换失败')
      }
     
  }
}
}
</script>

<style lang="less" scoped>
.updatePhoto {
    background-color: #000;
        height: 100%;

    img {
        display: block;
        max-width: 100%;
    }
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
       .cancel , .confirm {
         font-size: 30px;
        color: #fff;
        height: 90px;
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    }
    
}
</style>