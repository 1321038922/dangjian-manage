<template>
    <div>
        <el-breadcrumb separator="/" class="header">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <richSnippet v-model="formData"></richSnippet>
        <el-button @click="test" class="ll">打印</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        content: "",
        contentText: ""
      }
    };
  },
  methods: {
    test() {
      console.log(this.formData);
    },
    getValue(value) {
      this.newList.newcontent = value;
    }
  }
};
</script>

<style scoped>
.header {
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
}
.ll {
  margin: 80px;
}
</style>