<template>
<div id="support" class="mt-40">
  <div class="white-box-large-only container">
    <h1 class="text-center" v-lang.help_center>Help Center</h1>
    <div class="row col-sm-6 large-centered">
      <div class="no-help">
        <div class="row">
          <div class="fs-25 text-center mb-20 column small-12 large-10 large-centered" v-lang.no_support_available>We are sorry! No support is available for now.</div>
        </div>
        <div class="row">
          <div class="column small-12 large-10 large-centered">
            <div class="column mb-20 text-center small-centered medium-8 large-12">
              <router-link class="button expanded primary large" to="/fundraiser" v-lang.start_a_campaign>Start a Campaign</router-link>
              <!-- <div class="read-more text-center mb-10"><a href="/mvc.php?route=contact/suggest">Missing a donation? Please contact us!</a></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  name: "support",
  components: {
    'fund-raising-ideas': FundRaisingIdeas,
    'faq': Faq
  },
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
