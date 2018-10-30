<template>
    <div>
      <Title></Title>
        <el-card>
             <el-table :data="tableData">
                <el-table-column prop="content" label="主题" width="200px" />
                <el-table-column prop="create_time" label="创建时间" width="280px" />
                <el-table-column  label="用户" width="100px" >
                    <div slot-scope="scope">
                        {{scope.row.user.nickname}}
                    </div>
                </el-table-column>
                <el-table-column  label="回复数" width="100px" >
                    <div slot-scope="scope">
                        {{scope.row.common.length}}
                    </div>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="topicDetail(scope.row._id)"> 详情</el-button>
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
    changePage() {},
    getTopic() {
      this.$axios.get("/admin/topic").then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data;
          this.tableData.forEach((item, index) => {
            let time = new Date(item.create_time);
            let create_time = time.toLocaleString();
            this.tableData[index].create_time = create_time;
            //   let create_time = (item.create_time =
            //     time.toLocaleDateString() + " " + time.toTimeString().substr(0, 8));
          });
          //   this.tableData.forEach((item,index)=>{
          //       let time  = item.create_time
          //       let create_time = time.replace(/(\d{4}-\d{2}-\d{2})T/,"$1 ")
          //       .replace(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).\d{3}Z/,"$1 ")
          //       this.tableData[index].create_time = create_time
          //   })
        }
      });
    },
    topicDetail(id) {
      this.$router.push({ name: "topicDetail", query: { id: id } });
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
    this.getTopic();
  }
};
</script>

<style scoped>
</style>