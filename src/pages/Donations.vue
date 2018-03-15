<template>
<div id="donations" class="mt-40">
  <div class="white-box-large-only container">
    <h4 class="text-center" v-lang.your_donations>Your Donations</h4>
    <div v-if="!user.donations" class="row col-sm-6 large-centered">
      <div class="no-donation">
        <div class="row">
          <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered" v-lang.no_donations_yet_find_someone_to_help>No Donations Yet! Find someone to help!</div>
        </div>
        <div class="row">
          <div class="column small-12 large-10 large-centered">
            <div class="column mb-20 text-center small-centered medium-8 large-12">
              <router-link class="button expanded primary large" to="/" v-lang.find_a_campaign>Find a Campaign</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="user.donations" class="donations">
      <div class="panel panel-default p-0">
        <div class="panel-heading headbar light-bkgd">({{user.donations.length}}) <span v-lang.donations>Donotions</span></div>
        <div class="panel-body p-0">
          <div class="widget p-10 m-0">
            <div id="feed">
              <div v-for="donation in user.donations" :key="donation.id" :id="'update-'+donation.id">
                <div class="c_block">
                  <div class="deats">
                    <div class="phot">
                      <img class="card-bkimg" alt="" :src="(donation.campaign.user.media && donation.campaign.user.media[0] ) ? donation.campaign.user.media[0].url : '/src/assets/images/img-default.jpg'">
                    </div>

                    <div class="gnline"><b>${{donation.amount}}</b></div>
                    <div class="nme"><span v-lang.to>to</span>: {{donation.campaign.user.name}}, <span v-lang.campaign>Campaign</span>: <router-link :to="donation.campaign.link">{{donation.campaign.title}}</router-link></div>
                    <div class="tme">{{donation.created_at | timeago}}</div>
                    <div style="clear:both;"></div>
                  </div>
                  <div class="c_comment" style="word-wrap: break-word;">{{donation.comment}}</div>
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
  name: "donations",
  props: ['user'],
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
.fs-25{
  font-size: 25px;
}
</style>
