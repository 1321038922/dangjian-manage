<template>
    <div class="login">
        <div class="login-box">
            <h2>党建e家后台管理系统</h2>
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-button class="btn" type="primary" @click="handlelogin">登录</el-button>
                </el-form-item>
            </el-form>    
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    username:'Cason',
                    password:'132103'
                }
            }
        },
        methods: {
            handlelogin() {
                this.$axios.post('admin/adminUser/login',this.formData)
                .then(res =>{
                   if(res.code == 200) {
                       this.$message.success(res.msg)
                       this.$store.commit('CHANGE_USERINFO',res.data)
                       setTimeout(()=>{
                           this.$router.push({name:'home'})
                       },1000) 
                   }else {
                       this.$message.info(res.msg)
                   }
                    
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .login {
        height: 100vh;
        background: #2d3a4d;
        overflow: hidden;
        h2 {
            color: #fff;
            font-weight: 400;
            text-align: center;
        }
        /deep/ .el-input {
            background: #2d3a4b;
            border: none;
        }
        /deep/ .el-form-item__label {
            color: #fff;

        }
    }
    .login-box {
        padding: 30px;
        box-sizing: border-box;
        width: 500px;
        height: 400px;
        border-radius: 6px;
        border:1px solid #f1f1f1;
        margin: 200px auto;
        .btn {
            display: block;
            width: 100%;
            margin-top: 20px;
            box-sizing: border-box;
        }
    }
</style>