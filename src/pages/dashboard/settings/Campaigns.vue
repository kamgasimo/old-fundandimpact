<template>
<div id="dashboard-settings-campaigns" class="divider">
  <div class="container container-main">
    <div class="row main-row pb-30">
      <div class="topbar"></div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd" v-lang.account_settings>ACCOUNT SETTINGS</div>
          <div class="panel-body p-0">
            <div class="widget p-10 m-0">
              <ul class="list-border list theme-colored angle-double-right">
                <li>
                  <router-link to="/dashboard/settings/basic" v-lang.basic_settings>Basic Settings</router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings/password" v-lang.set_your_password>Set your Password</router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings/campaigns" v-lang.my_campaigns>My campaigns</router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings/status" v-lang.account_status>Account Status</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 mb-10 settings-container">
        <div class="border-1px">
          <div class="ml-0 bb-1px" style="">
            <div class="processheader">
              <div class="headline error_amount_label" v-lang.my_campaigns>My Campaigns </div>
            </div>
          </div>
          <div class="two pb-20 pt-20 left bb-1px">
            <span v-lang.manage_your_fundandimpact_campaigns_below>Manage your FundAndImpact campaigns below</span>.
            <router-link v-show="$route.query.inactive != 'true'" to="?inactive=true" v-lang.view_inactive_campaigns>View inactive campaigns</router-link>
            <router-link v-show="$route.query.inactive == 'true'" :to="$route.path" v-lang.view_active_campaigns>View active campaigns</router-link>
          </div>
          <div class="two pt-30 cf nobb nobt left" id="campaign_tiles">
            <div v-if="$route.query.inactive != 'true'">
              <div v-for="campaign in user.campaigns" :key="campaign.id" v-if="campaign.enable_display == 1" class="tile mb-30 mr-15" >
                <router-link :to="campaign.db_link" class="pho" :title="campaign.title">
                  <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
                  <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
                    <iframe width="100%" height="200px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
                  </div>
                </router-link>
                <router-link :to="campaign.db_link" class="amt" :title="campaign.title">${{campaign.raised}}</router-link>
                <router-link to="/dashboard" class="pro" :title="campaign.title">
                    <span class="fill" style="width: 3%;"></span>
                </router-link>
                <router-link :to="campaign.link" class="title" :title="campaign.title"> {{campaign.title}} </router-link>

                <router-link :to="campaign.db_link+'/edit'" class="pl-10 est hide-on-delete-confirm-0" v-lang.edit>Edit</router-link>

                <span>
                  <span class="divider hide-on-delete-confirm-0">|</span>
                  <a @click="disableCampaign(campaign)" class="est " v-lang.deactivate>
                    Deactivate
                  </a>
                </span>
              </div>
            </div>
            <div v-if="$route.query.inactive == 'true'">
              <div v-for="campaign in user.campaigns" :key="campaign.id" v-if="campaign.enable_display == 0" class="tile mb-30 mr-15" >
                <router-link :to="campaign.db_link" class="pho" :title="campaign.title">
                  <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
                  <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
                    <iframe width="100%" height="200px" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
                  </div>
                </router-link>
                <router-link :to="campaign.db_link" class="amt" :title="campaign.title">${{campaign.raised}}</router-link>
                <router-link to="/dashboard" class="pro" :title="campaign.title">
                    <span class="fill" style="width: 3%;"></span>
                </router-link>
                <router-link :to="campaign.link" class="title" :title="campaign.title"> {{campaign.title}} </router-link>

                <router-link :to="campaign.db_link+'/edit'" class="pl-10 est hide-on-delete-confirm-0" v-lang.edit>Edit</router-link>

                <span>
                  <span class="divider hide-on-delete-confirm-0">|</span>
                  <a @click="enableCampaign(campaign)" class="est " v-lang.activate>
                    Activate
                  </a>
                </span>
              </div>
            </div>
            <router-link class="tile tile--add mb-30" to="/fundraiser">
              <div class="title" v-lang.create_a_new_campaign>Create a New Campaign</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-settings-campaigns",
  props: ['user'],
  data: function data() {
    return {

    }
  },
  methods: {
    disableCampaign(campaign){
      this.$http.post('api/campaign/disable', campaign)
               .then(response => {
                 swal("Campaign Disabled!", "This Campaign will no more be visible on FundAndImpact.", "success");
                 var index = this.user.campaigns.indexOf(campaign);
                 this.user.campaigns[index].enable_display = 0;
               })
               .catch(e => {
                 swal("Not Disabled", "Something went wrong during the processing. Try again later.", "error")
               })
    },
    enableCampaign(campaign){
      this.$http.post('api/campaign/enable', campaign)
               .then(response => {
                 swal("Campaign Enabled!", "This Campaign is now visible on FundAndImpact.", "success");
                 var index = this.user.campaigns.indexOf(campaign);
                 this.user.campaigns[index].enable_display = 1;
               })
               .catch(e => {
                 console.log(e);
                 swal("Not Enabled", "Something went wrong during the processing. Try again later.", "error")
               })
    }
  }
}
</script>
<style lang="css">
#dashboard-settings-campaigns .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-settings-campaigns .col-md-8{
  background: transparent !important;
}
#dashboard-settings-campaigns .twothirds-box {
  width: 100%;
}

#dashboard-settings-campaigns .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-settings-campaigns .list-border a.active{
  color: black !important;
}
</style>
