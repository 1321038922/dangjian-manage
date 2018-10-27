<template>
    <div>
        <el-card>
            <div slot="header">
                添加轮播图
            </div>
            <el-form :model="formData" label-width="80px" label-position="left">
                <el-form-item required label="轮播图"> 
                    <ImgUpload v-model="formData.img"></ImgUpload>
                </el-form-item>
                <el-form-item required label="标题" > 
                    <el-input v-model="formData.title" />
                </el-form-item>
                <el-form-item required label="新闻"> 
                    <el-select v-model="formData.newsId" placeholder="请选择">
                        <el-option 
                        v-for="item in news" 
                        :label="item.title"
                        :value="item._id"
                        :key="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="排序"> 
                    <el-input-number 
                    :step="1"
                    v-model="formData.sort" 
                    :min="1" />
                </el-form-item>
                <el-form-item  label="是否显示"> 
                    <el-switch
                    v-model="formData.status"
                    active-text="显示"
                    :active-value="1"
                    :inactive-value="0"
                    inactive-text="不显示">
                    </el-switch>
                </el-form-item>
                 <el-form-item>
                    <el-button v-if="isSubmit" type="primary" @click="onSubmit">新建</el-button>
                    <el-button v-else type="danger" @click="onEdit">修改</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        img: "",
        title: "",
        newsId: "",
        sort: "",
        status: "", 
      },
      news: [],
      isSubmit:false,
    };
  },
  methods: {
    getNews() {
      this.$axios.get("/admin/news").then(res => {
        console.log(res);
        if (res.code == 200) {
          this.news = res.data;
        }
      });
    },
    getData(){
        this.$axios.get(`/admin/slider/${this.$route.query.id}`).then(res => {
            console.log(res)
            if(res.code == 200) {
                this.formData = res.data
            }
        })
    },
    onSubmit() {
        this.$axios.post('/admin/slider',this.formData).then(res => {
            if(res.code == 200){
                this.$message.success(res.msg)
                this.$router.push({name:'swiperList'})
            }else if (res.code == 403){
                this.$router.push({name:'login'})
                this.$message.success(res.msg)
            }
        })
    },
    onEdit() {
        this.$axios.patch(`/admin/slider/${this.$route.query.id}`,this.formData).then(res => {
            if(res.code == 200){
                this.$message.success(res.msg)
                this.$router.push({name:'swiperList'})
            }else if (res.code == 403){
                this.$router.push({name:'login'})
                this.$message.success(res.msg)
            }
        })
    },
    cancel() {
      this.formData = {};
    }
  },
  created() {
    if(this.$route.name == 'editSwiper'){
        this.isSubmit = false
    }else{
        this.isSubmit = true
    }
    this.getNews()
    if(!this.isSubmit){
        this.getData()
    }
  },
  watch:{
      $route(to,from ){
          if(to.name =='editSwiper'){
              this.isSubmit = false
              this.getData()
          }else {
              this.isSubmit = true
              this.formData = {}
          }
      }
  }
};
</script>

<style scoped>
.el-form {
  width: 500px;
}
</style>