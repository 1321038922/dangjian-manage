<template>
    <div>
      <Title></Title>
      <el-card>
        <el-table :data="tableData">
          <el-table-column prop="title" label="新闻标题" />
          <el-table-column prop="author.nickname" label="作者" />
          <el-table-column label="新闻头图">
            <template slot-scope="scope">
              <img :src="scope.row.img " alt="" class="table-item-img">
            </template>
          </el-table-column>
          <el-table-column prop="type.title" label="分类" />
          <el-table-column>
              <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleSave(scope.row._id)"> 产看详情</el-button>
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
      this.getnews();
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/admin/news/${id}`).then(res => {
            if (res.code == 200) {
              this.getnews();
              this.$message.success(res.msg);
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
    getnews() {
      this.$axios
        .get("/admin/news", { page: this.page, pageSize: 5 })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data;
            this.total = res.total;
          }
        });
    },
    handleSave(id) {
      this.$router.push({ name: "newsDetail", query: { id: id } });
    }
  },
  created() {
    this.getnews();
  }
};
</script>

<style scoped>
</style>