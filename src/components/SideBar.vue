<template>
    <div class="left-nav">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#ffd04b">
            <router-link to='/layout/home'>
            <el-menu-item index="1" class="title-nav"> 首页</el-menu-item>
            </router-link>
            <el-submenu index="1">
                <template slot="title"> <i class="el-icon-location"></i>管理员管理 </template>
                <router-link to="/layout/userList"><el-menu-item index="1-1"> 管理员列表</el-menu-item></router-link>
                <router-link to="/layout/addUser"><el-menu-item index="1-2"> 添加管理员</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"> <i class="el-icon-menu"></i> 新闻管理 </template>
                <router-link to="/layout/newslist">
                    <el-menu-item index="2-1"> 新闻列表</el-menu-item>
                </router-link>
                <router-link to="/layout/addnews">
                    <el-menu-item index="2-2"> 添加新闻</el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"> <i class="el-icon-menu"></i> 轮播图管理 </template>
                <router-link to="/layout/swiperList">
                    <el-menu-item index="3-1"> 轮播图列表</el-menu-item>
                </router-link>
                <router-link to="/layout/addSwiper">
                    <el-menu-item index="3-2"> 添加轮播图</el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='scss'>
.title-nav {
    text-align: center;
}
.left-nav{
    min-height: 100vh;
    background: #2d3a4b;
    z-index: 955;
    /deep/ .el-menu{
        border: none;
    }
}
</style>