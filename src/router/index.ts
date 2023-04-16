import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  List,Grid,TrendCharts
} from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: 'echarts',
        name: 'echarts',
        component: () => import('../views/home/children/EchartsView.vue'),
        meta:{
          title:'数据展示',
          icon:TrendCharts
        }
      },
      {
        path: 'pay',
        name: 'pay',
        component: () => import('../views/home/children/PayList.vue'),
        meta:{
          title:'缴费管理',
          icon:Grid
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/home/children/UserOne.vue'),
        meta:{
          title:'住户信息',
          icon:List
        },
        children:[
          {
            path: 'userlist',
            name: 'userlist',
            component: () => import('../views/home/children/UserList.vue'),
            meta:{
              classifyTitle:"住户信息",
              title:'住户列表'
            }
          },
          {
            path: 'update',
            name: 'update',
            component: () => import('../views/home/children/UserUpdate.vue'),
            meta:{
              classifyTitle:"住户信息",
              title:'住户信息修改'
            }
          }
        ]
      },
    ]
  },
  {
    path: "/",
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
