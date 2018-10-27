import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components ={
  login:()=> import('@/views/login/Loginindex'),
  layout:()=>import ('@/views/layout'),
  home:()=>import ('@/views/home'),
  userList:()=>import ('@/views/admin/userList'),
  addUser:()=>import ('@/views/admin/addUser'),
  addnews:()=>import ('@/views/news/addnews'),
  newslist:()=>import ('@/views/news/newslist'),
  swiperList:()=>import ('@/views/swiper/swiperList'),
  addSwiper:()=>import ('@/views/swiper/addSwiper'),
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: components.login
    },
    {
      path: '/layout',
      component: components.layout,
      redirect:'/layout/home',
      children:[
        {
          path:'home',
          name:'home',
          meta:{
            title:'首页'
          },
          component:components.home
        },
        {
          path:'userList',
          name:'userList',
          meta:{
            title:'管理员列表'
          },
          component:components.userList
        },
        {
          path:'addUser',
          name:'addUser',
          meta:{
            title:'添加管理员'
          },
          component:components.addUser
        },
        {
          path:'editUser',
          name:'editUser',
          meta:{
            title:'添加管理员'
          },
          component:components.addUser
        },
        {
          path:'addnews',
          name:'addnews',
          meta:{
            title:'添加新闻'
          },
          component:components.addnews
        },
        {
          path:'newslist',
          name:'newslist',
          meta:{
            title:'添加新闻'
          },
          component:components.newslist
        },
        {
          path:'addSwiper',
          name:'addSwiper',
          meta:{
            title:'添加轮播图'
          },
          component:components.addSwiper
        },
        {
          path:'swiperList',
          name:'swiperList',
          meta:{
            title:'轮播图列表'
          },
          component:components.swiperList
        },
        {
          path:'editSwiper',
          name:'editSwiper',
          meta:{
            title:'轮播图列表'
          },
          component:components.addSwiper
        },
      ]
    },
  ]
})
 