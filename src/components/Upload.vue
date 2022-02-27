<template>
  <div class="write">
    <h3>wangEditor with vue</h3>
    <div class="title">
      <p>标题</p>
      <input
        type="text"
        ref="content"
        @blur="getvalue($event)"
        placeholder="请输入文章标题"
      />
    </div>
    <p>内容</p>
    <div id="wanged"></div>
    <button type="button" class="btn" @click="getEditorData">
      获取当前内容
    </button>
    <button type="button" class="btn" @click="clearEditorData">
      清空当前内容
    </button>
    <div></div>
    <h3>内容预览</h3>
    <textarea
      name=""
      id=""
      cols="90"
      rows="25"
      readonly
      v-model="editorData"
    ></textarea>
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
    editor.config.uploadImgShowBase64 = true;
    // editor.config.uploadImgServer = "/upload";
    // editor.config.uploadHeaders = {
    //     'Accept' : 'text/x-json'
    // };

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
        insertImgFn(result.data[0]);
      },
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  methods: {
    getEditorData() {
      var _this = this;
      // 通过代码获取编辑器内容
      // console.log(this.editor.txt.html());
      // let data = this.editor.txt.html();
      // alert(data);

      if (this.editor.txt.html() == null || this.editor.txt.html() == "") {
        // console.log("您还没有输入内容");
      } else if (this.titlevalue == null || this.titlevalue == "") {
        // console.log("请输入您的标题");
      } else {
        this.axios({
          method: "POST",
          url: "http://localhost:8000/upload-book",
          data: _this.Qs.stringify({
            title: _this.titlevalue,
            content: _this.editor.txt.html(),
          }),
        })
          .then((res) => {
            // console.log(res);
          })
          .catch((error) => {
            alert("对不起，出现了未知错误，稍后请尝试重新启动");
            // console.log(error);
          });
      }
    },
    clearEditorData() {
      this.editor.txt.clear();
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
</style>