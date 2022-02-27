<template>
  <div class="videolist" > 
      <div v-for="(item,index) in videolists" :key="index">
        <div class="contain" @mouseover="showbtn(index)" @mouseout="hiddenbtn(index)" >
            <!-- @mouseenter="showbtn" @mouseleave="hiddenbtn" -->
            <span>{{item.title}}</span>
            <img   :src="require(`../assets/images/${item.cover}`)" />
            <!-- <video class="video"  ></video> -->
            <!-- <iframe
            class="video"
            frameborder="0"
            width="100px"
            height="100px"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            src="https://player.youku.com/embed/XNTA5NjUxNDQ4OA=="
            ></iframe> -->
            <div class="zhezhao" @click="runvideo(item)"  >
                <img ref="shabi" class="hiddened" src="../assets/images/video_btn_hover.png" />
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'VideoList',
    data:function(){
        return{
            
            videolists:[
                
                
            ],
            
            
        }
    },
    
    methods:{
        runvideo:function(videolists){
            // console.log("diandian")
            // console.log(videolists,'video')
            this.$router.push({
                name:'PlayVideo',
                params:{
                    videolists:videolists,

                }
            })
            
            // let e = this.$refs.shabi[index];
            // console.log(e.getAttribute('class'))
            // if (this.$refs.shabi[index].getAttribute('class')=="showed"){
            //     this.$refs.shabi[index].setAttribute('class', 'hiddened')
            // } 
        },
        showbtn:function(index){
            this.$refs.shabi[index].setAttribute('class', '')
        },
        hiddenbtn:function(index){
            this.$refs.shabi[index].setAttribute('class', 'hiddened')
        },
        getvideos(){
            
            if(sessionStorage.getItem('videomoreKey')==null||sessionStorage.getItem('videomoreKey')==""){
                this.axios.post("http://localhost:8000/getallvideo")
                .then((res)=>{
                    // console.log(res)
                    let newvideo=[]
                    for(let i=0;i<10;i++){
                        newvideo.push(res.data[i])
                    }
                    
                    this.videolists=newvideo
                    // console.log(this.videolists,'video')
                    sessionStorage.setItem('videomoreKey',JSON.stringify(this.videolists))
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{
                let videolist=JSON.parse(sessionStorage.getItem('videomoreKey'))
                let newvideos=[]
                for(let i=0;i<10;i++){
                    newvideos.push(videolist[i])
                }
               
                this.videolists=newvideos
                
            }
            

        },
    },
    created:function(){
        this.getvideos();
    },
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.hiddened{
    display: none;
}
.contain{
    position: relative;
    width: 17.5%;
    height: 135px;
    background-color: cadetblue;
    float: left;
    margin: 8px 13px;
}
.contain span{
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #000;
    opacity: 0.7;
    color:white;
    font-size: small;
    
}
.contain span:hover{
    text-decoration: underline;
    
}
.contain img{
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
}
.contain .video{
    width: 100%;
    height: 100%;
    position: absolute;
    
}
.zhezhao{
    height: 100%;
    width: 100%;
    
    
}
.contain div img{
    width: 100%;
    height: 100%;
    
}
</style>