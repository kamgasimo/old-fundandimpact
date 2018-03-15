<template>
  <div id="tour">
    <section class="inner-header divider layer-overlay overlay-dark" data-bg-img="/src/assets/images/bg/bg2.jpg" style="background-image: url(&quot;/src/assets/images/bg/bg2.jpg&quot;);">
      <div class="container pt-30 pb-30">
        <!-- Section Content -->
        <div class="section-content text-center">
          <div class="row">
            <div class="col-md-6 col-md-offset-3 text-center">
              <h2 class="text-theme-colored font-36" v-lang.how_it_works>How It Works</h2>
              <ol class="breadcrumb text-center mt-10 white">
                <li><a href="/" v-lang.home>Home</a></li>
                <li class="active" v-lang.how_it_works>How It Works</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="link-bar" v-lang.watch_the_video>Watch the Video</div>
    <section class="container mt-40">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <div class="fluid-video-wrapper">
            <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/oIDqz2BrVec" frameborder="0" allowfullscreen></iframe> -->
          </div>
        </div>
      </div>
    </section>
    <section id="cd-timeline" class="cd-container">
      <div class="cd-timeline-block">
        <div class="cd-timeline-img cd-picture">
          <!-- <img src="/src/assets/js/vertical-timeline/img/cd-icon-picture.svg" alt="Picture"> -->
          <i class="fa fa-user"></i>
        </div> <!-- cd-timeline-img -->

        <div class="cd-timeline-content">
          <h2 v-lang.step_one>Step One</h2>
          <div class="hiw-step">
            <h1 v-lang.create_your_fundandimpact_account>Create Your FundAndImpact Account</h1>
            <div class="mb20" v-lang.tour_step_one_msg>Get stated by registering an account with FundAndImpact.</div>
        </div>
        </div> <!-- cd-timeline-content -->
      </div> <!-- cd-timeline-block -->

      <div class="cd-timeline-block">
        <div class="cd-timeline-img cd-location">
          <!-- <img src="/src/assets/js/vertical-timeline/img/cd-icon-movie.svg" alt="Movie"> -->
          <i class="fa fa-briefcase"></i>
        </div> <!-- cd-timeline-img -->

        <div class="cd-timeline-content">
          <h2 v-lang.step_two>Step Two</h2>
          <div class="hiw-step">
              <h1 v-lang.create_your_fundraising_campaign>Create Your Fundraising Campaign</h1>
              <div class="mb20" v-lang.tour_step_two_msg>There’s no easier way to share your story and attract support.</div>
          </div>
        </div> <!-- cd-timeline-content -->
      </div> <!-- cd-timeline-block -->

      <div class="cd-timeline-block">
        <div class="cd-timeline-img cd-picture">
          <!-- <img src="/src/assets/js/vertical-timeline/img/cd-icon-picture.svg" alt="Picture"> -->
          <i class="fa fa-share-alt-square"></i>
        </div> <!-- cd-timeline-img -->

        <div class="cd-timeline-content">
          <h2 v-lang.step_three>Step Three</h2>
          <div class="hiw-step">
            <h1 v-lang.share_with_family_and_friends>Share with Family and Friends</h1>
            <div class="mb20" v-lang.tour_step_three_msg>Our built-in connections to Facebook, Twitter & Email make sharing a breeze.</div>
        </div>
        </div> <!-- cd-timeline-content -->
      </div> <!-- cd-timeline-block -->

      <div class="cd-timeline-block">
        <div class="cd-timeline-img cd-location">
          <!-- <img src="/src/assets/js/vertical-timeline/img/cd-icon-location.svg" alt="Location"> -->
          <i class="fa fa-money"></i>
        </div> <!-- cd-timeline-img -->

        <div class="cd-timeline-content">
          <h2 v-lang.step_four>Step Four</h2>
          <div class="hiw-step">
              <h1 v-lang.easily_accept_donations>Easily Accept Donations</h1>
              <div class="mb20" v-lang.tour_step_four_msg>Receive your money by requesting a check or bank transfer.</div>
          </div>
        </div> <!-- cd-timeline-content -->
      </div> <!-- cd-timeline-block -->

      <div class="cd-timeline-block">
        <div class="cd-timeline-img cd-picture">
          <!-- <img src="/src/assets/js/vertical-timeline/img/cd-icon-location.svg" alt="Location"> -->
          <i class="fa fa-smile-o"></i>
        </div> <!-- cd-timeline-img -->

        <div class="cd-timeline-content">
          <h2 v-lang.step_five>Step Five</h2>
          <div class="hiw-step">
              <h1 v-lang.enjoy_the_results>Enjoy the Results</h1>
              <div class="mb20" v-lang.tour_step_five_msg>Make changes, post updates and send thank-you notes from your dashboard.</div>
          </div>
        </div> <!-- cd-timeline-content -->
      </div> <!-- cd-timeline-block -->
    </section>
    <section class="container">
      <fund-raising-ideas></fund-raising-ideas>
      <faq></faq>
    </section>
  </div>
</template>
<script>
import FundRaisingIdeas from '../components/call-to-action/Toolkit.vue'
import Faq from '../components/call-to-action/Faq.vue'
export default {
  name: "tour",
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
#tour .link-bar{
  width: 60%;
  margin: auto;
  margin-top: -25px;
}
.hiw-step h1 {
    font-size: 1.45rem;
}
.cd-timeline-content h2{
  color: rgba(255, 178, 0, 1);
}
.cd-timeline-img .fa{
  margin: 18px;
  color: white;
  font-size: 1.7rem;
}
</style>
