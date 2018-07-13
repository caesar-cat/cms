import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/BasicLayout/Home'
import Login from '@/components/UserLayout/Login'
import JobMain from '@/components/Job/Main'
import FirstType from '@/components/Job/FirstType'
import SecondType from '@/components/Job/SecondType'
import JobList from '@/components/Job/JobList'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '首页',
      component: Home,
      children: [{
        path: 'job',
        name: '招聘岗位管理',
        component: JobMain,
        children: [{
          path: 'firstType',
          name: '一级分类',
          component: FirstType
        }, {
          path: 'secondType',
          name: '二级分类',
          component: SecondType
        }, {
          path: 'jobList',
          name: '职位列表',
          component: JobList
        }]
      }]
    },
    {
      path: '/login',
      name: Login,
      component: Login
    }
  ]
})
