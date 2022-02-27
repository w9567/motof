<template>
  <div class="detail">
    <!-- <h1>我是详情</h1>
      {{detaildata.id}}
      {{detaildata.title}} -->
   
    <header class="header">
      <div class="header left">
        <!-- <img src="" /> -->
      </div>
      <br />
      <strong @click="turnMain">Motof</strong>
      <div class="right">
        <!-- <logined v-show="islogined"></logined> -->
        <logined v-show="islogined"></logined>
        <router-link
          style="color: #fff"
          v-show="islogining"
          id="checkname"
          to="Login"
          >登陆/注册</router-link
        >
      </div>
    </header>
    
    <div class="box">
      <div ref="scroll" class="contain">
        <div class="title">
          <h1 >{{ this.newdetaildata.title }}</h1>
          <span
            >[{{ this.newdetaildata.date|ellipsis2 }}]&nbsp;&nbsp;&nbsp;作者：<span
              style="color: #f1d7d7"
              >{{ this.newdetaildata.author }}</span
            ></span
          >
          <div class="content" v-html="this.newdetaildata.content"></div>
        
        </div>
        <div class="collect">
          <i title="点赞" @click="addgoods()" class="el-icon-thumb"
            >：{{ this.newdetaildata.goods }}</i
          >

          <i
            :class="iscollect ? 'collected' : ''"
            title="收藏"
            @click="addcollect()"
            class="el-icon-star-off"
          ></i>
          <br />

          <div class="prev">
            <a href="javascript:void(0)" @click="preva(newdetaildata.id)"
              >上一篇:<span>{{prevtitle| ellipsis}}</span></a
            >
          </div>
          <div class="next">
            <a href="javascript:void(0)" @click="nexta(newdetaildata.id)"
              >下一篇:<span>{{nexttitle| ellipsis}}</span></a
            >
          </div>
        </div>
        <!-- <div class="comment">
           <h1>评论</h1>
        </div> -->
      </div>
      <div class="about">
        <h1>猜你喜欢</h1>
        <div class="guess" v-for="(i, index) in guesses" :key="index">
          <img
            :src="i.listtop ? i.listtop : require('../assets/images/logo.png')"
          />
          <span @click="setDetail(i)">{{ i.title | ellipsis }}</span>
          <br />
          <br />
          <br />
          <span style=""
            ><i style="color: #67c23a" class="el-icon-thumb"></i>：{{
              i.date
            }}</span
          >
        </div>
      </div>
      <div class="toup" v-show="istoup" @click="getscroll()">
        <img style="width:50px;height:60px;float:right;" src="../assets/images/rocket.png"/>

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Logined from "./Logined.vue";

export default {
  components: { Logined, },
  name: "Detail",
  

  data: function () {
    return {
      islogined: false,
      islogining: true,
      guesses: [],
      newgoods: "",
      iscollect: '',
      newdetaildata: [],
      currentlist:[],
      prevtitle:'',
      nexttitle:'',
      istoup:false,
      newdetailsafe:this.$route.params.safelist,
      newdetailnew:this.$route.params.newlist,
      newdetailarticle:this.$route.params.articlelist,
      elem:null,
      timer:null,
    };
  },
  methods: {
    getscroll(){
      // console.log(this.$refs.scroll.scrollTop)
      clearInterval(this.timer);
      this.timer=setInterval(() => {
        this.$refs.scroll.scrollTop=this.$refs.scroll.scrollTop-100
      }, 100);
    },
    turnMain() {

      this.$router.push({
        path: "/Main",
      });
    },
    runDetail(item){
      // console.log(item)
      this.$router.push({
        name: "Detail",
        params: {
          articlelist: item,
        },
      });
    },
    setDetail(item){
      // console.log(item)
      this.newdetaildata=item
      this.getiscollect();
      this.setDetailcoll(item.id);
    },
    setDetailcoll(id){
      if(id==40012){
        // console.log('11')
        this.prevtitle='到顶了...'
        this.nexttitle='我的花甲环华之旅——从大理到靖'
      }else{
        this.axios({
          method:'post',
          url:'http://localhost:8000/getarticle',
          params:{
            id:id-1
          }
        })
        .then((res)=>{
          this.prevtitle=res.data[0].title
          this.nexttitle=res.data[2].title
        })
        .catch((err)=>{
          console.log(err)
        })
      }
      
    },
    getpn(type){
      setTimeout(() => {
        var id=parseInt(JSON.parse(sessionStorage.getItem('currentDetaillist')).id)
      // console.log(id)
      if(id<20000){
        // console.log(id,"safe")
        this.axios({
          method:'post',
          url:'http://localhost:8000/getsafe',
          params:{
            id:id-1
          }
        })
        .then((res)=>{
          if(res.data.length==2&&type==2){
            this.nexttitle='到底了...'
            this.prevtitle=res.data[0].title
          }else if(res.data.length==2&&type==1){
            this.prevtitle='到顶了...'
            this.nexttitle=res.data[1].title
          }else if(res.data.length==1){
            this.prevtitle='到顶了...'
            this.nexttitle='到底了...'
          }else{
            // console.log(res.data)
          this.prevtitle=res.data[0].title
          this.nexttitle=res.data[2].title
          }
          
        })
        .catch((err)=>{
          console.log(err)
        })
      }else if(id>20000&&id<30000){
        // console.log("new")
        this.axios({
          method:'post',
          url:'http://localhost:8000/getnew',
          params:{
            id:id-1
          }
        })
        .then((res)=>{
          if(res.data.length==2&&type==2){
            this.nexttitle='到底了...'
            this.prevtitle=res.data[0].title
          }else if(res.data.length==2&&type==1){
            this.prevtitle='到顶了...'
            this.nexttitle=res.data[1].title
          }else{
            // console.log(res.data)
          this.prevtitle=res.data[0].title
          this.nexttitle=res.data[2].title
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }else{
        // console.log("books")
        this.axios({
          method:'post',
          url:'http://localhost:8000/getarticle',
          params:{
            id:id-1
          }
        })
        .then((res)=>{
          // console.log(res.data,'booksss')
          if(res.data.length==2&&type==2){
            this.nexttitle='到底了...'
            this.prevtitle=res.data[0].title
          }else if(res.data.length==2&&type==1){
            this.prevtitle='到顶了...'
            this.nexttitle=res.data[1].title
          }else{
            // console.log(res.data)
          this.prevtitle=res.data[0].title
          this.nexttitle=res.data[2].title
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
      }, 500);
      
    },
    getiscollect() {
      let _this = this;
      let username = sessionStorage.getItem("userKey");
      
      this.axios({
        method: "post",
        url: "http://localhost:8000/getiscollect",
        params: {
          collectid: _this.newdetaildata.id,
          username: username,
        },
      })
        .then((res) => {
          // console.log(res);
          // this.$message({
          //   type:'success',
          //   message:'收藏成功！'
          // })
          if (res.data == null || res.data == "") {
            this.iscollect = false;
          } else {
            this.iscollect = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    truniscollect(id) {
      
      let username = sessionStorage.getItem("userKey");
      
      this.axios({
        method: "post",
        url: "http://localhost:8000/getiscollect",
        params: {
          collectid: id,
          username: username,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data == null || res.data == "") {
            this.iscollect = false;
          } else {
            this.iscollect = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    preva(id) {
      // console.log(id);

      if (this.$route.params.safelist) {
        // console.log("安全");

        this.axios({
          method: "post",
          url: "http://localhost:8000/getnrsafe",
          params: {
            id: id - 1,
          },
        })
          .then((res) => {
            // console.log(res.data)
            if (res.data == null || res.data == "") {
              this.$message.error("对不起，已经到头了...");
              this.prevtitle='到顶了...'
            }else{
              this.getpn(1);
              this.truniscollect(id-1)
              this.newdetaildata = res.data[0];
              sessionStorage.setItem("currentDetaillist",JSON.stringify(this.newdetaildata))
              this.newgoods = parseInt(this.newdetaildata.goods);
              this.getiscollected(id-1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$route.params.newlist) {
        // console.log("新闻");

        this.axios({
          method: "post",
          url: "http://localhost:8000/getnrnew",
          params: {
            id: id - 1,
          },
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
              this.prevtitle='到顶了...'
              this.$message.error("对不起，已经到头了...");
            } else {
              this.getpn(1);
              this.truniscollect(id-1)
              this.newdetaildata = res.data[0];
              sessionStorage.setItem("currentDetaillist",JSON.stringify(this.newdetaildata))
              this.newgoods = parseInt(this.newdetaildata.goods);
              // console.log(this.newdetaildata)
              this.getiscollected(id-1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$route.params.articlelist) {
        // console.log("文章");
        this.axios({
          method: "post",
          url: "http://localhost:8000/getnrarticle",
          params: {
            id: id - 1,
          },
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
              this.prevtitle='到顶了...'
              this.$message.error("对不起，已经到头了...");
            } else {
              this.getpn(1);
              this.truniscollect(id-1)
              this.newdetaildata = res.data[0];
              sessionStorage.setItem("currentDetaillist",JSON.stringify(this.newdetaildata))
              this.newgoods = parseInt(this.newdetaildata.goods);
              this.getiscollected(id-1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.go(-1);
        // console.log("获取数据失败，请重新进入");
      }
      
    },
    nexta(id) {
      // console.log(id);
      if (this.$route.params.safelist) {
        // console.log("安全");

        this.axios({
          method: "post",
          url: "http://localhost:8000/getnrsafe",
          params: {
            id: id + 1,
          },
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
              this.nexttitle='到底了...'
              this.$message.error("对不起，已经到头了...");
            } else {
              this.getpn(2);
              this.truniscollect(id+1)
              this.newdetaildata = res.data[0];
              sessionStorage.setItem("currentDetaillist",JSON.stringify(this.newdetaildata))
              this.newgoods = parseInt(this.newdetaildata.goods);
              this.getiscollected(id+1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$route.params.newlist) {
        // console.log("新闻");
        this.axios({
          method: "post",
          url: "http://localhost:8000/getnrnew",
          params: {
            id: id + 1,
          },
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
              this.nexttitle='到底了...'
              this.$message.error("对不起，已经到头了...");
            } else {
              this.getpn(2);
              this.truniscollect(id+1)
              this.newdetaildata = res.data[0];
              sessionStorage.setItem("currentDetaillist",JSON.stringify(this.newdetaildata))
              this.newgoods = parseInt(this.newdetaildata.goods);
              this.getiscollected(id+1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$route.params.articlelist) {
        // console.log("文章");
        this.axios({
          method: "post",
          url: "http://localhost:8000/getnrarticle",
          params: {
            id: id + 1,
          },
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
              this.nexttitle='到底了...'
              this.$message.error("对不起，已经到头了...");
            } else {
              this.getpn(2);
              this.truniscollect(id+1)
              this.newdetaildata = res.data[0];
              sessionStorage.setItem("currentDetaillist",JSON.stringify(this.newdetaildata))
              this.newgoods = parseInt(this.newdetaildata.goods);
              this.getiscollected(id+1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.go(-1);
        // console.log("获取数据失败，请重新进入");
      }
    },
    open() {
      this.$confirm("请登陆后再进行此操作", "提示", {
        confirmButtonText: "去登录",
        cancelButtonText: "取消",
        type: "warning",
        center:true
      })
        .then(() => {
          this.$router.push({path:'/Login'})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    addgoods() {
      let _this = this;
      let username = sessionStorage.getItem("userKey");
      if (username == null || username == "") {
        this.open();
      }else{
        // console.log(this.newgoods,parseInt(this.newdetaildata.goods))
      // this.newgoods=parseInt(this.newdetaildata.goods)
      if (parseInt(this.newdetaildata.goods) == this.newgoods) {
        this.newdetaildata.goods=parseInt(this.newdetaildata.goods) + 1;
        sessionStorage.setItem('currentDetaillist',JSON.stringify(this.newdetaildata))
        // console.log(this.$route.params,'params')
        if (this.$route.params.safelist) {
          this.axios({
            method: "post",
            url: "http://localhost:8000/addsafegoods",
            params: {
              id: _this.newdetaildata.id,
            },
          })
            .then((res) => {
              // console.log(res,'res');
              
              this.$message({
                type: "success",
                message: "已点赞",
              });
            })
            .catch((err) => {
              console.log(err, "err");
            });
        } else if (this.$route.params.newlist) {
          this.axios({
            method: "post",
            url: "http://localhost:8000/addnewgoods",
            params: {
              id: _this.newdetaildata.id,
            },
          })
            .then((res) => {
              // console.log(res,'res');

              this.$message({
                type: "success",
                message: "已点赞",
              });
            })
            .catch((err) => {
              console.log(err, "err");
            });
        } else if (this.$route.params.articlelist) {
          this.axios({
            method: "post",
            url: "http://localhost:8000/addarticlegoods",
            params: {
              id: _this.newdetaildata.id,
            },
          })
            .then((res) => {
              // console.log(res,'res');

              this.$message({
                type: "success",
                message: "已点赞",
              });
            })
            .catch((err) => {
              console.log(err, "err");
            });
        } else {
          let data=JSON.parse(sessionStorage.getItem('currentDetaillist'))
          // console.log(data)
          if(data.type){
            // console.log("为safelist")
            
              this.axios({
            method: "post",
            url: "http://localhost:8000/addsafegoods",
            params: {
              id: _this.newdetaildata.id,
            },
          })
            .then((res) => {
              // console.log(res,'res');
              sessionStorage.setItem('currentDetaillist',JSON.stringify(this.newdetaildata))
              this.$message({
                type: "success",
                message: "已点赞",
              });
            })
            .catch((err) => {
              console.log(err, "err");
            });
            
            
          }else if(data.label){
            // console.log("wei 文章")
            
              this.axios({
            method: "post",
            url: "http://localhost:8000/addarticlegoods",
            params: {
              id: _this.newdetaildata.id,
            },
          })
            .then((res) => {
              // console.log(res,'res');

              this.$message({
                type: "success",
                message: "已点赞",
              });
            })
            .catch((err) => {
              console.log(err, "err");
            });
           
          }else{
            // console.log("wei xinwen")
           
              this.axios({
            method: "post",
            url: "http://localhost:8000/addnewgoods",
            params: {
              id: _this.newdetaildata.id,
            },
          })
            .then((res) => {
              // console.log(res,'res');

              this.$message({
                type: "success",
                message: "已点赞",
              });
            })
            .catch((err) => {
              console.log(err, "err");
            });
            
          }
          
        }
      } else {
        // console.log("dianle")
        // console.log(this.newgoods,this.newdetaildata.goods)
        this.$message.error("您已经点过赞了！")
      }
      }
    },
    addcollect() {
      let username=sessionStorage.getItem("userKey")
      if(username==null||username==""){
        this.open();
      }else{
      let _this = this;
      
      let username = sessionStorage.getItem("userKey");
      if (this.iscollect == false) {
        this.iscollect = !this.iscollect;
        // console.log(this.iscollect);
        clearTimeout(this.timer1);
        this.newdetaildata.collect = parseInt(this.newdetaildata.collect) + 1;
        this.timer1 = setTimeout(() => {
          this.axios({
            method: "post",
            url: "http://localhost:8000/addcollect",
            params: {
              collectid: _this.newdetaildata.id,
              username: username,
            },
          });
        }, 5000);
      } else {
        clearTimeout(this.timer2);
        this.iscollect = !this.iscollect;
        // console.log(this.iscollect);
        this.newdetaildata.collect = parseInt(this.newdetaildata.collect) - 1;
        this.timer2 = setTimeout(() => {
          this.axios({
            method: "post",
            url: "http://localhost:8000/deletecollect",
            params: {
              collectid: _this.newdetaildata.id,
              username: username,
            },
          });
        }, 5000);
      }
      }
    },
    getguess() {
      this.axios
        .post("http://localhost:8000/getallarticle")
        .then((res) => {
          // console.log(res);
          var newguess = [];
          for (let i = 0; i < 3; i++) {
            newguess.push(res.data[i]);
          }
          this.guesses = newguess;
          // console.log(guesses, "guesses");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getiscollected(id){
      // console.log(id,'ididididi')
      let username=sessionStorage.getItem('userKey')
      if(username){
        this.axios({
        method:'post',
        url:'http://localhost:8000/getcollected',
        params:{
          collectid:id,
          username:username
        }
      })
      .then((res)=>{
        console.log(res.data,'collected')

      })
      .catch((err)=>{
        console.log(err)
      })
      }
      
    },
    
  },
  

  created: function () {
    // console.log(this,'this1111');
    
    // console.log(this.detaildata, "222");
    this.newdetaildata = this.detaildata;
    // console.log(this.newdetaildata, "223");
    // this.newgoods == parseInt(this.newdetaildata.goods);
    let abbb=[];
    let old=JSON.parse(sessionStorage.getItem('oldcurrentDetaillist'));
    abbb.push(parseInt(old.goods))
    this.newgoods=abbb[0];
    // console.log(this.newgoods,'22')
    this.getguess();
    
    var _this = this;
    this.userinfo = window.sessionStorage.getItem("userKey");
    // let islo = JSON.stringify(_this.$route.params);
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
      let id=parseInt(sessionStorage.getItem("currentDetaillist").id)
      this.getiscollect(id);
    }
  },
  
  watch:{
    prevtitle:function(oldp,newp){
      // console.log(oldp,newp)
      setTimeout(() => {
        if(oldp==newp){
        this.prevtitle='到顶了...'
      }
      }, 500);
    },
   
  },
  mounted:function(){
    this.getpn();
    this.elem=this.$refs.scroll
    this.elem.addEventListener('scroll', () => {
      // console.log(" scroll " + this.$refs.scroll.scrollTop)
      if(this.$refs.scroll.scrollTop>=450){
        this.istoup=true;
      }else{
        this.istoup=false;
      }
      if(this.$refs.scroll.scrollTop==0){
        clearInterval(this.timer);
      }
      
    })
  },
  computed: {
    detaildata() {
      // console.log("data", this.$route.params);
      if (this.$route.params.safelist) {
        sessionStorage.setItem("currentDetaillist",JSON.stringify(this.$route.params.safelist))
        if(sessionStorage.getItem('oldcurrentDetaillist')==null){
          // console.log("meiold")
          sessionStorage.setItem("oldcurrentDetaillist",JSON.stringify(this.$route.params.safelist))
        }
        // this.currentlist=JSON.parse(sessionStorage.getItem('currentDetaillist'))
        return this.newdetailsafe;
      } else if (this.$route.params.newlist) {
        sessionStorage.setItem("currentDetaillist",JSON.stringify(this.$route.params.newlist))
        if(sessionStorage.getItem('oldcurrentDetaillist')==null){
          sessionStorage.setItem("oldcurrentDetaillist",JSON.stringify(this.$route.params.newlist))
        }
        // this.currentlist=JSON.parse(sessionStorage.getItem('currentDetaillist'))
        return this.newdetailnew;
      } else if (this.$route.params.articlelist) {
        sessionStorage.setItem("currentDetaillist",JSON.stringify(this.$route.params.articlelist))
        if(sessionStorage.getItem('oldcurrentDetaillist')==null){
          sessionStorage.setItem("oldcurrentDetaillist",JSON.stringify(this.$route.params.articlelist))
        }
        // this.currentlist=JSON.parse(sessionStorage.getItem('currentDetaillist'))
        return this.newdetailarticle;
      } else {
        this.currentlist=JSON.parse(sessionStorage.getItem('currentDetaillist'))
        return this.currentlist;
        // this.$router.go(-1);
        // console.log("获取数据失败，请重新进入");
      }
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
    },
    ellipsis2(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "";
      }
      return value;
    },
  },
  beforeDestroy:function(){
    clearInterval(this.timer)
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}


.detail {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 487px;
  background-image: url("../assets/images/bg4.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.header {
  width: 100%;
  height: 70px;
  background-color: #303133;
}
.header .left {
  width: 100px;
  height: 100%;
  background-image: url(../assets/images/logo.png);
  background-size: 100% 100%;
}

.header .left {
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
  width: 12rem;
  float: right;
}
.contain {
  width: 63%;
  height: 96%;
  margin-left: 30px;
  margin-top: 20px;
  /* background-color: cadetblue; */
  float: left;
  overflow: auto;
}

.contain .title h1 {
  color: white;
}
.contain .title span {
  color: white;
}
.contain .content {
  width: 90%;
  height: 100%;
  min-height: 290px;
  margin: 10px auto;
  color: #dcdfe6;
  /* background-color: rgb(211, 211, 211); */
  background-color: hsla(0, 0%, 100%, 0.1);
  box-shadow: inset 0 0 15px 0 #fff;
  border-radius: 15px;
}
.contain .content>>> a{
  color: #ff5722;
}
.contain::-webkit-scrollbar {
  width: 5px;
}
.contain::-webkit-scrollbar-track {
  border-radius: 5px;
}
.contain::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #a4a6a8;
}
.collected {
  color: #ff5722;
}
.contain .collect {
  color: #fff;
}
.collect i {
  font-size: 30px;
  cursor: pointer;
  margin: 10px 135px;
}

.collect a {
  width: 100px;
  font-size: 20px;
  cursor: pointer;
  color: #9e9e9e;
  text-decoration: none;
}
.collect span {
  font-size: smaller;
}
.collect span:hover {
  color: #ff5722;
}
.collect .prev {
  display: inline-block;
  width: 350px;
}
.collect .next {
  display: inline-block;
  width: 350px;
  
}
.comment{
  color: #fff;
}
.about {
  width: 30%;
  height: 100%;
  margin-left: 30px;
  margin-top: 20px;
  float: right;
  color: #fff;
  border: 1px solid #fff;
  background-color: hsla(0, 0%, 100%, 0.1);
  box-shadow: inset 0 0 15px 0 #fff;
  border-radius: 15px;
  max-height: 450px;
  overflow: auto;
}
.about::-webkit-scrollbar {
  width: 5px;
}
.about::-webkit-scrollbar-track {
  border-radius: 5px;
}
.about::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #a4a6a8;
}
.about .guess {
  width: 80%;
  margin-top: 20px;
  float: left;
}

.guess span {
  font-size: small;
  color: #fff;
  float: left;
}
.toup{
  position: absolute;
    left: 65%;
    top: 80%;
}
.guess span:first-of-type:hover{
  cursor: pointer;
  color: #f60;
  font-size: smaller;
}
.guess img {
  width: 75px;
  height: 75px;
  float: left;
}
.allmusic{
  display: none;
}
</style>