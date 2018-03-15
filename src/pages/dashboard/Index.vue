<template>
<div id="dashboard-index" class="divider">
  <div class="container container-main">
    <div class="row main-row pb-30">
      <div class="topbar"></div>
      <div class="col-md-8">
        <form method="post">
          <div class="twothirds-box extra-shadow pb-30">
            <div id="update_title" class="one arw" data-txt="Hi Kamga, post an update"><span v-lang.hi>Hi</span> {{user.shortname}}, <span v-lang.post_an_update>post an update</span></div>

            <!-- <div id="error_title" class="one arw" data-txt="Please enter your update" style="display: none;">Hi Kamga, post an update</div> -->
            <div class="form-group p-20">
              <label for="form_title"><span v-lang.update_title>Update Title</span><small>*</small></label>
              <!-- <input id="form_title" v-model="campaign.title" name="form_title" type="text" placeholder="Example: My College Tuition Fund" required="" class="form-control" aria-required="true"> -->
              <p :class="{ 'control': true }">
                  <input v-model="update.title" v-validate="'required'"  maxlength="55" :class="{'input form-control': true, 'is-danger': errors.has('title') }" name="title" type="text" placeholder="Example: Her first treatment was awesome.">
                  <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
              </p>
              <input-counter v-bind:input.sync="update.title" v-bind:limit="55"></input-counter>
            </div>
            <label for="summernote" class="font-17 ml-20" v-lang.whats_up>What's Up?</label>
            <div id="summernote"></div>

            <div class="clear"></div>

            <div class="three no-border pt-30">
              <div v-if="!loading" class="lb1">
                <div class="lb2">
                  <a @click="postUpdate()" id="post_update" href="javascipt:" class="btn btn_check next2" v-lang.post_my_update>Post My Update</a>
                </div>
              </div>
              <div v-if="loading" class="loading3 show-on-load">
                <div class="loader"></div>
              </div>
            </div>

            <div class="clear"></div>
          </div>
          <!-- end update -->

        </form>
      </div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd">{{campaign.title}}</div>
          <div class="panel-body p-0">
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
              <iframe width="100%" height="auto" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="widget p-0 m-0">
              <div class="call-to-action border-1px bg-lighter">
                <h2 class="goal">
                  <strong>${{campaign.raised}}</strong>
                  <small class="smaller"><span v-lang.of>of</span> ${{campaign.goal}} <span v-lang.goal>goal</span></small>
                </h2>
                <div class="progress-item mt-30">
                  <div class="progress mb-0">
                    <div :data-percent="campaign.percent" class="progress-bar appeared" :style="'width: '+campaign.percent+'%;'"><span class="percent">{{campaign.percent}}%</span></div>
                  </div>
                </div>
                <div v-if="campaign.donations" class="mt-10 campaign-status text-small">
                  <span v-lang.number_of_donations>Number of Donations</span>: <span>{{campaign.donations.length}}</span><br> <span v-lang.created>Created</span>: {{campaign.created_at | timeago}}
                </div>
                <div class="section-title mt-20">
                  <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                      <div class="text-center">
                        <h5 class="sub-title both-side-line" v-lang.share_on_social_networks>Share on social networks</h5>
                      </div>
                    </div>
                  </div>
                  <hr style="opacity: 0;">
                  <share-on-social :url="$app.url+campaign.link"></share-on-social>
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
import ShareOnSocial from '../../components/dynamic/ShareOnSocial.vue'
export default {
  name: "dashboard-index",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {
    'share-on-social': ShareOnSocial
  },
  data: function data() {
    return {
      update: {
        title: ''
      },
      loading: false
    }
  },
  methods: {
    postUpdate() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var update = $('#summernote').summernote('code');
          // var update = localStorage.getItem('clean');
          if ($('#summernote').summernote('isEmpty')) {
              swal("Update Not Provided!", "Please write something before trying to post.", "warning")
          }else{
            if ($(".note-editable").text().length < 300) {
              swal("Text too short!", "Your update should be atleast 300 characters long.", "warning")
            }else{
              this.loading = true
              var sanitizeHtml = require('sanitize-html');
              // alert(update);
              var options = {
                allowedTags: [ 'h1', 'h2', 'img', 'video', 'table', 'iframe', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
                'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ],
                allowedAttributes: false,
                allowedSchemes: [ 'data', 'http', 'https', 'ftp', 'mailto' ],
              };
              var clean = sanitizeHtml(update, options);
              // alert(clean);
              // $('#summernote').summernote('code', clean);
              var data = {
                title: this.update.title,
                update: clean,
                link_id: this.campaign.link_id
              }
              // localStorage.setItem('clean', clean);
              this.$http.put('api/campaign/update', data)
                        .then(response => {
                          this.loading = false;
                          var that = this;
                          swal({
                              title: "Great Job!!",
                              text: 'You posted an update',
                              type: "success",
                              showCancelButton: false,
                              confirmButtonColor: "rgb(255,175,0)",
                              cancelButtonColor: "rgb(255,0,0)",
                              confirmButtonText: "ok",
                              closeOnConfirm: false,
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                window.location = '/dashboard/'+that.campaign.link_id+'/review/updates'
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          var that = this
                          swal({
                              title: "Ooup!! Something went wrong. ",
                              text: 'We could not add your update to your Campaign',
                              type: "error",
                              showCancelButton: true,
                              confirmButtonColor: "rgb(255,175,0)",
                              confirmButtonText: "Retry",
                              closeOnConfirm: false
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                that.postUpdate()
                              }
                            });
                        })
              // this.loading = false
            }
          }
        }else{
          $('body').scrollTop(0)
        }
      })
    }
  },
  watch: {
    campaign: function (val) {
      setTimeout(function () {
        // if (!$('#summernote').summernote('code')) {
          $('#summernote').summernote({
            height: 300, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
            focus: true // set focus to editable area after initializing summernote
          });
        // }
      }, 0)
    }
  },
  mounted() {
    // if (!$('#summernote').summernote('code')) {
      $('#summernote').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
      });
    // }
  }
}
</script>
<style lang="css">
#dashboard-index .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-index .col-md-8{
  background: transparent !important;
}
#dashboard-index .twothirds-box {
  width: 100%;
}
#dashboard-index .note-editor.note-frame {
  border-radius: 0px;
  /*margin: 30px 20px;*/
}
#dashboard-index .container{
  width: 80%;
  margin: auto;
}
</style>
