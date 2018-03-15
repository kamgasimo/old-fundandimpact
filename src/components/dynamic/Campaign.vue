<template>
  <div id="component-campaign">
    <div v-if="campaign && campaign.media && campaign.media[0].url" class="col-sm-6 col-md-4 col-lg-4 pb-0 mt-20">
      <div class="causes post bg-lighter box-hover-effect effect1 maxwidth500 mb-sm-30">
        <div class="entry-header">
          <div class="thumb post-thumb">
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" class="img-fullwidth" :src="campaign.media[0].url"></div>
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
              <iframe width="100%" height="194px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          <div class="entry-meta meta-absolute text-center pl-15 pr-15">
            <div class="display-table">
              <div class="display-table-cell">
                <ul>
                  <li v-if="campaign.likes"><a @click="likeCampaign()" class="text-white" href="javascript:"><i class="text-white fa fa-thumbs-o-up"></i> {{campaign.likes.length}} <span v-lang.likes>Likes</span></a></li>
                  <li v-if="campaign.comments" class="mt-20"><router-link class="text-white" :to="campaign.link+'#comment-box'"><i class="text-white fa fa-comments-o"></i> {{campaign.comments.length}} <span v-lang.comments>comments</span></router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="progress-item mt-0">
          <div class="progress mb-0">
            <div class="progress-bar" :data-percent="campaign.percent"></div>
          </div>
        </div>
        <div class="causes-details clearfix border-bottom p-15 pt-10">
          <h5><router-link class="text-theme-colored" :to="campaign.link">{{campaign.title}}</router-link></h5>
          <p v-if="campaign.intro">{{campaign.intro.substr(0, 150)}} ...</p>
          <ul class="list-inline clearfix mt-20">
            <li class="pull-left pr-0"><span v-lang.raised>Raised</span>: ${{campaign.raised}}</li>
            <li class="text-theme-colored pull-right pr-0"><span v-lang.goal>Goal</span>: ${{campaign.goal}}</li>
          </ul>
          <div class="mt-10">
            <router-link class="btn btn-theme-colored btn-flat btn-sm pull-left mt-10 mr-10" :to="campaign.link" v-lang.view_campaign>View Campaign</router-link>
            <router-link class="btn btn-theme-colored btn-flat btn-sm pull-left mt-10" :to="campaign.link+'/donate'" v-lang.donate>Donate</router-link>
            <div class="pull-right mt-15"><i class="fa fa-heart-o text-theme-colored"></i> {{campaign.likes.length}} <span v-lang.likes>Likes</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "component-campaign",
  props: ['campaign', 'user'],
  data: function data() {
    return {

    }
  },
  methods: {
    likeCampaign(){
      var that = this
      var liker  = this.campaign.likes.filter(function(o){
        return o.user_id == that.user.id;
      });
      if (liker.length > 0) {
        swal("Like Failed!", "You can't like this twice", "error")
        return
      }
      var data = {
        link_id: this.campaign.link_id,
        uname: this.campaign.user.uname
      }
      if (this.$oauth.isAuthenticated()) {
        this.$http.post('api/campaign/like', data)
                  .then(response => {
                    swal({
                        title: "Campaign Liked!",
                        text: 'You have liked this Campaign',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "ok",
                        closeOnConfirm: true,
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          that.campaign.likes.push(response.body.data)
                        }
                      });
                  })
                  .catch(e => {
                    swal("Like Failed!", "Please refresh the page and try again.", "error")
                  })
      }else{
        swal({
            title: "Not Login!",
            text: 'Please login to like this Campaign',
            type: "error",
            showCancelButton: true,
            confirmButtonText: "Login",
            closeOnConfirm: false,
          },
          function(isConfirm) {
            if (isConfirm) {
              that.$router.push('/login')
            }
          });
      }
    },
  }
}
</script>
<style lang="css">
#component-campaign .post-thumb {
  height: 194px !important;
}
.fluid-width-video-wrapper {
  max-height: 194px  !important;
  padding-top: 53% !important;
}
</style>
