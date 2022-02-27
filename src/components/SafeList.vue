<template>
  <div id="SafeList">
      <div class="left">
          <ul>
            <li @click="num=0;go()" :class="{active:num==0}" >骑行安全</li>
            <li @click="num=1" :class="{active:num==1}" >人物传奇</li>
            <li @click="num=2" :class="{active:num==2}" >赛事专栏</li>
            <li @click="num=3" :class="{active:num==3}" >坐骑保养</li>
            <li @click="num=4" :class="{active:num==4}" >骑士精神</li>
          </ul>
      </div>
      <div class="right">
          <div class="contain" v-show="num==0" >
              <!-- <div class="morelist">
                  更多
              </div> -->
              <div class="equipment"  v-for="item in actequipment"  :key="item.id" >
                  <!-- 地址栏可以看到参数 -->
                  <!-- <span><router-link to="{path:'Detail',query:{setid:'item.id'}}"  >{{item.title | ellipsis}}</router-link></span> -->
                  <!-- 地址栏不可以看到参数 -->
                  <!-- <span><router-link :to="{ name: 'Detail', params: {index,  }}">{{item.title | ellipsis}}</router-link></span> -->
                  <span @click="rundetail(item)">{{item.title | ellipsis}}</span>
              </div>
          </div>
          <el-collapse-transition>
          <div class="contain" v-show="num==1" >
              <div class="prepare"  v-for="item  in actpreparelist"  :key="item.id">
                  <span @click="rundetail(item)" >{{item.title | ellipsis}}</span>
              </div>
          </div>
          </el-collapse-transition>
          <el-collapse-transition>
          <div class="contain" v-show="num==2" >
              <div class="notice" v-for="item  in actnoticelist"  :key="item.id">
                  <span @click="rundetail(item)" >{{item.title | ellipsis}}</span>
              </div>
          </div>
          </el-collapse-transition>
          <el-collapse-transition>
          <div class="contain" v-show="num==3" >
              <div class="maintainance" v-for="item  in actmaintainancelist"  :key="item.id">
                  <span @click="rundetail(item)" >{{item.title | ellipsis}}</span>
              </div>
          </div>
          </el-collapse-transition>
          <el-collapse-transition>
          <div class="contain" v-show="num==4" >
              <div class="knightship" v-for="item  in actknightshiplist"  :key="item.id">
                  <span @click="rundetail(item)" >{{item.title | ellipsis}}</span>
              </div>
          </div>
          </el-collapse-transition>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            msg:"safe",
            num:0,
            safelist:[],
            newsafelist:[]
        }
    },
    
    methods:{
        go(){
            // console.log(this.actequipment,'eq')
        },
        rundetail(safelist){
            console.log('传进来的newlist',safelist)
            this.$router.push({
                name:'Detail',
                params:{
                    safelist:safelist
                }
            });
        },
        // actioneq(){
        //     console.log(window.sessionStorage.getItem('eqlistKey'));
        //     if(window.sessionStorage.getItem('eqlistKey')==null||window.sessionStorage.getItem('eqlistKey')==""){
        //         axios.post("http://localhost:8000/getalleq").then((response) => {
        //             // console.log(typeof(response.data),'typr');
        //             sessionStorage.setItem('eqlistKey',JSON.stringify(response.data));
        //             this.equipmentlist = response.data;
        //         });
        //     }else{
        //         let equipmentlist=JSON.parse(window.sessionStorage.getItem('eqlistKey'));
        //         // console.log(newlist,'newlistsession');
        //         this.equipmentlist=equipmentlist;
        //     }
        // },
        // actionpr(){
        //     if(window.sessionStorage.getItem('prlistKey')==null||window.sessionStorage.getItem('prlistKey')==""){
        //         axios.post("http://localhost:8000/getallpr").then((response) => {
        //             // console.log(typeof(response.data),'typr');
        //             sessionStorage.setItem('prlistKey',JSON.stringify(response.data));
        //             this.preparelist = response.data;
        //         });
        //     }else{
        //         let preparelist=JSON.parse(window.sessionStorage.getItem('prlistKey'));
        //         // console.log(newlist,'newlistsession');
        //         this.preparelist=preparelist;
        //     }

        // },
        // actionno(){
        //     if(JSON.parse(window.sessionStorage.getItem('nolistKey'))==null||JSON.parse(window.sessionStorage.getItem('nolistKey'))==""){
        //         axios.post("http://localhost:8000/getallno").then((response) => {
        //             // console.log(typeof(response.data),'typr');
        //             sessionStorage.setItem('nolistKey',JSON.stringify(response.data));
        //             this.noticelist = response.data;
        //         });
        //     }else{
        //         let noticelist=JSON.parse(window.sessionStorage.getItem('nolistKey'));
        //         // console.log(newlist,'newlistsession');
        //         this.noticelist=noticelist;
        //     }

        // },
        // actionma(){
        //     if(JSON.parse(window.sessionStorage.getItem('malistKey'))==null||JSON.parse(window.sessionStorage.getItem('malistKey'))==""){
        //         axios.post("http://localhost:8000/getallma").then((response) => {
        //             // console.log(typeof(response.data),'typr');
        //             sessionStorage.setItem('malistKey',JSON.stringify(response.data));
        //             this.maintainancelist = response.data;
        //         });
        //     }else{
        //         let maintainancelist=JSON.parse(window.sessionStorage.getItem('malistKey'));
        //         // console.log(newlist,'newlistsession');
        //         this.maintainancelist=maintainancelist;
        //     }

        // },
        // actionkn(){
        //     if(JSON.parse(window.sessionStorage.getItem('knlistKey'))==null||JSON.parse(window.sessionStorage.getItem('knlistKey'))==""){
        //         axios.post("http://localhost:8000/getallkn").then((response) => {
        //             // console.log(typeof(response.data),'typr');
        //             sessionStorage.setItem('knlistKey',JSON.stringify(response.data));
        //             this.knightshiplist = response.data;
        //         });
        //     }else{
        //         let knightshiplist=JSON.parse(window.sessionStorage.getItem('knlistKey'));
        //         // console.log(newlist,'newlistsession');
        //         this.knightshiplist=knightshiplist;
        //     }

        // }
    },
    computed:{
        actequipment(){
            let newlist=[]
            newlist=this.safelist.filter(function(item){
                return item.type=='safety'
            })
            return newlist
        },
        actpreparelist(){
            let newlist=[]
            newlist=this.safelist.filter(function(item){

                return item.type=='legend'
            })
            return newlist
        },
        actnoticelist(){
            let newlist=[]
            newlist=this.safelist.filter(function(item){
                return item.type=='story'
            })
            return newlist
        },
        actmaintainancelist(){
            let newlist=[]
            newlist=this.safelist.filter(function(item){
                return item.type=='maintainance'
            })
            return newlist
        },
        actknightshiplist(){
            let newlist=[]
            newlist=this.safelist.filter(function(item){
                return item.type=='spirit'
            })
            return newlist
        }, 
    },
    created:function(){
        // axios.post("http://localhost:8000/getalleq").then((response) => {
        //     // console.log(typeof(response.data),'typr');
        //     sessionStorage.setItem('eqlistKey',JSON.stringify(response.data));
        //     this.equipmentlist = response.data;
        // });
        axios.post("http://localhost:8000/getallsafe").then((response) => {
            // console.log(typeof(response.data),'typr');
            sessionStorage.setItem('safeKey',JSON.stringify(response.data));
            this.safelist = response.data;
        });
        // if(sessionStorage.getItem('safelistKey')==null||sessionStorage.getItem('safelistKey')==""){
        //     axios.post("http://localhost:8000/getallsafe").then((response) => {
        //         console.log(response);
        //         sessionStorage.setItem('safelistKey',response.data);
        //         this.safelist = response.data;
        //     });
        // }else{
        //     this.safelist=sessionStorage.getItem('safelistKey');
        // }
    },
    filters: {
            // 判断超出30个字显示省略号
            ellipsis (value) {
                if (!value) return ''
                if (value.length > 26) {
                    return value.slice(0,26) + '...'
                }
                return value
            },
    
    },  

}

</script>


<style scoped>
/* 只作用于本页面的样式 */
*{
    padding: 0;
    margin: 0;
}
#SafeList{
    background-color: #F8F8F8;
}
.left{
    width: 14%;
    height: 250px;
    float: left;
  
}
.left li{
    display: block;
    widows: 100%;
    height: 50px;
    list-style: none;
    /* border-left-style: solid ;
    border-bottom-style: solid;
    border-right-style: solid; */
    text-align: center;
    line-height: 50px;
    color: #b66c52;
}
.left li:hover{
    border-right-style: solid;
    border-right-color: rgb(109, 105, 105);
    color: #ffc0c0;
    cursor:pointer;
}
/* .left :first-child{
    border-top-style: solid;
} */
.right{
    width: 85%;
    height: 240px;
    /* border-top-style: solid;
    border-bottom-style: solid;
    border-right-style: solid; */
    float: left;
    overflow-x: hidden;
    overflow-y: auto;
    
}
/* 滑块样式 */
.right::-webkit-scrollbar{
    width: 10px;
}
.right::-webkit-scrollbar-track{
    border-radius: 5px;
}
.right::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.5);
}
/* .right .contain{
    overflow: hidden;
    
} */
.right .contain .morelist{
    width: 30px;
    color: rgb(8, 136, 187);
    font-size: smaller;
    float: right;
    
}
.right .contain .morelist:hover{
    color: rgb(11, 90, 104);
    cursor: pointer;
    
}
.right .equipment{
    width: 100%;
    height: 50px;
    
    
    
}
.right span{
    
    text-align: center;
    line-height: 50px;
    color: #bac8dc;
    margin-left: 10px;
}
.right span:hover{
    color: #f60;
    cursor: pointer;
    text-decoration: underline;
}
.right .prepare{
    width: 100%;
    height: 50px;
   
    
}

.right .notice{
    width: 100%;
    height: 50px;

    
}

.right .maintainance{
    width: 100%;
    height: 50px;

    
}

.right .knightship{
    width: 100%;
    height: 50px;

    
}

</style>

