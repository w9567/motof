<template>
  <div class="write">
    <el-page-header style="width:100%;" @back="goBack" content="创作界面">
    </el-page-header>
    <div class="box">
      <div class="title">
        <input
          type="text"
          ref="content"
          @blur="getvalue($event)"
          placeholder="请输入文章标题"
          min="5"
          maxlength="20"
        />
        <el-select
                    style="width: 100px;z-index: 2 !important;"
                    v-model="select"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option label="生活" value="1"></el-option>
                    <el-option label="搞笑" value="2"></el-option>
                    <el-option label="闲谈" value="3"></el-option>
                  </el-select>
                  <el-date-picker
                  disabled
                  style="z-index:999999;"
                    v-model="datevalue.createDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
        <button class="btn" @click="getEditorData">发布文章</button>
        <button class="btn" @click="clearEditorData">清空文章内容</button>
        <br/>
        
      </div>
      <br />
      <div class="wang" id="wanged" style="z-index: 1 !important;"></div>
      <textarea
        style="display:none;"
        name=""
        id=""
        cols="90"
        rows="25"
        readonly
        v-model="editorData"
      ></textarea>
    </div>
  </div>
</template>

<script>
//引入wangEditor富文本编辑器
import wangEditor from "wangeditor";

export default {
  data() {
    return {
      editor: null,
      editorData: "",
      titlevalue: "",
      select:'1',
      
      datevalue:{
        createDate:new Date()
      },
    };
  },
  watch: {
    // title:function(newVal, oldVal){
    //   console.log("newVal:", newVal);
    //   console.log("oldVal:", oldVal);
    // },
  },
  mounted() {
    

    const editor = new wangEditor(`#wanged`);
    //关闭/隐藏插入网络图片的功能
    editor.config.showLinkImg = false;
    
    editor.config.height = 300;
    editor.config.zIndex=200;
    // editor.config.uploadImgShowBase64 = true;
    editor.config.uploadImgServer="http://localhost:8000/uploadImg"
    editor.config.uploadFileName='myFileName'
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
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
  methods: {
    goBack() {
        // console.log('go back');
        this.$router.push({path:'/Main'})
    },
    getDate(){
      //date是传过来的时间戳，注意需为13位，10位需*1000
      //也可以不传,获取的就是当前时间
      var time = new Date();
      var year= time.getFullYear()  //年
      var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
      var day = ("0" + time.getDate()).slice(-2); //日
      var mydate = year + "-" + month + "-" + day;
      return mydate
    },
    getEditorData() {
      var _this = this;
      // 通过代码获取编辑器内容
      // console.log(this.editor.txt.html());
      // let data = this.editor.txt.html();
      // alert(data);
      // console.log(this.select,this.datevalue.createDate)
      
      // console.log(this.getDate())
      if (this.editor.txt.html() == null || this.editor.txt.html() == "") {
        
        this.$message.error("对不起，您还没有输入内容")
      } else if (this.titlevalue == null || this.titlevalue == "") {
        
        this.$message.error("请输入您的标题")
      } else {
        var listtop=""
        var label=""
        if(this.select==1){
          label='生活'
        }else if(this.select==2){
          label='搞笑'
        }else{
          label='闲谈'
        }
        var date=this.getDate()
        // console.log(this.getDate())
        
        if(_this.editor.txt.html().match(/<img[^>]+>/g,'')){
          listtop=_this.editor.txt.html().match(/<img[^>]+>/g,'')[0].match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
        }
        
        // console.log(listtop,'listtop');
        this.axios({
          method: "POST",
          url: "http://localhost:8000/upload-book",
          data: _this.Qs.stringify({
            title: _this.titlevalue,
            content: _this.editor.txt.html(),
            listtop:listtop,
            label:label,
            date:date
          }),
        })
          .then((res) => {
            // console.log(res);
            this.$message({
              type:"success",
              message:"文章发布成功！正在提醒管理人员审批，请稍后......"
            })
            setTimeout(() => {
              this.$router.push({path:'/Main'})
            }, 2000);
          })
          .catch((error) => {
            
            // console.log(error);
            this.$message.error("对不起，出现了未知错误，稍后请尝试重新启动")
          });
      }
    },
    clearEditorData() {
      this.editor.txt.clear();
      // console.log(this.select,this.datevalue)
    },
    getvalue(event) {
      // console.log(event.currentTarget.value);
      let titlevalue = event.currentTarget.value;
      this.titlevalue = titlevalue;
    },
  },

  // beforeDestroy() {
  //   // 调用销毁 API 对当前编辑器实例进行销毁
  //   this.editor.destroy();
  //   this.editor = null;
  // },
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.el-page-header {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  line-height: 40px;
  
}

.box{
  width: 100%;
  height: 516px;
  background-image: url("../assets/images/bg4.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.box input{
  font-size: 18px;
  padding: 11px;
  width: 50%;
  border-radius: 2em;
  outline: none;
  margin-left: 20px;
  margin-top: 25px;
}
.box button{
    padding: 11px;
    border-radius: 2em;
}
.box button:first-of-type{
  border: 1px solid red;
  background: #e91e63;
  color: #fff;
}
.box button:last-of-type{
  border: 1px solid #00bcd4;
  color: #00bcd4;
}
.wang{
  width: 80%;
  margin: 10px auto;
}


</style>