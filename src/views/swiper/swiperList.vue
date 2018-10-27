<template>
    <div>
        <el-card>
            <el-table :data="tableData">
                <el-table-column prop="title" label="轮播图标题" />
                <el-table-column  label="状态" >
                    <div slot-scope="scope">
                        {{scope.row.status ? '显示': '不显示'}}
                    </div>
                </el-table-column>
                <el-table-column label="轮播图头图">
                    <template slot-scope="scope">
                    <img :src="scope.row.img " alt="" class="table-item-img">
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="优先度" />
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editSwiper(scope.row._id)"> 编辑</el-button>
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
      changePage(page){
      this.page = page
      this.getslider()
    },
    getslider() {
      this.$axios.get("/admin/slider" ,{page:this.page,pageSize:5}).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total = res.total
        }
      });
    },
    handleDelete(id) {
      this.$axios.delete(`/admin/slider/${id}`).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getslider();
        }
      });
    },
    editSwiper(id) {
        this.$router.push({name:'editSwiper',query:{id:id}})
    }
  },
  created() {
    this.getslider();
  }
};
</script>

<style scoped>
</style>