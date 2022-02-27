//引入express
const {response} = require('express');
const express = require('express');
const {request} = require('http');
const router =express.Router();
//引入数据库
const mysql = require("mysql");
const bodyParser = require('body-parser');
//创建应用对象
const app = express();
//设置中间件
const path=require("path");

const formidable=require("formidable");
const fs=require("fs");
const axios=require("axios");
const { send } = require('process');
const nodemailer = require('nodemailer');
//配置proxy
// 第一个为0.x.x版本已经不行了
// const proxy= require('http-proxy-middleware')
// 这个1.x版本的才行
const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use('/api', createProxyMiddleware({
//   // 代理跨域目标接口
//   target:'https://autumnfish.cn',
//   changeOrigin: true,
//   pathRewrite: { '^/api': '' } //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
// }));

// const { axios } = require('vue/types/umd');
// //wangeditor上传图片
// const upload =require('./src/upload.js')
//bodyParser配置
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// const { login_cellphone, user_cloud } = require('NeteaseCloudMusicApi');

// async function main() {
//   try {
//     const result = await login_cellphone({
//       phone: '******',
//       password: '*****',
//     })
//     // console.log(result)
//     app.post('/getmusic',(request,response)=>{
//       response.header('Access-Control-Allow-Origin', '*');
//       //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//       response.header('Access-Control-Allow-Headers', 'Content-Type');
//       response.header('Access-Control-Allow-Methods', '*');
//       response.header('Content-Type', 'application/x-www-form-urlencoded');
      
//       axios({
//         method:"get",
//         url: "https://cloud-music-api-lyart.vercel.app/login/cellphone?phone=17750380906&password=ww980906",
        
//       }).then((res)=>{
//         console.log('22',res);
//         response.send(res)
//       }).catch((err)=>{
//         console.log('33',err)
//       })
     
//     })
//     const result2 = await user_cloud({
//       cookie: result.body.cookie, // 凭证
//     })
//     // console.log(result2.body)
//   } catch (error) {
//     console.log(error)
//   }
// }
// main()

// app.get('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

// app.post('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/x-www-form-urlencoded');
//   next();
// });


/* eslint-disable no-new设置拦截器 */
// axios.interceptors.request.use( (config) => {
//   if (config.method=="post"){
//       config.data = qs.stringify(config.data);
//       config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   }
//   return config;
// },  (error) => {
//   return Promise.reject(error);
// });

//可用案例get请求
//get请求配置，前台axios传递数据要用parsms，后台获取就用request.query
// app.get('/login',(request,response)=>{
//   var info = request.query;
//   let sql = "select * from user where username=? ";
//   let data = [
//     info.username
//   ]
//   db.query(sql,data, (err, result) => {
//     if (err) {
//       // console.log('err',err);
//     } else {
//       // console.log('reult',result);
//       response.send(JSON.stringify(result));
//     }
//   })
// })
//设置代理
// app.post('/playm',(req,res)=>{
//   axios.get(`api/song/url?id=${id}`).then((res)=>{

//   })
// })

// app.post('/playmusic',(request,response)=>{
//   response.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   response.header('Access-Control-Allow-Headers', 'Content-Type');
//   response.header('Access-Control-Allow-Methods', '*');
//   response.header('Content-Type', 'application/x-www-form-urlencoded');
//   var musicId =request.body.musicId
//   // console.log(musicId);
//   // console.log(musicId)
//   const url='https://autumnfish.cn/song/url?id='+musicId
//   axios.get(url,{
//     headers:{
//       referer:'https://autumnfish.cn',
//       host:'autumnfish.cn',
      
//     },
    
//   }).then((res)=>{
//     // console.log(res.data)
//     response.json(res.data);
//     // console.log(response.json(res.data))
//     // response.send(JSON.stringify(res.data))
//   }).catch((err)=>{
//     console.log(err)
//   })
// })
app.post('/sendemail',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');
  var info = request.query;
  //注意增删改查是有顺序的，马德
  var data = [
    info.email,
  ]
  var email=info.email

  var code=Math.floor(Math.random()*900000) +100000
  const transporter = nodemailer.createTransport({
    host: "smtp.163.com", // 网易的邮件地址
    port: 465, // 端口
    secureConnection: false, // use SSL
    auth: {
      "user": 'w956792115@163.com', // 邮箱账号
      "pass": '********' // 邮箱的授权码
    }
  });
  let options={
    from: 'w956792115@163.com', // 发件人地址
    to: `w956792115@163.com,${email}`, // 收件人地址，多个收件人可以使用逗号分隔
    subject: '友摩交流资讯平台在线--验证码', // 邮件标题
    html: `<h1>Hello!</h1><p style="font-size: 18px;color:#000;">友摩交流资讯平台的验证码为：<u style="font-size: 16px;color:#1890ff;">  ${code}  </u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>` // 邮件内容
  }
  transporter.sendMail(options,function(err,msg){
    if(err){
      console.log(err)
    }else{
      // console.log(msg)
      // console.log(code)
      let sql = `insert into emailinfo (email,code) values (?,${code})`;
  
      db.query(sql,data, (err, result) => {
        if (err) {
          console.log('err',err);
        } else {
          response.send(JSON.stringify(result));
          // console.log(result)
        }
      })
      transporter.close()
    }
  })
})
app.post('/checkemail',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  //注意增删改查是有顺序的，马德
  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.email,
  ]
  let sql = "select * from emailinfo where email=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})

app.post('/checkemailed',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  //注意增删改查是有顺序的，马德
  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.email,
  ]
  let sql = "select username from user where email=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/updatepwd',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.password,
    info.email,
    
  ]
  // console.log(info.username)
  // console.log(info.password)
  let sql = "UPDATE user SET password=?  WHERE email=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/deleteemail',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.email,
    
  ]
  // console.log(info.username)
  // console.log(info.password)
  let sql = "delete from emailinfo  WHERE email=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/getonesafe',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  //注意增删改查是有顺序的，马德
  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.id,
  ]
  let sql = "select id,title,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,author,date,type,goods,status from safe where id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/getonenew',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  //注意增删改查是有顺序的，马德
  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.id,
  ]
  let sql = "select id,title,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,author,date,goods,status from new where id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/getonearticle',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  //注意增删改查是有顺序的，马德
  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.id,
  ]
  let sql = "select id,title,label,author,date,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,CAST(listtop AS CHAR(10000) CHARACTER SET utf8) as listtop,status,goods from books where id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/upustatus',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.status,
    info.id,
    
    
  ]
  // console.log(info.status)
  // console.log(info.password)
  let sql = "UPDATE user SET status=?  WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/upastatus',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.status,
    info.id,
    
    
  ]
  // console.log(info.status)
  // console.log(info.password)
  let sql = "UPDATE books SET status=?  WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/uppstatus',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.status,
    info.id,
    
    
  ]
  // console.log(info.status)
  // console.log(info.password)
  let sql = "UPDATE cardmore SET status=?  WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/upvstatus',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  //注意增删改查是有顺序的，马德
  let data = [
    info.status,
    info.id,
    
    
  ]
  // console.log(info.status)
  // console.log(info.password)
  let sql = "UPDATE videos SET status=?  WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/getmessage',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  //注意增删改查是有顺序的，马德

  let sql = "select title,date from books where status='待审核'";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/setsafe',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  //注意增删改查是有顺序的，马德


  let data = [
    info.title,
    info.content,
    info.author,
    info.date,
    info.type
  ]

  let sql = "INSERT INTO safe (title,content,author,date,type) VALUES (?,?,?,?,?)";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/setnew',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.author,
    info.title,
    info.content,
    info.date,
  ]

  let sql = "insert into new (author,title,content,date) values (?,?,?,?)";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/getuser',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  

  let sql = "select * from user";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/logout',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.username,
    
  ]
  // console.log(info.username)
  // console.log(info.password)
  let sql = "DELETE FROM user WHERE username=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/changepwd',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  //注意增删改查是有顺序的，马德
  let data = [
    info.password,
    info.username,
    
  ]
  // console.log(info.username)
  // console.log(info.password)
  let sql = "UPDATE user SET password=?  WHERE username=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/checkpwd',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  // console.log(info)
  let data = [
    info.username,
  ]
  // console.log(info.username)
  let sql = "select password from user where username=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/getuserinfo',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  // console.log(info)
  let data = [
    info.username,
  ]
  // console.log(info.username)
  let sql = "select * from userinfo where username=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
      // console.log(result)
    }
  })
})
app.post('/checkuserinfo',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  // console.log(info)
  let data = [
    info.username,
  ]
  
  let sql = "select username from userinfo where username=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/insertuserinfo',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  // console.log(info)
  let data = [
    info.username,
    info.nickname,
    info.iphone,
    info.address,
    info.signature,
    info.contactadd,
    info.wechat,
    info.qq,
    info.love,
    info.constellation,
    info.birthday,
    info.old,
  ]
  
  let sql = "INSERT INTO userinfo (username,nickname,iphone,address,signature,contactadd,wechat,qq,love,constellation,birthday,old) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/updateuserinfo',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  // console.log(info)
  let data = [
    
    info.nickname,
    info.iphone,
    info.address,
    info.signature,
    info.contactadd,
    info.wechat,
    info.qq,
    info.love,
    info.constellation,
    info.birthday,
    info.old,
    info.username,
  ]

  let sql = "UPDATE userinfo SET nickname=?,iphone=?,address=?,signature=?,contactadd=?,wechat=?,qq=?,love=?,constellation=?,birthday=?,old=? WHERE username=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/uploadImg', function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");//运行跨域   来之http://localhost:3000域名的
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Credentials',true);//运行表头带cookie参数
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  let form = new formidable.IncomingForm();
  let dir = "./public/image/";
  form.uploadDir =dir;
  form.parse(req, function(err, fields, files) {
      // console.log(files,'files');
      let oldPath = files.myFileName.filepath; //fileName就是我们刚在前台模板里面配置的后台接受的名称；
      let extname = files.myFileName.originalFilename; //获取图片名称
      //新的路径由组成：原父路径 + 拓展名
      let newPath = dir + extname;
      //改名     把之前存的图片换成真的图片的完整路径
      fs.rename(oldPath, newPath, function(err) {
          if(err) {
              res.send({isOk:false,err});
          }
          let resPath = newPath.replace("./public","http://localhost:8000"); //处理图片路径  让前端能访问
          res.send({isOk:true,url:[resPath]}) //返回图片路径
      });
  });
})



 

//get请求配置，前台axios传递数据要用data，后台获取就用request.body
app.post('/login',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;

  let sql = "select * from user where username=? and password=? ";
  let data = [
    info.username,
    info.password
  ]
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
//检查重名
app.post('/checkname',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;

  let sql = "select * from user where username=?";
  let data = [
    info.username,
  ]
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/register',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  let data = [
    info.username,
    info.password,
    info.email
  ]
  let sql = "INSERT INTO user (username,password,email) VALUES (?,?,?)";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/upload-book',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.body;
  let data = [
    info.title,
    info.content,
    info.listtop,
    info.label,
    info.date,
  ]
  
  let sql = "INSERT INTO books (title,content,listtop,label,date) VALUES (?,?,?,?,?)";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getalllength',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select u.用户热度,b.文章热度,c.图片热度,n.新闻热度,v.视频热度 from(select count(*) 用户热度 from user) u,(select count(*) 文章热度 from books) b,(select count(*) 图片热度 from cardmore) c,(select count(*) 新闻热度 from new) n,(select count(*) 视频热度 from videos) v;";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallvideo',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from videos ";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getimg',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let info=request.body;
  let limit=parseInt(info.limit)
  
  var data=[
    limit
  ]
    
  
  let sql = "select * from cardmore limit ? ";

  db.query(sql,data,(err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallarticle',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select id,author,title,label,date,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,CAST(listtop AS CHAR(10000) CHARACTER SET utf8) as listtop,status,goods from books ";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getmyarticle',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  var info = request.body;
  let data = [
    info.author
  ]
  // console.log(info)
  let sql = "select title,label,date,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,CAST(listtop AS CHAR(10000) CHARACTER SET utf8) as listtop,status from books where author=? ";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getnrarticle',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.id,
  ]
  let sql = "select title,id,label,date,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,CAST(listtop AS CHAR(10000) CHARACTER SET utf8) as listtop,status,goods from books where id=? ";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getnrnew',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.id,
  ]
  let sql = "select id,title,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,author,date,goods from new where id=? ";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getcollects',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.username
  ]
  let sql = "select * from collects where  username=? ";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getcollected',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.collectid,
    info.username
  ]
  let sql = "select * from collects where  collectid=? and username=? ";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getiscollect',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.collectid,
    info.username
  ]
  let sql = "select * from collects where collectid=? and username=? ";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getnrsafe',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.id,
  ]
  let sql = "select id,title,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,author,date,type,goods  from safe where id=? ";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/addcollect',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.username,
    info.collectid,
  ]
  let sql = "insert into collects (username,collectid) values (?,?)";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/deletecollect',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.collectid,
  ]
  let sql = "delete from collects where collectid=?";
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/addsafegoods',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.id,
  ]
  let sql = "UPDATE safe SET goods=goods+1 WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/addarticlegoods',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.id,
  ]
  let sql = "UPDATE books SET goods=goods+1 WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/addnewgoods',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  var info = request.query;
  let data = [
    info.id,
  ]
  let sql = "UPDATE new SET goods=goods+1 WHERE id=?";
  
  db.query(sql,data, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getdatelog',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select date,log from datelog";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallnew',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select id,author,title, CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,date,goods from new";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallsafe',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select id,title,CAST(content AS CHAR(10000) CHARACTER SET utf8) as content ,author,date,type,goods from safe";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getsafe',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');
  var info = request.query;
  
  var id1=info.id;
  var id2=parseInt(info.id)+2;
  let sql = `select title from safe where id between '${id1}' and '${id2}'  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getnew',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');
  var info = request.query;
  
  var id1=info.id;
  var id2=parseInt(info.id)+2;
  let sql = `select title from new where id between '${id1}' and '${id2}'  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getarticle',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');
  var info = request.query;
  
  var id1=info.id;
  var id2=parseInt(info.id)+2;
  let sql = `select title from books where id between '${id1}' and '${id2}'  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getalleq',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from equipment";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallpr',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from prepare";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallno',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from notice";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallma',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from maintainance";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallkn',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from knightship";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getallcardimg',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from cardcarousel";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
app.post('/getcardmore',(request,response)=>{
  response.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Content-Type', 'application/x-www-form-urlencoded');

  
  let sql = "select * from cardmore";
  
  db.query(sql, (err, result) => {
    if (err) {
      // console.log('err',err);
    } else {
      response.send(JSON.stringify(result));
    }
  })
})
// app.post('/upload',(request,response)=>{
//   response.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   response.header('Access-Control-Allow-Headers', 'Content-Type');
//   response.header('Access-Control-Allow-Methods', '*');
//   response.header('Content-Type', 'application/x-www-form-urlencoded');

//   var info = request.body;
//   let data = [
//     info.title,
//     info.content
//   ]
  
//   let sql = "INSERT INTO books (title,content) VALUES (?,?)";
  
//   db.query(sql,data, (err, result) => {
//     if (err) {
//       // console.log('err',err);
//     } else {
//       response.send(JSON.stringify(result));
//     }
//   })
// })
// 上传图片
app.all('/uploadImg', function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");//运行跨域   来之http://localhost:3000域名的
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header('Access-Control-Allow-Credentials',true);//运行表头带cookie参数
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "text/html;charset=utf-8");

  // let form = new formidable.IncomingForm();
  // let dir = "./public/image/";
  // form.uploadDir =dir;
  // form.parse(req, function(err, fields, files) {
  //     let oldPath = files.fileName.path; //fileName就是我们刚在前台模板里面配置的后台接受的名称；
  //     let extname = files.fileName.name; //获取图片名称
  //     //新的路径由组成：原父路径 + 拓展名
  //     let newPath = dir + extname;
  //     //改名     把之前存的图片换成真的图片的完整路径
  //     fs.rename(oldPath, newPath, function(err) {
  //         if(err) {
  //             res.send({isOk:false,err});
  //         }
  //         let resPath = newPath.replace("./public","http://localhost:8080"); //处理图片路径  让前端能访问
  //         res.send({isOk:true,url:[resPath]}) //返回图片路径
  //     });
  // });
  res.send("1112");
})
//创建数据库连接
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "20220111"
})
db.connect((err) => {
  if (err) throw err;
  console.log("数据库连接成功--");
})

//监听窗口启动服务
app.listen(8000, () => {
  console.log("服务已启动，8000端口监听中-----");
})
