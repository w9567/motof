<template>
  <div id="box" class="contain">
    <div class="nav">
      <el-button @click="filtercurrentlist(1)" type="primary" size="small" plain>全部</el-button>
      <el-button @click="filtercurrentlist(2)" type="success" size="small">已完成</el-button>
      <el-button @click="filtercurrentlist(3)" type="info" size="small">审核中</el-button>
    </div>
    <div class="box" v-infinite-scroll="load" infinite-scroll-disabled="disabled" >
        <ul class="list" >
          <li v-for="(i,index) in currentPagecomputes" class="list-item" :key="index">
              {{ i.title }}
              <span style="float:right;"><i class="el-icon-s-opportunity" :class="i.status==='已完成'?'normal':(i.status=='待审核'?'audit':'off')"></i>{{i.status}}&nbsp;&nbsp;&nbsp;{{i.date}}</span>
            </li>
        </ul>
        <p v-if="loading" style="margin-top:10px;" class="loading">
          <span></span>
        </p>
        <p v-if="noMore" style="margin-top:10px;font-size:13px;color:#ccc">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"ArticleLists",
  data() {
    return {
      count: 1,//起始页数值为0
      loading: false,
      totalPages: "",//取后端返回内容的总页数
      list: [], //后端返回的数组
      currentPage: [], // 当前页数据
      pageSize: 5, // 每页数据条数
      currentPagecomputes:[],
      
    };
  },
  computed: {
    // currentPagecomputes:function(){
    //   return this.currentPage.filter(function(item){
    //     // console.log(item)
    //     return item.status=='已完成';
    //   })
    // },
    noMore() {
      //当起始页数大于总页数时停止加载
      
      return this.count >= this.totalPages ;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    this.getMessage();
  },
  methods: {
    filtercurrentlist(type){
      switch (type) {
        case 1:
          this.currentPagecomputes=this.list;
          break;
        case 2:
          this.currentPagecomputes=this.list.filter(function(item){return item.status=='已完成'})
          break;
        case 3:
          this.currentPagecomputes=this.list.filter(function(item){return item.status=='待审核'})
          break;
      }
          
    },
    load() {
      //滑到底部时进行加载
      this.loading = true;
      setTimeout(() => {
        this.count += 1; //页数+1
        this.loading=false;
        // this.getMessage(); //调用接口，此时页数+1，查询下一页数据
      }, 2000);
    },
    getMessage() {
    //   let params = {
    //     pageNumber: this.count,
    //     pageSize: '' //每页查询条数
    //   };
      let username=sessionStorage.getItem("userKey");
      let _this=this;
      this.axios({
          method:"post",
          url:"http://localhost:8000/getmyarticle",
          data:_this.Qs.stringify({
            author:username
          })
            
          
      })
        .then(res => {
          // console.log(res);
          this.list = res.data// 接收所有返回数据
          // console.log(this.pageSize,'this.pageSize')
          this.totalPages = Math.ceil(this.list.length / this.pageSize) // 计算出totolPage
          // console.log(this.totalPages,'this.totalPages')
          // console.log(this.count,'this.count')
          this.currentPage = this.list.slice((this.count - 1) * this.pageSize, this.count * this.pageSize) // 第一页数据
          // console.log(this.currentPage,'this.currentPage')
          this.loading = false;
          this.currentPagecomputes=this.list
        })
        .catch(err => {
          console.log(err);
        });
    },
    
  },
  watch: {
    count (val) {
        const currentPage = this.list.slice((val - 1) * this.pageSize, val * this.pageSize)
        this.currentPage = [...this.currentPage, ...currentPage]
        }
    },
};
</script>

<style scoped>

.nav span{
  margin-left: 10px;

}
#box{
    width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
}
/* 滑块样式 */
.contain::-webkit-scrollbar {
  width: 10px;
}
.contain::-webkit-scrollbar-track {
  border-radius: 5px;
}
.contain::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(27, 140, 236, 0.5);
}
.box {
  width: 100%;
   margin:  0 auto;
   
}
.list {
  padding: 0;
  font-size: 14px;
}
.list-item {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  list-style: none;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #e7e7e7;
}
.loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #409eff;
  border-left: transparent;
  animation: zhuan 0.5s linear infinite;
  border-radius: 50%;
}
@keyframes zhuan {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.normal{
  color:#67C23A;
}
.audit{
  color: #F56C6C;

}
.off{
  color: #b6b2b2;

}
</style>
