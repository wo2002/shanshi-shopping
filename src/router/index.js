import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store/index'

const Login = () => import('@/views/login')
const SearchPage = () => import('@/views/search/SearchPage')
const SearchList = () => import('@/views/search/SearchList')
const MyOrder = () => import('@/views/myOrder')
const GoodsDetail = () => import('@/views/goodsDetail')
// const store = () => import('@/store/index')
const Address = () => import('@/views/address/index')
const AddAddress = () => import('@/views/address/AddAddress')
const Pay = () => import('@/views/pay')
const Comment = () => import('@/views/comment')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    // redious: '/home',
    // 自动定向
    redirect: '/home',
    // 嵌套二级路由
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: SearchPage },
  { path: '/searchlist', component: SearchList },
  { path: '/myorder', component: MyOrder },
  { path: '/pay', component: Pay },
  // 动态路由设置，需要携带id
  { path: '/prodetail/:id', component: GoodsDetail },
  { path: '/address', component: Address },
  { path: '/addaddress', component: AddAddress },
  { path: '/comment/:id', component: Comment }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
// 所有的路由在真正被访问到之前，都会经过全局前置守卫
// 只有全局守卫放行了，才会到达对应的页面

// to: 到哪里去，到哪去的完整路由信息对象（路径，参数）
// from: 从哪里来，从哪里来的完整路由信息对象（路径，参数）
// next(): 是否放行
// （1）next() 直接放行，放行到to要去的路径
// (2)next(路径) 进行拦截，拦截到next里面配置的路径

const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 判断页面是否需要权限控制
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  // 判断是否携带token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
