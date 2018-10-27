<template>
    <div>
        <el-row>
            <el-col :span='4' class="SideBar">
                 <SideBar></SideBar>
            </el-col>
            <el-col :span='20' class="Right">
                <Header class="header"></Header>
                <AppMain class="p56"></AppMain>
            </el-col>
        </el-row> 
    </div>
</template>

<script>
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import AppMain from './AppMain'

    export default {
        components:{
            Header,
            SideBar,
            AppMain
        }
    }
</script>

<style scoped lang="scss">
.p56{
    padding-top: 56px;
}
.SideBar {
    height: 100vh;
    position: fixed;
    left: 0;
    overflow: hidden;
}
.Right {
    position: absolute;
    right: 0;
}
</style>