<template>
<div id="dashboard-share" class="divider pt-40">
  <div class="container-main setup lbn">
    <div class="twothirds-box col-sm-6 col-sm-offset-3 p-0">
      <form class="mb-0">
        <div id="transition-in">
          <div class="one good text-theme-colored" v-lang.share_campaign_on_social_networks>
            Share Campaign on Social Networks</div>

          <div class="two two--green mb-0 pb-40">
            <div class="p-30">
                <share-on-social :url="$app.url+campaign.link"></share-on-social>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script>
import ShareOnSocial from '../../components/dynamic/ShareOnSocial.vue'
export default {
  name: "dashboard-share",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {
    'share-on-social': ShareOnSocial
  },
  data: function data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang="css">
#dashboard-share #share-on-social .styled-icons.icon-dark a {
    font-size: 60px;
    height: 100px;
    width: 100px;
    padding-top: 20px;
}
#dashboard-share .two{
  overflow: hidden;
  padding: 0;
}
</style>
