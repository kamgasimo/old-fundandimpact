<template>
<div id="campaign-header">
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
              <router-link tag="li" to="/login" v-if="!$oauth.isAuthenticated()"><a href="#" v-lang.login>Login</a></router-link>
              <router-link tag="li" to="/register" v-if="!$oauth.isAuthenticated()"><a href="#" v-lang.create_account>Create Account</a></router-link>
              <router-link v-if="$oauth.isAuthenticated()" tag="li" :to="'/dashboard/'"><a href="#" v-lang.dashboard>Dashboard</a></router-link>
              <li v-if="$oauth.isAuthenticated()"><a href="#" class="tree-toggler nav-header"><i class="fa fa-user fs-25"></i>
                <span>{{user.name}}</span>
                <span v-if="!user.name"><i class="fa fa-spinner fa-spin"></i></span>
                <i class="fa fa-angle-down"></i></a>
                <ul class="nav nav-list tree">
                  <router-link tag="li" to="/profile"><a href="#" v-lang.profile>Profile</a></router-link>
                  <router-link tag="li" to="/donations"><a href="#" v-if="user.donations"> <span v-lang.my_donations>My Donations</span> ({{user.donations.length}})</a></router-link>
                  <router-link tag="li" :to="'/dashboard/settings/basic'"><a href="#" v-lang.account_settings>Account Settings</a></router-link>
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
            <li class="font-14 mb-5"> <i class="fa fa-clock-o text-theme-colored"></i> <span v-lang.opening_hours>Mon-Fri 8:00am to 6:00pm</span> </li>
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
  <header id="header" class="header">
    <div class="header-top bg-theme-colored xs-text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="widget no-border m-0">
              <ul class="list-inline xs-text-center mt-5">
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
              <ul class="styled-icons icon-sm m-0 xs-text-center text-right">
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
    <div class="header-nav">

      <div class="header-nav-wrapper navbar-scrolltofixed bg-lightest" style="z-index: 1000;">

        <div class="container">

          <nav id="menuzord-right" class="menuzord orange bg-lightest menuzord-responsive" style=""><a href="javascript:void(0)" class="showhide" style="display: none;"><em></em><em></em><em></em></a>
            <router-link class="menuzord-brand" to="/">
              <img src="/src/assets/logo-hori.png" alt="" class="logo">
            </router-link>
            <ul class="menuzord-menu menuzord-right menuzord-indented scrollable" style="max-height: 400px;">
              <router-link tag="li" to="/" exact><a href="#" v-lang.home>Home</a></router-link>
              <router-link tag="li" to="/ideas"><a href="#" v-lang.fundraising_ideas>Fundraising Ideas</a></router-link>
              <router-link tag="li" to="/tour"><a href="#" v-lang.how_it_works>How It Works</a></router-link>
              <!-- <router-link tag="li" to="/help"><a href="#">Help</a></router-link> -->
              <router-link tag="li" to="/login" v-if="!$oauth.isAuthenticated()"><a href="#" v-lang.login>Login</a></router-link>
              <router-link tag="li" to="/register" v-if="!$oauth.isAuthenticated()"><a href="#" v-lang.create_account>Create Account</a></router-link>
              <router-link tag="li" v-if="$oauth.isAuthenticated()" to="/dashboard/" exact><a href="#" v-lang.dashboard>Dashboard</a></router-link>
              <li v-if="$oauth.isAuthenticated()"><a href="#"><i class="fa fa-user fs-25"></i>
                <span>{{user.shortname}}</span>
                <span v-if="!user.shortname"><i class="fa fa-spinner fa-spin"></i></span>
                <span class="indicator"></span></a>
                <ul class="dropdown" style="right: auto; display: none;">
                  <router-link tag="li" to="/profile"><a href="#" v-lang.profile>Profile</a></router-link>
                  <router-link tag="li" to="/donations"><a href="#" v-if="user.donations"> <span v-lang.my_donations>My Donations</span> ({{user.donations.length}})</a></router-link>
                  <router-link tag="li" :to="'/dashboard/settings/basic'"><a href="#" v-lang.account_settings>Account Settings</a></router-link>
                  <li class="scrollable-fix"></li>
                  <router-link tag="li" to="/fundraiser"><a href="#" v-lang.start_a_campaign>Start a Campaign</a></router-link>
                  <router-link tag="li" to="/logout"><a href="#" v-lang.sign_out>Sign Out</a></router-link>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div></div>
    </div>
  </header>
</div>
</template>
<script>
export default {
  name: "campaign-header",
  props: ['user', 'campaign'],
  data: function data() {
    return {

    }
  },
  mounted(){
     if ($('.menuzord  li  a  .fa-angle-down').length == 0) {
      $('.has-side-panel .body-overlay').unbind('click')
      window.THEMEMASCOT.header.init();
    }
  },
  beforeCreate() {

  }
}
</script>
<style lang="css">
#campaign-header #header .navbar-scrolltofixed{
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.25);
}
</style>
