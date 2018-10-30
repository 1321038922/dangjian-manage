<template>
    <div>
        <Title></Title>
        <el-form :model="formData" label-width="80px" class="w500">
            <el-form-item label="标题"  >
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="图标" >
                <ImgUpload v-model="formData.icon"></ImgUpload>
            </el-form-item>
             <el-form-item>
            <el-button v-if="isEdit" type="primary" @click="onSubmit">创建</el-button>
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
      formData: {
        title: "",
        icon: ""
      },
      isEdit: true
    };
  },
  methods: {   
    onSubmit() {
        this.$axios.post('/admin/category', this.formData).then(res => {
            if(res.code == 200) {
                this.$message.success(res.msg)
            }
        })
    },
    handleSave() {},
    cancel() {
      this.formData = {};
    }
  }
};
</script>

<style scoped>

</style>