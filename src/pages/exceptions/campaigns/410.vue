<template>
<div id="exception-campaigns-204">
  <div id="wrapper">
    <!-- start main-content -->
    <div class="main-content">
      <!-- Section: home -->
      <section id="home" class="fullscreen bg-lightest" style="height: 500px;">
        <div class="display-table text-center">
          <div class="display-table-cell">
            <div class="container pt-0 pb-0">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <h1 class="font-150 text-theme-colored mt-0 mb-0"><i class="fa fa-map-signs text-gray-silver"></i>410!</h1>
                  <h2 class="mt-0">Campaign Shuted Down by owner</h2>
                  <p>This campaign is switched OFF by the onwer. It may be available only if the owner switches it ON.</p>
                  <div v-if="campaigns && campaigns.length > 0" class="">
                    <p><small>To view campaigns with this title click on a link below</small></p>
                    <router-link class="btn btn-link btn-transparent text-theme-colored" v-for="campaign in campaigns" :key="campaign.key" :to="campaign.link">{{campaign.title}}</router-link>
                  </div>
                  <div v-else class="">
                    <router-link class="btn btn-border btn-gray btn-transparent btn-circled smooth-scroll-to-target" to="/">Return Home</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>
</div>
</template>
<script>
export default {
  name: "exception-campaigns-204",
  data: function data() {
    return {
      campaigns: window.SimilarCampaigns
    }
  }
}
</script>
<style lang="css">
</style>
