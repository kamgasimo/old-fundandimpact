<template>
  <div id="gallery-thumbnail">
    <!-- Portfolio Item Start -->
    <div class="gallery-item">
      <div class="thumb">
        <img alt="project" :src="campaign.media[0].url" class="img-fullwidth">
        <div class="overlay-shade"></div>
        <div class="icons-holder">
          <div class="icons-holder-inner">
            <div class="styled-icons icon-dark icon-circled icon-theme-colored">
              <a :href="campaign.media[0].url" data-lightbox-gallery="gallery"><i class="fa fa-picture-o"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Portfolio Item End -->
  </div>
</template>
<script>
export default {
  name: "gallery-thumbnail",
  props: ['campaign'],
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
</style>
