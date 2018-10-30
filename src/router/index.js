import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components ={
  login:()=> import('@/views/login/Loginindex'),
  layout:()=>import ('@/views/layout'),
  home:()=>import ('@/views/home'),
  userList:()=>import ('@/views/admin/userList'),
  addUser:()=>import ('@/views/admin/addUser'),
  editUserinfo:()=>import ('@/views/admin/editUserinfo'),
  editpassword:()=>import ('@/views/admin/editpassword'),
  addnews:()=>import ('@/views/news/addnews'),
  newslist:()=>import ('@/views/news/newslist'),
  swiperList:()=>import ('@/views/swiper/swiperList'),
  addSwiper:()=>import ('@/views/swiper/addSwiper'),
  swiperDetail:()=>import ('@/views/swiper/swiperDetail'),
  topicList:()=>import ('@/views/topic/topicList'),
  commonList:()=>import ('@/views/topic/commonList'),
  topicDetail:()=>import ('@/views/topic/topicDetail'),
  categoryList:()=>import ('@/views/category/categoryList'),
  addCategory:()=>import ('@/views/category/addCategory'),
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
            title:'修改管理员'
          },
          component:components.addUser
        },
        {
          path:'editUserinfo',
          name:'editUserinfo',
          meta:{
            title:'修改个人信息'
          },
          component:components.editUserinfo
        },
        {
          path:'editpassword',
          name:'editpassword',
          meta:{
            title:'修改密码'
          },
          component:components.editpassword
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
            title:'新闻列表'
          },
          component:components.newslist
        },
        {
          path:'newsDetail',
          name:'newsDetail',
          meta:{
            title:'新闻详情'
          },
          component:components.addnews
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
        {
          path:'swiperDetail',
          name:'swiperDetail',
          meta:{
            title:'轮播图详情'
          },
          component:components.swiperDetail
        },
        {
          path:'topicList',
          name:'topicList',
          meta:{
            title:'评论列表'
          },
          component:components.topicList
        },
        {
          path:'topicDetail',
          name:'topicDetail',
          meta:{
            title:'评论详情'
          },
          component:components.topicDetail
        },
        {
          path:'categoryList',
          name:'categoryList',
          meta:{
            title:'分类列表'
          },
          component:components.categoryList
        },
        {
          path:'addCategory',
          name:'addCategory',
          meta:{
            title:'添加分类'
          },
          component:components.addCategory
        },
        {
          path:'commonList',
          name:'commonList',
          meta:{
            title:'回复列表'
          },
          component:components.commonList
        },
      ]
    },
  ]
})
 