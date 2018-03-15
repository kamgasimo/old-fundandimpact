<template>
  <div id="auth-header">

      <div id="side-panel" class="dark">
        <div class="side-panel-wrap">
          <div id="side-panel-trigger-close" class="side-panel-trigger"><a href="#"><i class="icon_close font-30"></i></a></div>
          <router-link to="/" style="text-align: center;"><img alt="logo" src="/src/assets/logo-hori.png"></router-link>
          <div class="side-panel-nav mt-30">
            <div class="widget no-border">
              <nav>
                <ul class="nav nav-list">
                  <router-link tag="li" to="/" exact><a href="#" v-lang.home>Home</a></router-link>
                  <router-link tag="li" to="/ideas"><a href="#" v-lang.fundraising_ideas>Fundraising Ideas</a></router-link>
                  <router-link tag="li" to="/tour"><a href="#" v-lang.how_it_works>How It Works</a></router-link>
                  <router-link tag="li" to="/help"><a href="#" v-lang.help>Help</a></router-link>
                  <router-link tag="li" to="/dashboard"><a href="#" v-lang.dashboard>Dashboard</a></router-link>
                  <li><a href="#" class="tree-toggler nav-header"><i class="fa fa-user fs-25"></i> {{this.user.name}} <i class="fa fa-angle-down"></i></a>
                    <ul class="nav nav-list tree" >
                      <router-link tag="li" to="/profile"><a href="#" v-lang.profile>Profile</a></router-link>
                      <router-link tag="li" to="/donations"><a href="#" v-if="user.donations"> <span v-lang.my_donations>My Donations</span> ({{user.donations.length}})</a></router-link>
                      <router-link tag="li" to="/dashboard/settings/basic"><a href="#" v-lang.account_settings>Account Settings</a></router-link>
                      <li class="scrollable-fix"></li>
                      <router-link tag="li" to="/fundraiser"><a href="#" v-lang.start_a_fundraiser>Start a Campaign</a></router-link>
                      <router-link tag="li" to="/logout"><a href="#" v-lang.sign_out>Sign Out</a></router-link>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="side-panel-widget mt-30">
            <div class="widget no-border">
              <ul>
                <li class="font-14 mb-5"> <i class="fa fa-phone text-theme-colored"></i> <a href="#" class="text-gray">+(237) 653 345 173</a> </li>
                <li class="font-14 mb-5"> <i class="fa fa-clock-o text-theme-colored"></i> <span v-lang.opening_hours></span>Mon-Fri 8:00am to 6:00pm </li>
                <li class="font-14 mb-5"> <i class="fa fa-envelope-o text-theme-colored"></i> <a href="#" class="text-gray">info@fundandimpact.com</a> </li>
              </ul>
            </div>
            <div class="widget">
              <ul class="styled-icons icon-dark icon-theme-colored icon-sm">
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
              </ul>
            </div>
            <p>Copyright &copy;2017 FundAndImpact</p>
          </div>
        </div>
      </div>
    <!-- Header -->
    <header class="header">
      <div class="header-top bg-theme-colored sm-text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="widget no-border m-0">
                <ul class="list-inline sm-text-center mt-5">
                  <li class="m-0">
                    <router-link class="text-white" to="/faq">FAQ</router-link>
                  </li>
                  <li class="text-white m-0">|</li>
                  <li class="m-0">
                    <router-link class="text-white" to="/help" v-lang.help_desk>Help Desk</router-link>
                  </li>
                  <li class="text-white m-0">|</li>
                  <li class="m-0">
                    <router-link class="text-white" to="/fundraiser" v-lang.new_campaign>New Campaign</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <div id="side-panel-trigger" class="side-panel-trigger pull-right sm-pull-none mt-5"><a href="#"><i class="fa fa-bars font-24 text-white"></i></a></div>
              <div class="widget no-border m-0">
                <ul class="styled-icons icon-dark icon-circled icon-theme-colored icon-sm pull-right sm-pull-none sm-text-center mt-sm-15">
                  <li><a href="#"><i class="fa fa-facebook text-white"></i></a></li>
                  <li><a href="#"><i class="fa fa-twitter text-white"></i></a></li>
                  <li><a href="#"><i class="fa fa-google-plus text-white"></i></a></li>
                  <li><a href="#"><i class="fa fa-instagram text-white"></i></a></li>
                  <li><a href="#"><i class="fa fa-linkedin text-white"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-middle p-0 bg-lightest xs-text-center">
        <div class="container pt-0 pb-0">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-5">
              <div class="widget no-border m-0">
                <router-link class="menuzord-brand xs-pull-center mb-15" to="/">
                  <img src="/src/assets/logo-hori.png" alt="" class="logo" style="margin-top: -15px;">
                  <!-- <span>Fund And Impact</span> -->
                </router-link>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="widget no-border m-0">
                <div class="mt-10 mb-10 text-right sm-text-center">
                  <div class="font-20 text-black-333 text-uppercase mb-5 font-weight-600"><i class="fa fa-phone-square text-theme-colored font-24"></i> +(237) 653 345 173</div>
                  <a class="font-12 text-gray" href="#" v-lang.call_us_for_more_details>Call us for more details!</a>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-3">
              <div class="widget no-border m-0">
                <div class="mt-10 mb-10 text-right sm-text-center">
                  <div class="font-15 text-black-333 text-uppercase mb-5 font-weight-600"><i class="fa fa-envelope text-theme-colored font-24"></i> <span v-lang.mail_us_today>Mail us today</span></div>
                  <a class="font-12 text-gray" href="mailto:info@fundandimpact.com"> info@fundandimpact.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-nav">
        <div class="header-nav-wrapper navbar-scrolltofixed bg-light">
          <div class="container">
            <nav id="menuzord" class="menuzord orange bg-light">
              <ul class="menuzord-menu">
                <router-link tag="li" to="/" exact><a href="#"v-lang.home>Home</a></router-link>
                <router-link tag="li" to="/ideas"><a href="#"v-lang.fundraising_ideas>Fundraising Ideas</a></router-link>
                <router-link tag="li" to="/tour"><a href="#"v-lang.how_it_works>How It Works</a></router-link>
                <!-- <router-link tag="li" to="/help"><a href="#">Help</a></router-link> -->
                <router-link tag="li" to="/dashboard"><a href="#"v-lang.dashboard>Dashboard</a></router-link>
                <li><a href="#"><i class="fa fa-user fs-25"></i> {{this.user.shortname}} </a>
                  <ul class="dropdown" style="right: auto; display: none;">
                    <router-link tag="li" to="/profile"><a href="#"v-lang.profile>Profile</a></router-link>
                    <router-link tag="li" to="/donations"><a href="#" v-if="user.donations"><span v-lang.my_donations>My Donations</span> ({{user.donations.length}})</a></router-link>
                    <router-link tag="li" to="/dashboard/settings/basic"><a href="#" v-lang.account_settings>Account Settings</a></router-link>
                    <li class="scrollable-fix"></li>
                    <router-link tag="li" to="/fundraiser"><a href="#" v-lang.start_a_fundraiser>Start a Campaign</a></router-link>
                    <router-link tag="li" to="/logout"><a href="#" v-lang.sign_out>Sign Out</a></router-link>
                  </ul>
                </li>
              </ul>
              <ul class="pull-right hidden-sm hidden-xs">
                <router-link tag="li" to="/fundraiser">
                  <a class="btn btn-colored btn-flat btn-theme-colored mt-15" v-lang.start_a_fundraiser>Start a Fundraiser</a>
                </router-link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>

  </div>
</template>
<script>
export default {
  name: "auth-header",
  props: ['user'],
  data: function data() {
    return {

    }
  },
  methods: {

  },
  mounted(){
     if ($('.menuzord  li  a  .fa-angle-down').length == 0) {
      $('.has-side-panel .body-overlay').unbind('click')
      window.THEMEMASCOT.header.init();
    }
  }
}
</script>
<style lang="css">
</style>
