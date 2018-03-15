<template>
<div id="campaign-step5" class="mt-40">
  <div class="setup">
    <div class="twothirds-box  col-sm-6 col-sm-offset-3 p-0" id="panel_contain">
      <div id="transition-in">
        <div class="one arw " v-lang.your_campaign_link_is>
          Your campaign link is</div>
        <div class="js-clipboard two two--green" data-clipboard-target=".copy_link">
          <input class="copy_link" :value="$app.url+campaign.link" readonly="">
        </div>
        <div class="sbc" v-lang.copy_paste_and_share_capaign_link_msg>
          Copy, paste &amp; share your campaign link inside of emails to spread the word.</div>
        <div class="three no-border mb-30" style="min-height:84px">
          <div class="lb1">
            <div class="lb2">
              <router-link :to="campaign.db_link" class="btn next2" v-lang.next>Next</router-link>
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
  name: "campaign-step5",
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
</style>
