<template>
  <div id="fundraiser-step4">
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
    <div class="container-main setup lbn" >
      <div class="twothirds-box col-sm-6 col-sm-offset-3 p-0">
        <form class="mb-0">
          <div id="transition-in">
            <div class="one good text-theme-colored" v-lang.share_campaign_on_social_networks>
              Share Campaign on Social Networks</div>

            <div class="two two--green mb-0 pb-40">
              <div class="p-30" style="height: 100%; overflow: hidden;">
                  <share-on-social :url="$app.url+campaign.link"></share-on-social>
              </div>
            </div>
          </div>
        </form>
        <div class="three no-border mb-30" style="min-height: 84px;">
          <div class="lb1">
            <div class="lb2">
              <router-link :to="'/fundraiser/' + campaign.link_id + '/link'" class="btn next2" v-lang.next>Next</router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import ShareOnSocial from '../../components/dynamic/ShareOnSocial.vue'
export default {
  name: "fundraiser-step4",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {
    'share-on-social': ShareOnSocial
  },
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
#fundraiser-step4 #share-on-social .styled-icons.icon-dark a {
    font-size: 60px;
    height: 100px;
    width: 100px;
    padding-top: 20px;
}
#fundraiser-step4 #fundraiser-step4 .two{
  overflow: hidden;
  padding: 0;
}
</style>
