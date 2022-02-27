import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import Write from '@/components/Write'
import PlayVideo from '@/components/PlayVideo'
import ImgMore from '@/components/ImgMore'
import Register from '@/components/Register'
import User from '@/components/User'
import Admin from '@/components/Admin'
import Videoupload from '@/components/Videoupload'
import VideoMore from '@/components/VideoMore'
import SetData from '@/components/SetData'





Vue.use(Router)
//配置upload路由相关处理函数


const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/Register',
      name:'Register',
      component:Register
    },
    {
      path:'/SetData',
      name:'SetData',
      component:SetData
    },
    {
      path:'/Detail',
      name:'Detail',
      component:Detail
    },
    {
      path:'/Write',
      name:'Write',
      component:Write
    },
    {
      path:'/PlayVideo',
      name:'PlayVideo',
      component:PlayVideo
    },
    {
      path:'/ImgMore',
      name:'ImgMore',
      component:ImgMore
    },
    {
      path:'/VideoMore',
      name:'VideoMore',
      component:VideoMore
    },
    {
      path:'/User',
      name:'User',
      component:User
    },
    {
      path:'/Admin',
      name:'Admin',
      component:Admin
    },
    {
      path:'/Videoupload',
      name:'Videoupload',
      component:Videoupload
    },
    {
      path:'/',
      redirect:'/Main'
    }
  ],
  
})

