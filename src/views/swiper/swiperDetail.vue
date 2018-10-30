<template>
    <div>
        <el-card>
            <el-form>
                <el-form-item >
                    <h1>{{this.formData.newsId.title}}</h1>
                </el-form-item>
                <el-form-item >
                    <p>{{this.formData.newsId.create_time}}</p>
                </el-form-item>
                <el-form-item >
                    <img :src="formData.newsId.img" alt="">
                </el-form-item>
                <el-form-item >
                    <div v-html="formData.newsId.content"></div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                formData:{
                    newsId:{},
                    createTime:''
                }
            }
        },
        methods:{
            getData(){
                this.$axios.get(`/admin/slider/${this.$route.query.id}`).then(res =>{
                    if(res.code ==  200){
                        this.formData = res.data
                        let time = new Date(this.formData.newsId.create_time);
                        this.formData.newsId.create_time = time.toLocaleString()
                    }
                })
            }
        },
       created(){
           this.getData()
       }
    }
</script>

<style scoped>

</style>