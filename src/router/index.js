import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import DefaultTab from '@/components/navbar/DefaultTab.vue'
import DataTab from '@/components/navbar/DataTab.vue'
import UserManage from '@/components/user/UserManage.vue'

Vue.use(VueRouter)

const routesArr = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/main/:userId',
    // 路由懒加载
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MainView,
    props: true,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'default',
        component: DefaultTab,
      },
      {
        path: 'data',
        component: DataTab,
      },
      // {
      //   path: 'user',
      //   component: UserManage,
      // },
      {
        path: '',
        redirect: 'default'
      }
    ]
  }
]

const router = new VueRouter({
  routes: routesArr
})



router.beforeEach((to, from, next) => {
  // next在所有逻辑分支中只能且必须调用一次
  // ...next()
  // console.log(sessionStorage.getItem('token'))
  const isAuthenticated = sessionStorage.getItem('token')
  // 如果token存在&&token合法(授权认证)
  // 1. 一个和服务端交互的请求都没有，守卫中需要和后端进行验证
  // 2. 打开的页面中有与后端的请求（服务端都会校验token）
  if (to.fullPath !== '/' && !isAuthenticated) { next('/') }
  else next()
})

export default router
