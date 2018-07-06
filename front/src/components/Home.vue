<template>
  <el-container>
    <el-aside width="240px" style="background-color: #424950">
      <div class="logo" style="display: block; height: 60px; width: 240px; background: #545c64">
        <span style="display: block; padding: 22px 0 0 0; color: white;">LOGO</span>
      </div>
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#424950"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template class="sub-title" slot="title">
          <i class="el-icon-location"></i>
          <span>Navigator One</span>
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
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span>Nenu default121</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
  
    <el-container style="margin-left: 240px;">
      <el-header>
        <div class="user" style="float: right; height: 42px; margin: 8px 0 0 0;">
          <i class="el-icon-picture" style="font-size: 32px;"></i>
        </div>
      </el-header>
    
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="Date" width="140">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="120">
          </el-table-column>
          <el-table-column prop="address" label="Address">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
  position: absolute;
  height: 100%;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  z-index: 10;
}

.el-header {
  background-color: white;
  line-height: 60px;
  border-bottom: 1px solid rgb(226, 226, 226);
}

.el-menu-item {
  min-width: 240px;
}

.el-submenu {
  min-width: 240px;
}

.el-icon-d-arrow-left:active {
  color: #ffd04b;
}
</style>
