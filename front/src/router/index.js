import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/components/layouts/BasicLayout'
import Login from '@/components/layouts/Login'
import JobMain from '@/components/job/Main'
import PageMain from '@/components/pages/Main'
import UserMain from '@/components/users/Main'
import HomePage from '@/components/pages/Home'
import UserList from '@/components/users/List'
import FirstType from '@/components/job/FirstType'
import SecondType from '@/components/job/SecondType'
import JobList from '@/components/job/JobList'
import Deliver from '@/components/job/Deliver'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'cms系统',
      component: BasicLayout,
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
            path: 'list',
            name: '职位列表',
            component: JobList
          }, {
            path: 'deliver',
            name: '投递记录',
            component: Deliver
          }]
        }, {
          path: 'pages',
          name: '页面配置',
          component: PageMain,
          children: [{
            path: 'home',
            name: '首页配置',
            component: HomePage
          }]
        },
        {
          path: 'users',
          name: '用户管理',
          component: UserMain,
          children: [{
            path: 'list',
            name: '用户列表',
            component: UserList
          }]
        }
      ]
    },
    {
      path: '/login',
      name: Login,
      component: Login
    }
  ]
})
