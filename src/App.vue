<template>
  <div id="app">
    <!-- <div class="allmusic" v-show="isplay">
      <lister-music></lister-music>
    </div> -->
    <router-view/>

  </div>
</template>

<script>
export default {
  
  name: 'App',
  
  data:function () {
    return{
      // isplay:true,
      // play:'',
    }
  },
  methods:{
    

  },
  
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
/* .allmusic{
    width: 300px;
    height: 350px;
    position: absolute;
    top: 205px;
    right: 0;
    margin-right: 115px;
    z-index: 9;
} */
</style>
