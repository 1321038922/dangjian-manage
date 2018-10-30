<template>
    <div>
      <Title></Title>
        <el-card>
            <el-table :data="tableData">
                <el-table-column prop="title" label="轮播图标题" width="200px" />
                <el-table-column  label="状态" width="150px">
                    <div slot-scope="scope">
                        {{scope.row.status ? '显示': '不显示'}}
                    </div>
                </el-table-column>
                <el-table-column label="轮播图头图" width="200px">
                    <template slot-scope="scope">
                      <img :src="scope.row.img " alt="" class="table-item-img">
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="优先度" width="100px"/>
                <el-table-column >
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editSwiper(scope.row._id)"> 编辑</el-button>
                        <el-button type="primary" size="mini" @click="swiperDetail(scope.row._id)"> 详情</el-button>
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
      this.getslider();
    },
    getslider() {
      this.$axios
        .get("/admin/slider", { page: this.page, pageSize: 5 })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data;
            this.total = res.total;
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
          this.$axios.delete(`/admin/slider/${id}`).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getslider();
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
    swiperDetail(id){
      this.$router.push({ name: "swiperDetail", query: { id: id } });
    },
    editSwiper(id) {
      this.$router.push({ name: "editSwiper", query: { id: id } });
    }
  },
  created() {
    this.getslider();
  }
};
</script>

<style scoped>
</style>