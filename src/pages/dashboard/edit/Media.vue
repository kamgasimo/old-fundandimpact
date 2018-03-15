<template>
<div id="dashboard-edit-media" class="divider">
  <div class="container container-main">
    <div class="row main-row pb-30">
      <div class="topbar"></div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd" v-lang.edit>Edit</div>
          <div class="panel-body p-0">
            <div class="widget p-10 m-0">
              <ul class="list-border list theme-colored angle-double-right">
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit'" exact v-lang.goal_and_title>Goal & Title</router-link>
                </li>
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit/media'" v-lang.photo_or_video>Photo or video</router-link>
                </li>
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit/story'" v-lang.story>Story</router-link>
                </li>
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit/setting'" v-lang.campaign_setting>Campaign Setting</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 raise-box">
        <div class="border-1px mb-10 mt-10">
          <div class="ml-0" style="">
            <div class="processheader">
              <div class="headline error_amount_label" v-lang.edit_your_photo_or_video>Edit your photo or video </div>
              <div class="donationsprite donatesprite-arrow"></div>
            </div>
          </div>
          <div class="two two--gray row ml-0" style="width:100%;overflow:hidden;">
            <div v-if="!campaign || !campaign.media" class="loading3 show-on-load">
              <div class="loader"></div>
            </div>
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
              <iframe width="100%" height="315" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          <div class="three mb-30">
            <div class="lb1 hide-on-load">
              <div class="lb2">
                <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="">
                  <a class="btn next2 popup-with-form media-container-popup" href="#media-options-modal" v-lang.change_photo_or_replace_with_video>Change Photo or replace with Video</a>
                  <!-- <a class="btn next2" @click="editPhoto()"><i class="fa fa-pencil font-18 text-info"></i> Edit Photo</a> -->
                </div>
                <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="">
                  <a class="btn next2 popup-with-form media-container-popup" href="#media-options-modal" v-lang.change_video_or_replace_with_photo>Change Video or replace with Photo</a>
                </div>
                <div id="media-options-modal" class="modal-promo-box mfp-hide bg-lightest">
                  <a id="linkphotos" href="#photo-link-modal" class="upotns ml-30 mr-20 font-18  popup-with-form" style="text-align: center;">
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
                  <a id="get-photo-editor" @click="uploadPhoto" class="upotns font-18 ajaxload-popup" href="/src/components/lightbox/photo-editor/" style="text-align: center;">
                   <span class="optimg up"></span>
                   <span v-lang.upload_photo>Upload Photo</span>
                  </a>
                  <a class="upotns remote-request ml-20 font-18 popup-with-form" href="#video-link-modal" style="text-align: center;">
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
                  <section id="video-link-preview" class="modal-promo-box mfp-hide bg-lightest">
                    <h3 class="mt-0" v-lang.youtube_video_preview>Youtube Video Preview</h3>
                    <h5 v-lang.about_to_add_video_msg>You are about to add the following video to your Campaign.</h5>
                    <iframe :src="this.linking.youtube" width="100%" height="315px" frameborder="0" allowfullscreen></iframe>
                    <button @click="addEmbeddedVideo()" class="btn next2">
                      <i v-if="!loading.addingYoutube" class="fa fa-plus-circle"></i>
                      <i v-if="loading.addingYoutube" class="fa fa-spinner fa-spin"></i>
                      <span v-lang.add_this_video_to_campaign>Add this video to campaign.</span>
                    </button>
                  </section>
                  <div class="clear"></div>
                  <div class="info-photo mr-30 ml-30 mb-30" v-lang.great_campaign_photo_msg>
                    Great photos will help your campaign raise more money. A photo or video is required. </div>
                </div>
              </div>
            </div>

            <div class="loading3 show-on-load" style="display:none;">
              <div class="loader"></div>
            </div>

            <a href="./.." class="rtlnk" v-lang.cancel>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-edit-media",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {},
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
        photo: '',
        preview: ''
      }
    }
  },
  watch: {

  },
  methods: {
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
    uploadPhoto(e){
      e.preventDefault()
      setTimeout(function () {
        $('.mfp-close').click()
        $('#get-photo-editor').click()
      },0)
    },
    editPhoto(){
      var that = this
      setTimeout(function () {
        window.PhotoEditor.imageSrc = that.campaign.media[0].url
        $('#get-photo-editor').click()
      },0)
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
                        title: "Great Job!!",
                        text: 'Your Campaign video has been added',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "rgb(255,175,0)",
                        confirmButtonText: "OK",
                        closeOnConfirm: false,
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          window.location.reload()
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
    window.PhotoEditor.feedback = false
    window.THEMEMASCOT.initialize.TM_magnificPopup_lightbox();
    var that = this
    var initPopUp = setInterval(function () {
      if (that.campaign && that.campaign.media) {
        $('.media-container-popup').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#name',
            closeOnBgClick: false,
            mainClass: 'mfp-no-margins mfp-fade',
            closeBtnInside: false,
            fixedContentPos: true,

            // When elemened is focused, some mobile browsers in some cases zoom in
            // It looks not nice, so we disable it:
            callbacks: {
              beforeOpen: function() {
                if($(window).width() < 700) {
                  this.st.focus = false;
                } else {
                  this.st.focus = '#name';
                }
              }
            }
        });
        clearInterval(initPopUp);
      }
    }, 100)
  }
}
</script>
<style lang="css">
#dashboard-edit-media .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-edit-media .col-md-8{
  background: transparent !important;
}
#dashboard-edit-media .twothirds-box {
  width: 100%;
}

#dashboard-edit-media .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-edit-media .list-border a.active{
  color: black !important;
}

</style>
