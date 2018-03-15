<template>
<section id="donation-payment" class="divider">
  <div class="container">
    <div id="donate-container" class="row">
      <div class="topbar"></div>
      <div class="col-md-8">
        <div class="border-1px mb-0">
          <h3 class=" m-30 pt-5"> Donating <span class="text-theme-colored" style="font-size: 28px;">${{donation.amount}}</span> to the campaign:
            <router-link v-if="campaign.link" :to="campaign.link" class="text-theme-colored" >{{campaign.title}}</router-link></h3>

          <!-- Payment form -->
            <payment :amount="donation.amount" :id="donation.id" :type="'payment'"></payment>
          <!--/ Payment form -->
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd">{{campaign.title}}</div>
          <div class="panel-body p-0">
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'image' " class="photoframe"><img alt="" :src="campaign.media[0].url"></div>
            <div v-if="campaign && campaign.media && campaign.media[0].media_type == 'youtube' " class="fluid-video-wrapper">
              <iframe width="100%" height="auto" :src="campaign.media[0].url" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="widget p-0 m-0">
              <div class="call-to-action border-1px bg-lighter">
                <h2 class="goal">
                  <strong>${{campaign.raised}}</strong>
                  <small class="smaller">of ${{campaign.goal}} goal</small>
                </h2>
                <div class="progress-item mt-30">
                  <div class="progress mb-0">
                    <div :data-percent="campaign.percent" class="progress-bar appeared" :style="'width: '+campaign.percent+'%;'"><span class="percent">{{campaign.percent}}%</span></div>
                  </div>
                </div>
                <div v-if="campaign.donations" class="mt-10 campaign-status text-small">
                  Number of Donations: <span>{{campaign.donations.length}}</span><br> Created: {{campaign.created_at | timeago}}
                </div>
                <div class="section-title mt-20">
                  <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                      <div class="text-center">
                        <h5 class="sub-title both-side-line">Share on social networks</h5>
                      </div>
                    </div>
                  </div>
                  <hr style="opacity: 0;">
                  <share-on-social :url="$app.url+campaign.link"></share-on-social>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="widget border-2px bg-lighter p-20" style="border-radius: 5px;">
          <h5 class="widget-title line-bottom">About the Organizer</h5>
          <div class="categories">
            <ul class="list-border" v-if="campaign.user">
              <li>
                <div class="img">
                  <img class="img" :src="(campaign.user.media && campaign.user.media[0] && campaign.user.media[0].url != '/src/assets/images/img-default.jpg') ? campaign.user.media[0].url : '/src/assets/images/wallpapers/orange.jpeg'" alt="">
                </div>
                <div class="fbusername  ">
                  <a :href="'mailto:'+campaign.user.email" style="font-size: 20px;">{{campaign.user.name}} <i class="fa fa-envelope js-contact-organizer-open text-theme-colored"></i></a>
                </div>
                <div class="smalltext">{{campaign.likes.length}} Campaign Likes</div>
              </li>
              <li>
                <div class="mediumtext" style="line-height:1.6;"><strong>Beneficiary of this campaign:</strong><br> {{campaign.user.name}} </div>
              </li>
              <li>
                <div class="mediumtext">The beneficiary will receive the donation directly.</div>
              </li>
              <li>
                <router-link to="/terms">Donation is protected by FundAndImpact Guarantee.</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import ShareOnSocial from '../components/dynamic/ShareOnSocial.vue'
import Payment from '../components/dynamic/Payment.vue'
export default {
  name: "donation-payment",
  props: ['campaign', 'user', 'dataLoader'],
  components: {
    'share-on-social': ShareOnSocial,
    'payment': Payment
  },
  data: function data() {
    return {
      donation: {},
      raisedPercent: 0,
    }
  },
  created() {
    this.$http.get('api/donation/'+this.$route.params.id).then(resp => {
      this.donation = resp.body
    }).catch(e => {
      this.$router.push('/404')
    })
  }
}
</script>
<style lang="css">
#donate-container{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#donate-container #payment .panel{
  border-radius: 0px !important;
  margin-bottom: 0px;
}
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#donate-container .col-md-8, #donate-container .col-md-4{
  background: #fff !important;
}
.processheader {
    font-family: Lato, sans-serif;
    font-weight: 300;
    font-size: 36px;
    color: #666666;
    margin: 25px 30px 20px 30px;
}
.processheader .headline {
    display: inline-block;
}
.donatesprite-arrow {
    background-position: 0 -17px;
    width: 59px;
    height: 23px;
    margin-left: 10px;
}
.donationsprite {
    /*background: url(/src/assets/images/donate_sprite.png) no-repeat top left;*/
    display: inline-block;
}
.donationbox {
    width: 100%;
    height: 157px;
    position: relative;
}
.headbar {
    display: block;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-family: montserrat, sans-serif;
    text-shadow: white 1px 1px;
    color: rgb(102, 102, 102);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 0px 20px;
    border-bottom: 1px solid rgb(227, 227, 227);
}
.campaign_currency {
    bottom: 6px;
    color: #999;
    display: block;
    font-size: 20px;
    left: 24px;
    padding-left: 16px;
    text-decoration: none;
    text-shadow: 1px 1px 1px #fff;
    max-height: 9999px;
    width: 15%;
    position: absolute;
    font-family: Montserrat, sans-serif;
    font-size: 16px;
    left: 26px;
}
.donationamount, .zeros, .dollarsign, .donationcommentbox .photo, .headbar, .gfm_lb_main, .section_head, .doner .rewbox, .light-bkgd, .reward .title, .wishlist .title, .rewardna:hover .title, .donationform .autocomplete a:hover, .selected, .gfm_dropdown_option:hover, .gfm_dropdown_option.odd:hover, .greencontainer{
    background: #F3F9E4 !important;
}
.txt1 {
    color: #FFAB00 !important;
}
.dollarsign {
    float: left;
    background: #F3F9E4;
    height: 155px;
    width: 15%;
    padding-left: 30px;
    font-size: 100px;
    color: #5F7E19;
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -5px;
    line-height: 157px;
}
.donationamount {
    background: #F3F9E4;
    height: 153px;
    line-height: 100px;
    width: 65%;
    font-size: 100px;
    color: #5F7E19;
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;
    border-left: 0;
    border-right: 0;
    font-family: 'Montserrat', sans-serif;
    padding-left: 10px;
    float: left;
    letter-spacing: -5px;
    text-align: right;
    outline: none;
}
.zeros {
    float: left;
    background: #F3F9E4;
    height: 155px;
    width: 20%;
    font-size: 100px;
    color: #5F7E19;
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: -5px;
    line-height: 157px;
    text-align: left;
}
</style>
