<template>
<div id="fundraiser-step3">
  <section class="inner-header mb-40 divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-10 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-white font-26"><span v-lang.campaign_created>Campaign Created</span>: <br><span class="coth text-info">"</span>
              <a v-if="campaign" :href="campaign.link" target="_blank" class="campaign-name text-theme-colored">{{campaign.title}}</a>
              <a v-if="!campaign.title" href="#" class="campaign-name text-theme-colored"><i class="fa fa-spinner fa-spin font-18"></i></a>
              <span class="coth text-info">"</span></h2>

            <!-- <div v-if="campaign.link_id" class="text-center">
              <span class="text-danger">Changed your mind? </span><a @click="deleteCampaign(campaign.link_id)" type="button" class="btn btn-danger btn-sm">Delete Campaign</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <div id="content-container" class="setup lbn">
    <div class="twothirds-box col-sm-6 col-sm-offset-3 p-0">
      <form>
        <div id="transition-in">
          <div class="one good text-theme-colored" v-lang.campaign_is_ready>
            Campaign is Ready!</div>

          <div class="two two--green no-hpadding" style="padding-top: 6px; padding-bottom: 6px;">
            <div class="readyitem mt-30" v-lang.your_campaign_is_ready_to_raise_money>Your campaign is ready to raise money!</div>
            <div class="readyitem" v-lang.next_we_will_show_you_how_to_share_your_campaign>Next, we'll show you how to share your campaign.</div>
            <div class="readyitem mb-30" v-lang.after_you_receive_your_fist_donation_you_can_enter_your_withdrawal_info>
              After you receive your first donation, you can enter your withdrawal information. </div>
          </div>

          <div class="three no-border" style="min-height: 84px;">
            <div class="lb1">
              <div class="lb2">
                <router-link :to="'/fundraiser/' + campaign.link_id + '/share'" class="btn next2" v-lang.next>Next</router-link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "fundraiser-step3",
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">

</style>
