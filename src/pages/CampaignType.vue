<template>
<div id="campaign-type">
  <div class="main-content">
    <!-- Section: inner-header -->
    <section class="header-tile header-tile--wide">
      <div class="bg-header bg-header--medical container">
        <h1 style="padding-left: 1rem; padding-right: 1rem;" v-if="category">{{category.label}}</h1>
        <div class="row">
          <div class="small-12 medium-8 large-6 small-centered column">
            <h2 v-if="category">{{category.description}}</h2>
          </div>
        </div>

        <div class="header-tile-footer pb-40">
          <div class="row">
            <div class="search-dark small-12 large-5 large-centered column mt-40">
              <router-link class="button large primary expanded" to="/fundraiser" >
                Start a Campaign
              </router-link><br>
              <!-- <div class="search-with-icon search-with-icon--large hide-when-search-disabled js-search-main-contain search-button-contain--category">
                <input type="search" class="input-with-button js-search-main-bar" placeholder="Or start a new search...">
                <ul class="search-drop js-search-main-drop p-10"><a class="zip-choice query-result js-search-link" href="#"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;<span><strong>your query</strong></span></a></ul>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container pb-80">
        <div class="section-title text-center">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <h3 class="text-uppercase mt-0" v-if="category">Latest {{category.name}} Campaigns</h3>
              <div class="title-icon">
                <i class="flaticon-charity-hand-holding-a-heart"></i>
              </div>
              <p>Your donation is protected. If anything is not right,<br> we’ll give you a full refund.</p>
            </div>
          </div>
        </div>
        <div class="row mtli-row-clearfix">
          <campaign v-for="campaign in campaigns" :key="campaign.id" :campaign="campaign" :user="user"></campaign>
        </div>
      </div>
    </section>
    <campaign-types></campaign-types>
  </div>
</div>
</template>
<script>
import Campaign from '../components/dynamic/Campaign.vue'
import CampaignTypes from '../components/CampaignTypes.vue'
export default {
  name: "campaign-type",
  components: {
    'campaign': Campaign,
    'campaign-types': CampaignTypes
  },
  props: ['user', 'publicData'],
  data: function data() {
    return {
      campaigns: [],
      category: null,
      allCampaigns: []
    }
  },
  watch: {
    publicData: function (val) {
      if (this.publicData && this.publicData.campaignCategories) {
        // alert('public data changed')
        var that = this
        var category = this.publicData.campaignCategories.filter(function (o) {
          return o.link == that.$route.path
        })
        // alert(JSON.stringify(category))
        this.category = category[0]
        if (this.allCampaigns) {
          var campaigns = this.allCampaigns.filter(function (o) {
            return o.category_id == that.category.id
          })
          // alert(JSON.stringify(campaigns))
          this.campaigns = campaigns
        }

      }
    },
    $route: function (val) {
      if (this.publicData && this.publicData.campaignCategories) {
        // alert('route changed')
        var that = this
        var category = this.publicData.campaignCategories.filter(function (o) {
          return o.link == that.$route.path
        })
        // alert(JSON.stringify(category))
        this.category = category[0]

        if (this.allCampaigns) {
          var campaigns = this.allCampaigns.filter(function (o) {
            return o.category_id == that.category.id
          })
          // alert(JSON.stringify(campaigns))
          this.campaigns = campaigns
        }
      }
    },
    allCampaigns: function (val) {
      if (this.publicData && this.publicData.campaignCategories) {
        // alert('allCampaigns changed')
        var that = this
        var category = this.publicData.campaignCategories.filter(function (o) {
          return o.link == that.$route.path
        })
        // alert(JSON.stringify(category))
        this.category = category[0]

        if (this.allCampaigns) {
          var campaigns = this.allCampaigns.filter(function (o) {
            return o.category_id == that.category.id
          })
          // alert(JSON.stringify(campaigns))
          this.campaigns = campaigns
        }
      }
    }
  },
  mounted(){
    if (this.publicData && this.publicData.campaignCategories) {
      // alert('mounted')
      var that = this
      var category = this.publicData.campaignCategories.filter(function (o) {
        return o.link == that.$route.path
      })
      // alert(JSON.stringify(category))
      this.category = category[0]

      if (this.allCampaigns) {
        var campaigns = this.allCampaigns.filter(function (o) {
          return o.category_id == that.category.id
        })
        // alert(JSON.stringify(this.allCampaigns))
        this.campaigns = campaigns
      }
    }
  },
  created(){
    this.$http.get('api/campaigns')
              .then(response => {
                // alert('created')
                this.allCampaigns = response.body

                for (var c in this.allCampaigns) {
                  //get the sum of all donations
                  var raised = 0
                  for (var i in this.allCampaigns[c].donations) {
                    raised += parseInt(this.allCampaigns[c].donations[i].amount)
                  }
                  this.allCampaigns[c].raised = raised

                  //calculate the percentage raised
                  var percent = (parseInt(this.allCampaigns[c].raised) / parseInt(this.allCampaigns[c].goal)) * 100;
                  if (percent > 100) {
                    percent = 100;
                  }else if(percent > 0 && percent < 1){
                    percent = 1;
                  }
                  this.allCampaigns[c].percent = Math.round(percent * 100) / 100;

                }
              })
  },
}
</script>
<style lang="css">

</style>
