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
        style="height:540px;"
      >
      </vue-particles>
    <header class="top">
      <!-- <icon><img src="" /></icon> -->
      <!-- <p>摩e家</p> -->
    </header>
    <main class="mainr">
      <div class="zhezhao">
        <form action="javascript:void(0)" method="POST" @submit="func()">
          <div class="list">
            <p>Friends Motorcycle</p>
            <div id="title" class="title">{{ registermsg }}</div>
            <div class="container">
              <label>请输入账号：</label>
              <input
                id="username"
                name="username"
                v-model="registerForm.username"
                type="text"
                placeholder="请输入您的账号"
                @focus="clearmsg"
                @blur="checkname"
              /><br />
            </div>
            <div class="container">
              <label>请输入密码：</label>
              <input
                id="password"
                name="password"
                v-model="registerForm.password"
                type="password"
                placeholder="请输入您的密码"
                @focus="clearmsg"
              /><br />
            </div>
            <div class="container">
              <label>再次输入密码：</label>
              <input
                id="pwd"
                name="pwd"
                v-model="registerForm.pwd"
                type="password"
                placeholder="请输入您的密码"
                @focus="clearmsg"
              /><br />
            </div>
            <!-- <div>验证码</div><br/> -->
            <input id="submit" type="button" @click="login" value="注册" />
            <br />
            <router-link to="Login">去登陆</router-link>
          </div>
        </form>
      </div>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: function () {
    return {
      registermsg: "",
      username: "",
      registerForm: {
        username: "",
        password: "",
        pwd:"",
      },
    };
  },
  methods: {
    checkname(){
      var _this = this;
      if(this.registerForm.username === ""){
        _this.registermsg = "对不起，请输入您的账号";
        this.registermsg = _this.registermsg;
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
            } else {
               // this.setData('registermsg','对不起，您输入的账号或者密码不正确，请重新输入！')
              _this.registermsg =
                "对不起，您输入的账号已存在，请重新输入！";
              // console.log(_this.registermsg)
              this.registermsg = _this.registermsg;
            }
           
          })
          .catch((error) => {
            alert("对不起，出现了未知错误，稍后请尝试重新启动");
            // console.log(error);
          });
      }
    },
    login() {
      var _this = this;
      //console.log(this.registerForm)
      if (this.registerForm.username === "" || this.registerForm.password === ""||this.registerForm.pwd === "") {
        _this.registermsg = "对不起，请输入您的账号或者密码";
        this.registermsg = _this.registermsg;
      }else if(this.registerForm.password !=this.registerForm.pwd){
        _this.registermsg = "对不起，两次密码不一致，请重新输入";
        this.registermsg = _this.registermsg;
      } else {
        this.axios({
                method:"POST",
                url:"http://localhost:8000/register",
                data: _this.Qs.stringify({
                  username: _this.registerForm.username,
                  password:_this.registerForm.password
                }),
              })
              .then((res)=>{
                // console.log(res,'res');
                // console.log(_this.registerForm.username);
                // console.log("注册成功");
                // alert("恭喜您！注册成功")
                this.open();
              }).catch((err)=>{
                this.$message.error('对不起，出现了未知错误，稍后请尝试重新启动');
                
                // console.log(error);
              })
        
      }
    },
    clearmsg() {
      this.registermsg = "";
      // console.log("失去焦点");
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
            message: '亲爱的' + action+'用户'+'赶快登陆吧！'
          });
          this.$router.push('/login');
        })
        
      },
  },
};
</script>

<style scoped>
@import "../assets/login.css";
</style>