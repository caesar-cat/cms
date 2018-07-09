<template>
  <div class="login">
    <h1 class="login-title">{{title}}</h1>
    <div class="login-container">
      <el-form label-position="right" label-width="0" :model="formLabelAlign">
        <el-form-item>
          <el-autocomplete
            type="text"
            class="inline-input"
            v-model="formLabelAlign.account"
            prefix-icon="el-icon-edit"
            :fetch-suggestions="querySearch"
            placeholder="用户名"
            :trigger-on-focus="false"
          >
          </el-autocomplete>
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
import { setCookie, getCookie } from '../utils/cookie.js'
export default {
  data() {
    return {
      title: '后台管理系统登录',
      formLabelAlign: {
        account: '',
        password: ''
      },
      links: []
    }
  },
  mounted() {
    let flag = getCookie('account');
    if (flag !== '') {
      this.$router.push('/');
    }
    this.links = this.loadAll();
  },
  methods: {
    login() {
      if (this.formLabelAlign.account === '' || this.formLabelAlign.password === '') {
        this.$message.error('请输入完整登录信息');
      } else if (this.formLabelAlign.account === 'admin' && this.formLabelAlign.password === 'admin') {
        setCookie('account', this.formLabelAlign.account, 1000 * 60);
        // 将历史用户名存入localStroage
        let users = JSON.parse(localStorage.getItem('users'));
        if (users) {
          // 去重
          if (users.indexOf(this.formLabelAlign.account) >= 0) {
            this.$router.push('/');
            return;
          } else {
            users.push(this.formLabelAlign.account);
            localStorage.setItem('users', JSON.stringify(users));
          }
        } else {
          let temp = [];
          temp.push(this.formLabelAlign.account);
          localStorage.setItem('users', JSON.stringify(temp));
        }
        this.$router.push('/');
      } else {
        this.$message.error('用户名或密码错误');
      }
    },
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (links) => {
        return (links.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      const users = JSON.parse(localStorage.getItem('users'));
      const value = [];
      const newList = [];
      if (users) {
        const keys = Object.keys(users);
        for (let i = 0, len = keys.length; i < len; i += 1) {
          const key = keys[i];
          value[i] = users[key];
          const arr = {
            value: value[i]
          };
          newList.push(arr);
        }
        return newList;
      } else {
        return newList;
      }
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
  .inline-input {
    width: 350px;
  }
</style>
