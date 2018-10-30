<template>
    <div>
      <Title></Title>
        <el-card>
            <div slot="header">
                管理员列表
            </div>
            <el-table :data="tableData" class="detail-table">
                <el-table-column width="100px" label="昵称" prop="nickname" />
                <el-table-column width="100px" label="手机" prop="phone" />
                <el-table-column label="头像" prop="avatar" >
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" alt="" class="table-item-img">
                    </template>
                </el-table-column>
                <el-table-column width="50px" label="性别" prop="sex" >
                </el-table-column>
                <el-table-column label="个性签名" prop="desc" />
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row._id)"> 产看详情</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)"> 删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="5"
                :total='total'
                @current-change="changePage"
                >
              </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getData();
    },
    getData() {
      this.$axios
        .get("/admin/adminUser", { pageSize: 5, page: this.page })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data;
            this.total = res.total;
          } else if (res.code == 403) {
            this.$router.push({ name: "login" });
          }
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/admin/adminUser/${id}`).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(id) {
      if (this.$store.state.userinfo.username == "Cason") {
        this.$router.push({ name: "editUser", query: { id: id } });
      } else {
        this.$message.info("权限不足");
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
/deep/ .cell {
  text-align: center;
}
</style>