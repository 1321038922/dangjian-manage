<template>
    <div>
        <Title></Title>
        <el-card>
            <el-table :data="tableData">
                <el-table-column prop="topic.content" label="主题" width="150px" />
                <el-table-column 
                label="内容" 
                prop="content" 
                width="200px"
                show-overflow-tooltip:true />
                <el-table-column  label="用户" width="100px" prop="user.nickname" >
                </el-table-column>
                <el-table-column  label="头像" width="200px"  >
                    <template slot-scope="scope">
                         <img :src="scope.row.user.avatar" class="table-item-img" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)"> 删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getCommon() {
      this.$axios.get("/admin/common").then(res => {
        if (res.code == 200) {
          console.log(res);
          this.tableData = res.data;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getCommon();
  }
};
</script>

<style scoped>
</style>