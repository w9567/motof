<template>
  <div class="musci">
    <el-input
      @change="searchmusic()"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="query"
      ref="wodewode"
    >
    </el-input>
    <header>
      <img
        :src="musicpic ? musicpic : require('../assets/images/emologo.jpg')"
      />
      <span>{{ musicname }}</span>

      <audio
        ref="musicu"
        style="width: 250px; height: 15px; margin-top: 10px"
        autoplay
        
        :src="musicUrl"
        controls
      ></audio>
    </header>
    <main >
      <li
        :class="index % 2 == 0 ? 'pair' : 'odd'"
        @click="playmusic(item)"
        v-for="(item, index) in musiclist"
        :key="item.id"
      >
        <span>{{ index + 1 }}</span>
        <span style="white-space: nowrap">{{ item.name | ellipsisss }}</span>
        <span style="white-space: nowrap; float: right">{{
          item.artists[0].name | ellipsiss
        }}</span>
      </li>
    </main>
  </div>
</template>

<script>
import axios from "axios";
// import Cookies from 'js-cookie'

export default {
  
  name: "ListerMusic",
  data: function () {
    return {
      query: "林子祥",
      musiclist: [],
      musicUrl: "",
      musicpic: "",
      musicname: "请双击你想要的听的歌曲",
      isplay:true,
     
      
    };
  },
  methods: {
    // console.log(this.$refs.musicu.duration,this.$refs.musicu.currentTime);
    //   this.$refs.musicu.currentTime=15
    gethot(){
      axios({
        method: "get",
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.query,
          type: "1",
          limit: 15,  
        },
      })
        .then((response) => {
          // console.log(response.data,'searchmusic');
          // let id = response.data.data[0].score;
          this.musiclist = response.data.result.songs;
          // console.log(this.musiclist,'this.music')
          sessionStorage.setItem('musicKey',JSON.stringify(this.musiclist))
          // console.log(this.musiclist, "this.musiclist");
        })
        .catch((err) => {
          console.log(err);
        });
  
    },
    playmusic(item) {
      
      let _this = this;
      let id = item.id;
      let url = "https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
      this.musicUrl = url;
      // this.musicpic=item.song.artists[0].img1v1Url;
      this.musicname = item.name;
      
      
    },
    searchmusic() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.query,
          type: "1",
          limit: 10,  
        },
      })
        .then((response) => {
          // console.log(response.data,'searchmusic');
          // let id = response.data.data[0].score;
          this.musiclist = response.data.result.songs;
          sessionStorage.setItem('musicKey',JSON.stringify(this.musiclist))
          // console.log(this.musiclist, "this.musiclist");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
  },
  mounted:function(){
    // 

    
    
    
    // this.settime()
  },
  
  created: function () {
    
    let musicKey =JSON.parse(sessionStorage.getItem("musicKey"))
    if(musicKey==null){
      // console.log("kong")
      this.gethot();
    }else{
      this.musiclist=musicKey;
    }
    
    // this.axios({
    //   method:"get",
    //   url: "https://cloud-music-api-lyart.vercel.app/login/cellphone?phone=17750380906&password=ww980906",
    // })
    //   .then((res) => {
    //     console.log(res, "huoqu");
    //     Cookies.set('cookie',res.data.cookie);
    //     this.gethot();
    //   })
    //   .catch((res) => {
    //     console.log("网络状态不好");
        
    //   });
    // /recommend/songs
  },
  filters: {
    // 判断超出30个字显示省略号
    ellipsiss(value) {
      if (!value) return "";
      if (value.length > 5) {
        return value.slice(0, 5) + "..";
      }
      return value;
    },
    ellipsisss(value) {
      if (!value) return "";
      if (value.length > 18) {
        return value.slice(0, 18) + "...";
      }
      return value;
    },
  },
  
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-input {
  width: 90%;
  height: 90%;
  margin-left: 15px;
}
.el-input >>> .el-input__inner {
  opacity: 0.9;
  border-radius: 2em;
}
header {
  width: 100%;
  height: 50px;
  background-color: #2f3543;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  
}
header img {
  width: 45px;
  height: 45px;
  float: left;
  border-radius: 2em;
}
header span {
  float: left;
  color: white;
}
main {
  width: 100%;
  height: 210px;
  overflow: auto;
  background-color: #2f3543;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: hsla(0,0%,100%,.1);
  box-shadow: inset 0 0 15px 0 #fff;
}
main:hover{
  cursor: pointer;
}
main li:hover{
  color: #f60;
}
main::-webkit-scrollbar {
  width: 5px;
}
main::-webkit-scrollbar-track {
  border-radius: 5px;
}
main::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
}
main li {
  width: 100%;
  height: 30px;
  list-style: none;
  color: white;
  font-size: small;
}
.odd {
  background-color: #1d2025;
}
.pair {
  background-color: #252d38;
}
</style>