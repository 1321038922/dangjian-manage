<template>
    <div class="hearder clearfix">
        党建e家后台管理系统
            <el-dropdown class="flr" @command="handleCommand" >
            <span class="el-dropdown-link">
                <img :src="this.$store.state.userinfo.avatar" >
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  command="1">修改个人信息</el-dropdown-item>
                <el-dropdown-item divided command="2">修改密码</el-dropdown-item>
                <el-dropdown-item divided command="3">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
        let click = command;
      if (click == 3) {
        this.$axios.post("/admin/adminUser/update").then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.$store.commit('CHANGE_USERINFO',null)
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 500);
          }else{
            this.$router.push({ name: "login" });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.el-dropdown-link {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 50px;
  }
}
.hearder {
  position: fixed;
  top: 0;
  right: 0;
  left: 16.66667%;
  z-index: 998;
  height: 56px;
  line-height: 56px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  background: #2d3a4b;
}
.dropdown {
  position: fixed;
  color: #fff;
  right: 20px;
  top: 0;
}
</style>