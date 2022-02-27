<template>
  <div class="playvideo">
    <header class="header" ref="point1">
      <div class="header left">
        <!-- <img src="" /> -->
      </div>
      <br />
      <strong @click="turnMain">Motof</strong>
      <div class="right">
        <!-- <logined v-show="islogined"></logined> -->
        <logined v-show="islogined"></logined>
        <router-link style="color:#fff;" v-show="islogining" id="checkname" to="Login">登陆/注册</router-link>
      </div>
    </header>
    <div class="box">
    <main>
      <div class="contain">
        <span><strong><span style="color:#4caf50;">视频标题:</span>&nbsp;&nbsp;&nbsp;{{videodetail.title}}</strong></span>
        &nbsp;&nbsp;&nbsp;
        <span><span style="color:#4caf50;">视频来源:</span>&nbsp;&nbsp;&nbsp;{{videodetail.author}}</span>
        <iframe
          frameborder="0"
          width="100%"
          height="100%"
          marginheight="0"
          marginwidth="0"
          scrolling="no"
          allowfullscreen="true"  
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          :src="videodetail.url"
        ></iframe>
      </div>
    </main>
    <div class="mainright">
        <h1 style="color:#fff;">猜你喜欢</h1>
        <div class="guess" v-for="(i, index) in guesses" :key="index">
          <img :src="require(`../assets/images/${i.cover}`)" />
          <span @click="runvideo(i)" >{{ i.title | ellipsis }}</span>
          <span style=""
            ><i style="color: #67c23a" class="el-icon-user-solid"></i>：{{
              i.author
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logined from "./Logined.vue";
export default {
  components: { Logined },
  name: "PlayVideo",
  data() {
    return {
      islogined: false,
      islogining: true,
      guesses:[
          {title:'死亡摇摆名场面-大神教你如何拯救',url:'https://player.youku.com/embed/XNTgyNjQwNjE1Ng==',author:'来源网络',cover:'v1.jpg'},
          {title:'人类驯服野生摩托珍贵影像',url:'https://player.youku.com/embed/XNTgyNjQwODk2MA==',author:'来源网络',cover:'v6.jpg'},
          {title:'人:哥带我抄个近道呗',url:'https://player.youku.com/embed/XNTgyNjQwNzUxMg==',author:'来源网络',cover:'v9.jpg'},
      ],
      newvideodetail:this.$route.params.videolists,
    };
  },
  methods: {
    turnMain() {
      this.$router.push({
        path: "/Main",
      });
    },
    runvideo:function(videolists){
      // console.log(videolists,'video')
      
      this.newvideodetail=videolists
      
    },
    
  },
  created: function () {
    var _this = this;
    this.userinfo = window.sessionStorage.getItem("userKey");
    let islo = JSON.stringify(_this.$route.params);
    // console.log(typeof(islo))
    if (this.userinfo == null || this.userinfo == "{}" || this.userinfo == "") {
      // console.log("当前为游客登陆");
      _this.islogined = false;
      _this.islogining = true;
      this.islogined = _this.islogined;
      this.islogining = _this.islogining;
    } else {
      // console.log("用户登录");
      // console.log(this.$route.params)
      _this.islogined = true;
      _this.islogining = false;
      this.islogined = _this.islogined;
      this.islogining = _this.islogining;
    }
  },

  computed: {
    videodetail() {
      // console.log("videodata", this.$route.params);
      return this.newvideodetail;
    },
  },
  filters: {
    // 判断超出30个字显示省略号
    
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    }
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  /* background-color: #1f2533; */
  position: relative;
  background-color: #303133;
}

.header .left {
  width: 100px;
  height: 100%;
  background-image: url(../assets/images/logo.png);
  background-size: 100% 100%;
  float: left;
}


.header strong {
  font-size: 2rem;
  margin-left: 2rem;
  color: #fff;
  font-style: oblique;
}
.header strong:hover {
  cursor: pointer;
}
.header .right {
  width: 160px;
  float: right;
  margin-right: 20px;
}
.box{
  width: 100%;
  height: 486px;
  background-image: url("../assets/images/bg4.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
main {
  width: 70%;
  height: 400px;
  margin-top: 40px;
  float: left;
}
.contain {
  width: 100%;
  height: 100%;
}
.contain span{
  color:#fff;
}
.mainright{
    width: 22%;
    height: 400px;
    float: right;
    margin-top: 60px;
    margin-right: 50px;
    border: 1px solid #fff;
    background-color: hsla(0,0%,100%,.1);
    -webkit-box-shadow: inset 0 0 15px 0 #fff;
    box-shadow: inset 0 0 15px 0 #fff;
    border-radius: 15px;
    color: #fff;
    
}
.mainright .guess{
  height: 100px;
  margin-top: 10px;

}
.mainright .guess img{
  width: 90px;
  height: 90px;
  display: inline-flex;
  float: left;
}
.mainright .guess span{
  font-size: smaller;
  display: inline-flex;
  width: 100px;
  height: 50px;
  float: left;
}
.mainright .guess span:last-of-type{
  margin-top: 10px;
}
.mainright .guess span:first-of-type:hover{
  color: #f60;
  cursor: pointer;
}
.content{
    width: 100%;
    height: 125px;
    
}
.content img{
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: hsla(0,0%,100%,.1);
    box-shadow: inset 0 0 15px 0 #fff;
}
.content span{
    position: relative;
    top:-30px;
    left: 10px;

}
</style>