<template>
  <div class="login">
    <h1 class="login-title">{{title}}</h1>
    <div class="login-container">
      <el-form label-position="right" label-width="0" :model="formLabelAlign">
        <el-form-item>
          <el-input
            type="text"
            prefix-icon="el-icon-edit"
            placeholder="用户名"
            v-model="formLabelAlign.account"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            prefix-icon="el-icon-edit"
            placeholder="密码"
            v-model="formLabelAlign.password"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login()">登录</el-button>
    </div>
  </div>
</template>

<script>
import { setCookie } from '../utils/cookie.js'
export default {
  data() {
    return {
      title: '后台管理系统登录',
      formLabelAlign: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      setCookie('account', this.formLabelAlign.account, 1000 * 60);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="less" scoped>
  .login-title{
    font-family: "Segoe UI",Helvetica,Arial,sans-serif;
    font-weight: 200;
    font-size: 26px;
    color: #24292e;
    text-align: center;
    padding: 160px 40px 30px 30px;
    margin-top: 0px;
  }
  .login-container{
    // background: grey;
    display: block;
    width: 350px;
    height: 200px;
    margin: 0 auto;
  }
  .el-button{
    display: block;
    width:350px;
    margin:0 auto;
    font-size:20px;
    margin-top: 25px;
  }
</style>
