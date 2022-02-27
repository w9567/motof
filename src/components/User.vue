<template>
  <div class="user">
    <header class="header">
      <div class="header left">
        <!-- <img src="" /> -->
      </div>
      <br />
      <strong @click="turnMain">Motof</strong>
      <div class="right">
        <!-- <logined v-show="islogined"></logined> -->
        <logined v-show="islogined"></logined>
        <router-link v-show="islogining" id="checkname" to="Login"
          >登陆/注册</router-link
        >
      </div>
    </header>
    <nav>
      <el-col :span="24">
        <el-menu
          :default-active="index"
          
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          
        >
          <el-menu-item index="1" @click="num=0" :class="{active:num==0}">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人信息</span>
            </template>
            <!-- <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-menu-item>
          <el-menu-item index="2" @click="num=1" :class="{active:num==1}" :disabled="islogining">
            <i class="el-icon-document"></i>
            <span slot="title">我的帖子</span>
          </el-menu-item>
          <el-menu-item index="3" @click="num=2" :class="{active:num==2}" :disabled="islogining">
            <i class="el-icon-document"></i>
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="4" @click="num=3" :class="{active:num==3}" :disabled="islogining">
            <i class="el-icon-setting"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
          <el-menu-item index="5" @click="num=4" :class="{active:num==4}" :disabled="islogining">
            <i class="el-icon-setting"></i>
            <span slot="title">注销账户</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </nav>
    
    <transition name="el-zoom-in-center">
    <main v-for="item in userlist" :key="item.id" v-show="num==0">
      <el-descriptions
        class="margin-top"
        title="个人信息"
        :column="3"
        :size="size"
        border
      >
        <template slot="extra">
          <el-button
            v-show="isuser"
            @click="editauthor()"
            type="primary"
            size="small"
            style="width: 50px; height: 30px; margin-right: 5px"
            >编辑</el-button
          >
          <el-button
            v-show="isuser"
            v-bind:disabled="isReadOnly"
            @click="submitauthor(item)"
            type="primary"
            size="small"
            style="width: 50px; height: 30px; margin-right: 20px"
            >保存</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            昵称
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.nickname"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.iphone"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.address"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            个性签名
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.signature"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.contactadd"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            微信
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.wechat"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            QQ
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.qq"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            爱好
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.love"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            星座
          </template>
          <!-- <input  :value="this.userlist[0].constellation" v-bind:readonly="isReadOnly" /> -->
          <el-select
            v-model="item.constellation"
            placeholder="请选择"
            v-bind:disabled="isReadOnly"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.constellation"
              :value="item.constellation"
            >
            </el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            生日
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.birthday"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            年龄
          </template>
          <input
            :class="{ curclass: iscurclass }"
            v-model="item.old"
            v-bind:disabled="isReadOnly"
          />
        </el-descriptions-item>
      </el-descriptions>
    </main>
    </transition>
    <transition name="el-zoom-in-center">
    <div v-show="num==1" class="mybooks">
      <article-lists></article-lists>
    </div>
    </transition>
    <transition name="el-zoom-in-center">
    <div v-show="num==2" class="collection">
      <el-table
      :data="newcollectData"
      max-height="370"
      style="width: 100%;">
      <el-table-column
        prop="title"
        label="标题"
        width="880">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      
    </el-table>
    </div>
    </transition>
    <transition name="el-zoom-in-center">
    <div v-show="num==3" class="changepwd">
        <el-input
          @blur="checkpwd()"
          style="width:200px;"
          placeholder="请输入旧密码"
          v-model="oldpwd"
          clearable>
        </el-input>
        <el-button type="success" v-show="ispwd" icon="el-icon-check" circle></el-button>
        <br/>
        <el-input style="width:200px;" placeholder="请输入新密码" v-model="newpwd" show-password></el-input>
        <br/>
        <el-input style="width:200px;" placeholder="请再次输入新密码" v-model="newpwd2" show-password></el-input>
        <br/>
        <input type="button" value="保存" @click="changepwd()" />
      
    </div>
    </transition>
    <transition name="el-zoom-in-center">
    <div v-show="num==4" class="logout">
      
      <span>下着雨,我站在树林里,分不清脸上是泪还是雨,就这样静静地倾听我们的回忆</span>
      
      <el-divider  content-position="right">纵有疾风来</el-divider>
      
      <span>远去的列车承载着谁的未来，无言的铁轨孤单着谁的等待并非所有的等待都值得伤感，看遍人间的繁花似锦，需要我们学会坚持和等待。因为不是在同一个季节里，所有的花都会开。</span>

      <el-divider content-position="center">人生不言弃</el-divider>
      <span>我深深地理解，耗费了多少时间，战胜了多少困难，你才取得眼前的成绩。请你相信，在你追求、拼搏和苦干的过程中，我将永远面带微笑地站在你的身旁。当你孤独时，风儿就是我的歌声，愿它能使你得到片刻的安慰；当你骄傲时，雨点就是我的警钟，愿它能使你获得永恒的谦逊。</span>
      <el-divider content-position="center">风乍起</el-divider>
      <span>虽然山川河流可以把人与人用距离分开，却无法将心与心相隔，无论你走到天涯海角，我的心将永远陪伴着你，直到永远。</span>
      <el-divider content-position="right">合当奋意向此生</el-divider>
      <span>即将分别，要说的话太多太多，千言万语化作一句-----再见</span>
      <el-divider content-position="right">愿你少年依然在</el-divider>
      <div><span>与君初相识，离去便从零(注：将进度划至0即可注销)</span></div>
      <div class="bye" style="width:50%">
        <el-slider @change="gobye()" v-model="bye"></el-slider>
      </div>
      
    </div>
    </transition>
    <footer></footer>
  </div>
</template>

<script>
import Logined from "./Logined.vue"
import lodash from "lodash.isequal"
import ArticleLists from './ArticleLists.vue';

export default {
  components: { Logined, ArticleLists},
  name: "User",
  data: function () {
    return {
      islogined: false,
      islogining: true,
      isReadOnly: true,
      size: "2.1",
      value: "",
      userlist: "",
      iscurclass: true,
      isuser: true,
      num:0,
      oldpwd:"",
      newpwd:"",
      newpwd2:"",
      ispwd:false,
      bye:100,
      olduserlist: [
        // {
        //   nickname: "川",
        //   iphone: 77750380906,
        //   address: "福建省龙岩市",
        //   signature: "奇变偶不变，符号看象限",
        //   contactadd: "福建省龙岩市",
        //   wechat: "77750380906",
        //   qq: "9567110",
        //   love: "玩，各种玩",
        //   constellation: "处女座",
        //   birthday: "09/06",
        //   old: "18",
        // },
      ],
      userlist: [],
      formuserlist: [],
      options: [
        {
          value: "选项1",
          constellation: "白羊座",
        },
        {
          value: "选项2",
          constellation: "金牛座",
        },
        {
          value: "选项3",
          constellation: "双子座",
        },
        {
          value: "选项4",
          constellation: "白羊座",
        },
        {
          value: "选项5",
          constellation: "巨蟹座",
        },
        {
          value: "选项6",
          constellation: "狮子座",
        },
        {
          value: "选项7",
          constellation: "处女座",
        },
        {
          value: "选项8",
          constellation: "天秤座",
        },
        {
          value: "选项9",
          constellation: "天蝎座",
        },
        {
          value: "选项10",
          constellation: "射手座",
        },
        {
          value: "选项11",
          constellation: "摩羯座",
        },
        {
          value: "选项12",
          constellation: "水平座",
        },
        {
          value: "选项13",
          constellation: "双鱼座",
        },
      ],
      mybooks:[
        // {id:"1",title:"我是标题1",content:"我只是内容啊啊啊1",date:"09/01"},
        // {id:"2",title:"我是标题2",content:"我只是内容啊啊啊2",date:"09/02"},
        // {id:"3",title:"我是标题3",content:"我只是内容啊啊啊3",date:"09/03"},
        // {id:"4",title:"我是标题4",content:"我只是内容啊啊啊4",date:"09/04"},
        // {id:"5",title:"我是标题5",content:"我只是内容啊啊啊5",date:"09/05"},
        // {id:"6",title:"我是标题6",content:"我只是内容啊啊啊6",date:"09/06"},
        // {id:"7",title:"我是标题7",content:"我只是内容啊啊啊7",date:"09/07"},
        // {id:"8",title:"我是标题8",content:"我只是内容啊啊啊8",date:"09/08"},
        // {id:"9",title:"我是标题9",content:"我只是内容啊啊啊9",date:"09/09"},
        // {id:"10",title:"我是标题1",content:"我只是内容啊啊啊1",date:"09/01"},
        // {id:"11",title:"我是标题1",content:"我只是内容啊啊啊1",date:"09/01"},
        // {id:"12",title:"我是标题2",content:"我只是内容啊啊啊2",date:"09/02"},
        // {id:"13",title:"我是标题3",content:"我只是内容啊啊啊3",date:"09/03"},
        // {id:"14",title:"我是标题4",content:"我只是内容啊啊啊4",date:"09/04"},
        // {id:"15",title:"我是标题5",content:"我只是内容啊啊啊5",date:"09/05"},
        // {id:"16",title:"我是标题6",content:"我只是内容啊啊啊6",date:"09/06"},
        // {id:"17",title:"我是标题7",content:"我只是内容啊啊啊7",date:"09/07"},
        // {id:"18",title:"我是标题8",content:"我只是内容啊啊啊8",date:"09/08"},
        // {id:"19",title:"我是标题9",content:"我只是内容啊啊啊9",date:"09/09"},
        // {id:"20",title:"我是标题1",content:"我只是内容啊啊啊1",date:"09/01"},
        // {id:"21",title:"我是标题1",content:"我只是内容啊啊啊1",date:"09/01"},
        // {id:"22",title:"我是标题2",content:"我只是内容啊啊啊2",date:"09/02"},
        // {id:"23",title:"我是标题3",content:"我只是内容啊啊啊3",date:"09/03"},
        // {id:"24",title:"我是标题4",content:"我只是内容啊啊啊4",date:"09/04"},
        // {id:"25",title:"我是标题5",content:"我只是内容啊啊啊5",date:"09/05"},
        // {id:"26",title:"我是标题6",content:"我只是内容啊啊啊6",date:"09/06"},
        // {id:"27",title:"我是标题7",content:"我只是内容啊啊啊7",date:"09/07"},
        // {id:"28",title:"我是标题8",content:"我只是内容啊啊啊8",date:"09/08"},
        // {id:"29",title:"我是标题9",content:"我只是内容啊啊啊9",date:"09/09"},
      ],
      collectData:[],
      index:'',
    };
  },
  methods: {
    turnMain() {
      this.$router.push({
        path: "/Main",
      });
    },
    gogogo(){
      // console.log('sss')
    },
    getnum(){
      // console.log(this.$route.params.num);
      // console.log(this.num,'num')
      let num=this.$route.params.num
      if(num){
        this.num=parseInt(num);
        this.index=(num+1).toString()
        // console.log(this.index,typeof(this.index))
      }else{
        this.num=0
        this.index='1'
      }
      
    },
    getcdetail(item){
      let _this=this
      // console.log(item)
      var list=[]
        for(let i=0;i<item.length;i++){
          list.push(item[i].collectid)
        }
        // console.log(list,'collectlist')
        for(let j=0;j<list.length;j++){
        if(parseInt(list[j])>=10000&&parseInt(list[j])<=20000){
          _this.axios({
            method:'post',
            url:'http://localhost:8000/getonesafe',
            params:{
              id:list[j]
            }
          })
          .then((res)=>{
            // console.log(res.data,'onesafe')
            if(res.data==""){

            }else{
              _this.collectData.push(res.data[0])
            }
            
          })
          .catch((err)=>{
            // console.log(err)
          })
        }else if(parseInt(list[j])>=20000&&parseInt(list[j])<=30000){
          _this.axios({
            method:'post',
            url:'http://localhost:8000/getonenew',
            params:{
              id:list[j]
            }
          })
          .then((res)=>{
            
            if(res.data==""){

            }else{
              _this.collectData.push(res.data[0])
            }
            
          })
          .catch((err)=>{
            console.log(err)
          })
        }else{
          _this.axios({
            method:'post',
            url:'http://localhost:8000/getonearticle',
            params:{
              id:list[j]
            }
          })
          .then((res)=>{
            
            if(res.data==""){

            }else{
              _this.collectData.push(res.data[0])
            }
            
          })
          .catch((err)=>{
            console.log(err)
          })
        }
        }
        
      // console.log(this.collectData,'last')
    },
    getcollect(){
      
      let username=sessionStorage.getItem('userKey')
      this.axios({
          method:'post',
          url:'http://localhost:8000/getcollects',
          params:{
            username:username
          }
        })
        .then((res)=>{
          // console.log(res.data,'collect');
          this.getcdetail(res.data);
        })
        .catch((err)=>{
          console.log(err)
        })
      
    },
    gobye(){
      let _this=this;
      // console.log(this.bye)
      let username =sessionStorage.getItem('userKey')
      if(this.bye==0){
        this.axios({
          method:"post",
          url:"http://localhost:8000/logout",
          data:_this.Qs.stringify({
            username:username
          })
        }).then((res)=>{

          setTimeout(() => {
            this.$alert('在此拜别，愿君珍重', '账户注销', {
            confirmButtonText: '离开',
            callback: action => {
              this.$router.push({
                path:'/Login'
              })
            }
          });
          }, 1000);
          sessionStorage.clear();
        })
        .catch((err)=>{
          // console.log(err);
          this.$message.error("服务器异常，请稍后重试");
        })
        
      }
    },
    checkpwd(){
      let _this=this;
      let username=sessionStorage.getItem("userKey");
      this.axios({
        method:"post",
        url:"http://localhost:8000/checkpwd",
        data:_this.Qs.stringify({
          username:username
        })
      }).then((res)=>{
        let pwd=res.data[0].password;
        // console.log(pwd,'pwd')
        if(this.oldpwd==pwd){
          //密码正确
          this.ispwd=true;
          this.$message({
            type:"success",
            message:"当前密码正确，请继续输入..."
          })

        }else{
          this.ispwd=false;
          this.oldpwd="";
          this.$message.error("对不起，您输入的密码不正确！请重新输入...")
        }
      }).catch((err)=>{
        this.$message.error("对不起，服务器出现了错误！")
      })
    },
    changepwd(){
      let _this=this;
      let username =sessionStorage.getItem('userKey');
      if(this.oldpwd==""||this.newpwd==""||this.newpwd2==""){
        this.$message.error("对不起，请填写完整表单内容");

      }else if(this.newpwd!==this.newpwd2){
        this.$message.error("两次输入的新密码不一致，请重新输入！");
        
        this.newpwd2="";
      }else if(this.newpwd==this.oldpwd||this.newpwd2==this.oldpwd){
        this.$message.error("新密码与旧密码相同...")
        this.newpwd="";
        this.newpwd2="";
      }else{
        this.axios({
          method:"post",
          url:"http://localhost:8000/changepwd",
          data:_this.Qs.stringify({
            username:username,
            password:_this.newpwd
          })
        }).then((res)=>{
          this.$message({
            type:"success",
            message:"恭喜您！修改成功..."
          })
          setTimeout(() => {
            this.$alert('恭喜您！修改成功，请您重新登陆.', '修改成功', {
            confirmButtonText: '跳转',
            callback: action => {
              this.$router.push({
                path:'/Login'
              })
            }
          });
          }, 1000);
          
        })
        .catch((err)=>{
          this.$message.error("对不起，修改失败，请联系管理员修复...")
        })
        
      }
    },
    editauthor() {
      this.isReadOnly = false;
      this.iscurclass = false;
    },
    submitauthor(item) {
      if (this.isReadOnly == true) {
        // console.log('haimeibianji');
      } else {
        this.isReadOnly = true;
        this.iscurclass = true;
        // //清空上次的from表单
        // this.formuserlist=[]
        // //将表单数据push进去
        // this.formuserlist.push(item);
        let _this = this;
        // console.log(
        //   this.userlist[0],
        //   "userlist",
        //   this.olduserlist[0],
        //   "olduserlist"
        // );
        // console.log(this.userlist[0] == this.olduserlist[0], "bijiao");
        // console.log(this.formuserlist[0],'formuserlist')
        // console.log(JSON.stringify(sessionStorage.getItem('userKey')) )
        let username = sessionStorage.getItem("userKey");
        // console.log(this.olduserlist[0], this.userlist[0], "bijiao");
        // console.log(this.formuserlist==this.userlist,'bijiao')
        var olds = this.olduserlist;
        var news = this.userlist;
        if (lodash(olds, news)) {
          // console.log("xiangdeng");
          this.$message.error("对不起，您没有修改任何值！");
        } else {
          // console.log("no");
          this.axios({
            method: "post",
            url: "http://localhost:8000/checkuserinfo",
            data: _this.Qs.stringify({
              username: username,
            }),
          })
            .then((res) => {
              // console.log(res.data);
              if (res.data == null || res.data == "") {
                //执行插入
                this.axios({
                  method: "post",
                  url: "http://localhost:8000/insertuserinfo",
                  data: _this.Qs.stringify({
                    nickname: _this.userlist[0].nickname,
                    iphone: _this.userlist[0].iphone,
                    address: _this.userlist[0].address,
                    signature: _this.userlist[0].signature,
                    contactadd: _this.userlist[0].contactadd,
                    wechat: _this.userlist[0].wechat,
                    qq: _this.userlist[0].qq,
                    love: _this.userlist[0].love,
                    constellation: _this.userlist[0].constellation,
                    birthday: _this.userlist[0].birthday,
                    old: _this.userlist[0].old,
                    username: username,
                  }),
                }).then((res) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                });
              } else {
                //执行更新
                this.axios({
                  method: "post",
                  url: "http://localhost:8000/updateuserinfo",
                  data: _this.Qs.stringify({
                    nickname: _this.userlist[0].nickname,
                    iphone: _this.userlist[0].iphone,
                    address: _this.userlist[0].address,
                    signature: _this.userlist[0].signature,
                    contactadd: _this.userlist[0].contactadd,
                    wechat: _this.userlist[0].wechat,
                    qq: _this.userlist[0].qq,
                    love: _this.userlist[0].love,
                    constellation: _this.userlist[0].constellation,
                    birthday: _this.userlist[0].birthday,
                    old: _this.userlist[0].old,
                    username: username,
                  }),
                }).then((res) => {
                  // console.log(res);

                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                });
              }
            })
            .catch((err) => {
              this.$message.error("修改失败");
            });
        }
      }
    },
  },
  created: function () {
    var _this = this;
    //初始化userlist
    this.getcollect();
     this.getnum();
    this.userinfo = window.sessionStorage.getItem("userKey");
    let islo = JSON.stringify(_this.$route.params);
    // console.log(typeof(islo))
    if (this.userinfo == null || this.userinfo == "{}" || this.userinfo == "") {
      // console.log("当前为游客登陆");
      _this.islogined = false;
      _this.islogining = true;
      this.islogined = _this.islogined;
      this.islogining = _this.islogining;
      _this.isuser = false;
      this.isuser = _this.isuser;
    } else {
      // console.log("用户登录");
      // console.log(this.$route.params)
      _this.islogined = true;
      _this.islogining = false;
      this.islogined = _this.islogined;
      this.islogining = _this.islogining;
    }
    let username = _this.userinfo;
    this.axios({
      method: "post",
      url: "http://localhost:8000/getuserinfo",
      data: _this.Qs.stringify({
        username: username,
      }),
    })
      .then((res) => {
        // console.log(res.data);
        let result = res.data;
        if (result == null || result == "") {
          // console.log("111");
          this.olduserlist = [
            {
              nickname: "",
              iphone: "",
              address: "",
              signature: "",
              contactadd: "",
              wechat: "",
              qq: "",
              love: "",
              constellation: "",
              birthday: "",
              old: "",
            },
          ];
          for (var i = 0; i < this.olduserlist.length; i++) {
            this.userlist.push(JSON.parse(JSON.stringify(this.olduserlist[i])));
          }
        } else {
          this.olduserlist = res.data;
          // console.log(this.olduserlist,res.data)
          //对数组做相等操作时，不能直接赋值，这样会把地址也带过去
          for (var i = 0; i < this.olduserlist.length; i++) {
            this.userlist.push(JSON.parse(JSON.stringify(this.olduserlist[i])));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed:{
    newcollectData() {
      
      let collectDatas = this.collectData.filter(function (item) {
        return item.status == "已完成";
      });
      
      return collectDatas;
    },
  },
  filters:{
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10) + "";
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
.header {
  width: 100%;
  height: 70px;
  background-color: #1f2533;
  position: relative;
}
.header .left {
  width: 100px;
  height: 100%;
  background-image: url(../assets/images/logo.png);
  background-size: 100% 100%;
  float: left;
}


.header strong {
  font-size: 2rem;
  margin-left: 2rem;
  color: #fff;
  font-style: oblique;
}
.header strong:hover {
  cursor: pointer;
}
.header .right {
  width: 160px;
  float: right;
  margin-right: 20px;
}
nav {
  width: 15%;
  height: 300px;
  float: left;
  margin-top: 10px;
}
.el-menu-item {
  height: 75px;
  line-height: 75px;
}
main {
  width: 84%;
  height: 300px;
  margin-top: 20px;
  
  position: absolute;
  left: 200px;
}
input {
  width: 200px;
  -web-kit-appearance: none;
  -moz-appearance: none;
  font-size: 0.9em;
  height: 2.7em;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  color: #505357;
}

.mybooks{
  width: 84%;
  height: 350px;
  margin-top: 20px;
  /* float: right; */
  overflow-y: auto;
  position: absolute;
  left: 200px;
}

.collection{
  width: 84%;
  height: 30px;
  margin-top: 20px;
  /* float: right; */
  position: absolute;
  left: 200px;
}

.changepwd{
  width: 84%;
  height: 350px;
  margin-top: 20px;
  /* float: right; */
  position: absolute;
  left: 200px;
}
.changepwd .el-input{
  margin-top: 20px;
  margin-left: 30px;
}
.changepwd input[type=button]{
  margin-top: 30px;
  margin-left: 30px;
}


.logout{
  width: 84%;
  height: 300px;
  margin-top: 20px;
  float: right;
}
.logout span{
  display: block;
  margin-top: 20px;
}
.logout .mar{
  margin: 50px auto;
}
.curclass {
  cursor: not-allowed;
}

</style>