<template>
  <div class="setdata">
    <p>后台数据编辑器</p>
    <p>作者：</p>
    <el-input placeholder="请输入此篇章作者" v-model="editorData.author" clearable>
    </el-input>
    <p>内容：</p>
    <div class="safewang" id="safeedit"></div>
    <!-- <el-input
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入此篇章内容"
    v-model="safe.content"
    >
    </el-input> -->
    <textarea
      style="display: none"
      name=""
      id=""
      cols="90"
      rows="25"
      readonly
      v-model="editorData.content"
    ></textarea>
    <p>标题：</p>
    <el-input placeholder="请输入此篇章标题" v-model="editorData.title" clearable>
    </el-input>
    
    <!-- <el-input v-show="issafe" placeholder="请输入此篇章类别" v-model="editorData.type" clearable>
    </el-input> -->
    <p v-show="issafe">数据类型：</p>
    <el-select v-show="issafe" style="margin-top:10px;" v-model="editorData.type" placeholder="请选择数据类型">
      <el-option label="骑行安全" value="safety"></el-option>
      <el-option label="人物传奇" value="legend"></el-option>
      <el-option label="赛事专栏" value="story"></el-option>
      <el-option label="坐骑保养" value="maintainance"></el-option>
      <el-option label="骑士精神" value="spirit"></el-option>
    </el-select>
    <p>发布日期：</p>
    <el-date-picker v-model="editorData.date" type="date" placeholder="选择日期">
    </el-date-picker>
    
    
    <div class="right">
    <p>数据类型：</p>
        <el-radio @change="watchdata()" v-model="radio" label="1" border>安全知识文章</el-radio>
        <el-radio @change="watchdata()" v-model="radio" label="2" border>新闻</el-radio>
        <button @click="getEditorData()">提交</button>
    </div>
  </div>
</template>
<script>
import wangEditor from "wangeditor";
export default {
  name: "SetData",
  data: function () {
    return {
      editor: null,
      issafe:true,
      editorData: {
        author: "",
        title: "",
        content: "",
        date: "",
        type: "",
        
      },
      radio:'1',
    };
  },
  methods: {
    watchdata(){
        // console.log(this.editorData.type)
        //判断当前为什么档位
        if(this.radio=='2'){
            this.issafe=false;
        }else{
            this.issafe=true;
        }
        
        
    },
    getEditorData() {
        
      var _this = this;
      // 通过代码获取编辑器内容
      // console.log(this.editor.txt.html());
      // let data = this.editor.txt.html();
      // alert(data);
      // console.log()
      if (this.editorData.author==""||this.editorData.title==""||this.editorData.content==""||this.editorData.date==""|| this.editor.txt.html() == "") {
        
        this.$message.error("对不起，请完善表格内容")
      }else if(this.issafe==true){
        //   console.log("yes")
          this.axios({
          method: "POST",
          url: "http://localhost:8000/setsafe",
          data: _this.Qs.stringify({
            title:_this.editorData.title,
            content:_this.editor.txt.html(),
            author:_this.editorData.author,
            date:_this.editorData.date,
            type:_this.editorData.type
          }),
        })
          .then((res) => {
            // console.log(res);
            this.$message({
              type:"success",
              message:"安全文章发布成功！正在提醒管理人员审批，请稍后......"
            })
            // setTimeout(() => {
            //   this.$router.push({path:'/Main'})
            // }, 2000);
          })
          .catch((error) => {
            
            // console.log(error);
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动")
          });
      } else{
        // var listtop=_this.editor.txt.html().match(/<img[^>]+>/g,'')[0].match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
        // console.log(listtop,'listtop');
        this.axios({
          method: "POST",
          url: "http://localhost:8000/setnew",
          data: _this.Qs.stringify({
            title:_this.editorData.title,
            content:_this.editor.txt.html(),
            author:_this.editorData.author,
            date:_this.editorData.date,
          }),
        })
          .then((res) => {
            // console.log(res);
            this.$message({
              type:"success",
              message:"新闻发布成功！正在提醒管理人员审批，请稍后......"
            })
            // setTimeout(() => {
            //   this.$router.push({path:'/Main'})
            // }, 2000);
          })
          .catch((error) => {
            
            // console.log(error);
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动")
          });
      }
    },
    // submitsafe(){
    //   let _this=this
    //   this.axios({
    //     method:'post',
    //     url:'http://localhost:8000/setsafe',
    //     data:_this.Qs.stringify({
    //       title:_this.safe.title,
    //       content:_this.safe.content,
    //       author:_this.safe.author,
    //       date:_this.safe.date,
    //       type:_this.safe.type
    //     })
    //   }).then((res)=>{
    //     console.log(res)
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
    // },
  },
  mounted:function(){
      const editor = new wangEditor(`#safeedit`);
    //关闭/隐藏插入网络图片的功能
    editor.config.showLinkImg = false;
    
    editor.config.height = 300;
    // editor.config.uploadImgShowBase64 = true;
    editor.config.uploadImgServer="http://localhost:8000/uploadImg"
    editor.config.uploadFileName='myFileName'
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData.content = newHtml;
    };
    editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        // console.log(xhr);

        // // 可阻止图片上传
        // return {
        //     prevent: true,
        //     msg: '需要提示给用户的错误信息'
        // }
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        // console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        // console.log("fail", resData);
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        // console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function (xhr) {
        // console.log("timeout");
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        // result 即服务端返回的接口
        // console.log("customInsert", result);

        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.url[0]);
      },
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
};
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.setdata{
    width: 100%;
    height: 556px;
    color: #fff;
    background-image: url("../assets/images/bg4.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
}
.el-input{
    float: left;
    width: 30%;
    margin-top: 10px;
    caret-color: #00bcd4;
}
p:nth-child(2){
    margin-top: 50px;
}
.safewang{
    width: 69%;
    float: right;
    color: black;
}
.right{
    float: left;
}
.right .el-radio{
    border-radius: 15px;
}
</style>