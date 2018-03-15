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
          <div class="form-group mt-30">
            <h4 class="ml-40">
              <label for="comment" v-lang.short_introduction_n_characters>Short Introduction: 150 - 185 characters</label>
            </h4>

            <p :class="{ 'control': true }">
                <textarea v-model="intro" v-validate="'required|max:185|min:150'" :class="{'input form-control': true, 'is-danger': errors.has('comment') }" name="comment" title="Introduction" type="text" placeholder="Enter Message"  rows="5"></textarea>
                <span v-show="errors.has('comment')" class="help is-danger">{{ errors.first('comment') }}</span>
            </p>
            <input-counter class="ml-20" v-bind:input.sync="intro" v-bind:limit="185"></input-counter>
          </div>

          <div class="one arw mt-30" v-lang.tell_your_story>
            Tell your story
          </div>
          <div id="summernote"></div>
          <div class="three mb-30">
            <div v-if="!loading" class="lb1 hide-on-load">
              <div class="lb2">
                <a @click="updateCampaign()" href="javascript:void(0)" class="btn form-submit next2" v-lang.save_changes>Save Changes</a>
              </div>
            </div>
            <div v-if="loading" class="loading3 show-on-load">
              <div class="loader"></div>
            </div>
            <div class="clear"></div>
            <a class="rtlnk" data-target="#customize-details-link" href="./.." v-lang.cancel>Cancel</a>
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
  components: {},
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {
      intro: '',
      loading: false
    }
  },
  methods: {
    updateCampaign() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var story = $('#summernote').summernote('code');
          if ($('#summernote').summernote('isEmpty')) {
              swal("Story Not Provided!", "Please add you story. It is required", "warning")
          }else{
            if ($(".note-editable").text().length < 600) {
              swal("Text too short!", "Your story should of atleast 600 characters long.", "warning")
            }else{
              this.loading = true
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
              if (clean == this.campaign.story && this.intro == this.campaign.intro) {
                swal("Nothing Changed!", "Can't update your Story, you haven't made any change.", "warning")
                this.loading = false
                return false
              }
              var data = {
                intro: this.intro,
                story: clean,
                link_id: this.campaign.link_id
              }
              // localStorage.setItem('clean', clean);
              this.$http.put('api/campaign/story', data)
                        .then(response => {
                          this.loading = false;
                          var that = this;
                          swal({
                              title: "Great Job!!",
                              text: 'Your Campaign Story was updated successfully',
                              type: "success",
                              confirmButtonColor: "rgb(255,175,0)",
                              confirmButtonText: "Ok",
                              closeOnConfirm: true,
                            },
                            function(isConfirm) {
                              if (isConfirm) {
                                that.loading = false
                                that.$emit('campaignUpdated', response.body.data)
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          swal({
                              title: "Ooup!! Something went wrong. ",
                              text: 'We could not update your Campaign Story',
                              type: "error",
                              showCancelButton: true,
                              confirmButtonColor: "rgb(255,175,0)",
                              closeOnConfirm: true
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
      var that = this
      setTimeout(function () {
        // if (!$('#summernote').summernote('code')) {
          $('#summernote').summernote({
            height: 300, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
            focus: true // set focus to editable area after initializing summernote
          });
        // }
        $('#summernote').summernote('code', that.campaign.story);
        if (!that.intro && that.campaign.intro) {
          that.intro = that.campaign.intro
        }
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
    $('#summernote').summernote('code', this.campaign.story);
    if (!this.intro && this.campaign.intro) {
      this.intro = this.campaign.intro
    }
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
