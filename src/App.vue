<template>
<div id="app">
  <!-- Language select modal -->
  <div id="language-select" class="modal-promo-box mfp-hide bg-lightest verify-container">
    <h1 class="text-theme-colored">Select Preferred Language</h1>
    <p>The site should be displayed in?.</p>
    <div class="bs-language">
      <div aria-label="Language Select" role="group" class="btn-group">
        <button @click="selectLang('en')" class="btn btn-success font-24" type="button"><img src="/src/assets/images/maps/britain.gif" alt=""> English</button>
        <button @click="selectLang('fr')" class="btn btn-warning font-24" type="button"><img src="/src/assets/images/maps/france.gif" alt=""> French</button>
      </div>
    </div>
  </div>

  <div v-if="phoneNotVerified" class="phone-not-verified">
    <!-- <a id="phone-not-verified" class="popup-middleware hide" href="#phone-verify"></a> -->
    <div id="phone-verify" class="modal-promo-box mfp-hide bg-lightest verify-container">
      <h1 v-lang.please_verify_your_phone_number>Please verify your Phone Number</h1>
      <p><span v-lang.a_verification_code_was_sent_to>A verification code was sent to</span> +{{user.phone}}. <span v-lang.please_enter_it_below_and_click_on_verify>Please enter it below and click on verify</span>.</p>
      <p :class="{ 'control': true }">
        <div class="input-group">
          <input v-model="phoneToken" v-validate="'required|min:8|alpha_num'" :class="{'input form-control': true, 'is-danger': errors.has('code') }" type="text" id="phone-token" data-height="40px" class="form-control input-lg" placeholder="Enter the Code"
            name="code" title="Verification Code" style="height: 40px;">
          <span class="input-group-btn">
              <button v-if="!loading.phone" @click="verifyPhone()" type="button" class="btn btn-colored btn-theme-colored btn-xs m-0  font-17" data-height="40px" style="height: 40px;" v-lang.verify>Verify</button>
              <button v-if="loading.phone" type="button" class="btn btn-colored btn-theme-colored btn-xs m-0  font-17" data-height="40px" style="height: 40px;"><i class="fa fa-spinner fa-spin"></i></button>
            </span>
        </div>
      </p>
      <span v-show="errors.has('code')" class="help is-danger">{{ errors.first('code') }}</span>
    </div>
  </div>
  <div v-if="emailNotVerified" class="email-not-verified">
    <!-- <a id="email-not-verified" class="popup-middleware hide" href="#email-verify"></a> -->
    <div id="email-verify" class="modal-promo-box mfp-hide bg-lightest verify-container">
      <h1 v-lang.please_verify_your_email_address>Please verify your Email Address</h1>
      <p><span v-lang.a_confirmation_email_was_sent_to>A comfirmation email was send to</span> {{user.email}}. <span v-lang.check_your_mails_and_click_on_confirm_email>Check your mails and click on "Confirm Email".</span></p>
      <br><br>
      <div class="">
        <div class="text-warning font-17" v-lang.not_received_the_mail_msg>You haven't received the mail? re-enter your email address below and click on resend</div>
        <p :class="{ 'control': true }">
          <div class="input-group">
            <input v-model="email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" type="email" id="email" data-height="40px" placeholder="Enter your Email" name="email" title="Email Address" value="" style="height: 40px;">
            <span class="input-group-btn">
                <button v-if="!loading.email" @click="verifyEmail()" type="button" class="btn btn-colored btn-theme-colored btn-xs m-0 font-17" data-height="40px" style="height: 40px;" v-lang.resend>Resend</button>
                <button v-if="loading.email" type="button" class="btn btn-colored btn-theme-colored btn-xs m-0  font-17" data-height="40px" style="height: 40px;"><i class="fa fa-spinner fa-spin"></i></button>
              </span>
          </div>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
      </div>
    </div>
  </div>

  <loading-data v-if="($oauth.isAuthenticated() && loading.user) || dataLoader"></loading-data>
  <auth-header :user="user" v-if="$oauth.isAuthenticated() && !$route.meta.forCampaign && !$route.meta.campaign && !$route.meta.inRaiser && !$route.meta.forDashboard"></auth-header>
  <campaign-header :user="user" :campaign="campaign" :deleteCampaign="deleteCampaign" v-if="$route.meta.forCampaign || $route.meta.campaign || $route.meta.inRaiser"></campaign-header>
  <guest-header :user="user" v-if="!$oauth.isAuthenticated() && !$route.meta.forCampaign && !$route.meta.campaign && !$route.meta.inRaiser && !$route.meta.forDashboard"></guest-header>
  <dashboard-header :user="user" :campaign="campaign" :deleteCampaign="deleteCampaign" v-if="$oauth.isAuthenticated() && $route.meta.forDashboard"></dashboard-header>

  <router-view @campaignUpdated="campaignUpdated" :publicData="publicData" :dataLoader="dataLoader" :user="user" :campaign="campaign" :deleteCampaign="deleteCampaign" :setFavourite="setFavourite" :unsetFavourite="unsetFavourite"></router-view>

  <app-footer></app-footer>
</div>
</template>

<script>
import AuthHeader from './components/app/AuthHeader.vue'
import GuestHeader from './components/app/GuestHeader.vue'
import CampaignHeader from './components/app/CampaignHeader.vue'
import DashboardHeader from './components/app/DashboardHeader.vue'
import AppFooter from './components/app/Footer.vue'
import LoadingData from './components/app/LoadingData.vue'
import swal from 'sweetalert'
export default {
  components: {
    'auth-header': AuthHeader,
    'guest-header': GuestHeader,
    'campaign-header': CampaignHeader,
    'dashboard-header': DashboardHeader,
    'app-footer': AppFooter,
    'loading-data': LoadingData
  },
  name: 'app',
  data() {
    return {
      phoneNotVerified: false,
      emailNotVerified: false,
      phoneToken: '',
      email: '',
      user: {},
      campaign: {},
      loading: {
        phone: false,
        email: false,
        user: true,
      },
      dataLoader: false,
      publicData: []
    }
  },
  computed: {
    subnames() {
      if (this.user) {
        var splited = this.user.name.split(' ')
        this.user.nnames = splited.length
        this.user.subnames = []
        for (var i = 0; i < splited.length; i++) {
          this.user.subnames[i] = splited[i]
        }
        if (this.user.nnames > 1) {
          this.user.shortname = this.user.subnames[0] + ' ' + this.user.subnames[1]
        } else {
          this.user.shortname = this.user.name
        }
        return this.user.shortname
      }else{
        return false
      }
    }
  },
  methods: {
    loadScript(url, callback) {
      $.ajax({
        url: url,
        dataType: "script",
        async: false, // <-- This is the key
        success: function(response) {
          callback();
        },
        error: function() {
          throw new Error("Could not load script " + url);
        }
      });
    },
    selectLang(lang){
      this.language = lang;
      localStorage.setItem('languageSelectedByUser', 1);
      window.location.reload();
    },
    campaignUpdated(data){
      // alert('campaignUpdated')
      this.campaign = data
    },
    deleteCampaign(link_id) {
      var that = this
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover this Campaign!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            that.$http.delete('api/campaign/' + link_id)
              .then(response => {
                swal({
                    title: "Deleted!",
                    text: "Your Campaign has been deleted.",
                    type: "success",
                    closeOnConfirm: false,
                  },
                  function(isConfirm) {
                    window.location = '/fundraiser'
                  }
                );
              })
              .catch(e => {
                console.log(e);
                if (e.status === 404) {
                  swal({
                      title: "Deleted!",
                      text: "Your Campaign has been deleted.",
                      type: "success",
                      closeOnConfirm: false,
                    },
                    function(isConfirm) {
                      window.location = '/fundraiser'
                    }
                  );
                }
              })

          } else {
            swal({
                title: "Cancelled!",
                text: "Your Campaign is safe :)",
                type: "error",
                closeOnConfirm: false,
              },
              function(isConfirm) {
                window.location.reload()
              }
            );
          }
        });
    },
    setFavourite(campaign){
      var data = {
        id: campaign.id,
      }
      var that = this
      this.$http.post('api/favourite', data)
                .then(response => {
                  this.user.favourites.push(campaign)
                  swal('Done!', 'Campaign Added to Favourites', 'success')
                })
    },
    unsetFavourite(campaign){
      var data = {
        id: campaign.id,
      }
      var that = this
      swal({
          title: "Are you sure?",
          text: "You are about to remove this Campaign from your Favourites!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, remove it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            that.$http.delete('api/favourite', data)
                      .then(response => {
                        swal('Done!', 'Campaign Removed from Favourites', 'success')
                        var index = that.user.favourites.indexOf(campaign);
                        that.user.favourites.splice(index, 1)
                      })
          } else {
            swal({
                title: "Cancelled!",
                text: "Campaign NOT removed from your Favourites :)",
                type: "error",
                closeOnConfirm: true,
              }
            );
          }
        });
    },
    setAuth() {
      this.$http.get('api/user')
        .then(function(response) {
          this.$oauth.setAuthUser(response.body)
          this.user = this.$oauth.getAuthUser()
          var sumRaised = 0;
          var sumGoal = 0;
          for (var c in this.user.campaigns) {
            //get the sum of all donations
            var raised = 0
            for (var i in this.user.campaigns[c].donations) {
              raised += parseInt(this.user.campaigns[c].donations[i].amount)
            }
            this.user.campaigns[c].raised = raised
            sumGoal += parseInt(this.user.campaigns[c].goal)
            sumRaised += parseInt(this.user.campaigns[c].raised)

            //calculate the percentage raised
            var percent = (parseInt(this.user.campaigns[c].raised) / parseInt(this.user.campaigns[c].goal)) * 100;
            if (percent > 100) {
              percent = 100;
            }
            this.user.campaigns[c].percent = Math.round(percent * 100) / 100;

          }

          this.user.sumGoal = sumGoal
          this.user.sumRaised = sumRaised

          for (var f in this.user.favourites) {
            //get the sum of all donations
            var raised = 0
            for (var j in this.user.favourites[f].donations) {
              raised += parseInt(this.user.favourites[f].donations[j].amount)
            }
            this.user.favourites[f].raised = raised
            sumGoal += parseInt(this.user.favourites[f].goal)
            sumRaised += parseInt(this.user.favourites[f].raised)

            //calculate the percentage raised
            var percent = (parseInt(this.user.favourites[f].raised) / parseInt(this.user.favourites[f].goal)) * 100;
            if (percent > 100) {
              percent = 100;
            }
            this.user.favourites[f].percent = Math.round(percent * 100) / 100;

          }

          //get the total money withdrew by the current user
          var sumWithdrawals = 0;
          for (var w in this.user.withdrawals) {
            sumWithdrawals += parseInt(this.user.withdrawals[w].amount)
          }
          this.user.sumWithdrawals = sumWithdrawals

          //get the total money transfer out by the current user
          var sumTransferOut = 0;
          for (var to in this.user.transfer_out) {
            sumTransferOut += parseInt(this.user.transfer_out[to].amount)
          }
          this.user.sumTransferOut = sumTransferOut

          //get the total money transfer In to the current user
          var sumTransferIn = 0;
          for (var ti in this.user.transfer_in) {
            sumTransferIn += parseInt(this.user.transfer_in[ti].amount)
          }
          this.user.sumTransferIn = sumTransferIn

          this.loading.user = false
          if (this.user.phone_verified == 0) {
            this.phoneNotVerified = true
            setTimeout(function() {
              $.magnificPopup.open({
                type: 'inline',

                items: {
                  src: '#phone-verify',
                },

                fixedContentPos: false,
                fixedBgPos: true,
                closeOnBgClick: false,
                overflowY: 'auto',

                showCloseBtn: false,
                preloader: false,

                midClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in popup-middleware'
              });
            }, 0)

          } else if (this.user.email_verified == 0) {
            this.emailNotVerified = true
            setTimeout(function() {
              $.magnificPopup.open({
                type: 'inline',

                items: {
                  src: '#email-verify',
                },

                fixedContentPos: false,
                fixedBgPos: true,
                closeOnBgClick: false,
                overflowY: 'auto',

                showCloseBtn: false,
                preloader: false,

                midClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in popup-middleware'
              });
            }, 0)
          }

          if (this.$route.query.imgUploaded && this.$route.path == '/profile') {
            if (localStorage.getItem('ImgUploadedUrl')) {
              var that = this
              swal({
                  title: "Congratulations!!",
                  text: 'Your Profile photo has been updated',
                  type: "success",
                  closeOnConfirm: true,
                });

              localStorage.removeItem('ImgUploadedUrl')
            }
          }
          var subnames = this.subnames
        })
        .catch(e => {
          console.log(e)
        })
    },
    getCampaign() {
      if ((this.$route.meta.campaign || this.$route.meta.forCampaign) && this.$route.params.link && this.$route.params.user) {
        //do something after creating vue instance
        var link_id = this.$route.params.link

        this.$http.get('api/campaign/' + this.$route.params.user + '/' + link_id)
          .then(response => {
            this.campaign = response.body

            //get the sum of all donations
            var raised = 0
            for (var i in this.campaign.donations) {
              raised += parseInt(this.campaign.donations[i].amount)
            }
            this.campaign.raised = raised

            //calculate the percentage raised
            var percent = (parseInt(this.campaign.raised) / parseInt(this.campaign.goal)) * 100;
            if (percent > 100) {
              percent = 100;
            }
            this.campaign.percent = Math.round(percent * 100) / 100;

            //check if any campaign image was uploaded
            if (this.$route.query.imgUploaded) {
              if (localStorage.getItem('ImgUploadedUrl')) {
                var that = this
                swal({
                    title: "Congratulations!!",
                    text: 'Your Campaign photo has been added',
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "rgb(255,175,0)",
                    cancelButtonColor: "rgb(255,0,0)",
                    confirmButtonText: "Next Step",
                    cancelButtonText: "Delete Campaign",
                    closeOnConfirm: false,
                    closeOnCancel: false
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      window.location = '/fundraiser/' + response.body.link_id + '/story'
                    } else {
                      that.deleteCampaign(that.campaign.link_id)
                    }
                  });

                localStorage.removeItem('ImgUploadedUrl')
              }
            }
          })
          .catch(e => {
            if (e.status === 404) {
              this.$router.push('/'+e.body.data.uname+'/' + link_id + '/404')
            } else if (e.status === 401) {
              console.log(e)
              window.SimilarCampaigns = e.body.data
              this.$router.push('/'+e.body.data.uname+'/' + link_id + '/401')
            } else if (e.status === 410) {
              console.log(e)
              window.SimilarCampaigns = e.body.data
              this.$router.push('/'+e.body.data.uname+'/' + link_id + '/410')
            }
          })
      }
    },
    getAuthCampaign() {
      if ((this.$route.meta.inRaiser || this.$route.meta.forDashboard) && this.$route.path != '/fundraiser' && this.$route.params.link) {

        var link_id = this.$route.params.link

        this.$http.get('api/campaign/' + link_id)
          .then(response => {
            this.campaign = response.body
            //get the sum of all donations
            var raised = 0
            for (var i in this.campaign.donations) {
              raised += parseInt(this.campaign.donations[i].amount)
            }
            this.campaign.raised = raised

            //calculate the percentage raised
            var percent = (parseInt(this.campaign.raised) / parseInt(this.campaign.goal)) * 100;
            if (percent > 100) {
              percent = 100;
            }
            this.campaign.percent = Math.round(percent * 100) / 100;

            //check if any campaign image was uploaded
            if (this.$route.query.imgUploaded) {
              if (localStorage.getItem('ImgUploadedUrl')) {
                var that = this
                swal({
                    title: "Congratulations!!",
                    text: 'Your Campaign photo has been added',
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "rgb(255,175,0)",
                    cancelButtonColor: "rgb(255,0,0)",
                    confirmButtonText: "Next Step",
                    cancelButtonText: "Delete Campaign",
                    closeOnConfirm: false,
                    closeOnCancel: false
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      window.location = '/fundraiser/' + response.body.link_id + '/story'
                    } else {
                      that.deleteCampaign(that.campaign.link_id)
                    }
                  });

                localStorage.removeItem('ImgUploadedUrl')
              }
            }
          })
          .catch(e => {
            if (e.status === 404) {
              this.$router.push('/dashboard/' + link_id + '/404')
            } else if (e.status === 401) {
              console.log(e)
              window.SimilarCampaigns = e.body.data
              this.$router.push('/dashboard/' + link_id + '/401')
            } else if (e.status === 410) {
              console.log(e)
              window.SimilarCampaigns = e.body.data
              this.$router.push('/dashboard/' + link_id + '/410')
            }
          })
      }
    },
    verifyPhone() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading.phone = true
          var data = {
            command: 'verify-phone',
            token: this.phoneToken
          }
          this.$http.post('api/user', data)
            .then(function(response) {
              this.loading.phone = false
              if (response.status === 200) {
                console.log(response)
                swal({
                    title: "Good job!",
                    text: response.body.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Next Step",
                    closeOnConfirm: false
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      window.location.reload()
                    } else {
                      window.location.reload()
                    }
                  });
              }
            })
            .catch(function(e) {
              this.loading.phone = false
              var msg = ''
              if (e.status === 203) {
                if (e.body.token) {
                  this.errors.add('code', e.body.token[0]);
                  msg = msg +
                    '<div id="phone-verification-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Verification failed!</strong> ' +
                    e.body.token[0] + '</div>'
                }
              } else {
                // alert(e.body.message)
                msg =
                  '<div id="phone-verification-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Verification failed!</strong> ' +
                  e.body.message + '</div>'
              }
              $('#phone-verify').prepend(msg)
            })

        }
      })
    },
    verifyEmail() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading.email = true
          var data = {
            command: 'verify-email',
            email: this.email
          }
          this.$http.post('api/user', data)
            .then(function(response) {
              this.loading.phone = false
              if (response.status === 200) {
                console.log(response)
                swal({
                    title: "Mail Sent!",
                    text: response.body.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Click here after confirming the email.",
                    closeOnConfirm: false
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      window.location = '/fundraiser'
                    } else {
                      window.location = '/fundraiser'
                    }
                  });
              }
            })
            .catch(function(e) {
              this.loading.email = false
              var msg = ''
              if (e.status === 203) {
                if (e.body.email) {
                  this.errors.add('code', e.body.email[0]);
                  msg = msg +
                    '<div id="email-verification-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mail Not Sent!</strong> ' +
                    e.body.email[0] + '</div>'
                }
              } else {
                // alert(e.body.message)
                msg =
                  '<div id="email-verification-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mail Not Sent!</strong> ' +
                  e.body.message + '</div>'
              }
              $('#email-verify').prepend(msg)
            })
        }
      })
    },
  },
  watch: {
    $route: function(val) {
      // alert('watched')
      if (this.$oauth.isAuthenticated()) {
        this.setAuth()
        //get campaign if in campaign pages
        this.getCampaign();

        //get campaign for owner
        this.getAuthCampaign();
      }else if(this.$route.meta.campaign || this.$route.meta.forCampaign){
        this.getCampaign();
      }

      // if (!this.phoneNotVerified && !this.emailNotVerified) {

      if (this.$route.meta.inRaiser || this.$route.meta.forLogin || this.$route.meta.forRegister || this.$route.meta.forCampaign || this.$route.meta.forHelp || this.$route.meta.forDashboard) {
        $('body').addClass('bkbody')
      } else if (this.$route.meta.campaign) {
        $('body').addClass('bkcampaign')
      } else {
        $('body').removeClass('bkbody')
        $('body').removeClass('bkcampaign')
      }
      // }
      //Initializing some plugins
      // window.THEMEMASCOT.initialize.init();

      var $document = $(document);
      var $window = $(window);

      $document.ready(
        window.THEMEMASCOT.documentOnReady.init
      );
      $window.on('load',
        window.THEMEMASCOT.windowOnLoad.init
      );
      $window.on('resize',
        window.THEMEMASCOT.windowOnResize.init
      );

    },
    user: function (val) {
      if (this.$route.path == '/dashboard') {
        // window.THEMEMASCOT.header.init();
      }

    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    if (this.$oauth.isAuthenticated()) {
      this.setAuth()
      //get campaign if in campaign pages
      this.getCampaign();

      //get campaign for owner
      this.getAuthCampaign();
    }else if(this.$route.meta.campaign || this.$route.meta.forCampaign){
      this.getCampaign();
    }

    var that = this
    setTimeout(function() {
      var $preloader = $('#preloader');
      $preloader.delay(200).fadeOut('slow');
      localStorage.removeItem('alreadyInit');
      if (that.$route.meta.inRaiser || that.$route.meta.forLogin || that.$route.meta.forRegister || that.$route.meta.forCampaign || that.$route.meta.forHelp || that.$route.meta.forDashboard) {
        $('body').addClass('bkbody')
      } else if (that.$route.meta.campaign) {
        $('body').addClass('bkcampaign')
      } else {
        $('body').removeClass('bkbody')
        $('body').removeClass('bkcampaign')
      }
    }, 0);


    if (!localStorage.getItem('languageSelectedByUser')) {
      setTimeout(function() {
        $.magnificPopup.open({
          type: 'inline',

          items: {
            src: '#language-select',
          },

          fixedContentPos: false,
          fixedBgPos: true,
          closeOnBgClick: false,
          overflowY: 'auto',

          showCloseBtn: true,
          preloader: false,

          midClick: false,
          removalDelay: 300,
          mainClass: 'my-mfp-zoom-in popup-middleware'
        });
      }, 0)
    }


  },
  updated() {
    var $preloader = $('#preloader');
    $preloader.delay(200).fadeOut('slow');

  },
  beforeUpdate: function beforeUpdate() {
    //do something before updating vue instance
    if ($('body').scrollTop() > 0) {
      // $('body').scrollTop(0);
    }
  },
  created() {
    var local_alert = localStorage.getItem('alert')
    localStorage.removeItem('alert')
    if (local_alert) {
      if (local_alert == 'email-verified') {
        swal({
            title: "Congratulations!!",
            text: 'You have successfully completed your Verifications. You can now start a Campaign or views trending ones.',
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Launch a Campaigns",
            cancelButtonText: "Views Campaigns",
            closeOnConfirm: false
          },
          function(isConfirm) {
            if (isConfirm) {
              window.location = '/fundraiser'
            } else {
              window.location = '/'
            }
          });
      }
    }

    this.$http.get('api/public/data')
              .then(response => {
                this.publicData = response.body
              })

  }
}
</script>

<style>
html {
  max-width: 100%;
  overflow-x: hidden;
}

.preloader-dot-loading {
  max-width: none !important;
  overflow-x: visible;
}

.cssload-loading {
  max-width: none !important;
  overflow-x: visible;
}

#spinner {
  max-width: none !important;
  overflow-x: visible;
}

body {
  font-family: 'Lato', Lato, Arial, sans-serif;
  font-weight: 300;
  color: #333;
  max-width: 100%;
  overflow-x: hidden;
}

.logo {
  width: 193px;
  height: 85px;
  max-height: 85px !important;
  margin-top: -25px;
}

iframe {
  width: 100% !important;
}

.fluid-width-video-wrapper {
  max-height: 360px  !important;
  padding-top: 53% !important;
}

a{
  cursor: pointer !important;
}

.mfp-wrap.popup-middleware {
  position: fixed !important;
  top: 0% !important;
}

.input.is-danger {
  border-color: red !important;
}

.help.is-danger {
  color: red !important;
}

.error-box {
  position: absolute !important;
  z-index: 2000;
}

[type=color]:focus,
[type=date]:focus,
[type=datetime-local]:focus,
[type=datetime]:focus,
[type=email]:focus,
[type=month]:focus,
[type=number]:focus,
[type=password]:focus,
[type=search]:focus,
[type=tel]:focus,
[type=text]:focus,
[type=time]:focus,
[type=url]:focus,
[type=week]:focus,
textarea:focus {
  /*border: 1px solid #bbb;*/
  background-color: #fff;
  outline: 0;
  box-shadow: none;
  transition: border-color .25s ease-in-out;
}

input[type=search] {
  font-weight: 400;
  -webkit-appearance: none;
}

[type=color],
[type=date],
[type=datetime-local],
[type=datetime],
[type=email],
[type=month],
[type=number],
[type=password],
[type=search],
[type=tel],
[type=text],
[type=time],
[type=url],
[type=week],
textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 2.5625rem;
  padding: .5rem;
  /*border: 1px solid #ddd;*/
  margin: 0 0 1rem;
  font-family: inherit;
  font-size: 1.125rem;
  color: #0a0a0a;
  background-color: #fff;
  box-shadow: none;
  /*border-radius: 4px;*/
  transition: border-color .25s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input {
  line-height: normal;
}

input[type=search] {
  box-sizing: border-box;
}

.custom-input input.form-control {
  padding: 8px 10px 8px 10px;
  margin: 0 0 17px 0;
  border-radius: 7px !important;
  border: 1px solid #cccccc;
  box-shadow: inset 1px 1px 2px #cccccc;
  font-size: 15px;
  height: auto;
  line-height: 17px;
  color: #666666;
  font-family: lato, sans-serif;
  font-weight: 300;
}

.causes .progress-item .progress-bar .percent {
  right: -20px;
}

.bkbody {
  background: url(assets/images/body_bkgrd.jpg) repeat;
}

.bkcampaign {
  background: #f9faf5;
}

.hover-bg-theme-colored:hover {
  background: #FFAB00 !important;
}

#summernote{
  border: none;
}
.note-editor.note-frame {
  /*border: none;*/
  margin: 30px 20px;
  max-height: 400px !important;
}
.n-ml-100{
  margin-left: -100px !important;
}
.note-editor.note-frame.fullscreen {
  margin: 0px !important;
}

.arrow-after {
  background: url(assets/images/arw-gray.png) no-repeat right bottom 20px;
  display: inline-block;
  margin-right: 30px;
  padding-right: 70px;
}

.v-select.searchable .dropdown-toggle {
  border: none;
}

.v-select .selected-tag {
  font-size: 18px;
  font-weight: 300;
  font-family: Arial, Helvetica, sans-serif;
  background: none;
  border: none;
}

#social-shares span {
  cursor: pointer;
}

.dotted-line,
.underline {
  background: 0px 0px;
  border-bottom: 1px dotted rgb(202, 202, 202);
}

.supporter-title {
  font-size: 0.875rem;
  font-weight: 900;
  margin-bottom: 1rem;
  padding-bottom: 0.3125rem;
}

.avatar-contain {
  float: left;
  height: 2.8125rem;
  position: relative;
  width: 2.8125rem;
}

.media-round.thumbnail.avatar-no-pic {
  border-width: 0.0625rem;
  border-style: solid;
  border-color: rgb(221, 221, 221);
  border-image: initial;
  padding: 0px;
}

.avatar-no-pic {
  color: rgb(187, 187, 187);
  font-size: 0.875rem;
  line-height: 2.8125rem;
  height: 100%;
  text-align: center;
  width: 100%;
  background: rgb(255, 255, 255);
}

.supporter-info,
.wishlist-info {
  margin-left: 4.0625rem;
  word-wrap: break-word;
  line-height: 1.375rem;
  position: relative;
}

.supporter-time {
  color: rgb(102, 102, 102);
  font-size: 0.875rem;
  margin-bottom: 0.8125rem;
}

.text-black {
  color: rgb(51, 51, 51) !important;
}

.co-info {
  display: flex;
  align-items: flex-start;
  line-height: 1.3125rem;
}

.ml {
  margin-left: 1rem;
}

.co-details {
  margin-left: 1.25rem;
}

.media-round {
  border-radius: 50%;
}

.supporter-name {
  font-size: 1.0625rem;
  font-weight: 400;
}

.created-date,
.funds-info {
  font-size: 0.875rem;
  margin-right: 1rem;
  margin-left: 1rem;
}

.supporter-amount {
  font-weight: 900;
}

.column,
.columns {
  float: left;
}

.column:last-child:not(:first-child),
.columns:last-child:not(:first-child) {
  float: right;
}

.row.collapse>.column,
.row.collapse>.columns {
  padding-left: 0px;
  padding-right: 0px;
  font-size: 1.0625rem;
}

.heart {
  font-size: 0.75rem;
  text-align: center;
  margin-right: 20px;
}

.supporter-info .collapse {
  display: block;
}

.column.row.row,
.row.row.columns {
  float: none;
}

.supporter .fb-share,
.supporter .fb-share .fa {
  color: rgb(59, 87, 157);
}

.actionable-text,
.read-more {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 900;
  margin-bottom: 1rem;
  height: 1.3125rem;
}

.donations-control-footer {
  padding-left: 1rem;
  padding-right: 1rem;
}

.btn-page,
.button.secondary {
  background: #fff;
  border: 1px solid #f9f9f9;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .25);
  /*color: #5d8000;*/
  font-weight: 900;
}

.large-6 {
  width: 50%;
}

.large-10 {
  width: 83.33333%;
}

.actionable-text,
.read-more {
  display: inline-block;
  font-size: .875rem;
  font-weight: 900;
  margin-bottom: 1rem;
  height: 1.3125rem;
}

.small-12 {
  width: 100%;
}

.button {
  padding: .625rem;
  text-align: center;
  line-height: 1;
  -webkit-appearance: none;
  transition: background-color .25s ease-out, color .25s ease-out;
  vertical-align: middle;
  border-radius: 4px;
  margin: 0 0 1rem 0;
  font-size: .875rem;
  cursor: pointer;
}

.button.secondary .fa-plus-sm {
  font-size: .75rem;
}

.button.expanded {
  display: block;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  cursor: pointer;
  font-weight: 600;
}

.button.secondary.is-loading {
  background: #f8f8f8;
}

.button .fa-spin {
  opacity: .6;
}

.fa-spin {
  animation: fa-spin 2s infinite linear;
}

.text-small {
  color: #666;
  font-size: .875rem;
}

.topbar {
  background: #FFBC00;
}

.topbar {
  width: 100%;
  height: 7px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: 0px auto 20px;
}

.supporter-info p {
  line-height: 1.375rem;
  font-size: 16px;
  font-family: Lato, Arial, sans-serif;
  font-weight: 100;
}

.fave-contain .fa-heart {
  display: block;
  font-size: .875rem;
  position: relative;
}

.media-round {
  border: 0 solid transparent;
  padding: 0px;
}

.text-color {
  color: #333;
}

.hollow.button {
  border: 1px solid #FFBC00;
  color: #5d8000;
}

.button.hollow,
.button.hollow:focus,
.button.hollow:hover {
  background-color: transparent;
}

.photoframe {
  width: 100%;
  height: auto;
  /*margin-top: 20px;*/
  overflow: hidden;
}

.photoframe img {
  width: 100%;
}

.aboutorganizerheadline {
  width: 306px;
  float: right;
  font-family: montserrat, sans-serif;
  font-size: 14px;
  color: rgb(102, 102, 102);
  margin: 30px 0px 5px;
}

.aboutorganizer {
  float: right;
  width: 284px;
  margin-bottom: 20px;
  padding: 10px;
  border-width: 1px 1px 3px;
  border-style: solid;
  border-color: rgb(232, 232, 232) rgb(232, 232, 232) rgb(227, 227, 227);
  border-image: initial;
  border-bottom: 3px solid rgb(227, 227, 227);
  border-radius: 5px;
}

.categories .img,
.aboutorganizer .img {
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 4px;
  overflow: hidden;
}

.fbusername {
  word-break: break-all;
  max-height: 40px;
  font-size: 16px;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.donatesprite-mail {
  width: 16px;
  height: 12px;
  margin-right: 5px;
  background-position: 0px -176px;
}

.categories .smalltext,
.aboutorganizer .smalltext {
  display: inline;
  font-size: 12px;
  color: rgb(102, 102, 102);
  position: relative;
  top: 2px;
}

.categories .mediumtext,
.aboutorganizer .mediumtext {
  font-size: 13px;
  color: rgb(102, 102, 102);
}

.error-box,
.general-error {
  color: rgb(255, 255, 255);
  display: inline-block;
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 20px;
  position: relative;
  right: 0;
  min-width: 240px;
  background: rgb(216, 127, 127);
  padding: 10px 20px;
}

.error-box::before {
  content: "";
  height: 0px;
  left: 22px;
  position: absolute;
  top: -10px;
  width: 0px;
  border-color: transparent transparent rgb(216, 127, 127);
  border-style: solid;
  border-width: 0px 25px 20px;
}

.fr {
  float: right;
}







/*css for form*/

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

#donate-container .col-md-8,
#donate-container .col-md-4 {
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

.donationsprite {
  background: url(assets/images/donate_sprite.png) no-repeat top left;
  display: inline-block;
}

.donatesprite-arrow {
  background-position: 0 -17px;
  width: 59px;
  height: 23px;
  margin-left: 10px;
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

.donationamount,
.zeros,
.dollarsign,
.donationcommentbox .photo,
.headbar,
.gfm_lb_main,
.section_head,
.doner .rewbox,
.light-bkgd,
.reward .title,
.wishlist .title,
.rewardna:hover .title,
.donationform .autocomplete a:hover,
.selected,
.gfm_dropdown_option:hover,
.gfm_dropdown_option.odd:hover,
.greencontainer {
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
  height: 155px;
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







/*end of css for form*/

.setup .twothirds-box {
  background: #fff;
  border: 2px solid #ddd;
  box-shadow: 2px 1px 2px 0px rgba(0, 0, 0, 0.05);
  float: none;
  margin: 0 auto 50px;
  position: relative;
}

.twothirds-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #333;
  float: left;
  font-weight: 300;
  /*width: 100%;*/
  /*width: 592px;*/
}

.twothirds-box.extra-shadow {
  -webkit-box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.left {
  text-align: left !important;
}

.nobb {
  border-bottom: none !important;
}

.nobt {
  border-top: none !important;
}

.one.arw,
.mce-floatpanel.mce-window .mce-window-head {
  background: url(assets/images/arw-gray.png) no-repeat right bottom 28px;
  display: inline-block;
  margin-right: 30px;
  padding-right: 70px;
}

.one {
  font-size: 36px;
  line-height: 38px;
  padding: 25px 30px;
  padding-right: 30px;
}

.two.two--height.pt0 {
  height: 240px
}

.two--height {
  height: 184px;
}

.two--gray {
  background-color: #eee;
}

.two {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  line-height: 18px;
  padding: 30px;
  padding-top: 30px;
  padding-right: 30px;
  padding-left: 30px;
  text-align: center;
}

.pt0 {
  padding-top: 0 !important;
}

.no-hpadding {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

a.upotns {
  font-family: Montserrat, sans-serif;
  color: #666 !important;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none !important;
  cursor: pointer;
}

.twothirds-box a {
  text-decoration: none;
}

.raise-box {
  background: #fff;
  border: 2px solid #ddd;
  box-shadow: 2px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.upotns {
  float: left;
  width: 161px;
  height: 134px;
  background: #fff;
  border: 1px solid #ddd;
  margin-top: 30px;
  margin-bottom: 25px;
  border-radius: 5px;
  cursor: pointer;
}

.mr20 {
  margin-right: 20px !important;
}

.ml30 {
  margin-left: 30px !important;
}

.optimg.fb {
  background: url(assets/images/photovideo.png) no-repeat 20px -64px;
  margin-left: 46px;
}

.optimg {
  display: block;
  height: 64px;
  width: 65px;
  margin-top: 25px;
  margin-bottom: 15px;
  margin-left: 43px;
}

.optimg.up {
  background: url(assets/images/photovideo.png) no-repeat 21px 0;
  margin-left: 46px;
}

.optimg.yt {
  background: url(assets/images/photovideo.png) no-repeat 0 -128px;
  margin-left: 48px;
}

.clear {
  clear: both;
}

.three {
  min-height: 84px;
  padding: 30px 30px 0;
  padding-top: 30px;
  position: relative;
}

a.goback {
  background: url(assets/images/sprite_1.png) no-repeat 0 0;
  padding-left: 22px;
}

a.goback,
.ltlnk {
  left: 30px;
  right: auto;
}

.rtlnk,
a.rtlnk,
.ltlnk,
a.goback,
.mce-floatpanel .mce-btn.mce-last button {
  position: absolute;
  right: 30px;
  font-family: Montserrat, sans-serif;
  color: #999 !important;
  font-size: 12px;
  line-height: 12px;
  text-transform: uppercase;
  text-decoration: none !important;
  top: 50px;
  z-index: 0;
}

.three a {
  color: #333;
}

.lb1 {
  left: 50%;
}

.lb1,
.lb2 {
  float: left;
  position: relative;
}

.lb2 {
  left: -50%;
}

.lb1,
.lb2 {
  float: left;
  position: relative;
}

.btn.next2 {
  min-width: 250px;
}

.btn_check {
  background: #F5A409;
  float: left;
  padding-right: 20px;
  padding-top: 15px;
  padding-left: 80px;
}

.next2,
.mce-floatpanel .mce-btn.mce-primary button {
  background: #F5A409;
  border-radius: 5px;
  border-bottom: 3px solid #E2960B;
  color: #fff !important;
  float: left;
  font-family: montserrat, sans-serif;
  font-size: 20px;
  font-weight: 600;
  height: 55px;
  padding-top: 15px;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
  text-shadow: 1px 1px 1px #8C4600 !important;
  text-decoration: none !important;
  min-width: 55px;
}

.loading3 {
  margin: 0 auto;
  width: 278px;
  height: 52px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: rgb(255, 175, 0);
}

.loading3 .loader {
  width: 256px;
  background-position: 66px 8px !important;
}

.loading .two,
.loading2 .two,
.loading .loader,
.loading2 .loader,
.loading3 .loader,
.loady-line {
  display: block;
  padding: 0;
  margin: 10px auto 0;
  width: 256;
  height: 30px;
  border: 1px solid #ccc;
  background: #fff url(/src/assets/images/load.gif) no-repeat 57px 8px !important;
  background-position-x: 97px;
  background-position-y: 8px;
}

.one.good {
  text-align: center;
}

.two--green {
  background-color: #F3F9E3;
}

.readyitem {
  background: url(/src/assets/images/grncheck.png) no-repeat 10px 0;
  color: #666;
  display: block;
  font-size: 18px;
  line-height: 26px;
  margin-left: 30px;
  margin-top: 24px;
  padding: 0 25px 0 45px;
  text-align: left;
}

.rtlnk,
a.rtlnk,
.ltlnk,
a.goback,
.mce-floatpanel .mce-btn.mce-last button {
  position: absolute;
  right: 30px;
  font-family: Montserrat, sans-serif;
  color: #999 !important;
  font-size: 12px;
  line-height: 12px;
  text-transform: uppercase;
  text-decoration: none !important;
  top: 50px;
  z-index: 0;
}

.clnk {
  height: 60px;
  width: 100%;
  /*background: #F3F9E4;*/
  color: #5F7E19;
  /*display: table-cell;*/
  font-size: 24px;
  line-height: 60px;
  padding-left: 30px;
  border-bottom: 0;
  cursor: text;
  vertical-align: middle;
}

.copy_link {
  background: #ffffff;
  border-radius: 6px;
  border: solid 1px #ddd;
  color: #666;
  cursor: text;
  display: block;
  width: 100%;
  font-family: 'Lato', Lato, Arial, sans-serif;
  font-size: 30px;
  font-weight: lighter;
  padding: 20px 20px 20px 20px;
  /*text-indent: -165px;*/
}

.sbc {
  padding: 20px 30px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}






/*Style for CampaignType.vue*/

.header-tile {
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .25);
  color: #fff !important;
  position: relative;
  text-align: center;
}

.bg-header {
  background: url('/src/assets/images/wallpapers/brown.jpeg') no-repeat;
  background-size: 100% auto;
}

.header-tile h1 {
  margin-top: -80px;
}

.header-tile h1,
.header-tile h2 {
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1.5;
  margin-bottom: 0;
  color: #fff !important;
}

.small-centered {
  float: none;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.0625rem;
  font-family: Lato, Arial, sans-serif;
  font-weight: 400;
  line-height: 1.5;
}

.header-tile--wide h2 {
  line-height: 1.3;
}

.category-highlight {
  font-family: Lato, Arial, sans-serif;
  line-height: 1.5;
  font-size: 1.0625rem;
  font-weight: 600;
}

.button.primary,
.theme-gfmgreen .button.primary {
  background: #f7b231;
  background: linear-gradient(to bottom, #f7b231 0, #de9440 100%);
  border-top-color: #f7b231;
  border-bottom: 3px solid #c68f42;
  font-weight: 600;
}

.button.expanded {
  display: block;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.small-12 {
  width: 100%;
}

.button.primary {
  color: #fff;
}

.search-with-icon {
  position: relative;
}

.header-tile-footer input[type=search] {
  margin-bottom: 0;
}

.marquee-contain--dark input[type=search],
.search-dark input[type=search] {
  background: rgba(0, 0, 0, .3);
  border-color: #fff;
  color: #fff !important;
}

.marquee-contain--dark .search-with-icon::before,
.search-dark .search-with-icon::before {
  color: #fff;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fff;
}

.search-drop,
.top-bar ul.search-drop {
  background: #fff;
  border: 1px solid #f8f8f8;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .25);
  position: absolute;
  margin-left: 0;
  text-align: left;
  top: 2.375rem;
  width: 100%;
  z-index: 31;
}

.link-bar {
  display: block;
  font-size: .875rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.card,
.category-arrows-contain,
.header-sub,
.layer-theme,
.layer-white,
.link-bar {
  background: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .25);
  padding-top: .875rem;
  padding-bottom: .875rem;
  position: relative;
  z-index: 20;
}

.campaign-mgmt .action-card,
.campaign-mgmt .layer-white-btn,
.campaign-mgmt .unreplied-donation,
.card,
.category-arrows-contain,
.header-sub,
.layer-theme,
.layer-white,
.overlay-header {
  padding-left: 1rem;
  padding-right: 1rem;
}

.cf::after {
  clear: both;
}

.cf::before,
.cf::after {
  content: "";
  display: table;
}

.details.details--goal::before,
.details.details--updates::before,
.details.details--description::before {
  background: url(/src/assets/images/updates-arrow2.png) no-repeat;
  content: "";
  height: 45px;
  margin-left: -24px;
  margin-top: 50px;
  position: absolute;
  width: 25px;
}

.details.details--description {
  font-size: 17px;
  height: auto;
  margin-top: -558px;
  max-width: 390px;
  min-width: 230px;
  width: 50%;
}

.details.details--updates,
.details.details--description {
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);
  /*height: 230px;*/
  margin-right: -360px;
  margin-top: -362px;
  float: right;
  /*width: 360px;*/
  clear: right;
  position: relative;
  z-index: 0;
}

.details {
  float: right;
  width: 304px;
  height: 518px;
  border: 1px solid #ddd;
  -webkit-box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.two--white {
  background-color: #fff;
}

.round5 {
  border-radius: 5px;
}

.img-coach {
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
  height: 60px;
  position: absolute;
  right: 10px;
  top: 8px;
  width: 60px;
  background: white;
  z-index: 100;
}

.headbar--writingtips {
  height: auto;
  line-height: 1.3;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-right: 77px;
}

.details-content {
  padding: 14px 20px 20px;
}

.details-content-header {
  color: #666;
  max-width: 300px;
  width: 15vw;
}

.details.details--description .dykitem {
  background: url(/src/assets/images/grncheck-sm.png) no-repeat 0 3px;
  margin-top: 18px;
  padding-left: 28px;
}

.details.details--updates .dykitem,
.details.details--description .dykitem {
  font-family: Lato, sans-serif;
  font-weight: 300;
  line-height: 22px;
}

.dykitem {
  display: block;
  margin-left: 30px;
  text-align: left;
  font-size: 18px;
  line-height: 26px;
  margin-top: 24px;
  padding: 0 25px 0 45px;
  padding-left: 45px;
  color: #666;
  background: url(/src/assets/images/grncheck.png) no-repeat 10px 0;
}

.cf:before,
.cf:after {
  content: "";
  display: table;
}

.cf:after {
  clear: both;
}

.imageedit {
  width: 301px;
  height: 200px;
  margin-left: 145px;
  border: 1px solid #ccc;
  overflow: hidden;
  float: left;
}

.imgtools {
  float: left;
}

.imageedit img {
  width: 100%;
}

.edittools,
a.edittools {
  align-items: center;
  color: #999;
  display: flex;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  font-weight: 400;
  justify-content: flex-start;
  line-height: 12px;
  margin-bottom: 12px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  width: 130px;
}

.edittools .icon {
  background: url(/src/assets/images/edittools.png) top left no-repeat;
  height: 16px;
  width: 80px;
  flex: 0 0 24px;
}

.edittools .move-icon {
  background-position: -10px -10px;
}

.edittools .rotate-icon {
  background-position: -8px -36px;
  height: 12px;
}

.edittools .delete-icon {
  background-position: -8px -56px;
}

.note-editor ul {
  list-style-type: disc !important;
  list-style-position: inside;
}

.note-editor ol {
  list-style-type: decimal !important;
  list-style-position: inside;
}

.note-editor ul ul,
.note-editor ol ul {
  list-style-type: circle !important;
  list-style-position: inside;
  margin-left: 15px;
}

.note-editor ol ol,
.note-editor ul ol {
  list-style-type: lower-latin !important;
  list-style-position: inside;
  margin-left: 15px;
}

.bb-1px {
  border-bottom: 1px solid #ddd;
}






/* The switch - the box around the slider */

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}






/* Hide default HTML checkbox */

.switch input {
  display: none;
}






/* The slider */

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}






/* Rounded sliders */

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.c_block {
  padding: 7px 10px;
  border-bottom: 1px solid #ddd;
}

.c_block .deats {
  margin: 20px 10px 20px 10px;
  position: relative;
}

.c_opts {
  position: relative;
  float: right;
  text-align: right;
  font-size: 14px;
  line-height: 16px;
  color: #999;
}

.c_optsdrop {
  position: absolute;
  top: -10px;
  right: -6px;
  z-index: 100;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 4px #ddd;
  padding: 9px;
  background: #fff;
}

.c_block .deats .phot {
  float: left;
  width: 65px;
  height: 65px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 20px;
}

.c_block .deats .phot img {
  width: 65px;
  border-radius: 5px;
}

.c_block .deats .gnline {
  font-size: 18px;
  line-height: 22px;
  color: #5F7E19;
  font-family: Montserrat, sans-serif;
  letter-spacing: -1px;
}

.c_block .deats .nme {
  font-size: 16px;
  line-height: 22px;
  color: #333;
}

.c_block .deats .tme {
  font-size: 12px;
  line-height: 20px;
  color: #666;
}

.c_comment {
  font-size: 16px;
  color: #666;
  padding: 0 10px 10px;
}

.c_postedw {
  text-align: right;
  font-size: 14px;
  color: #999;
  padding-bottom: 10px;
}

.donerscroll {
  text-align: center;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  color: #666;
  background-color: #F8F8F8;
  border-radius: 0 0 5px 5px;
}

.navbar-dropdown.nav>li>a:hover,
.navbar-dropdown.nav>li>a:focus,
.navbar-dropdown.nav .open>a,
.navbar-dropdown.nav .open>a:hover,
.navbar-dropdown.nav .open>a:focus {
  background-color: #fff !important;
  text-decoration: underline;
}

.navbar-dropdown .dropdown li {
  background: transparent;
  margin: 0px;
  padding: 0px;
}

.navbar-dropdown .dropdown-menu>li>a {
  color: #428bca;
}

.navbar-dropdown .dropdown ul.dropdown-menu {
  border-radius: 4px;
  box-shadow: none;
  margin-top: -10px;
  margin-left: -100px;
}

.navbar-dropdown .dropdown ul.dropdown-menu:before {
  content: "";
  border-bottom: 10px solid #fff;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  position: absolute;
  top: -10px;
  right: 16px;
  z-index: 10;
}

.navbar-dropdown .dropdown ul.dropdown-menu:after {
  content: "";
  border-bottom: 12px solid #ccc;
  border-right: 12px solid transparent;
  border-left: 12px solid transparent;
  position: absolute;
  top: -12px;
  right: 14px;
  z-index: 9;
}

.qst {
  color: #999;
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
}

.qst a {
  color: #333;
}

.lbl {
  font-size: 20px;
}

.qst {
  color: #999;
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
}

.est {
  font-size: 12px;
  font-weight: 500;
}

.tile {
  float: left;
  width: 47%;
  height: 281px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  background: #F6F5F2;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  color: #333;
  box-shadow: 1px 1px 3px #CECECE;
}

.tile .pho {
  border: none;
  display: block;
  width: 100%;
  height: 152px;
  padding: 8px 8px 0 8px;
  overflow: hidden;
}

.tile a {
  color: #333;
}

.tile .amt {
  display: block;
  width: 100%;
  height: 49px;
  font-size: 30px;
  line-height: 49px;
  text-align: center;
}

.tile .pro {
  display: block;
  width: 100%;
  height: 8px;
  border: 1px solid #e8e8e8;
  background: #fff;
  border-right: none;
  border-left: none;
  overflow: hidden;
}

.tile .fill {
  display: block;
  height: 10px;
  background: url(assets/images/wallpapers/4506829-orange-wallpapers.jpg);
}

.tile .title {
  display: block;
  width: 100%;
  padding: 10px 8px 8px 8px;
  padding-top: 10px;
  white-space: nowrap;
  overflow: hidden;
}

.tile .est {
  font-family: Lato, sans-serif;
}

.tile .est {
  color: #999;
  font-weight: normal;
}

#campaign_tiles .tile .divider {
  font-size: 12px;
}

.tile .divider {
  color: #999;
  display: inline;
}

.tile.tile--add {
  background: #eee url(assets/images/tile-add.png) center 45px no-repeat;
  display: block;
  /*height: 61px;*/
  padding-top: 220px;
}

.tile.tile--add .title {
  color: #333;
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  width: 100%;
}

.border-1px {
  border-radius: 5px;
}

.settings-container * {
  color: #333;
}

.settings-container a {
  color: rgb(255, 175, 0);
}

a.est {
  color: #999;
}

.message-header {
  font-size: 1.625rem;
  line-height: 1.9375rem;
  font-weight: 600;
}

.list-with-checks.fa-ul {
  margin-left: 1.375rem;
}

.fa-ul {
  padding-left: 0;
  margin-left: 2.14286em;
  list-style-type: none;
}

.list-with-checks li {
  margin-bottom: .625rem;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

section {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  color: #333;
}

.fa-ul>li {
  position: relative;
}

.fa-ul .fa-li.fa {
  color: #0a0a0a;
  font-size: 1rem;
  top: .3125rem;
}

.fa-li {
  position: absolute;
  left: -2.14286em;
  width: 2.14286em;
  top: .14286em;
  text-align: center;
}

.fs-18 {
  font-size: 18px;
}

.layer-white--btn,
.layer-white--btn:hover {
  color: #333;
  cursor: pointer;
}

.campaign-mgmt .layer-white-btn,
.flex-center {
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
}

.category-circle--sm {
  height: 3rem;
  width: 3rem;
}

.category-circle {
  background: #cbd8a7;
  border-radius: 50%;
  height: 5rem;
  margin: 0 auto 1.125rem;
  text-align: center;
  width: 5rem;
}

.flex-shrink {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.small-collapse .row {
  margin-left: 0;
  margin-right: 0;
}

.category-carousel-contain {
  margin: 1.25rem 0 .5rem;
  overflow-x: scroll;
  position: relative;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}

.category-card {
  display: inline-block;
  vertical-align: top;
  width: 7.375rem;
}

.category-contain {
  display: block;
  text-align: center;
}

.category-circle {
  background: rgba(255, 171, 0, .5);
  border-radius: 50%;
  height: 5rem;
  margin: 0 auto 1.125rem;
  text-align: center;
  width: 5rem;
}

.category-circle .category-sp {
  margin-top: .875rem;
}

.category-sp {
  background: url('/src/assets/images/categories-2016-sp.png') no-repeat -1px -623px;
  display: inline-block;
  height: 3.25rem;
  width: 3.125rem;
}

.subcategory-sp {
  background-image: url('/src/assets/images/ico-subcategory-sp-v2.png');
}

.category-sp--medical-fundraising {
  background-position: 0 -962px;
}

.category-sp--volunteer-fundraising {
  background-position: -1px -2160px;
}

.category-sp--emergency-accident-fundraising {
  background-position: 1px -735px;
}

.category-sp--school-fundraising {
  background-position: 0 -1918px;
}

.category-sp--funeral-memorial-fundraising {
  background-position: 0 -1680px;
}

.category-sp--sports-fundraising {
  background-position: -1px -1321px;
}

.category-sp--pet-animal-fundraising {
  background-position: 0 -1202px;
}

.category-sp--wishes-fundraising {
  background-position: 0 -1081px;
}

.category-sp--competition-pageant-fundraising {
  background-position: 0 -2290px;
}

.category-sp--other-miscellaneous {
  background-position: 0 -2418px;
}

.category-sp--wedding-honeymoon-fundraising {
  background-position: 0 -264px;
}

.subcategory-sp--palm {
  background-position: 1px 7px;
}

.category-sp--church-religion-faith-fundraising {
  background-position: 0 -148px;
}

.category-sp--travel-fundraising {
  background-position: -2px -504px;
}

.category-sp--creative-fundraising {
  background-position: 0 -24px;
}

.category-sp--community-fundraising {
  background-position: 0 -1556px;
}

.category-sp--events-fundraising {
  background-position: 0 -1436px;
}

.category-sp--business-fundraising {
  background-position: 0 -848px;
}

.category-sp--family-fundraising {
  background-position: 0 -386px;
}

.category-name {
  color: rgba(255, 171, 0, 1);
  font-size: .875rem;
  font-weight: 900;
  white-space: pre-line;
}

.category-circle--sm {
  height: 3rem;
  width: 3rem;
}

.category-circle--sm .category-sp {
  height: 2rem;
  width: 2rem;
  margin-top: .625rem;
  background-size: cover;
}

.category-circle--sm .category-sp--wedding-honeymoon-fundraising {
  background-position: 0 -169.439px;
}

.category-circle--sm .category-sp--family-fundraising {
  background-position: 0 -247.74035px;
}

.br-none {
  border-radius: 0px !important;
}

.profile-charity {
  border: .0625rem solid #ddd;
  color: #333;
  font-size: 1.0625rem;
  height: 5.125rem;
}

.profile-charity,
.profile-interest {
  background-color: #fff;
  border-radius: .25rem;
  font-size: 100%;
  line-height: 1rem;
  margin-bottom: .75rem;
  position: relative;
}

.profile-charity-logo {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 4.0625rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0.3125rem 0.125rem #eee;
  height: 4.0625rem;
  left: .625rem;
  text-align: center;
  width: 5.625rem;
}

.vertical-center {
  position: absolute;
  top: 50%;
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

.profile-charity-content {
  margin: 0 2.8125rem 0 7.1875rem;
}

.hori-center {
  margin-left: 50% !important;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.profile-charity-content {
  margin: 0 2.8125rem 0 7.1875rem;
}

.profile-charity-checkbox {
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 1.25rem;
  right: .625rem;
  width: 1.25rem;
  padding-left: 4px;
  cursor: pointer;
}

.modal-xl {
  width: 90%;
  height: 90%;
}






/*.profile-charity-checkbox .fa {
    color: #f8f8f8;
}*/

@media screen and (min-width: 48em) {
  .header-tile--wide h1 {
    padding-top: 3.75rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-shadow: 0 1px rgba(0, 0, 0, .25);
  }
  .large-6 {
    width: 50%;
  }
  .header-tile--wide h2 {
    margin-bottom: 1rem;
  }
  .header-tile h1 {
    font-size: 2.5rem;
  }
  .button.large {
    font-size: 1.375rem;
    padding: 1rem .625rem;
  }
  .large-centered {
    float: none;
    margin-left: auto;
    margin-right: auto;
  }
  .large-5 {
    width: 41.66667%;
  }
  .search-with-icon--large input {
    height: 3.5rem;
    padding-bottom: .625rem;
    padding-top: .625rem;
  }
  .search-with-icon input {
    font-size: 1.375rem;
    padding-left: 2.75rem;
  }
  .search-with-icon::before {
    font-size: 1.125rem;
    left: 1rem;
    top: .9375rem;
  }
  .search-with-icon::before {
    color: #999;
    content: "\f002";
    display: block;
    font-family: FontAwesome;
    font-size: 1rem;
    left: 1rem;
    position: absolute;
    top: 1rem;
    z-index: 1;
  }
  .search-with-icon--large .search-drop {
    top: 3.3125rem;
  }
  .category-arrows-contain,
  .header-sub,
  .layer-white,
  .link-bar {
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .25);
  }
  .white-box-large-only {
    background: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .25);
    border-radius: 4px;
    margin: auto;
    margin-bottom: 1.875rem;
    padding-top: 0!important;
    max-width: 45.5rem;
  }
}
</style>
