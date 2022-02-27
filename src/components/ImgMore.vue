<template>
  <div class="imgmore">
    <header class="header">
      <div class="header left">
        <!-- <img src="" /> -->
      </div>
      <br />
      <strong @click="turnMain">Motof</strong>
      <div class="right">
        <!-- <logined v-show="islogined"></logined> -->
        <logined v-show="islogined"></logined>
        <router-link style="color:#fff;" v-show="islogining" id="checkname" to="Login"
          >登陆/注册</router-link
        >
      </div>
    </header>
    <div class="box">
    <nav>
      <!-- style="color:#909399" -->
      <span><i class="el-icon-s-data"></i>类别</span>
      <span @click="filtermorelist(1)"><i class="el-icon-s-help" ></i>旧版</span>
      <span @click="filtermorelist(2)"><i class="el-icon-help" ></i>新版</span>
      <span @click="filtermorelist(3)"><i class="el-icon-sugar" ></i>黑色</span>
      <span @click="filtermorelist(4)"><i class="el-icon-dessert" ></i>白色</span>
      <span @click="filtermorelist(5)"><i class="el-icon-ice-cream" ></i>其他</span>
      <span @click="filtermorelist(6)"><i class="el-icon-s-help" ></i>全部</span>
    </nav>
    <div class="moredetail">
      <div
        class="imgmorecontent"
        v-for="item in newimgmore.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="item.id"
      >
        <!-- <img :src="require(`../assets/images/${item.url}`)" /> -->
        <!-- <img :src="item.url" /> -->
        <el-image 
        style="width: 200px; height: 200px;margin:5px 20px;"
        :src="item.url" 
        :preview-src-list="bigimglist"
        fit="cover"
        :title="item.title"
        >
      </el-image>
        <!-- <img src="" /> -->
        
      </div>
    </div>
    <div class="pagination" >
 
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20, 30, 40]"
          :page-size="12"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalimg">
        </el-pagination>

    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Logined from "./Logined.vue";
export default {
  components: { Logined },
  name: "ImgMore",
  data: function () {
    return {
      // islogined: false,
      // islogining: true,
      pagesize: 12,
      currentPage: 1,
      totalimg:10,
      imgmorelist: [
      ],
      newimgmore:[],
      bigimglist:[],
    };
  },
  methods: {
    turnMain() {
      this.$router.push({
        path: "/Main",
      });
    },
    trunimg(){
      var url=""
      for(let i=0;i<this.newimgmore.length;i++){
        url=this.newimgmore[i].url
        this.bigimglist.push(url)
      }
      // console.log(this.bigimglist,'this.bigimg')
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentchange = val;
      this.pagesize=val
      
    },
    handleCurrentChange(val) {
      // console.log(this, "this");
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      // console.log(this.imgmorelist);
      // console.log(this.imgmorelist instanceof Array);
    },
    filtermorelist(type){
      
      switch (type) {
        case 1:
          // console.log(this.imgmorelist)
          this.currentPage=1;
          this.newimgmore=this.imgmorelist.filter(function(item){
            // console.log(item.model)

            return item.model=="旧款"
          })
          this.totalimg=Math.ceil(this.newimgmore.length)
          break;
        case 2:
          this.currentPage=1;
          this.newimgmore=this.imgmorelist.filter(function(item){
            return item.model=='新款'
          })
          this.totalimg=Math.ceil(this.newimgmore.length)
          break;
        case 3:
          this.currentPage=1;
          this.newimgmore=this.imgmorelist.filter(function(item){
            return item.color=='黑色';
          })
          this.totalimg=Math.ceil(this.newimgmore.length)
          break;
        case 4:
         this.currentPage=1;
          this.newimgmore=this.imgmorelist.filter(function(item){
            
            return item.color=='白色';
          })
          this.totalimg=Math.ceil(this.newimgmore.length)
          break;
        case 5:
          this.currentPage=1;
          this.newimgmore=this.imgmorelist.filter(function(item){
            
            return item.color=='其他';
          })
          this.totalimg=Math.ceil(this.newimgmore.length)
          break;
        case 6:
          this.currentPage=1;
          this.newimgmore=this.imgmorelist;
          this.totalimg=Math.ceil(this.newimgmore.length)
          break;
       
      }

    }
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

    //数据初始化
    if(sessionStorage.getItem('cardmoreKey')==null||sessionStorage.getItem('cardmoreKey')==""){
      axios.post('http://localhost:8000/getcardmore').then((response)=>{
            sessionStorage.setItem('cardmoreKey',JSON.stringify(response.data));
            this.imgmorelist=response.data;
            this.newimgmore=this.imgmorelist;
            // console.log(this.newimgmore,'new')
            this.trunimg();
            this.totalimg=Math.ceil(this.newimgmore.length)
            
          })
    }else{
      // console.log(typeof())
      // 在这里分页是只能识别数组，所以需要将object对象转为数组形式
      // var obj=JSON.parse(sessionStorage.getItem('cardmoreKey'))
      // console.log(obj instanceof Array);
      // console.log(obj);
      // this.imgmorelist=obj;
      // console.log(this.imgmorelist instanceof Array);
      // console.log(this.imgmorelist);
      this.imgmorelist=JSON.parse(sessionStorage.getItem('cardmoreKey'))
      this.newimgmore=this.imgmorelist;
      this.trunimg();
      this.totalimg=Math.ceil(this.newimgmore.length)
    }
    
  },
};
</script>

<style scoped>
.box{
  width: 100%;
  height: 731px;
  background-image: url("../assets/images/bg4.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
header {
  width: 100%;
  height: 70px;
  background-color: #303133;
}
header .left {
  width: 100px;
  height: 100%;
  background-image: url(../assets/images/logo.png);
  background-size: 100% 100%;
}
.el-image >>>.el-image__preview{
  cursor:zoom-in;
}
header .left {
  float: left;
}
header strong {
  font-size: 2rem;
  margin-left: 2rem;
  color: #fff;
  font-style: oblique;
}
.header strong:hover {
  cursor: pointer;
}
header .right {
  width: 12rem;
  float: right;
}
nav{
  width: 100%;
  height: 30px;
  text-decoration: underline;
  color:#9e9e9e;
}
nav span{
  line-height: 30px;
  margin-left: 10px;

}
nav i:nth-child(2):hover{
  color:rgb(236, 46, 46)
}
nav span:nth-child(1):hover{
  cursor: pointer;
}
nav span:nth-child(2):hover{
  color: #978181;
  cursor: pointer;
}

nav span:nth-child(3):hover{
  color: rgb(161, 244, 255);
  cursor: pointer;
}
nav span:nth-child(4):hover{
  
  color: rgb(151, 97, 153);
  cursor: pointer;
}
nav span:nth-child(5):hover{
  color: #F0F0F0;
  
  cursor: pointer;
}
nav span:nth-child(6):hover{
  color: #F56C6C;
  cursor: pointer;
}
nav span:nth-child(7):hover{
  color: #73a55f;
  cursor: pointer;
}
.moredetail {
  width: 90%;
  height: 88%;
  margin: 10px auto;
}
.imgmorecontent {
  width: 24%;
  height: 200px;
  margin: 5px 5px;
  float: left;
}
.imgmorecontent span {
  position: relative;
  top: -30px;
  left: 10px;
}
/* .imgmorecontent img{
  width: 100%;
  height: 100%;
} */
.pagination{
  width: 100%;
  text-align: center;
  
 
}

</style>