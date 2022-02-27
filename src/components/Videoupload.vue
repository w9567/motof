<template>
    <div class="videoupload">
        <iframe
            ref="myvideo"
            :poster="imgUrl"
            class="video"
            frameborder="0"
            width="100px"
            height="100px"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            :src="videoUrl"
            
            ></iframe>

        <!-- <video ref="myvideo" :poster="imgUrl" controls :src="videoUrl"></video> -->
        <img ref="myimg" :src="imgUrl" alt="" style="width: 640px;height: 368px;">
    </div>
</template>

<script>
export default {
    name:'Videoupload',
    data () {
        return {
            
            videoUrl: '//player.bilibili.com/player.html?aid=718893415&bvid=BV1GQ4y1S7ih&cid=433558225&page=1',
            imgUrl: ''
        }
    },
    created() {
        this.getVideoBase64(this.videoUrl);
    },
    methods: {
        getVideoBase64(url) {
            let dataURL = '';
            let video = document.createElement("video");
            video.setAttribute('crossOrigin', 'anonymous');//处理跨域
            video.setAttribute('src', url);
            video.setAttribute('width', 640);
            video.setAttribute('height', 368);
            video.currentTime = 200;
            video.addEventListener('loadeddata', () => {
                let canvas = document.createElement("canvas");
                let width = video.width; //canvas的尺寸和图片一样
                let height = video.height;
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
                dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
                this.imgUrl = dataURL;
                console.log(this.imgUrl)
                // 使用箭头函数就没必要使用this.$refs
                // this.$refs.myimg.src = dataURL;
                // this.$refs.myvideo.poster = dataURL;
            });
        }
    }
};
</script>