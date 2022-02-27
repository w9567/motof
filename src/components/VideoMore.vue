<template>
  <div class="videomore">
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
      <span>类别</span>
      <span @click="filtermorelist(1)"><i class="el-icon-s-help" style="color:#909399"></i>全部</span>
      <span @click="filtermorelist(2)"><i class="el-icon-help" style="color:#909399"></i>搞笑</span>
      <span @click="filtermorelist(3)"><i class="el-icon-sugar" style="color:#909399"></i>生活</span>
      <span @click="filtermorelist(4)"><i class="el-icon-dessert" style="color:#909399"></i>安全</span>
    </nav>
    <div class="moredetail"  >
      <div
        class="imgmorecontent"
         
         v-for="(item,index) in newvideomore.slice(
          (currentPage - 1) * pagesize,
          currentPage * pagesize
        )"
        :key="index"
        @mouseover="showbtn(index)" @mouseout="hiddenbtn(index)"
      >
        <img :src="require(`../assets/images/${item.cover}`)" />
        <div class="zhezhao"  @click="runvideo(item)"  >
          <img ref="shabi" class="hiddened" src="../assets/images/video_btn_hover.png" />
        </div>
        <span>{{ item.title }}</span>
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
          :total="totalvideo">
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
  name: "VideoMore",
  data: function () {
    return {
      // islogined: false,
      // islogining: true,
      pagesize: 12,
      currentPage: 1,
      totalvideo:"",
      videomorelist: [
        // {id:'4401',url:''},
        // {id:'4402',url:''},
        // {id:'4403',url:''},
        // {id:'4404',url:''},
        // {id:'4405',url:''},
        // {id:'4406',url:''},
        // {id:'4407',url:''},
        // {id:'4408',url:''},
        // {id:'4409',url:''},
        // {id:'4410',url:''},
        // {id:'4411',url:''},
        // {id:'4412',url:''},
        // {id:'4413',url:''},
        // {id:'4414',url:''},
        // {id:'4415',url:''},
        // {id:'4416',url:''},
        // {id:'4417',url:''},
        // {id:'4418',url:''},
        // {id:'4419',url:''},
        // {id:'4420',url:''},
        // {id:'4421',url:''},
        // {id:'4422',url:''},
        // {id:'4423',url:''},
        // {id:'4424',url:''}
      ],
      newvideomore:[],
    };
  },
  methods: {
    turnMain() {
      this.$router.push({
        path: "/Main",
      });
    },
    runvideo:function(videolists){
            // console.log("diandian")
            this.$router.push({
                name:'PlayVideo',
                params:{
                    videolists:videolists,

                }
            })
            
            
        },
    showbtn:function(index){
            this.$refs.shabi[index].setAttribute('class', '')
        },
    hiddenbtn:function(index){
            this.$refs.shabi[index].setAttribute('class', 'hiddened')
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
      this.currentPage=1;
      switch (type) {
        case 1:
          this.newvideomore=this.videomorelist.filter(function(item){
              return item
          });
          this.totalvideo=Math.ceil(this.newvideomore.length)
          break;
        case 2:
            this.newvideomore=this.videomorelist.filter(function(item){
              
              return item.model=='搞笑'
          })
          this.totalvideo=Math.ceil(this.newvideomore.length)
          break;
        case 3:
          this.newvideomore=this.videomorelist.filter(function(item){
            
            return item.model=='生活';
          })
          this.totalvideo=Math.ceil(this.newvideomore.length)
          break;
        case 4:
         
          this.newvideomore=this.videomorelist.filter(function(item){
            
            return item.model=='安全';
          })
          this.totalvideo=Math.ceil(this.newvideomore.length)
          break;
      }

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

    //数据初始化
    if(sessionStorage.getItem('videomoreKey')==null||sessionStorage.getItem('videomoreKey')==""){
      axios.post('http://localhost:8000/getallvideo').then((response)=>{
            sessionStorage.setItem('videomoreKey',JSON.stringify(response.data));
            this.videomorelist=response.data;
            this.newvideomore=this.videomorelist;
            this.totalvideo=Math.ceil(this.newvideomore.length)
            // console.log(this.newvideomore,'new')
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
      this.videomorelist=JSON.parse(sessionStorage.getItem('videomoreKey'))
      this.newvideomore=this.videomorelist;
      this.totalvideo=Math.ceil(this.newvideomore.length)
    }
    
  },
};
</script>

<style scoped>
.hiddened{
    display: none;
}
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

nav span:nth-child(2):hover{
  color: #66d43a;
  cursor: pointer;
}
nav span:nth-child(3):hover{
  color: rgb(161, 244, 255);
  cursor: pointer;
}
nav span:nth-child(4):hover{
  
  color: rgb(255, 158, 2);
  cursor: pointer;
}
nav span:nth-child(5):hover{
  color: #F56C6C;
  
  cursor: pointer;
}
.moredetail {
  width: 90%;
  height: 640px;
  margin: 10px auto;
}
.imgmorecontent {
  width: 24%;
  height: 200px;
  margin: 5px 5px;
  float: left;
  position: relative;
}
.imgmorecontent .zhezhao{
  position: absolute;
  top: 0;
  left: 0;
}

.imgmorecontent span {
  position: relative;
  top: -30px;
  left: 10px;
  color: #fff;
}
.imgmorecontent img{
  width: 100%;
  height: 170px;
}
.pagination{
  width: 100%;
  text-align: center;
  float: left;
 
}

</style>