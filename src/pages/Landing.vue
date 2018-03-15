<template>
<div id="landing">
  <div id="wrapper" class="clearfix">

    <!-- Include the Landing slider -->
    <slideshow></slideshow>
    <!-- Start main-content -->
    <div class="main-content">
      <campaign-types></campaign-types>
      <!-- Section: Causes -->
      <section>
        <div class="container pb-80">
          <div class="section-title text-center">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <h3 class="text-uppercase mt-0" v-lang.latest_campaings>Latest Campaigns</h3>
                <div class="title-icon">
                  <i class="flaticon-charity-hand-holding-a-heart"></i>
                </div>
                <p v-lang.donation_protected_message>Your donation is protected. If anything is not right,<br> we’ll give you a full refund.</p>
              </div>
            </div>
          </div>
          <div class="row mtli-row-clearfix">
            <div v-if="campaigns && campaigns.length > 0" class="equal-height">
              <campaign v-for="campaign in campaigns" :key="campaign.id" :campaign="campaign" :user="user"></campaign>
            </div>
            <div v-else class="text-center">
              <!-- <div class="col-md-2">
                <img src="/src/assets/images/preloaders/12.gif" alt="">
              </div> -->
              <div class="preloader-orbit-loading mt-40">
                <div class="cssload-inner cssload-one"></div>
                <div class="cssload-inner cssload-two"></div>
                <div class="cssload-inner cssload-three"></div>
              </div>
              <!-- <br> -->
              <!-- <div class="preloader-fountainTextG font-20 ">
                    <div id="fountainTextG_1" class="fountainTextG">L</div>
                    <div id="fountainTextG_2" class="fountainTextG">o</div>
                    <div id="fountainTextG_3" class="fountainTextG">a</div>
                    <div id="fountainTextG_4" class="fountainTextG">d</div>
                    <div id="fountainTextG_5" class="fountainTextG">i</div>
                    <div id="fountainTextG_6" class="fountainTextG">n</div>
                    <div id="fountainTextG_7" class="fountainTextG">g</div>
                  </div> -->
            </div>
          </div>
        </div>
      </section>

      <!-- divider: Gallery -->
      <section v-if="publicData.gallery && publicData.gallery.length > 0"class="divider bg-lighter">
        <div class="container-fluid">
          <div class="section-title text-center">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <h3 class="text-uppercase mt-0" v-lang.>Gallery</h3>
                <div class="title-icon">
                  <i class="flaticon-charity-hand-holding-a-heart"></i>
                </div>
                <p v-lang.donation_protected_message>View pictures of all campaings on FundAndImpact<br> you can also click to preview in a lightbox.</p>
              </div>
            </div>
          </div>
          <div class="section-content">
            <div class="row">
              <div class="col-md-12">
                <div class="gallery-isotope grid-5 gutter-small clearfix" data-lightbox="gallery">
                  <gallery-thumbnail v-for="item in campaigns" :key="item.id" :campaign="item" v-if="item && item.media && item.media[0].media_type == 'image' "></gallery-thumbnail>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Testimonials and Logo -->
      <section v-if="(publicData.testimonials && publicData.testimonials.length > 0) || (publicData.scriptures && publicData.scriptures.length > 0)"class="divider parallax layer-overlay overlay-light" data-stellar-background-ratio="0.2" data-bg-img="/src/assets/images/bg/thanks.jpg">
        <div class="container pt-0 pb-0"  style="height: 595px; overflow: hidden;">
          <div class="row equal-height">
            <div class="col-md-7 bg-light-transparent">
              <div class="pt-50 pb-50 pl-20 pr-20">
                <h4 class="text-uppercase line-bottom mt-0" v-lang.our_followers_say>Our Followers Say</h4>
                <div class="testimonial-carousel owl-nav-top">
                  <testimonial v-for="testimonial in publicData.testimonials" :key="testimonial.id" :testimonial="testimonial"></testimonial>
                </div>
              </div>
            </div>
            <div class="col-md-5 pl-20 bg-light-transparent wow fadeInRight animation-delay6" style="border-left: 1px solid #ddd;">
              <h4 class="text-uppercase line-bottom mt-0" v-lang.our_values>Our Values</h4>
              <div class="bxslider bx-nav-top">
                <scripture v-for="scripture in publicData.scriptures" :key="scripture.id" :scripture="scripture"></scripture>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: News -->
      <section v-if="publicData.blogs && publicData.blogs.length > 0">
        <div class="container pt-70">
          <div class="section-title text-center">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <h3 class="text-uppercase mt-0" v-lang.recent_news>Recent News</h3>
                <div class="title-icon">
                  <i class="flaticon-charity-hand-holding-a-heart"></i>
                </div>
                <p> <span v-lang.blog_subscribe_msg>See our latest blog post. To be updated with our lastest news, events, and promotions</span><br> <a href="#footer-mailchimp-subscription-form" v-lang.subscribe_to_our_newsletter>subscribe to our newsletter</a></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="news-carousel owl-nav-top mb-sm-80" data-dots="true">
                <blog-thumbnail v-for="blog in publicData.blogs" :key="blog.id" :blog="blog" :user="user"></blog-thumbnail>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- end main-content -->
  </div>
  <!-- end wrapper -->
</div>
</template>
<script>
import Slideshow from '../components/app/Slideshow.vue'
import Campaign from '../components/dynamic/Campaign.vue'
import GalleryThumbnail from '../components/dynamic/gallery/Thumbnail.vue'
import Testimonial from '../components/dynamic/Testimonial.vue'
import Scripture from '../components/dynamic/Scripture.vue'
import BlogThumbnail from '../components/dynamic/blog/Thumbnail.vue'
import CampaignTypes from '../components/CampaignTypes.vue'
export default {
  name: "landing",
  components: {
    'slideshow': Slideshow,
    'campaign': Campaign,
    'gallery-thumbnail': GalleryThumbnail,
    'testimonial': Testimonial,
    'scripture': Scripture,
    'blog-thumbnail': BlogThumbnail,
    'campaign-types': CampaignTypes
  },
  props: ['publicData', 'user'],
  data() {
    return {
      campaigns: [],
    }
  },
  methods: {

  },
  created(){
    this.$http.get('api/campaigns')
              .then(response => {
                // alert('created')
                this.campaigns = response.body

                for (var c in this.campaigns) {
                  //get the sum of all donations
                  var raised = 0
                  for (var i in this.campaigns[c].donations) {
                    raised += parseInt(this.campaigns[c].donations[i].amount)
                  }
                  this.campaigns[c].raised = raised

                  //calculate the percentage raised
                  var percent = (parseInt(this.campaigns[c].raised) / parseInt(this.campaigns[c].goal)) * 100;
                  if (percent > 100) {
                    percent = 100;
                  }else if(percent > 0 && percent < 1){
                    percent = 1;
                  }
                  this.campaigns[c].percent = Math.round(percent * 100) / 100;

                }
              })
  },
  watch:{
    publicData: function (val) {
      setTimeout(function () {
        window.THEMEMASCOT.slider.init();
        window.THEMEMASCOT.widget.init();
        window.THEMEMASCOT.initialize.init()
      }, 0)

    }
  },
  mounted() {
    window.THEMEMASCOT.slider.init();
    window.THEMEMASCOT.widget.init();
    window.THEMEMASCOT.initialize.init()
    //  Slider Revolution Ends
    $(document).ready(function(e) {
      $(".rev_slider").revolution({
        sliderType: "standard",
        sliderLayout: "auto",
        dottedOverlay: "none",
        delay: 5000,
        navigation: {
          keyboardNavigation: "off",
          keyboard_direction: "horizontal",
          mouseScrollNavigation: "off",
          onHoverStop: "off",
          touch: {
            touchenabled: "on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          },
          arrows: {
            style: "gyges",
            enable: true,
            hide_onmobile: false,
            hide_onleave: true,
            hide_delay: 200,
            hide_delay_mobile: 1200,
            tmp: '',
            left: {
              h_align: "left",
              v_align: "center",
              h_offset: 0,
              v_offset: 0
            },
            right: {
              h_align: "right",
              v_align: "center",
              h_offset: 0,
              v_offset: 0
            }
          },
          bullets: {
            enable: true,
            hide_onmobile: true,
            hide_under: 960,
            style: "zeus",
            hide_onleave: false,
            direction: "horizontal",
            h_align: "right",
            v_align: "bottom",
            h_offset: 80,
            v_offset: 50,
            space: 5,
            tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
          }
        },
        responsiveLevels: [1240, 1024, 778, 480],
        visibilityLevels: [1240, 1024, 778, 480],
        gridwidth: [1170, 1024, 778, 480],
        gridheight: [550, 768, 960, 720],
        lazyType: "none",
        parallax: {
          origo: "slidercenter",
          speed: 1000,
          levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 100, 55],
          type: "scroll"
        },
        shadow: 0,
        spinner: "off",
        stopLoop: "on",
        stopAfterLoops: 0,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "off",
        fullScreenAutoWidth: "off",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: "0",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        debugMode: false,
        fallbacks: {
          simplifyAll: "off",
          nextSlideOnWindowFocus: "off",
          disableFocusListener: false,
        }
      });
    });
    //  Slider Revolution Ends

  }
}
</script>
<style lang="css">
.gallery-isotope.grid-5 .gallery-item {
    float: left;
}
</style>
