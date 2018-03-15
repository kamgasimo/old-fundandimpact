<template>
<div id="pricing">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-theme-colored font-36" v-lang.pricing_and_fees>Pricing and Fees.</h2>
            <h4 class="text-white" v-lang.pricing_page_header_msg>While it’s free to launch your campaign, fees are deducted from each donation.</h4>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/" v-lang.home>Home</router-link>
              </li>
              <li class="active" v-lang.pricing_and_fees>Pricing and Fees.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="link-bar top" v-lang.what_you_get>What You Get</div>
  <section class="container">
    <div class="row column small-12 large-11 small-collapse">
        <div class="small-12 large-6 column">
            <ul class="list-with-checks fa-ul mb0">
                <li><i class="fa-li fa fa-check"></i><span v-lang.mobile_friendly_campaigns>Mobile-Friendly Campaigns</span></li>
                <li><i class="fa-li fa fa-check"></i><span v-lang.no_penalties_for_missing_goal>No penalties for missing goal</span></li>
                <li><i class="fa-li fa fa-check"></i><span v-lang.fundandimpact_mobile_app>FundAndImpact Mobile App</span></li>
            </ul>
        </div>
        <div class="small-12 large-6 column">
            <ul class="list-with-checks fa-ul mb30">
                <li><i class="fa-li fa fa-check"></i><span v-lang.no_deathlines_or_goal_requirements>No deadlines or goal requirements</span></li>
                <li class="is-5min"><i class="fa-li fa fa-check"></i><span v-lang.five_minute_email_support>5-Minute Email Support</span></li>
                <li><i class="fa-li fa fa-check"></i><span v-lang.keep_every_donation_you_receive>Keep every donation you receive</span></li>
            </ul>
        </div>
    </div>
  </section>
  <div class="link-bar" v-lang.deduction_per_donation>Deduction per Donation</div>
  <section class="container">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <h6 v-lang.fundandimpact_fee>FundAndImpact Fee</h6>
          <h2 class="percent">6%</h2>
        </div>
      </div>
      <div class="col-sm-1 operator-container">
        <span class="operator vertical-center">+</span>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <h6 v-lang.payment_processing>Payment Processing</h6>
          <h2 class="percent">3%</h2>
          <div class="sub-text">
            <strong>+</strong>  $0.50 <span v-lang.per_donation>per donation</span>
          </div>
        </div>
      </div>
      <div class="col-sm-1 operator-container">
        <span class="operator vertical-center">=</span>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <h6 v-lang.total>Total</h6>
          <h2 class="percent">9%</h2>
          <div class="sub-text">
            <strong>+</strong>  $0.50 <span v-lang.per_donation>per donation</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
    <fund-raising-ideas></fund-raising-ideas>
    <faq></faq>
    </div>
  </section>
</div>
</template>
<script>
import FundRaisingIdeas from '../components/call-to-action/Toolkit.vue'
import Faq from '../components/call-to-action/Faq.vue'
export default {
  name: "pricing",
  components: {
    'fund-raising-ideas': FundRaisingIdeas,
    'faq': Faq
  },
  data: function data() {
    return {
      faqs: true,
    }
  }
}
</script>
<style lang="css">
.fs-25{
  font-size: 25px;
}
#pricing .cd-timeline-content::before {
  border-left-color: #f1f1f1;
}
#pricing .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    border-right-color: #f1f1f1;
}
#pricing .link-bar{
  width: 65%;
  margin: auto;
}
#pricing .link-bar.top{
  margin-top: -25px;
}
#pricing .hiw-step h1 {
    font-size: 1.45rem;
}
#pricing .cd-timeline-content h2{
  color: rgba(255, 178, 0, 1);
}
#pricing .cd-timeline-img .fa{
  margin: 18px;
  color: white;
  font-size: 1.7rem;
}
#pricing section.container{
  width: 60%;
  margin: 30px auto;
  padding-left: 5%;
}
#pricing .card{
  min-height: 150px;
}
#pricing .operator-container{
  min-height: 150px;
}
#pricing .operator{
  font-size: 30px;
  font-weight: 600;
  color: #333;
  vertical-align: center;
}

</style>
