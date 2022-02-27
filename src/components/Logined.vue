<template>
  <div class="logined">
      <div class="contain" @mouseenter="showname" @mouseleave="hiddenname">
            <span >欢迎您！&nbsp;{{userinfo}}</span>
            <div v-show="iscontent" class="content" >
                <a class="lis" @click="gonum(1)" >个人信息</a>
                <a class="lis" to="Write"><i class="el-icon-edit"></i>创作</a>
                <a class="lis" @click="gonum(2)" >我的帖子</a>
                <a class="lis" @click="gonum(3)" >我的收藏</a>
                <a class="lis" @click="gonum(4)" >修改密码</a>
                <a class="lis" @click="clearsession()" >退出登陆</a>
                <a class="lis" @click="gonum(5)" >注销账户</a>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Logined',
    data:function(){
        return{
            username:'',
            iscontent:false,

        }
    },
    methods:{
        clearsession(){
            sessionStorage.clear();
            this.$router.push({
                path:'/Login'
            })
        },
        gonum(i){
            
            switch (i) {

                case 1:
                    this.$router.push({
                        name:'User',
                        params:{
                            num:0,
                            
                        }
                    })
                    
                    break;
                case 2:
                    this.$router.push({
                        name:'User',
                        params:{
                            num:1
                        }
                    })
                    break;
                case 3:
                    this.$router.push({
                        name:'User',
                        params:{
                            num:2
                        }
                    })
                    break;
                case 4:
                    this.$router.push({
                        name:'User',
                        params:{
                            num:3
                        }
                    })
                    break;
                case 5:
                    this.$router.push({
                        name:'User',
                        params:{
                            num:4
                        }
                    })
                    break;
                
            }
        },
        showname(){
            this.iscontent=true;
        },
        hiddenname(){
            this.iscontent=false
            
        }
    },
    created:function(){
        
        this.userinfo= window.sessionStorage.getItem('userKey')
        // console.log(this.userinfo)

    }
}   
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.contain{

    color:white;
    overflow: hidden;
}
.contain span{
    padding: 2px 10px;
    font-size: large;
    
}
.contain:hover{
    
    cursor: pointer;
}
.content{
    padding: 10px 47px;
    background-color: #1b1d29;
    position: absolute;
    list-style: none;
    z-index: 999;
    
    
}
.content .lis{
    display: flex;
    color: white;
    text-decoration: none;
}
.content .lis:hover{
    color: #f60;
}
</style>