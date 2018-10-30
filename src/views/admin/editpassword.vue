<template>
    <div>
       <el-form class="w500">
            <el-form-item label="旧密码" >
                <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-form-item  label="新密码">
                <el-input v-model="newpassword" type="password"></el-input>
            </el-form-item>
            <el-form-item  label="确认密码">
                <el-input v-model="cpassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="editPassword">保存</el-button>
            </el-form-item>
       </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                password:'',
                newpassword:'',
                cpassword:''
            }
        },
        methods:{
            editPassword() {
                if(this.newpassword == this.cpassword){
                    this.$axios.patch(`/admin/adminUser/password/${this.$store.state.userinfo._id}`,{password:this.newpassword})
                        .then(res =>{
                            if(res.code == 200){
                                this.$store.commit('CHANGE_USERINFO',null)
                                this.$message.success(res.msg)
                                setTimeout(()=>{
                                    this.$router.push({ name: "login" });
                                    this.$message.warning('登录状态失效，请重新登录')
                                },2000)
                                this.$router.push({ name: "login" });
                            }
                        })
                }else{
                    this.$message.info('两次输入的密码不一致')
                }
            }
        }
    }
</script>

<style scoped>

</style>