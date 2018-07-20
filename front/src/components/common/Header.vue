<template>
    <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in $route.matched" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="title">{{$route.name}}</h3>
    </el-card>
</template>
<script>
    export default {
      
    }
</script>
<style lang="less" scoped>
    .title{ 
        margin-top:30px;
        text-align: left;
        letter-spacing: 2px
    }
</style>

