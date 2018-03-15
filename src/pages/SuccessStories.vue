<template>
<div id="success-stories">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-theme-colored font-36">Success Stories</h2>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li class="active">Success Stories</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="link-bar top">List of successful Campaigns</div>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-9 col-md-offset-1">
          <div v-for="campaign in filtered" :key="campaign.id" class="upcoming-events box-hover-effect effect1 media maxwidth400 bg-light mb-20">
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
                  <p>{{campaign.intro.substr(0, 150)}} ...</p>
                  <a href="javascript:void(0)" class="text-info">Details <i class="fa fa-angle-double-right"></i></a>
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
                    <li class="pull-left pr-0">Raised: ${{campaign.raised}}</li>
                    <li class="text-theme-colored pull-right pr-0">Goal: ${{campaign.goal}}</li>
                  </ul>
                  <div class="mt-10">
                    <ul class="list-inline mt-15">
                      <li class="pr-0"><i class="fa fa-heart-o text-theme-colored"></i> {{campaign.donations.length}} Donations</li>
                    </ul>
                    <div class="btn-group mt-12">
                      <!-- <button @click="$router.push(campaign.db_link)" type="button" class="btn btn-success" name="button">
                        <i class="glyphicon glyphicon-wrench"></i> Manage
                      </button> -->
                      <button @click="$router.push(campaign.link)" type="button" class="btn btn-info" name="button">
                        <i class="fa fa-eye"></i> View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="filtered.length < 1" class="no-campaign">
            <div class="white-box-large-only container">
              <div class="row col-sm-6 large-centered">
                <div class="row pt-50 pb-50">
                  <div class="fs-25 text-center text-warning mb-20 column small-12 large-10 large-centered">No completed Campaign yet!</div>
                </div>
                <div class="row">
                  <div class="column small-12 large-10 large-centered">
                    <div class="column mb-20 text-center small-centered medium-8 large-12">
                      <router-link class="button expanded primary large" to="/fundraiser">Start a Campaign</router-link>
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

  <section class="container  mt-80">
    <fund-raising-ideas></fund-raising-ideas>
    <faq></faq>
  </section>
</div>
</template>
<script>
import FundRaisingIdeas from '../components/call-to-action/Toolkit.vue'
import Faq from '../components/call-to-action/Faq.vue'
export default {
  name: "success-stories",
  props: ['user'],
  components: {
    'fund-raising-ideas': FundRaisingIdeas,
    'faq': Faq
  },
  data: function data() {
    return {
      campaigns: [],
      filtered: []
    }
  },
  methods: {
    getSuccess(campaigns){

      var filter = campaigns.filter(function (o) {
        return o.percent >= 50
      });
      // alert(JSON.stringify(filter))
      if (filter.length > 0) {
        // alert(JSON.stringify(filter))
        this.filtered = filter
      }

    }
  },
  created(){
    this.$http.get('api/campaigns')
              .then(response => {
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

                  this.getSuccess(this.campaigns)

                }
              })
  },
}
</script>
<style lang="css">
.cd-timeline-content::before {
  border-left-color: #f1f1f1;
}
.cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    border-right-color: #f1f1f1;
}
#success-stories .link-bar{
  width: 80%;
  margin: auto;
}
#success-stories .link-bar.top{
  margin-top: -25px;
}
.hiw-step h1 {
    font-size: 1.45rem;
}
.cd-timeline-content h2{
  color: rgba(255, 178, 0, 1);
}
.cd-timeline-img .fa{
  margin: 18px;
  color: white;
  font-size: 1.7rem;
}
</style>
