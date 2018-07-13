<template>
  <el-container>
    <el-aside width="240px" style="background-color: #424950">
      <div class="logo" style="display: block; height: 60px; width: 240px; background: #545c64">
        <span style="display: block; padding: 22px 0 0 0; color: grey;">LOGO</span>
      </div>
      <el-menu
      class="el-menu-vertical-demo"
      :router="true"
      background-color="#424950"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template class="sub-title" slot="title">
          <i class="el-icon-location"></i>
          <span>首页配置</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item one</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>
        <el-submenu index="1-4">
          <template class="sub-title" slot="title">item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span>简历投递列表</span>
      </el-menu-item>
      <el-submenu index="3">
        <template class="sub-title" slot="title">
          <i class="el-icon-document"></i>
          <span>招聘岗位管理</span>
        </template>
        <el-menu-item index="3-1" :route="{path: '/job/firstType'}">一级分类</el-menu-item>
        <el-menu-item index="3-2" :route="{path: '/job/secondType'}">二级分类</el-menu-item>
        <el-menu-item index="3-3" :route="{path: '/job/jobList'}">职位列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span>轮播图配置</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
  
    <el-container style="margin-left: 240px;">
      <el-header>
        <div class="user" style="float: right; height: 42px; margin: 8px 0 0 0;">
          <el-dropdown trigger="click">
            <a class="el-dropdown-link">
              <i class="el-icon-picture" style="font-size: 32px;"></i>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><p @click="logout()">退出登录</p></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    
      <el-main style="background-color: #f0f2f5">
        <common-header></common-header>
        <div class="layout-content">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { delCookie, getCookie } from "../../utils/cookie.js";
import  CommonHeader from '../Common/Header'
export default {
  name: "HelloWorld",
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    let flag = getCookie("account");
    if (flag === "") {
      this.$router.push("/login");
    }
  },
  methods: {
    logout() {
      let flag = getCookie("account");
      if (flag) {
        delCookie("account");
        this.$router.push("/login");
      }
    }
  },
  components: {
    CommonHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
  position: absolute;
  height: 100%;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  z-index: 10;
}

.el-container {
  height: 100vh
}

.el-header {
  background-color: white;
  line-height: 60px;
  border-bottom: 1px solid rgb(226, 226, 226);
}

.el-main {
  padding: 0
}

.el-menu-item {
  min-width: 240px;
  text-align: left;
}

.el-submenu {
  min-width: 240px;
  text-align: left;
}

.el-icon-d-arrow-left:active {
  color: #ffd04b;
}
.layout-content{ 
  margin: 20px
}
</style>
