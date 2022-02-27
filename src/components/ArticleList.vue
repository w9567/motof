<template>
  <div id="box" class="contains">
    <div class="box" v-infinite-scroll="load" infinite-scroll-disabled="disabled" >
        <ul class="list"  >
          <li v-for="(item,index) in currentPage" class="list-item"  :key="index" >
               <!-- <div v-if="item.status=='edit'"> -->
                <div class="imgbox">
                <img  @click="runDetail(item)" :src="item.listtop?item.listtop:require('../assets/images/logo.png')" />
                </div>
                <div class="book">
                  <span @click="runDetail(item)">{{ item.title }}</span>
                  <div  class="content">{{ item.content.replace(/[^\u4e00-\u9fa5]/g, '') | ellipsis}}</div>
                  <!-- <p>{{item.content.replace(/<img\b.*?(?:\>|\/>)/gi)}}</p> -->
                  <div class="author-label">
                    <strong>[{{ item.date }}/<span style="font-size:16px;color:#f56c6c;">{{ item.author }}</span>]</strong
                    >&nbsp;&nbsp;<span :class="item.label=='生活'?'e1':(item.label=='搞笑'?'e2':'e3')"><i  :class="item.label=='生活'?'el-icon-s-promotion':(item.label=='搞笑'?'el-icon-sugar':'el-icon-grape')"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.label }}
                  </div>
                </div>
              <!-- </div> -->
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
  name:"ArticleList",
  data() {
    return {
      count: 1,//起始页数值为0
      loading: false,
      totalPages: "",//取后端返回内容的总页数
      list: [], //后端返回的数组
      currentPage: [], // 当前页数据
      pageSize: 5, // 每页数据条数
      listtop:"",
      
    
    };
  },
  computed: {
    currentPagecompute:function(){
      return this.currentPage.filter(function(item){
        // console.log(item)
        return item.status=='已完成';
      })
    },
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
    runDetail(list) {
      // console.log(list);
      // console.log(this,'thisdetail')
      
      setTimeout(() => {
        this.$router.push({
        name: "Detail",
        params: {
          articlelist: list,
        },
      });
      }, 500);
      
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
      this.axios({
          method:"post",
          url:"http://localhost:8000/getallarticle",
        //   params
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
  filters: {
    // 判断超出30个字显示省略号
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 140) {
        return value.slice(0, 140) + ".........";
      }
      return value;
    },
  },
  // created:function(){
  //   if(sessionStorage.getItem('articlelistKey')==null||sessionStorage.getItem('articlelist')==""){
  //           axios.post("http://localhost:8000/getallarticle").then(response => {
  //           console.log(response.data,'resdata'); 

  //           this.articlelist=response.data;
  //           // let a=this.articlelist[5].content.toString()
  //           // console.log(a instanceof String)
  //           // console.log(a,'a')
  //           // console.log('1',this.articlelist[5].content.)
  //           // console.log(this.articlelist);
            
  //           sessionStorage.setItem('articlelistKey',JSON.stringify(this.articlelist))
  //         });
  //       }else{
  //         // console.log(JSON.stringify(sessionStorage.getItem('articlelistKey')) )
  //         // console.log('tostring',toString(JSON.stringify(sessionStorage.getItem('articlelistKey'))))
          
  //         this.articlelist=JSON.parse(sessionStorage.getItem('articlelistKey') );
  //       }
  // },
};
</script>

<style scoped>
#box{
    width: 100%;
  height: 95%;
  position: relative;
  overflow: auto;
  color:#c0c4cc;
}

/* 滑块样式 */
.contains::-webkit-scrollbar {
  width: 10px;
}
.contains::-webkit-scrollbar-track {
  border-radius: 5px;
}
.contains::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
}
.box {
  width: 100%;
   margin:  0 auto;
}
.list {
  padding: 0;
  font-size: 14px;
}
.list .imgbox{
  width: 150px;
  height: 150px;
}
.imgbox img{
  width: 100%;
  height: 100%;
}
.list-item {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  list-style: none;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 3px;
  line-height: 30px;
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
.list-item {
  width: 100%;
  height: 150px;
  /* background-color: red; */
  display: flex;
  
}
.list-item .book {
  margin-top: 5px;
}
.list-item .book span{
  font-size: 18px;
  font-weight: bold;
}
.list-item .content {
  width: 100%;
  height: 65px;
  
  /* background-color: blue; */
  overflow: hidden;
}
.list-item .author-label {
  margin-top: 5px;
}

.list-item img {
  width: 150px;
  height: 150px;
}
.book span:first-of-type:hover {
  text-decoration: underline;
  color: #f60;
  cursor: pointer;
}
.e1{
  color: #409eff;
}
.e2{
  color: #f60;
}
.e3{
  color: rgb(49, 235, 58);
}
</style>
