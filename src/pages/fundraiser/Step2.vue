<template>
<div id="fundraiser-step2" class="comtainer setup ">
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
  <div class="row">
    <div class="col-sm-7 twothirds-box ml-50">

      <div class="form-group mt-30">
        <h4>
          <label for="comment" v-lang.short_introduction_n_characters>Short Introduction: 150 - 185 characters</label>
        </h4>

        <p :class="{ 'control': true }">
            <textarea v-model="intro" v-validate="'required|max:185|min:150'" :class="{'input form-control': true, 'is-danger': errors.has('comment') }" name="comment" title="Introduction" type="text" placeholder="Enter Message"  rows="5"></textarea>
            <span v-show="errors.has('comment')" class="help is-danger">{{ errors.first('comment') }}</span>
        </p>
        <input-counter v-bind:input.sync="intro" v-bind:limit="185"></input-counter>
      </div>
      <div class="one arw mt-30" v-lang.tell_your_story>
        Tell your story
      </div>
      <div id="summernote"></div>
      <div class="two--white details details--description cf round5" id="tips">
        <img class="img-coach" src="/src/assets/logo.png">
        <div class="headbar headbar--writingtips cf">
          <span class="loc" v-lang.tips_from_our_campaign_experts>Tips from our campaign experts</span>
        </div>
        <div class="details-content ">
          <div class="details-content-header">
            <strong v-lang.tips_from_our_campaign_experts_intro>To raise the most money for a campaign, make sure you:</strong>
          </div>
          <div class="dykitem ml0" v-lang.tips_from_our_campaign_experts1>Explain what happened</div>
          <div class="dykitem ml0" v-lang.tips_from_our_campaign_experts2>Explain how soon you need the funds</div>
          <div class="dykitem ml0" v-lang.tips_from_our_campaign_experts3>Tell how these funds will help you or your loved one</div>
          <div class="dykitem ml0" v-lang.tips_from_our_campaign_experts4>Explain if there are other ways you need help</div>
          <div class="dykitem ml0" v-lang.tips_from_our_campaign_experts5>Tell potential donors how urgent your situation is</div>
        </div>
      </div>
      <div class="three">
        <div @click="nextStep()" v-if="!loading" class="lb1 hide-on-load">
          <div class="lb2">
            <a href="javascript:" class="btn next2 form-submit" id="form-next" v-lang.next>Next</a>
          </div>
        </div>
        <div v-if="loading"class="loading3 show-on-load">
          <div class="loader"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "fundraiser-step2",
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {
      story: '',
      intro: '',
      loading: false,
    }
  },
  methods: {
    nextStep() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var story = $('#summernote').summernote('code');
          // var story = localStorage.getItem('clean');
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
              // alert(clean);
              // $('#summernote').summernote('code', clean);
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
                              text: 'Your Campaign now has a story',
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
                                window.location = '/fundraiser/' + that.campaign.link_id + '/created'
                              } else {
                                // alert('yes')
                                that.deleteCampaign(that.campaign.link_id)
                              }
                            });
                        })
                        .catch(e => {
                          this.loading = false
                          swal({
                              title: "Ooup!! Something went wrong.",
                              text: 'We could not add your story to your Campaign. Make sure you replace some photos you added to your story with lighter onces.',
                              type: "error",
                              showCancelButton: true,
                              confirmButtonColor: "rgb(255,175,0)",
                              confirmButtonText: "Retry",
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
  mounted() {
    $(document).ready(function() {
      $('#summernote').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true, // set focus to editable area after initializing summernote
      });
    });
    setTimeout(function () {
      $('.btn-codeview').remove()
    },0)

    // summernote.blur
    $('#summernote').on('summernote.blur', function() {
      // alert('blur')
    });


        // summernote.focus
    $('#summernote').on('summernote.focus', function() {
      // alert('focus')
    });

  }
}
</script>
<style lang="css">

</style>
