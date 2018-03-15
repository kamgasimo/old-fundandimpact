<template>
<div id="profile">
  <!-- Media modal -->
  <div id="media-options-modal" class="modal-promo-box mfp-hide bg-lightest">
    <a id="linkphotos" href="#photo-link-modal" class="upotns ml-50 mr-20 font-18  popup-with-form" style="text-align: center;">
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
  </div>
  <div class=" container">
    <div class="large-centered">
      <div class="card hovercard">
        <div class="card-background">
          <img class="card-bkimg" alt="" :src="(user.media && user.media[0] && user.media[0].url != '/src/assets/images/img-default.jpg') ? user.media[0].url : '/src/assets/images/wallpapers/orange.jpeg'">
        </div>
        <div class="useravatar">
          <img v-if="user.media && user.media[0] && user.media[0].url"alt="" :src="user.media[0].url">
          <span v-if="user.subnames && user.media && user.media[0] && !user.media[0].url" class="no-img">
            {{user.subnames[0].substr(0,1)}} {{user.subnames[1].substr(0,1)}}
          </span>
          <i class="fa fa-camera overlay media-container-popup" href="#media-options-modal" data-toggle="modal" data-target=".bs-photo-modal-md"></i>
        </div>
        <div class="card-info">
          <span class="card-title">{{user.name}}</span>
        </div>
      </div>
      <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
        <div class="btn-group" role="group">
          <button type="button" id="activities" class="btn btn-primary" href="#tab1" data-toggle="tab"><span class="fa fa-newspaper-o" aria-hidden="true"></span>
              <div class="hidden-xs" v-lang.your_activities>Your Activities</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="favorites" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
              <div class="hidden-xs" v-lang.favourite_campaigns>Favorite Campaigns</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="about" class="btn btn-default" href="#tab3" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
              <div class="hidden-xs" v-lang.about_me>About Me</div>
          </button>
        </div>
      </div>

      <div class="well">
        <div class="tab-content">
          <div class="tab-pane fade in active" id="tab1">
            <section v-if="user.activities && user.activities.length >= 1"id="cd-timeline" class="cd-container">
              <div v-for="activity in user.activities" :key="activity.id" class="cd-timeline-block">
                <div class="cd-timeline-img cd-picture">
                  <img :src="(activity.actor) ? activity.actor.media[0].url : '/src/assets/images/img-default.jpg'" alt="Picture">
                </div>
                <!-- cd-timeline-img -->

                <div class="cd-timeline-content activities" id="activities">
                  <div class="unit" style="position: static;">

                    <a aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" href="javascript:void(0)" class="font-25 pull-right dropdown-toggle" >
                      <i class="pe-7s-angle-down"></i>
                    </a>
                    <ul class="mt-30 dropdown-menu" style="width: 100px; background: #fff;top:0; right:0; float: right; left: unset;">
                      <li class="p-0" style="border-bottom: 1px solid #ddd;">
                        <a @click="deleteActivity(activity)" href="javascript:" class="text-warning">
                          <i class="fa fa-remove"></i> <span v-lang.delete>Delete</span>
                        </a>
                      </li>
                      <li v-if="activity.reference" class="p-0" >
                        <router-link :to="activity.reference" class="text-info">
                          <i class="fa fa-eye"></i> <span v-lang.view>view</span>
                        </router-link>
                      </li>
                    </ul>
                    <div class="field title" v-html="activity.msg">

                    </div>
                  </div>
                  <span class="cd-date">{{activity.created_at | timeago}}</span>
                </div>
                <!-- cd-timeline-content -->
              </div>
              <!-- cd-timeline-block -->
            </section>
            <section v-else>
              <div class="white-box-large-only container">
                <h1 class="text-center" v-lang.no_activity>No Activity</h1>
                <div class="row col-sm-6 large-centered">
                  <div class="no-help">
                    <div class="row">
                      <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered" v-lang.you_dont_have_any_activity_yet>You don't have any activity yet.</div>
                    </div>
                    <div class="row">
                      <div class="column small-12 large-10 large-centered">
                        <div class="column mb-20 text-center small-centered medium-8 large-12">
                          <router-link class="button expanded primary large" to="/fundraiser" v-lang.start_a_campaign>Start a Campaign</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="tab-pane fade in container" id="tab2">
            <div class="row">
                <div class="col-sm-12 col-md-11">
                  <div v-for="campaign in user.favourites" :key="campaign.id" class="upcoming-events box-hover-effect effect1 media maxwidth400 bg-light mb-20">
                    <div class="row equal-height">
                      <div class="col-sm-4 pr-0 pr-sm-15">
                        <div class="thumb p-15">
                          <!-- <img class="img-fullwidth" :src="campaign.media.url" alt="..."> -->
                          <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
                          <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
                            <iframe width="100%" height="200px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 border-right pl-0 pl-sm-15">
                        <div class="event-details p-15 mt-20">
                          <h4 class="media-heading text-uppercase font-weight-500 font-15 text-theme-colored">{{campaign.title}}</h4>
                          <p>{{campaign.intro}}</p>
                          <a href="javascript:void(0)" class="text-info"><span v-lang.details>Details</span> <i class="fa fa-angle-double-right"></i></a>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="event-count causes p-15 mt-15">
                          <div class="progress-item mt-20 mb-40">
                            <div class="progress mb-30">
                              <div class="progress-bar" :data-percent="campaign.percent"></div>
                            </div>
                          </div>
                          <ul class="list-inline clearfix">
                            <li class="pull-left pr-0"><span v-lang.raised>Raised</span>: ${{campaign.raised}}</li>
                            <li class="text-theme-colored pull-right pr-0"><span v-lang.goal>Goal</span>: ${{campaign.goal}}</li>
                          </ul>
                          <div class="mt-10">
                            <ul class="list-inline mt-15">
                              <li class="pr-0" v-if="campaign.donations"><i class="fa fa-heart-o text-theme-colored"></i> {{campaign.donations.length}} <span v-lang.donors>Donors</span></li>
                            </ul>
                            <div class="btn-group mt-12">

                                <router-link :to="campaign.link" class="text-white btn btn-info"><i class="fa fa-eye"></i> <span v-lang.view>View</span></router-link>

                              <button @click="unsetFavourite(campaign)" type="button" class="btn btn-danger" name="button">
                                <a class="text-white"><i class="fa fa-remove"></i> <span v-lang.remove>Remove</span></a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="user.favourites && user.favourites.length < 1" class="no-campaign">
                    <div class="white-box-large-only container">
                      <div class="row col-sm-6 large-centered">
                        <div class="row pt-50 pb-50">
                          <div class="fs-25 text-center text-warning mb-20 column small-12 large-10 large-centered" v-lang.you_havent_yet_added_a_campaign_to_your_favourites>You haven't yet added a Campaign to your favourites.</div>
                        </div>
                        <div class="row">
                          <div class="column small-12 large-10 large-centered">
                            <div class="column mb-20 text-center small-centered medium-8 large-12">
                              <router-link class="button expanded primary large" to="/fundraiser" v-lang.start_a_campaign>Start a Campaign</router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="tab-pane fade in" id="tab3">
            <div class="white-box-large-only container">
              <div class="one arw mt-30" v-lang.your_story>
                Your story
              </div>
              <div v-show="user.story && !backupStory" class="large-centered">
                <div class="" v-html="user.story">

                </div>
                <div class="lb1 hide-on-load mb-50">
                  <div class="lb2">
                    <a @click="editStory()" href="javascript:void(0)" class="btn form-submit next2"><i class="fa fa-pencil"></i> <span v-lang.edit_story>Edit Story</span></a>
                  </div>
                </div>
              </div>
              <div v-show="backupStory || !user.story" class="large-centered">
                <div id="summernote"></div>
                <div class="three mb-30">
                  <div v-if="!loading.addingStory" class="lb1 hide-on-load">
                    <div class="lb2">
                      <a @click="addStory()" href="javascript:void(0)" class="btn form-submit next2" v-lang.save_story>Save Story</a>
                    </div>
                  </div>
                  <div v-if="loading.addingStory" class="loading3 show-on-load">
                    <div class="loader"></div>
                  </div>
                  <div v-if="!loading.addingStory && backupStory">
                    <div class="clear"></div>
                    <a class="rtlnk" data-target="#customize-details-link" href="profile" v-lang.cancel>Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

</div>
</template>
<script>
export default {
  name: "profile",
  props: ['campaign', 'user', 'deleteCampaign', 'setFavourite', 'unsetFavourite'],
  components: {

  },
  data: function data() {
    return {
      loading: {
        photoLink: false,
        addingPhoto: false,
        addingStory: false,
      },
      linking: {
        photo: ''
      },
      backupStory: null
    }
  },
  methods: {
    deleteActivity(activity){
      var that = this
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this activity!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            that.$http.delete('api/activity/'+activity.id)
              .then(response => {
                swal({
                    title: "Deleted!",
                    text: "Your activity has been deleted.",
                    type: "success",
                    closeOnConfirm: true,
                  },
                  function(isConfirm) {
                    var index = that.user.activities.indexOf(activity);
                    that.user.activities.splice(index, 1)
                  }
                );
              })
              .catch(e => {
                console.log(e);
                if (e.status === 404) {
                  swal({
                      title: "Deleted!",
                      text: "Your activity has been deleted.",
                      type: "success",
                      closeOnConfirm: true,
                    },
                    function(isConfirm) {
                      var index = that.user.activities.indexOf(activity);
                      that.user.activities.splice(index, 1)
                    }
                  );
                }
              })
            } else {
              swal({
                  title: "Cancelled!",
                  text: "Your activity is safe :)",
                  type: "error",
                  closeOnConfirm: true,
                }
              );
            }
        })
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
        window.PhotoEditor.imageSrc = that.user.media[0].url
        $('#get-photo-editor').click()
      },0)
    },
    addStory() {
      var story = $('#summernote').summernote('code');
      if ($('#summernote').summernote('isEmpty')) {
          swal("Story Not Provided!", "Please add you story.", "warning")
      }else{
        if ($(".note-editable").text().length < 600) {
          swal("Text too short!", "Your story should of atleast 600 characters long.", "warning")
        }else{
          this.loading.addingStory = true
          var sanitizeHtml = require('sanitize-html');
          // alert(story);
          var options = {
            allowedTags: [ 'h1', 'h2', 'img', 'video', 'table', 'iframe', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ],
            allowedAttributes: false,
            allowedSchemes: [ 'data', 'http', 'https', 'ftp', 'mailto' ],
          };
          var clean = sanitizeHtml(story, options);
          if (clean == this.user.story) {
            swal("Nothing Changed!", "Can't update your Story, you haven't made any change.", "warning")
            this.loading.addingStory = false
            return false
          }
          var data = {
            story: clean
          }
          var that = this;
          this.$http.put('api/user/story', data)
                    .then(response => {
                      that.loading.addingStory = false;

                      swal({
                          title: "Great Job!!",
                          text: 'Your Story was updated successfully',
                          type: "success",
                          confirmButtonColor: "rgb(255,175,0)",
                          confirmButtonText: "Ok",
                          closeOnConfirm: true,
                        },
                        function(isConfirm) {
                          if (isConfirm) {
                            that.loading.addingStory = false
                            that.user.story = response.body.data
                            that.backupStory = null
                          }
                        });
                    })
                    .catch(e => {
                      that.loading.addingStory = false
                      swal({
                          title: "Ooup!! Something went wrong. ",
                          text: 'We could not add your Story',
                          type: "error",
                          showCancelButton: true,
                          confirmButtonColor: "rgb(255,175,0)",
                          closeOnConfirm: true
                        });
                    })
          // this.loading = false
        }
      }
    },
    editStory(){
      this.backupStory = this.user.story
      // this.user.story = null
      var that = this
      setTimeout(function () {
        $('#summernote').summernote({
          height: 300, // set editor height
          minHeight: null, // set minimum height of editor
          maxHeight: null, // set maximum height of editor
          focus: true // set focus to editable area after initializing summernote
        });
        $('#summernote').summernote('code', that.backupStory)
      }, 0)
    }
  },
  updated(){
    $('#summernote').summernote({
      height: 300, // set editor height
      minHeight: null, // set minimum height of editor
      maxHeight: null, // set maximum height of editor
      focus: true // set focus to editable area after initializing summernote
    });
  },
  watch: {
    campaign: function (val) {
      var that = this
      setTimeout(function () {
          $('#summernote').summernote({
            height: 300, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
            focus: true // set focus to editable area after initializing summernote
          });

      }, 0)
    },
    user: function (val) {
      document.title = this.user.name+' | FundAndImpact'
    }
  },
  mounted: function mounted() {
    // this.$http.get('api/favourites')
    //           .then(response => {
    //             this.favourites = response.body
    //             console.log(response)
    //           })

    //do something after mounting vue instance
    $(document).ready(function() {
      $(".btn-pref .btn").click(function() {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this).removeClass("btn-default").addClass("btn-primary");
      });
      $("#profile .card.hovercard .useravatar").on("mouseover", function() {
        $("#profile .card.hovercard .useravatar i.overlay").css({
          display: 'block'
        });
      });
      $("#profile .card.hovercard .useravatar").on("mouseleave", function() {
        $("#profile .card.hovercard .useravatar i.overlay").css({
          display: 'none'
        });
      });
    });
    setTimeout(function () {
        $('#summernote').summernote({
          height: 300, // set editor height
          minHeight: null, // set minimum height of editor
          maxHeight: null, // set maximum height of editor
          focus: true // set focus to editable area after initializing summernote
        });

    }, 0)

    window.PhotoEditor = {}
    window.PhotoEditor.showControls = true
    window.PhotoEditor.showPreview = true
    window.PhotoEditor.user = true
    window.PhotoEditor.saveTo = this.$_connection.domain + '/api/user/upload/picture'
    window.PhotoEditor.redirectTo = false
    window.PhotoEditor.feedback = true
    window.PhotoEditor.options = {}
    window.PhotoEditor.options.aspectRatio = 1 / 1
    window.THEMEMASCOT.initialize.TM_magnificPopup_lightbox();
    var that = this
    var initPopUp = setInterval(function () {
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
    }, 100)

  }
}
</script>
<style lang="css">
/* USER PROFILE PAGE */
 #profile .card {
    margin-top: 20px;
    padding: 30px;
    background-color: rgba(214, 224, 226, 0.2);
    -webkit-border-top-left-radius:5px;
    -moz-border-top-left-radius:5px;
    border-top-left-radius:5px;
    -webkit-border-top-right-radius:5px;
    -moz-border-top-right-radius:5px;
    border-top-right-radius:5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 0px;
}
.modal-promo-box{
  min-height: 400px !important;
}
#profile .well {
   -webkit-border-top-left-radius:0px;
   -moz-border-top-left-radius:0px;
   border-top-left-radius:0px;
   -webkit-border-top-right-radius:0px;
   -moz-border-top-right-radius:0px;
   border-top-right-radius:0px;
}
#profile .card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 1);
}
#profile .card.hovercard .card-background {
    height: 130px;
}
#profile .card-background img{
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -o-filter: blur(25px);
    -ms-filter: blur(25px);
    filter: blur(25px);
    margin-left: -100px;
    margin-top: -200px;
    min-width: 130%;
}
#profile .card.hovercard .useravatar {
    position: absolute;
    top: 35px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    right: 0;
    width: 130px;
    height: 130px;
    max-width: 130px;
    max-height: 130px;
    /*overflow: hidden;*/
}
#profile .card.hovercard .useravatar img, #profile .card.hovercard .useravatar span.no-img{
    width: 100%;
    height: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, 0.5);
    /*position: relative;*/
}
#profile .card.hovercard .useravatar img{
  /*margin-top: -45px;*/
}
#profile .card.hovercard .useravatar span.no-img{
    padding: 45px;
    font-size: 25px;
    font-weight: 600;
    position: relative;
    top: 45px;
}
#profile .card.hovercard .useravatar .overlay{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  font-size: 25px;
  font-weight: 600;
  width: 100%;
  height: 100%;
  padding: 48px;
  background: rgba(225,175,0,.5);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  color: white;
  display: none;
}
#profile .card.hovercard .card-info {
    position: absolute;
    bottom: 14px;
    left: 0;
    right: 0;
}
#profile .card.hovercard .card-info .card-title {
    padding:0 5px;
    font-size: 20px;
    line-height: 1;
    color: #262626;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
#profile .card.hovercard .card-info {
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    text-overflow: ellipsis;
}
#profile .card.hovercard .bottom {
    padding: 0 20px;
    margin-bottom: 17px;
}
#profile .btn-pref .btn {
    -webkit-border-radius:0 !important;
}
#profile .btn-primary{
  background: rgb(255, 175, 0);
  border-color: rgb(255, 175, 0);
}
#profile .bg-light {
  background-color: #fff !important;
}
#profile .activities {
    max-height: 1208px;
    position: relative;
    padding-bottom: 50px;
}
#profile .decor-default {
    background-color: #ffffff !important;
}
#profile div[class*='col-'] > .col-inside-lg {
    padding: 20px;
}

#profile .activities .unit {
    /*min-height: 80px;*/
    position: relative;
    overflow: hidden;
}

#profile .activities .unit .field {
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
}

#profile .activities .unit .field a {
    font-weight: bold;
    color: #333333;
}

#profile .activities .unit .field.btn-group-xs {
    padding: 20px 0 0;
}
#profile .activities .unit .field {
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
}
#profile .f-l {
    float: left;
}
#profile .cd-timeline-block img{
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  top: 0;
  vertical-align: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  margin: 0px;
}
#profile .cd-timeline-block{
  padding: 0px;
  position: relative;
}
</style>
