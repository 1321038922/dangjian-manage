<template>
    <div>
        <el-form ref="form" :model="formData" label-width="80px" class="form-userinfo">
        <el-form-item label="头像上传" >
           <ImgUpload v-model="formData.avatar"></ImgUpload>
        </el-form-item>
        <el-form-item v-if="isSubmit" label="用户名">
            <el-input width="200px" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="formData.nickname" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="职业">
            <el-select v-model="formData.job" placeholder="请选择职业">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="formData.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="简介">
            <el-input type="textarea" v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="isSubmit" type="primary" @click="onSubmit">创建</el-button>
            <el-button v-else type="primary" @click="handleSave">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "教师"
        },
        {
          value: "2",
          label: "程序员"
        },
        {
          value: "3",
          label: "工程师"
        },
        {
          value: "4",
          label: "医生"
        },
        {
          value: "5",
          label: "员工"
        }
      ],
      isSubmit:true,
      formData: {
        nickname: "",
        username: "",
        avatar: "",
        password: "123456",
        desc: "111",
        job: "",
        phone: "123456",
        sex: "1"
      }
    };
  },
  methods: {
      onSubmit() {
          this.$axios.post('/admin/adminUser',this.formData).then(res => {
              
              if(res.code == 403) {
                  this.$router.push({name:'login'})
              }else if(res.code == 200) {
                  this.$router.push({name:'userList'})
              }
              else{
                   this.$message.info(res.msg)
              }
          })
      },
      handleSave(){
          this.$axios.patch(`/admin/adminUser/${this.$route.query.id}`,this.formData).then(res => {
              if(res.code == 403) {
                  this.$router.push({name:'login'})
              }else if(res.code == 200) {
                  this.$router.push({name:'userList'})
              }
          })
      },
      getuserInfo(){
          this.$axios.get(`/admin/adminUser/${this.$route.query.id}`).then(res=>{
              if(res.code == 200){
                  this.formData = res.data
              }
          })
      },
      cancel(){
          this.formData = {};
      }
  },
  watch:{
      $route(to,from){
          if(to.name == 'editUser'){
              this.isSubmit = false

              this.getuserInfo()
          }else{
              this.isSubmit = true
              this.formData = {}
          }
      }
  },
  created(){
      if(this.$route.name == 'editUser'){
          this.getuserInfo()
          this.isSubmit = false
      }else{
          this.isSubmit = true
      }
  }
};
</script>

<style scoped>
.form-userinfo {
  width: 500px;
}
</style>