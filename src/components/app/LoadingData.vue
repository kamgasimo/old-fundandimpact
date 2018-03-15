<template>
  <div id="loading-data" class="container">
    <div class="white-box-large-only col-sm-6">
      <h2 class="text-center text-theme-colored" v-lang.please_wait_loading_your_data>Please wait! Loading your data...</h2>
      <div class="row col-sm-6 large-centered">
        <!-- <div class="col-md-2">
          <img src="/src/assets/images/preloaders/12.gif" alt="">
        </div> -->
        <div class="preloader-orbit-loading mt-40">
          <div class="cssload-inner cssload-one"></div>
          <div class="cssload-inner cssload-two"></div>
          <div class="cssload-inner cssload-three"></div>
        </div>
        <br>
        <div class="preloader-fountainTextG font-20" v-if="language == 'en'">
          <div id="fountainTextG_1" class="fountainTextG">L</div>
          <div id="fountainTextG_2" class="fountainTextG">o</div>
          <div id="fountainTextG_3" class="fountainTextG">a</div>
          <div id="fountainTextG_4" class="fountainTextG">d</div>
          <div id="fountainTextG_5" class="fountainTextG">i</div>
          <div id="fountainTextG_6" class="fountainTextG">n</div>
          <div id="fountainTextG_7" class="fountainTextG">g</div>
        </div>
        <div class="preloader-fountainTextG font-20" v-if="language == 'fr'">
          <div id="fountainTextG_1" class="fountainTextG">C</div>
          <div id="fountainTextG_2" class="fountainTextG">h</div>
          <div id="fountainTextG_3" class="fountainTextG">a</div>
          <div id="fountainTextG_4" class="fountainTextG">r</div>
          <div id="fountainTextG_5" class="fountainTextG">g</div>
          <div id="fountainTextG_6" class="fountainTextG">e</div>
          <div id="fountainTextG_7" class="fountainTextG">m</div>
          <div id="fountainTextG_8" class="fountainTextG">e</div>
          <div id="fountainTextG_9" class="fountainTextG">n</div>
          <div id="fountainTextG_10" class="fountainTextG">t</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loading-data",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
#loading-data{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0, .9);
  z-index: 99999999999;
}
#loading-data .white-box-large-only{
  height: 400px;
  position: absolute;
  top: 150px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
#loading-data .white-box-large-only img{
  width: 100px;
  max-width: 100px;
}
#loading-data .white-box-large-only .preloader-orbit-loading {
    position: relative;
    left: calc(50% - 71px);
    width: 100px;
    height: 100px;
}
#loading-data .white-box-large-only .preloader-fountainTextG{
  position: relative;
  left: calc(50% - 71px);
}
</style>
