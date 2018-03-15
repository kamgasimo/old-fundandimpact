<template>
<div id="about-us">
  <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
    <div class="container pt-30 pb-30">
      <!-- Section Content -->
      <div class="section-content text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <h2 class="text-theme-colored font-36">About Us</h2>
            <ol class="breadcrumb text-center mt-10 white">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li class="active">About Us</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="link-bar top">Overview</div>
  <section class="">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-9 col-md-offset-1">
          <p>
            FundandImpact is a new fundraising platform with serveral donors and a wide reach of audience from different countries and regions in both Africa and Asia continents.
          </p>

          <p>
            FundandImpact allows the world to reach out and impact one life at a time by donating to help and contribute funds for solutions to the problems faced as raised in the campaign. The notion behind the initiative is that together a bigger and better impact
            can be created in the life of others when we consider a problem affecting one person – as a problem affecting us all.
          </p>

          <p>
            With FundandImpact we create an ease to access and help heal the world in our own little way by reaching to the outermost parts of Earth.
          </p>

          <p>
            FundandImpact is a secured and easy way to raise funds to aid you in your cause and interests with a global call for funding from the world.
          </p>

          <p>
            FundandImpact projects to operate on a global scale with an initial start-off with Africa and Asia. We have a list of supporting countries and these will be added to until we cover as many corners of the globe as possible so that together we can stretch
            out our hands to touch and impact one life at a time.
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="link-bar top">Key Points</div>
  <section class="container">
    <div class="row column small-12 large-11 small-collapse">
      <div class="small-12 large-6 column">
        <ul class="list-with-checks fa-ul mb0">
          <li><i class="fa-li fa fa-check"></i>Mobile-Friendly Campaigns</li>
          <li><i class="fa-li fa fa-check"></i>No penalties for missing goal</li>
          <li><i class="fa-li fa fa-check"></i>FundAndImpact Mobile App</li>
        </ul>
      </div>
      <div class="small-12 large-6 column">
        <ul class="list-with-checks fa-ul mb30">
          <li><i class="fa-li fa fa-check"></i>No deadlines or goal requirements</li>
          <li class="is-5min"><i class="fa-li fa fa-check"></i>5-Minute Email Support</li>
          <li><i class="fa-li fa fa-check"></i>Keep every donation you receive</li>
        </ul>
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
  name: "about-us",
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
.cd-timeline-content::before {
  border-left-color: #f1f1f1;
}
.cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    border-right-color: #f1f1f1;
}
#about-us .link-bar{
  width: 80%;
  margin: auto;
}
#about-us .link-bar.top{
  margin-top: -25px;
}
#about-us section.container{
  width: 60%;
  margin: 30px auto;
  padding-left: 5%;
}
</style>
