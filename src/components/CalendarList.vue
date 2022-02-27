<template>
  <div class="calendarlist">
    <!-- 月份 -->
    <div class="month">
      <ul>
        <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
        <li class="arrow" @click="pickPre(currentYear, currentMonth)">❮</li>
        <li class="year-month">
          <span class="choose-year">{{ currentYear }}</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear, currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color: red">六</li>
      <li style="color: red">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li  v-for="item in days" :key="item.id" @click="thisday(item)">
        <!--本月-->
        <!--如果不是本月  改变类名加灰色-->
        <span 
          v-if="item.day.getMonth() + 1 != currentMonth"
          class="other-month"
          >{{ item.day.getDate() }}</span
        >
        <!--如果是本月  还需要判断是不是这一天-->
        <span v-else>
          <!--今天  同年同月同日-->
          <span
          
            v-if="
              item.day.getFullYear() == new Date().getFullYear() &&
              item.day.getMonth() == new Date().getMonth() &&
              item.day.getDate() == new Date().getDate()
            "
            class="active"
            >{{ item.day.getDate() }}</span
          >
          <span v-else>{{ item.day.getDate() }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CalendarList",
  data: function () {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 2022,
      currentWeek: 1,
      days: [],
      datelog:[],
      thisdate:'',
      currentlog:'',
    };
  },
  created: function () {
    //在vue初始化时调用
    this.initData(null);
    this.get();
  },
  methods: {
    get(){
      let datelogKey=JSON.parse(sessionStorage.getItem('datelogKey'));
      if(datelogKey==null||datelogKey==""){
        this.axios({
          method:'post',
          url:'http://localhost:8000/getdatelog',
        })
        .then((res)=>{
          // console.log(res.data);
          this.datelog=res.data;
          sessionStorage.setItem('datelog',JSON.stringify(res.data))
        })
        .catch((err)=>{
          console.log(err)
        })
      }else{
        // console.log(datelogKey,'datelog');
        this.datelog=datelogKey;
        
      }
      
    },
    thisday(i){
      

      let Y=i.day.getFullYear().toString();
      var M=(i.day.getMonth()+1).toString();
      var D=i.day.getDate().toString();
      
      if(M<10){
        M ='0'+M
      }
      if(D<10){
        D='0'+D
      }
      this.thisdate=Y+M+D;
      
      // console.log(this.newlog,'newlog')
      if(this.newlog==""){
        // console.log('kong')
        this.currentlog=""
      }else{
        this.currentlog=this.newlog[0].log
        
      }
      this.$emit('upupEvent',this.currentlog);
    },
    initData: function (cur) {
      
      var leftcount = 0; //存放剩余数量
      var date;

      if (cur) {
        date = new Date(cur);
        
      } else {
        var now = new Date();
        
        
        // var d = new Date(this.formatDate(now.getFullYear(), now.getMonth()+1, 1));
        // d.setDate(35);
        // date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        // console.log(date)
        var date = new Date(this.formatDate(now.getFullYear(), now.getMonth()+1, 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      //初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var item = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        item.day = d;
        this.days.push(item); //将日期放入data 中的days数组 供页面渲染使用
      }
      //其他周
      for (var i = 1; i <= 35 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var item = {};
        item.day = d;
        this.days.push(item);
      }
    },
    pickPre: function (year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function (year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    },
  },
  computed:{
    newlog(){
      let _this=this
      let newdatelog=[]
      newdatelog=_this.datelog.filter(function(item){
        return item.date==_this.thisdate
      })
      return newdatelog
    }
  }
};
</script>

<style  scoped>
* {
  box-sizing: border-box;
}
/* .videolist{
    height: 300px;
    float: left;
} */
ul {
  list-style-type: none;
}

body {
  font-family: Verdana,  Tahoma, sans-serif;
  background: #e8f0f3;
}
.calendarlist {
  width: 100%;
  
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  float: left;
  border-radius: 2em;
}
/* .calendarlist:hover{
  cursor: pointer;
} */
.month {
  width: 100%;
  background: #373b3d;
  
}

.month ul {
  height: 30px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.year-month {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

/* .year-month:hover {
  background: rgba(150, 2, 12, 0.1);
} */

.choose-year {
  padding-left: 20px;
  padding-right: 20px;
}

.choose-month {
  text-align: center;
  font-size: 1.5rem;
}

/* .arrow {
  padding: 30px;
} */
.arrow{
    width: 30px;

}
.arrow:first-of-type{
    text-align: right;
}
.arrow:hover {
  color: #f60;
  /* background: rgba(100, 2, 12, 0.1); */
  border-radius: 2em;
  cursor: pointer;
}

.month ul li {
  display: inline;
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.weekdays {
  margin: 0;
  padding: 5px 0;
  background-color: #373b3d;
  display: flex;
  flex-wrap: wrap;
  color: #ffffff;
  justify-content: space-around;
}
.weekdays:hover{
  cursor:default;
}
.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}

.days {
  padding: 0;
  background: #3f434f;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-bottom-left-radius: 2em;
  border-bottom-right-radius: 2em;

}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  height: 40px;
  text-align: center;
  padding-top: 5px;
  font-size: 1em;
  color: #cb9780;
}

.days li .active {
  padding: 3px 20px;
  border-radius: 50%;
  background: #907063;
  color: #fff;
}

.days li .other-month {
  padding: 5px;
  color: paleturquoise;
}

.days li:hover {
  background-color: hsla(0,0%,100%,.1);
  box-shadow: inset 0 0 10px 0 rgb(218, 5, 255);
  border-radius: 2em;
  cursor: pointer;
  
  
}
</style>