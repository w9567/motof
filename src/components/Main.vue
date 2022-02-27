<template >
  <div class="contain">
    <header class="header" ref="point1">
      <div class="header left">
        <!-- <img src="" /> -->
      </div>
      <br />
      <strong @click="turnMain">Motof</strong>
      
      <div class="right">
        <logined v-show="islogined"></logined>
        <router-link style="color:#fff;" v-show="islogining" id="checkname" to="Login"
          >登陆/注册</router-link
        >
      </div>
    </header>
    <div class="top">
      <!-- <img src="" />
            <img src="" />
            <img src="" />
            <img src="" />
            <img src="" /> -->
      <!-- <div class="magic">
        <router-link to="">资讯处</router-link>
        <router-link to="">图片廊</router-link>
        <router-link to="">视频秀</router-link>
        <router-link to="">摩友帖</router-link>
      </div> -->
      <div  class="announcement">
      <el-carousel  :interval="5000" indicator-position="none" arrow="never" height="35" direction="vertical">
      <el-carousel-item v-for="(item,index) in announcementlist" :key="index" >
        <i class="el-icon-mic" style="color:#F56C6C">：</i><span class="small">{{ item.content }}</span>
      </el-carousel-item>
    </el-carousel>
    </div>
    </div>
    <div class="navleft" ref="navmove" @mouseenter="navshow" @mouseleave="navhidden">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 5px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <!-- :collapse为消息提示 -->
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" style="background-color:rgb(66, 64, 64); border-radius:2em">
        <el-menu-item  index="1" @click="runpoint(0)">
          <i class="el-icon-upload2"></i>
          <!-- <router-link to="">导航一</router-link> -->
          <span slot="title" >支持/联系</span>
        </el-menu-item>
        <el-menu-item  index="2" @click="runpoint(1)">
          <i class="el-icon-view"></i>
          <span slot="title" >新闻区</span>
        </el-menu-item>
        <el-menu-item   index="3" @click="runpoint(2)">
          <i class="el-icon-picture"></i>
          <span slot="title">图片展</span>
        </el-menu-item>
        <el-menu-item   index="4" @click="runpoint(3)">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">视频秀</span>
        </el-menu-item>
        <el-menu-item   index="5" @click="runpoint(4)">
          <i class="el-icon-s-custom"></i>
          <span slot="title">摩友帖</span>
        </el-menu-item>
        <i
          class="el-icon-s-promotion"
          style="
            width: 35 px;
            height: 35 px;
            position: absolute;
            top: 50%;
            left: 100%;
            text-align: center;
            line-height: 35px;
            color:rgb(100, 100, 100);
          "
        ></i>
      </el-menu>
      <div class="support" v-show="issupport">
        <div class="ent">
          <img src="../assets/images/支持.png" />
          <img src="../assets/images/联系.jpg"/>
        </div>
        <div class="cover">
          <i @click="closeM()" class="el-icon-close" style="font-size:90px;color:red;float:right;"></i>
        </div>
      </div>
    </div>
    
    <nav class="nav">
      <div class="block">
        <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
        <el-carousel height="400px">
          <el-carousel-item v-for="item in imglist" :key="item.id">
            <!-- <img :src="item.url" /> -->
            <el-image 
              :src="item.url" 
              :preview-src-list="newimglist"
              >
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- <div class="block">
                <span class="demonstration">Click 指示器触发</span>
                <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
                </el-carousel>
            </div> -->

      <!-- 原生js -->
      <!-- <div id="imgul"  class="navimg" style="top:0">
                <img src="../assets/images/2.jpg"/>
                <img @load="timerimg" src="../assets/images/4.jpg"/>
                <img src="../assets/images/5.jpg"/>
                <img src="../assets/images/2.jpg"/>
            </div>
            <div class="btns">
                <span class="prev" @click="prev()"><img src="../assets/images/prev.png" /></span>
                <span class="next" @click="next()"><img src="../assets/images/next.png" /></span>
            </div> -->
    <div class="navright-t">
      <el-button  @click="gorouter(1)" >回城补给</el-button>
      <el-button @click="gorouter(2)" style="font-size:2em;" type="primary">博文帖</el-button>
      <el-button  @click="gorouter(3)" type="success">接着奏乐，接着舞</el-button>
      <el-button @click="gorouter(4)" style="font-size:1.7em;" type="info">图片廊</el-button>
      <el-button @click="gorouter(5)" style="font-size:1.2em;" type="warning">视频秀</el-button>
      <el-button @click="gorouter(6)" style="font-size:2.5em;" type="danger">创作</el-button>
      
    </div>
    <div  class="navright-b">
        
        <lister-music ref="musicurl" ></lister-music>
    </div>
    </nav>
    
    <!-- <div class="navright" ref="navrmove" @mouseenter="navrshow" @mouseleave="navrhidden" >
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" style="background-color:rgb(144, 200, 226);">
        <el-menu-item  index="1" @mouseenter="runsupport" @mouseleave="movesupport">
          <i class="el-icon-location-information"></i>
          
          <span slot="title" >大力支持</span>
          <div v-show="issupport" class="images">
            <img  src="../assets/images/支持.png" />
          </div>
        </el-menu-item>
        <el-menu-item  index="2" @mouseenter="runsupport2" @mouseleave="movesupport">
          <i class="el-icon-location-information"></i>
          <span slot="title" >相关联系</span>
          <div v-show="issupport2" class="images">
            <img src="../assets/images/联系.jpg" />
          </div>
        </el-menu-item>
        
        <i
          class="el-icon-s-promotion"
          style="
            width: 35 px;
            height: 35 px;
            position: absolute;
            top: 50%;
            right: 100%;
            text-align: center;
            line-height: 35px;
            color:rgb(144, 200, 226);
          "
        ></i>
      </el-menu>
    </div> -->
    <main class="main">
      <div class="right" ref="point2">
        <span style="margin-left: 10px; color: #fff"
          ><strong>新闻列表</strong></span
        >
        <new-list></new-list>
        <div class="right-r" >
          <p style="color:#fff;">日程：</p>
          <el-empty :image-size="80" v-show="!islog" description="暂无日程"></el-empty>
          <p v-show="islog">{{this.logcontent}}</p>
        </div>
      </div>
      
      <div class="left" >
        <span style="margin-left: 20px; color: #fff"
          ><strong>道路千万条，安全第一条</strong></span
        >
        <safe-list ></safe-list>
        
        <calendar-list @upupEvent="upuplog" style="margin-top:15px;"></calendar-list>
      </div>
      <div class="middle" ref="point3">
        <span style="margin-left: 10px; color: #fff"
          ><strong>图片廊</strong></span
        ><span @click="runimgDetail" class="more"><strong>></strong></span>
        <card-carousel></card-carousel>
      </div>
      <div class="shortvideo" ref="point4">
        <span style="margin-left: 10px; color: #fff"
          ><strong>摩旅游记</strong></span
        ><span @click="runvideoDetail" class="more" ><strong>></strong></span>
        <video-list></video-list>
      </div>
      <!-- <ul class="bg-bubblesthree">
        <li v-for="i in 10" :key="i"></li>
      </ul> -->
      <div class="article" ref="point5">
        <li v-for="i in 10" :key="i"></li>
        <span style="margin-left: 10px; color: #fff;"
          ><strong>摩友日记</strong></span
        >
        <article-list></article-list>
      </div>
    </main>
    
    <footer class="footer">
      <span>版权所有，侵权必究！</span>
      <span>沪ICP备xxxxxx1号</span>
      <span>沪公网安备xxxxxxxxxxxx0号</span>
      <span>作者：川</span>
      <span>邮箱：956792115@qq.com</span>
      <span>友情链接：</span>
      <a target="_blank" href="https://motorcycle.sh.cn/portal.php">摩托迷</a>
      <a target="_blank" href="http://www.moto8.com/www/">摩托吧</a>
      <a target="_blank" href="http://www.knight-un.com/">骑者联盟</a>
      <a target="_blank" href="https://www.newmotor.com.cn/">牛摩网</a>
    </footer>
    <to-top></to-top>
    
  </div>
</template>
<script>
import Detail from "./Detail.vue";

// import{previmg,nextimg, carousel} from "../../static/js/carousel.js"
import NewList from "./NewList.vue";
import SafeList from "./SafeList.vue";
import CardCarousel from "./CardCarousel.vue";
import CalendarList from "./CalendarList.vue";
import VideoList from "./VideoList.vue";
import Logined from "./Logined.vue";
import ArticleLists from './ArticleLists.vue';
import ArticleList from './ArticleList.vue';
import ListerMusic from './ListerMusic.vue';
import ToTop from './ToTop.vue';
import App from '../App.vue';


// import Detail from './Detail.vue'
// var myone=null;

export default {
  components: {
    NewList,
    SafeList,
    Detail,
    CardCarousel,
    CalendarList,
    VideoList,
    Logined,
    ArticleLists,
    ArticleList,
    ListerMusic,
    ToTop,
    App,

  },
  name: "Main",
  data: function () {
    return {
      islogined: false,
      islogining: true,
      isCollapse: true,
      issupport:false,
      issupport2:false,
      islog:false,
      logcontent:'',
      issupport:false,
      announcementlist:[
        {id:"1",content:"道路千万条，安全第一条！"},
        {id:"2",content:"骑行是一种健康自然的运动旅游方式 ，能充分享受旅行过程之美 。一辆车，一个背包"},
        {id:"3",content:"安全骑行，不炸街，不超车，争做文明骑士！"},
        {id:"4",content:"人生就像一次旅行，一路上，有人上车，也有人下车，有的与你结伴同行，有的挥手告别"},
        {id:"5",content:"春花、秋月、夏日、冬雪，相信生活和时间，我们结伴同行"},
      ],
      imglist: [
        { id: "2201", url: require("../assets/images/car1.jpg") },
        { id: "2202", url: require("../assets/images/car2.jpg") },
        { id: "2203", url: require("../assets/images/car3.jpg") },
        { id: "2204", url: require("../assets/images/car4.jpg") },
        { id: "2205", url: require("../assets/images/car5.jpg") },
      ],
      newimglist: [
        require("../assets/images/car1.jpg"),
        require("../assets/images/car2.jpg"),
        require("../assets/images/car3.jpg"),
        require("../assets/images/car4.jpg"),
        require("../assets/images/car5.jpg"),
      ],
      // supportimg:require("../assets/images/支持.png"),
      // supportimg2:require("../assets/images/联系.jpg"),
        
    };
  },
  methods: {
    turnMain() {
      this.$router.push({
        path: "/Main",
      });
    },
    closeM(){
      this.issupport=false;
      
    },
    upuplog(date){
      if(date==null||date==""){
        this.islog=false;
      }else{
        this.islog=true;
        this.logcontent=date;
        // console.log(date,'121321')
      }
    },
    open(ad) {
        this.$confirm('是否跳转到'+ad+'页面', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          if(ad==='图片'){
            this.$router.push({
              path:"/ImgMore"
            })
          }else if(ad==='视频'){
            this.$router.push({
              path:"/VideoMore"
            })
          }else if(ad==='创作'){
            this.$router.push({
              path:"/Write"
            })
          }else{
            this.$router.push({
              path:"/Login"
            })
            localStorage.clear()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
    gorouter(type){
      let ad=""
      switch (type) {
        case 1:
          ad="登陆"
          this.open(ad)
          // this.$message("开发正在熬夜整合中，请拭目以待")
          break;
        case 2:
          this.runpoint(4);
          break;
        case 3:
          this.$refs.musicurl.musicUrl="https://music.163.com/song/media/outer/url?id=1807478847.mp3"
          this.$refs.musicurl.musicpic="https://p2.music.126.net/DPEfrnR33DYNncYlRK4o4Q==/109951165573066704.jpg?param=130y130"
          this.$refs.musicurl.musicname="在下刘备字玄德"
          // console.log(this.$refs.musicurl.musicUrl);
          break;
        case 4:
          ad="图片"
          this.open(ad)
          break;
        case 5:
          ad="视频"
          this.open(ad)
          
          break;
        case 6:
          // console.log(this.islogined,'logined');
          if(this.islogined==false){
            // console.log("11");
            this.$confirm('您还没有登陆，正在跳转登陆, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({path:'/Login'})
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
          }else{
            // console.log("22")
            ad="创作"
            this.open(ad)
          }
          break;
      
      }
    },
    runimgDetail() {
      // console.log("跳转更多详情");
      this.$router.push({ path: "/ImgMore" });
    },
    runvideoDetail() {
      // console.log("跳转更多详情");
      this.$router.push({ path: "/VideoMore" });
    },
    navshow(){
      // console.log("显示",this.$refs.navmove);
      this.$refs.navmove.setAttribute('style','')
    },
    navhidden(){
      // console.log("隐藏");
      this.$refs.navmove.setAttribute('style','margin-left:-70px')
    },
    navrshow(){
      // console.log("显示",this.$refs.navmove);
      this.$refs.navrmove.setAttribute('style','')
      
    },
    navrhidden(){
      // console.log("隐藏");
      this.$refs.navrmove.setAttribute('style','margin-right:-75px')
      
    },
    runpoint(index){
      // console.log(this)
      let getpoint=""
      switch(index){
        case 0:
          this.issupport=true;
          break;
        case 1:
          getpoint=this.$refs.point2;
          // console.log(getpoint.scrollTop)
          getpoint.scrollIntoView({behavior: "auto", block: "start"});
          break;
        case 2:
          getpoint=this.$refs.point3;
          getpoint.scrollIntoView({behavior: "auto", block: "start"});
          break;
        case 3:
          getpoint=this.$refs.point4;
          getpoint.scrollIntoView({behavior: "auto", block: "start"});
          break;
        case 4:
          getpoint=this.$refs.point5;
          getpoint.scrollIntoView({behavior: "auto", block: "start"});
        
      }
      // console.log(getpoint);
      // getpoint.scrollIntoView();
      // getpoint.scrollIntoView(true);
      // getpoint.scrollIntoView({block: "start"});
      
      
      // console.log("我真的点了呀")
    // var point=document.getElementById()
    },
    runsupport(){
      this.issupport=true;
    },
    runsupport2(){
      this.issupport2=true;
    },
    movesupport(){
       this.issupport=false;
       this.issupport2=false;
    }
  },
  created: function () {
    // console.log(this,'this')
    var _this = this;
    this.userinfo = window.sessionStorage.getItem("userKey");
    this.admininfo = window.sessionStorage.getItem("adminKey");
    let islo = JSON.stringify(this.userinfo);
    // console.log(this.userinfo);
    // console.log(typeof islo);
    if (this.userinfo == null || this.userinfo == "{}" || this.userinfo == "") {
      // console.log("当前为游客登陆");
      _this.islogined = false;
      _this.islogining = true;
      this.islogined = _this.islogined;
      this.islogining = _this.islogining;
    } else if(this.admininfo=="admin"){
      this.islogined = false;
    }else{
      // console.log("用户登录");
      // console.log(this.$route.params)
      _this.islogined = true;
      _this.islogining = false;
      this.islogined = _this.islogined;
      this.islogining = _this.islogining;
    }
  },
  mounted:function(){
    
  },

};
</script>

<style scoped>


@import "../assets/main.css";
img{
  width: 100%;
  height: 100%;
}
.more {
  color: #fff;
  padding: 3px;
  font-size: larger;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50%;
  float: right;
  margin-right: 20px;
  text-align: center;
  line-height: 15px;
}
.more:hover {
  cursor: pointer;
  color: rgb(0, 234, 255);
  border-color: rgb(0, 234, 255);
}

/* .top a {
  text-decoration: none;
  position: relative;
  
  font-size: 17px;
  width: 135px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #9370db, #afeeee, #ffa500, #9370db);
 
  border-radius: 50px;
  text-transform: uppercase;
  background-size: 400%;
  z-index: 1;
  list-style: none;
  float: left;
  margin: 5px 80px;
}
.top a::before {
  content: "";
  position: absolute;
  left: -5px;
  top: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(90deg, #9370db, #afeeee, #ffa500, #9370db);
  
  background-size: 400%;
  border-radius: 50px;
  filter: blur(20px);
  z-index: -1;
}
.top a:hover {
  animation: sun 7s infinite;
}
.top a:hover::before {
  animation: sun 7s infinite;
}
@keyframes sun {
  100% {
    background-position: -400% 0;
  }
} */


</style>



