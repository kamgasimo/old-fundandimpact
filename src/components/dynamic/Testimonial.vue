<template>
  <div id="testimonial">
    <div class="item">
      <div class="testimonial-wrapper text-center">
        <div class="thumb">
          <img v-if="testimonial.user.media && testimonial.user.media[0] && testimonial.user.media[0].url" class="img-circle" style="width: 100px;" alt="" :src="testimonial.user.media[0].url">
        </div>
        <div class="content pt-10">
          <p>{{testimonial.message}}</p>
          <i class="fa fa-quote-right font-36 mt-10 text-gray-lightgray"></i>
          <h5 class="author text-theme-colored mb-0">{{testimonial.user.name}}</h5>
          <h6 class="title text-gray mt-0 mb-15">{{testimonial.job}} at {{testimonial.company}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "testimonial",
  props: ['testimonial'],
  data: function data() {
    return {

    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance

  }
}
</script>
<style lang="css">
</style>
