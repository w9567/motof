<template>
  <div id="NewList" class="newlist">
    <main v-for="item in newlist" :key="item.id">
      <div class="contain">
        <span title="新闻标题" @click="runnewdetail(item)">
          {{ item.title | ellipsis }}
        </span>
        <span title="发布时间">
          {{ item.date | ellipsis2 }}
        </span>
      </div>
    </main>
  </div>
</template>
    
<script>
import axios from "axios";

export default {
  data() {
    return {
      msg: "jiuzhe?",
      newlist: [
      ],
    };
  },
  methods: {
    runnewdetail(newlist) {
      let _this = this;
      var date = new Date();
      var mydate = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
      };
      // console.log(mydate.M);
      // console.log(typeof(mydate.M));

      if (mydate.M < 10) {
        mydate.M = "0" + mydate.M;
      }
      if (mydate.d < 10) {
        mydate.d = "0" + mydate.d;
      }
      if (mydate.h < 10) {
        mydate.h = "0" + mydate.h;
      }
      if (mydate.m < 10) {
        mydate.m = "0" + mydate.m;
      }
      console.log(mydate.d);
      console.log("M", mydate.M);
      // mydate.M=13;
      if (mydate.M == 13) {
        //    console.log('mwei13');
        mydate.M = 1;
      }
      // console.log(mydate);
      var currentdate =
        "[" + mydate.M + "/" + mydate.d + "_" + mydate.h + ":" + mydate.m + "]";
      console.log("currentdate", currentdate);
      var username = sessionStorage.getItem("userKey");
      console.log(username, "username");
      console.log("_this.$route.params", _this.$route.params);

      this.$router.push({
        name: "Detail",
        params: {
          newlist: newlist,
          params: {
            username: _this.$route.params.username,
          },
        },
      });
      return currentdate;
    },
  },
  created: function () {
    if(JSON.parse(sessionStorage.getItem('newlistKey'))==null||JSON.parse(sessionStorage.getItem('newlistKey'))==""){
        axios.post("http://localhost:8000/getallnew").then((response) => {
            // console.log(response.data,'typr');
            sessionStorage.setItem('newlistKey',JSON.stringify(response.data));
            this.newlist = response.data;
        });
    }else{
        let newlist=JSON.parse(window.sessionStorage.getItem('newlistKey'));
        // console.log(newlist,'newlistsession');
        this.newlist=newlist;
    }
    
    
  },
  filters: {
    // 判断超出30个字显示省略号
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
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
};
// Vue.component('date-component', {
//   data:function(){
//       return{
//           //当前时间
//           currentmoment:''
//       }
//   },
</script>

<style scoped>
.newlist {
  height: 340px;
  overflow: auto;
}
/* 滑块样式 */
.newlist::-webkit-scrollbar {
  width: 10px;
}
.newlist::-webkit-scrollbar-track {
  border-radius: 5px;
}
.newlist::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
}
.contain {
  width: 100%;
  height: 30px;
  margin: 5px auto;
}
span {
  color: #bac8dc;
}
span:hover {
  color: #f60;
  cursor: pointer;
  text-decoration: underline;
}
span:first-of-type {
  width: 75%;
  float: left;
}
span:last-of-type {
  width: 23%;
  float: right;
}
</style>