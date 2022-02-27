<template>
  <!-- <el-carousel :interval="4000" type="card" height="270px">
    <el-carousel-item v-for="item in cardimglist" :key="item.id">
      
      <img :src="require(`../assets/images/${item.url}`)" />
      
    </el-carousel-item>
  </el-carousel> -->
  <div class="imglist"  >
    <div class="list" v-for="item in imglist" :key="item.id">
      <el-image 
        style="float:left;width: 200px; height: 200px;margin:5px 20px;"
        :src="item.url" 
        :preview-src-list="bigimglist"
        fit="cover"
        :title="item.title"
        >
      </el-image>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      imglist: [
        // {id:'3301',url:require('../assets/images/新4.jpg')},
        // {id:'3302',url:require('../assets/images/新5.jpg')},
        // {id:'3303',url:require('../assets/images/新1.jpg')},
        // {id:'3304',url:require('../assets/images/新2.jpg')},
        // {id:'3305',url:require('../assets/images/新3.jpg')},
        // {id:'3306',url:require('../assets/images/新7.jpg')},
        // {id:'3307',url:require('../assets/images/新6.jpg')}
      ],
      bigimglist:[],
      
    };
  },
  methods: {
    trunimg(){
      var url=""
      for(let i=0;i<this.imglist.length;i++){
        url=this.imglist[i].url
        this.bigimglist.push(url)
      }
      // console.log(this.bigimglist,'this.bigimg')
    }
  },
  created: function () {
    let _this=this;
    axios({
      method:"POST",
      url:"http://localhost:8000/getimg",
      data: _this.Qs.stringify({
        limit:8
      }),

    })
    .then((response) => {
      // sessionStorage.setItem('cardimgKey', JSON.stringify(response.data));
      // console.log(response.data[3].url);
      this.imglist = response.data;
      this.trunimg();
    })
    .catch((err)=>{
      console.log(err)
    });
  },
};
</script>

<style scoped>

.list{
  margin-left: 40px;
}
.el-image >>>.el-image__preview{
  cursor:zoom-in;
}
/* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
</style>