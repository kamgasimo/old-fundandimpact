<template>
<div id="fundraiser-step1">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-white font-26"><span v-lang.setting_up_your_campaign>Setting Up your campaign</span>: <br><span class="coth text-info">"</span>
              <a v-if="campaign" :href="campaign.link" target="_blank" class="campaign-name text-theme-colored">{{campaign.title}}</a>
              <a v-if="!campaign.title" href="#" class="campaign-name text-theme-colored"><i class="fa fa-spinner fa-spin font-18"></i></a>
              <span class="coth text-info">"</span></h2>

            <div v-if="campaign.link_id" class="text-center">
              <span class="text-danger"><span v-lang.changed_your_mind>Changed your mind?</span> </span><a @click="deleteCampaign(campaign.link_id)" type="button" class="btn btn-danger btn-sm" v-lang.delete_campaign>Delete Campaign</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="video-link-preview" class="modal-promo-box mfp-hide bg-lightest">
    <h3 class="mt-0" v-lang.youtube_video_preview>Youtube Video Preview</h3>
    <h5 v-lang.about_to_add_video_msg>You are about to add the following video to your Campaign.</h5>
    <iframe :src="this.linking.youtube" width="100%" height="315px" frameborder="0" allowfullscreen></iframe>
    <button @click="addEmbeddedVideo()" class="btn next2">
      <i v-if="!loading.addingYoutube" class="fa fa-plus-circle"></i>
      <i v-if="loading.addingYoutube" class="fa fa-spinner fa-spin"></i>
      <span v-lang.add_this_video_to_campaign>Add this video to campaign</span>.
    </button>
  </section>
  <div id="content-container" class="setup lbn pt-30">
    <div id="transition-in">
      <div class="col-sm-6 col-sm-offset-3 p-0 twothirds-box">
        <div class="one arw" v-lang.add_a_photo_or_video>
          Add a photo or video
        </div>
        <div class="two two--gray no-hpadding two--height pt0 ">
          <a id="linkphotos" href="#photo-link-modal" class="upotns ml-30 mr-20  popup-with-form">
            <span class="optimg fa fa-link text-primary" style="font-size:55px; padding-top: 7px;"></span>
            <span v-lang.photo_from_link>Photo from Link</span>
          </a>
          <div id="photo-link-modal" class="modal-promo-box mfp-hide bg-lightest">
              <h3 class="mt-0" v-lang.photo_from_link>Photo From Link</h3>
              <h5 v-lang.photo_from_link_msg>Please enter a valid link to your photo and click on Add Photo</h5>
              <div class="input-group">
                <input  v-model="linking.photo" type="text" data-height="40px" class="form-control input-lg" placeholder="Your Photo Link"value="" style="height: 40px;">
                <span class="input-group-btn">
                    <button @click="getPhoto()" class="btn btn-colored font-18 btn-theme-colored btn-xs m-0" data-height="40px" style="height: 40px;">
                      <i v-if="!loading.photoLink" class="fa fa-plus-circle"></i>
                      <i v-if="loading.photoLink" class="fa fa-spinner fa-spin"></i>
                      <span v-lang.add_photo>Add Photo</span>
                    </button>
                  </span>
              </div>
          </div>
          <a id="get-photo-editor" class="upotns ajaxload-popup" href="/src/components/lightbox/photo-editor/">
           <span class="optimg up"></span>
           <span v-lang.upload_photo>Upload Photo</span>
          </a>
          <a class="upotns remote-request ml-20 popup-with-form" href="#video-link-modal">
            <span class="optimg yt"></span>
            <span v-lang.youtube_video_link>YouTube video link</span>
          </a>
          <div id="video-link-modal" class="modal-promo-box mfp-hide bg-lightest">
              <h3 class="mt-0" v-lang.youtube_video_link>Youtube Video Link</h3>
              <h5 v-lang.youtube_video_link_msg>Please paste your youtube video link below and click on Add Video.</h5>
              <div class="input-group">
                <input v-model="linking.youtube" type="text" data-height="40px" class="form-control input-lg" placeholder="Your Youtube Video Link" value="" style="height: 40px;">
                <span class="input-group-btn">
                    <button @click="getVideo()" class="btn btn-colored btn-theme-colored font-18 btn-xs m-0" data-height="40px" style="height: 40px;">
                      <i v-if="!loading.youtube" class="fa fa-plus-circle"></i>
                      <i v-if="loading.youtube"class="fa fa-spinner fa-spin"></i>
                      <span v-lang.add_video>Add Video</span>
                    </button>
                  </span>
              </div>
          </div>
          <div class="clear"></div>
          <div class="info-photo mr-30 ml-30 mb-30" v-lang.great_campaign_photo_msg>
            Great photos will help your campaign raise more money. A photo or video is required. </div>
        </div>
        <div class="three pt-30 mb-30">
          <div class="lb1 hide-on-load">
            <div class="lb2">
              <a @click="instruct()" class="btn next2" v-lang.save_and_continue>Save and Continue</a>
            </div>
          </div>

          <div class="loading3 show-on-load" style="display:none;">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import swal from 'sweetalert'
export default {
  name: "fundraiser-step1",
  components: {

  },
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {
      upload: {
        url: '/api/campaign/upload/picture',
      },
      loading: {
        youtube: false,
        photoLink: false,
        addingYoutube: false,
        addingPhoto: false
      },
      linking: {
        youtube: '',
        photo: ''
      }
    }
  },
  methods: {
    instruct(){
      swal("Add a Photo or Video to Proceed", "Use of the above options to add Photo or Video to your campaign", "info")
    },
    getPhoto(){
      if (this.linking.photo) {
        this.loading.photoLink = true
        // $('.mfp-close').hide()
        var that = this
        $('.mfp-close').on('click', function () {
          that.loading.photoLink = false
        })

        window.PhotoEditor.imageSrc = this.linking.photo
        setTimeout(function () {
          $('.mfp-close').click()
          $('#get-photo-editor').click()
        },0)
      }
    },
    getVideo(){
      if (this.linking.youtube) {
        var vid = this.$app.gup('v', this.linking.youtube)
        if (vid) {
          var embedLink = 'https://www.youtube.com/embed/'+vid
          this.linking.youtube = embedLink
          this.linking.preview = 'https://img.youtube.com/vi/'+vid+'/hqdefault.jpg'
          this.loading.youtube = true
          // $('.mfp-close').hide()
          var that = this
          $('.mfp-close').on('click', function () {
            that.loading.youtube = false
          })

          $.magnificPopup.open({
            type: 'inline',

            items: {
              src: '#video-link-preview'
            },

            fixedContentPos: false,
            fixedBgPos: true,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,

            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
          });
        }else{
          swal("Link not valid.", this.linking.youtube+" doesn't have a video ID.", "error")
        }
      }
    },
    addEmbeddedVideo(){
      this.loading.addingYoutube = true
      var data = {
        url: this.linking.youtube,
        link_id: this.campaign.link_id,
        preview: this.linking.preview
      }
      if (this.linking.youtube) {
        var that = this
        this.$http.post('api/campaign/upload/video', data)
                  .then(response => {
                    this.loading.addingYoutube = false
                    console.log(response)
                    swal({
                        title: "Great Job so far!!",
                        text: 'Your Campaign video has been added',
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "rgb(255,175,0)",
                        cancelButtonColor: "rgb(255,0,0)",
                        confirmButtonText: "Next Step",
                        cancelButtonText: "Delete Campaign",
                        closeOnConfirm: false,
                        closeOnCancel: false
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          window.location = '/fundraiser/' + that.campaign.link_id + '/story'
                        } else {
                          // alert('yes')
                          that.deleteCampaign(that.campaign.link_id)
                        }
                      });
                  })
                  .catch(e => {
                    this.loading.addingYoutube = false
                    alert('upload failed. Please refresh the page and try again')
                    window.location.reload()
                  })
      }
    }
  },
  mounted() {
    window.PhotoEditor = {}
    window.PhotoEditor.showControls = true
    window.PhotoEditor.showPreview = true
    window.PhotoEditor.campaign = this.$route.params.link
    window.PhotoEditor.saveTo = this.$_connection.domain + '/api/campaign/upload/picture'
    window.PhotoEditor.redirectTo = false
    window.PhotoEditor.feedback = true

    window.THEMEMASCOT.initialize.TM_magnificPopup_lightbox();

    // window.PhotoEditor.imageSrc = '/src/components/lightbox/photo-editor/images/picture.jpg'
  }
}
</script>
<style lang="css">

</style>
