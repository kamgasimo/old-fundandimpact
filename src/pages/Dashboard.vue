<template>
<div id="dashboard">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-theme-colored font-36" v-lang.campaigns_dashboard>Campaigns Dashboard</h2>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/" v-lang.home>Home</router-link>
              </li>
              <li class="active" v-lang.campaigns_dashboard>Campaigns Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="link-bar top" v-lang.your_campaings>Your Campaigns</div>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-11 ml-50">
          <div v-for="campaign in user.campaigns" :key="campaign.id" class="upcoming-events box-hover-effect effect1 media maxwidth400 bg-light mb-20">
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
                  <p v-if="campaign.intro">{{campaign.intro.substr(0, 150)}} ...</p>
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
                      <li class="pr-0"><i class="fa fa-heart-o text-theme-colored"></i> {{campaign.donations.length}} <span v-lang.donations>Donations</span></li>
                    </ul>
                    <div class="btn-group mt-12">
                      <button @click="$router.push(campaign.db_link)" type="button" class="btn btn-success" name="button">
                        <i class="glyphicon glyphicon-wrench"></i> <span v-lang.manage>Manage</span>
                      </button>
                      <button @click="$router.push(campaign.link)" type="button" class="btn btn-info" name="button">
                        <i class="fa fa-eye"></i> <span v-lang.view>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="user.campaigns && user.campaigns.length < 1" class="no-campaign">
            <div class="white-box-large-only container">
              <div class="row col-sm-6 large-centered">
                <div class="row pt-50 pb-50">
                  <div class="fs-25 text-center text-warning mb-20 column small-12 large-10 large-centered" v-lang.you_havent_yet_created_a_campaign>You haven't yet created a Campaign.</div>
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
  </section>
</div>
</template>
<script>
export default {
  name: "dashboard",
  props: ['user', 'deleteCampaign'],
  components: {

  },
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
#dashboard .cd-timeline-content::before {
  border-left-color: #f1f1f1;
}
#dashboard .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    border-right-color: #f1f1f1;
}
#dashboard .link-bar{
  width: 80%;
  margin: auto;
}
#dashboard .link-bar.top{
  margin-top: -25px;
}
#dashboard .hiw-step h1 {
    font-size: 1.45rem;
}
#dashboard .cd-timeline-content h2{
  color: rgba(255, 178, 0, 1);
}
#dashboard .cd-timeline-img .fa{
  margin: 18px;
  color: white;
  font-size: 1.7rem;
}
</style>
