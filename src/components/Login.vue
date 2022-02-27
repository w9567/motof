<template>
  <div class="login">
    <vue-particles
        color="#FFD700"
        :particleOpacity="0.8"
        :particlesNumber="120"
        shapeType="star"
        :particleSize="6"
        linesColor="#F5FFFA"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="repulse"
        style="height:540px;position:absolute;"
      >
      </vue-particles>
    <header class="top">
      <!-- <icon><img src="" /></icon> -->
      <!-- <p>摩e家</p> -->
    </header>
    <transition name="el-zoom-in-center">
    <main class="main" v-show="islr">
      <div class="zhezhao">
        <form action="javascript:void(0)" method="POST" @submit="func()">
          <div class="list">
            <p >Friends Motorcycle</p>
            <el-switch
              style="margin-left: 240px;"
              :focus="isAdmin()"
              v-model="isadmin"
              active-text="管理端"
              inactive-text="用户端"
              active-value="true"
              inactive-value="false"
              >
            </el-switch>
            <div class="container">
              <label>账号：</label>
              <input
                
                name="username"
                v-model="loginForm.username"
                type="text"
                placeholder="请输入您的账号"
              /><br />
            </div>
            <div class="container">
              <label>密码：</label>
              <input
                
                name="password"
                v-model="loginForm.password"
                type="password"
                placeholder="请输入您的账号"
              /><br />
            </div>
            <div class="container">
              
              <input
                name="text"
                v-model="loginForm.code"
                type="text"
                style="width:90px;display: inline-flex;
                  margin-left: 120px;float: left;
                  padding: 10px 0;"
                placeholder="数字验证码："
              />
              <div class="code" @click="refreshCode">
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
            </div>
            
            <!-- <div>验证码</div><br/> -->
            <input   type="button"  @click="login" value="登陆" />
            <br />
            <a href="javascript:void(0)" @click="showforget()" >忘记密码</a>
            <a href="javascript:void(0)"  @click="goregister()" >还没有账号？赶快注册！</a>
            <br />
            <router-link to="Main">以游客身份登陆</router-link>
          </div>
        </form>
      </div>
    </main>
    </transition>
    <transition name="el-zoom-in-center">
      <main class="main" v-show="isr">
      <div class="zhezhao">
        <form action="javascript:void(0)" method="POST" @submit="func()">
          <div class="list">
            <p>Friends Motorcycle</p>
            <div class="container">
              <label>请输入账号：</label>
              <input
                name="usernamer"
                v-model="registerForm.username"
                type="text"
                placeholder="请输入您的账号"
                @blur="checknamer"
              />
              <el-button size="small" type="success" v-show="isusername" icon="el-icon-check" circle></el-button>
              <br />
            </div>
            <div class="container">
              <label>请输入密码：</label>
              <input
                
                name="passwordr"
                v-model="registerForm.password"
                type="password"
                placeholder="请输入您的密码"
              /><br />
            </div>
            <div class="container">
              <label>再次输入密码：</label>
              <input
                name="pwd"
                v-model="registerForm.pwd"
                type="password"
                placeholder="请输入您的密码"
              /><br />
            </div>
            <div class="container">
              <label>请输入邮箱：</label>
              <input
                name="email"
                v-model="registerForm.email"
                type="text"
                @blur="checkemailed"
                placeholder="请输入您的邮箱"
              />
              <el-button size="small" type="success" v-show="isemailed" icon="el-icon-check" circle></el-button>
              <br />
            </div>
            <div class="container">
              <label>请输入验证码：</label>
              <input
                style="width:150px;"
                name="code"
                v-model="registerForm.code"
                type="text"
                placeholder="请输入验证码"
              />
              <el-button 
              style="height: 35px;"
              type="primary"
              :disabled="sendModel2.countFlag2"
              @click="getCode2">
              {{sendModel2.btnMsg2 == null ? sendModel2.countNum2+'s后重新发送' : sendModel2.btnMsg2}}
              </el-button>
              <br />
            </div>
            <!-- <div>验证码</div><br/> -->
            <input :class="iscanregister?'cursorno':''" :disabled="iscanregister" type="button" @click="loginr" value="注册" />
            <br />
            <a @click="gologin">去登陆</a>
          </div>
        </form>
      </div>
    </main>
    </transition>
    <div class="forget" v-show="isforget">
      <div class="content">
        <p>注册邮箱：</p>
        <el-input @blur="checkfemail" v-model="forgetemail" placeholder="请输入登陆的邮箱"></el-input>
        <el-button size="small" type="success" v-show="isemail" icon="el-icon-check" circle></el-button>
        <p>平台密码：</p>
        <el-input v-model="forgetpassword" placeholder="请输入您的密码"></el-input>
        <p>再次输入密码：</p>
        <el-input v-model="forgetpwd" placeholder="请再次输入您的密码"></el-input>
        <p>接收的验证码：</p>
        <el-input style="width: 150px;" v-model="forgetcode" placeholder="请输入验证码"></el-input>
        <!-- <button @click="send()">发送</button><span v-show="issix" style="color:red;">{{count}}</span> -->
        <el-button 
        style="height: 35px;"
        type="primary"
        :disabled="sendModel.countFlag"
        @click="getCode">
        {{sendModel.btnMsg == null ? sendModel.countNum+'s后重新发送' : sendModel.btnMsg}}
        </el-button>
        <br/>
        <input :class="iscanset?'cursorno':''" :disabled="iscanset" type="button" value="修改" @click="setforget()" />
      </div>
      <div class="cover">
        <i @click="closeF()" class="el-icon-close" style="font-size:70px;color:red;float:right;"></i>
      </div>
    </div>
    <footer class="footer"></footer>
    
  </div>
</template>
<script>
// import {funct} from '../../static/js/login.js'
// import axios from 'axios'
import SIdentify from "./identify";  

export default{
  name: "Login",
  components: {
    SIdentify: SIdentify
  },
  data: function () {
    return {
      islr:true,
      isr:false,
      isemailed:false,
      username:"",
      isadmin:"false",
      identifyCode: "",
      identifyCodes:'1234567890',
      forgetpassword:'',
      forgetpwd:'',
      forgetemail:'',
      forgetcode:'',
      loginForm: {
        username: "",
        password: "",
        code:""
      },
      isusername:false,
      isemail:false,
      iscanregister:true,
      isforget:false,
      forgetinput:'',
      iscanset:true,
      overcode:0,
      registerForm: {
        username: "",
        password: "",
        pwd:"",
        email:'',
        code:''
      },
      sendModel: {
        // 倒计时周期
        countNum: 60,
        // 用于倒计时标记，true-正在倒计时
        countFlag: true,
        // 定时器
        intervalBtn: { },
        // 默认按钮的值
        btnMsg: '获取验证码'
      },
      sendModel2: {
        // 倒计时周期
        countNum2: 60,
        // 用于倒计时标记，true-正在倒计时
        countFlag2: true,
        // 定时器
        intervalBtn2: { },
        // 默认按钮的值
        btnMsg2: '获取验证码'
      },
    };
  },
  methods: {
    // func:function(){
    //     funct();
    // }
    countDown2 () {
    // 设置btn倒计时时显示的信息
      this.sendModel2.btnMsg2 = null
      // 更改btn状态
      this.sendModel2.countFlag2 = !this.sendModel2.countFlag2
      // 设置倒计时
      this.sendModel2.intervalBtn2 = setInterval(() => {
        if (this.sendModel2.countNum2 <= 0) {
        // 重置btn提示信息
          this.sendModel2.btnMsg2 = '获取验证码'
          // 清除定时器
          clearInterval(this.sendModel2.intervalBtn2)
          // 更改btn状态
          this.sendModel2.countFlag2 = !this.sendModel2.countFlag2
          // 重置倒计时状态
          this.sendModel2.countNum2 = 60
        };
        // 倒计时
        this.sendModel2.countNum2--
      }, 1000)
    },
    getCode2 () {
      this.countDown2();
      this.send2()
    },
    send2(){
      let _this=this
      if(this.registerForm.email){
        this.iscanregister=false;
        this.axios({
          method:'post',
          url:'http://localhost:8000/sendemail',
          params:{
            email:this.registerForm.email,
          }
        })
        .then((res)=>{
          // console.log(res,'email')
          this.axios({
          method: "POST",
          url: "http://localhost:8000/checkemail",
          data: _this.Qs.stringify({
            email: _this.registerForm.email,
          }),
        })
          .then((res) => {
            // console.log(res.data,'code')
            _this.overcode=parseInt(res.data[0].code)
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
        })
        .catch((err)=>{
          console.log(err)
        })
        }else{
          // console.log('shuru邮箱')
          this.$message.error("对不起，请输入您的邮箱")
        }


    },

    checkemailed(){
      var _this = this;
      if(this.registerForm.email === ""){
        this.$message.error("对不起，请输入邮箱账号");
      }else{
        this.axios({
          method: "POST",
          url: "http://localhost:8000/checkemailed",
          data: _this.Qs.stringify({
            email: _this.registerForm.email,
          }),
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
            //  _this.registermsg =
            //     "恭喜您，该用户名可用！";
            //   // console.log(_this.registermsg)
            //   this.registermsg = _this.registermsg;
              this.sendModel2.countFlag2=false
              this.isemailed=true;
            } else {
              this.$message.error("对不起，您输入的邮箱已存在")
              this.registerForm.email="";
              this.iscanregister=true;
              this.isemailed=false;
              
            }
           
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
      }
    },
    deleteemailed(){
      let _this=this
      this.axios({
          method: "POST",
          url: "http://localhost:8000/deleteemail",
          data: _this.Qs.stringify({
            email: _this.registerForm.email,
          }),
        })
          .then((res) => {
            // console.log("email删除成功")
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
    },
    countDown () {
    // 设置btn倒计时时显示的信息
      this.sendModel.btnMsg = null
      // 更改btn状态
      this.sendModel.countFlag = !this.sendModel.countFlag
      // 设置倒计时
      this.sendModel.intervalBtn = setInterval(() => {
        if (this.sendModel.countNum <= 0) {
        // 重置btn提示信息
          this.sendModel.btnMsg = '获取验证码'
          // 清除定时器
          clearInterval(this.sendModel.intervalBtn)
          // 更改btn状态
          this.sendModel.countFlag = !this.sendModel.countFlag
          // 重置倒计时状态
          this.sendModel.countNum = 60
        };
        // 倒计时
        this.sendModel.countNum--
      }, 1000)
    },
    getCode () {
      this.countDown();
      this.send()
    },   
    deleteemail(){
      let _this=this
      this.axios({
          method: "POST",
          url: "http://localhost:8000/deleteemail",
          data: _this.Qs.stringify({
            email: _this.forgetemail,
          }),
        })
          .then((res) => {
            // console.log("email删除成功")
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
    },
    setforget(){
      let _this=this
      if(this.forgetemail==""){
        this.$message.error("对不起，请输入您的邮箱")
        return;
      }else if(this.forgetpassword==""||this.forgetpwd==""){
        this.$message.error("对不起，请输入您要重设的密码")
        return;
      }else if(this.forgetpassword!=this.forgetpwd){
        this.$message.error("对不起，两次输入的密码不一致")
        return; 
      }else if(this.forgetcode!=this.overcode){
        this.$message.error("对不起，验证码输入错误")
        return; 
      }else{
        this.axios({
          method: "POST",
          url: "http://localhost:8000/updatepwd",
          data: _this.Qs.stringify({
            password:_this.forgetpassword,
            email: _this.forgetemail,
          }),
        })
          .then((res) => {
            // console.log(res)
            this.$message({
              type:'success',
              message:'恭喜您，密码重置成功！'
            })
                this.forgetpassword=""
                this.forgetpwd=""
                this.forgetemail=""
                this.forgetcode=""
                this.isemail=false
                this.iscanset=true
                this.sendModel.countFlag=true
            this.deleteemail();
            setTimeout(() => {
              this.isforget=false;
              this.islr=true;
            }, 1000);
           
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
      }
    },
    checkfemail(){
      var _this = this;
      if(this.forgetemail === ""){
        this.$message.error("对不起，请输入邮箱账号");
      }else{
        this.axios({
          method: "POST",
          url: "http://localhost:8000/checkemailed",
          data: _this.Qs.stringify({
            email: _this.forgetemail,
          }),
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
            //  _this.registermsg =
            //     "恭喜您，该用户名可用！";
            //   // console.log(_this.registermsg)
            //   this.registermsg = _this.registermsg;
              this.$message.error("对不起，您输入的邮箱不存在")
              this.forgetemail="";
              this.iscanset=true;
              this.isemail=false;
            } else {
              this.sendModel.countFlag=false
              this.isemail=true;
            }
           
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
      }
    },
    send(){
      let _this=this
      if(this.forgetemail){
        this.iscanset=false;
        this.axios({
          method:'post',
          url:'http://localhost:8000/sendemail',
          params:{
            email:this.forgetemail,
          }
        })
        .then((res)=>{
          // console.log(res,'email')
          this.axios({
          method: "POST",
          url: "http://localhost:8000/checkemail",
          data: _this.Qs.stringify({
            email: _this.forgetemail,
          }),
        })
          .then((res) => {
            // console.log(res.data,'code')
            _this.overcode=parseInt(res.data[0].code)
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
        })
        .catch((err)=>{
          console.log(err)
        })
        }else{
          // console.log('shuru邮箱')
          this.$message.error("对不起，请输入您的邮箱")
        }


    },
    closeF(){
      this.isforget=false;
      this.islr=true
      
      this.forgetpassword=""
                this.forgetpwd=""
                this.forgetemail=""
                this.forgetcode=""
                this.isemail=false
                this.iscanset=true
                this.sendModel.countFlag=true
    },
    isAdmin(){
      // console.log(this.isadmin)
    },
    goregister(){
      this.islr=false;
      this.isr=true;
      this.$message("请输入正确的用户名方可注册")
    },
    gologin(){
      this.islr=true;
      this.isr=false;
      this.registerForm.username=""
                this.registerForm.password=""
                this.registerForm.pwd=""
                this.registerForm.email=""
                this.registerForm.code=""
                this.isemailed=false
                this.isusername=false
                this.iscanregister=false
                this.sendModel2.countFlag2=true
    },
    showforget(){
      this.loginForm={
        username: "",
        password: "",
        code:""
      }
      this.isforget=true
      this.islr=false
      this.isr=false
    },
    login() {
      var _this = this;
      
    //console.log(this.loginForm) 
      if(this.isadmin==="true"){
        if(this.loginForm.username!="admin"){
          this.$message.error("对不起，您还不是管理员")
        }else if(this.loginForm.code!=this.identifyCode){
          this.$message.error("对不起，验证码输入错误")
        }else{
        this.axios({
          method: "POST",
          url: "http://localhost:8000/login",
          data: _this.Qs.stringify({
              username:_this.loginForm.username,
              password:_this.loginForm.password
          })
        }).then((res)=>{
           if(res.data==null ||res.data==""){
                this.$message.error("对不起，您输入的账号或者密码不正确，请重新输入！")
            }else{
              sessionStorage.setItem("adminKey",'admin')
                _this.$router.push({
                        name:'Admin',
                    })
            }
        })
        }
      }else{
        if (this.loginForm.username === "" || this.loginForm.password === "") {
          this.$message.error("对不起，请输入您的账号或者密码")
        }else if(this.loginForm.username==="admin"){
          this.$message.error("对不起，请在管理员端进行登陆")
        }else if(this.loginForm.code!=this.identifyCode){
          this.$message.error("对不起，验证码输入错误")
        }else {
          this.axios({
            method: "POST",
            url: "http://localhost:8000/login",
            data: _this.Qs.stringify({
                username:_this.loginForm.username,
                password:_this.loginForm.password
            })
          })
            .then((res) => {
              // console.log(res.data);
              if(res.data==null ||res.data==""){
                  this.$message.error("对不起，您输入的账号或者密码不正确，请重新输入！")
              }else{

                  // alert("登陆成功");
                  _this.username=res.data[0].username
                  // console.log(_this);
                  sessionStorage.setItem('userKey',_this.username);
                  _this.$router.push({
                          name:'Main',
                          params:{
                              username:_this.username
                          }
                      })
              }
              // _this.userToken = "Bearer " + res.data.data.body.token;
              // // 将用户token保存到vuex中
              // _this.changeLogin({ Authorization: _this.userToken });
              // _this.$router.push("/Main");
            })
            .catch((error) => {
              this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
              // console.log(error);
            });
        }
      } 
    },
    checknamer(){
      var _this = this;
      if(this.registerForm.username === ""){
        this.$message.error("对不起，请输入您的账号");
      }else{
        this.axios({
          method: "POST",
          url: "http://localhost:8000/checkname",
          data: _this.Qs.stringify({
            username: _this.registerForm.username,
          }),
        })
          .then((res) => {
            // console.log(res.data);
            if (res.data == null || res.data == "") {
             _this.registermsg =
                "恭喜您，该用户名可用！";
              // console.log(_this.registermsg)
              this.registermsg = _this.registermsg;
              this.$message({
                type:"success",
                message:"恭喜您，该用户名可用！"
              })
              this.isusername=true;
              this.iscanregister=false;
            } else {
              this.$message.error("对不起，您输入的账号已存在，请重新输入！");
              this.registerForm.password="";
              this.registerForm.pwd="";
              this.isusername=false;
              this.iscanregister=true;
            }
           
          })
          .catch((error) => {
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动");
          });
      }
    },
    loginr() {
      var _this = this;
      //console.log(this.registerForm)
      if (this.registerForm.username === "" ) {
        this.$message.error("对不起，请输入您的账号");
      }else if(this.registerForm.password === ""||this.registerForm.pwd === ""){
        this.$message.error("对不起，请输入您的密码");
      }
      else if(this.registerForm.email === ""||this.registerForm.code === ""){
        this.$message.error("对不起，请输入您的邮箱和验证码");
      }
      else if(this.registerForm.password !=this.registerForm.pwd){
        this.$message.error("对不起，两次密码不一致，请重新输入");
      }else if(this.overcode!=this.registerForm.code){
        this.$message.error("对不起，您输入的验证码不正确");
      } else {
        this.axios({
                method:"POST",
                url:"http://localhost:8000/register",
                data: _this.Qs.stringify({
                  username: _this.registerForm.username,
                  password:_this.registerForm.password,
                  email:_this.registerForm.email
                }),
              })
              .then((res)=>{
                // console.log(res,'res');
                // console.log(_this.registerForm.username);
                // console.log("注册成功");
                // alert("恭喜您！注册成功")
                this.deleteemailed()
                this.open();
                this.islr=true;
                this.isr=false;  
                this.registerForm.username=""
                this.registerForm.password=""
                this.registerForm.pwd=""
                this.registerForm.email=""
                this.registerForm.code=""
                this.isemailed=false
                this.isusername=false
                this.iscanregister=false
                this.sendModel2.countFlag2=true
              }).catch((err)=>{
                this.$message.error('对不起，出现了未知错误，稍后请尝试重新启动');
                
                // console.log(error);
              })
        
      }
    },
    open() {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '用户：'),
            h('strong', { style: 'color: teal' },this.registerForm.username ),
            h('span', null, '恭喜您！注册成功！ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          // cancelButtonText: '取消',
          showCancelButton:false,
          showClose:false,
          beforeClose: (action, instance, done) => {
            done();

          }
        }).then(action => {
          this.$message({
            type: 'success',
            message: '亲爱的' + this.registerForm.username+'用户'+'赶快登陆吧！'
          });
          
          
        })
        
      },
    // jumpregister() {
    //   this.$router.push({ path: "/register" });
    // },
    //验证码abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },

};
</script>
<style scoped>

@import "../assets/login.css";
body{
  margin: 0;
  padding: 0;
}
</style>