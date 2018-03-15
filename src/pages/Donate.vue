<template>
<section id="donate" class="divider">
  <div class="container">
    <div id="donate-container" class="row">
      <div class="topbar"></div>
      <div class="col-md-8">
        <div class="border-1px mb-0">
          <h3 class="text-theme-colored m-30 pt-5"> This campaign needs your help!</h3>
          <hr>

          <div class="ml-0" style="">
            <div class="processheader">
              <div class="headline error_amount_label">Enter your donation</div>
              <div class="donationsprite donatesprite-arrow"></div>
            </div>
            <div class="error-contain">
              <div class="donationbox  amount-contain ">
                <div class="campaign_currency" style="font-family: Montserrat, sans-serif; font-size: 16px; left: 26px">USD</div>
                <div class="dollarsign txt1 error_amount focus_amount">$</div>
                <input v-model="donation.amount" v-validate="'required|decimal:{1}'" autocomplete="off" :class="{'donationamount txt1 error_amount input_onlynumbers': true, 'is-danger': errors.has('amount') }" id="input_amount" min="1" max="50000" maxlength="7" name="amount"
                  title="Donation Amount" type="number" value="" oninput="javascript: if (this.value.length > this.maxLength) {this.value = this.value.slice(0, this.maxLength);}
                        if (parseInt(this.value) > this.max) {this.value = this.max;}
                        if (parseInt(this.value) < this.min) {this.value = this.min;}" />
                <div class="zeros txt1 error_amount focus_amount">
                  .00
                </div>
              </div>
              <div v-show="errors.has('amount')" class="error-box fr ">{{ errors.first('amount') }}</div>
            </div>
          </div>
          <form id="donation-form" style="clear:both" class="mt-30 pl-30 pr-30">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">Name <small>*</small></label>
                  <!-- <input v-model="user.name" id="form_name" name="form_name" class="form-control" type="text"> -->
                  <p :class="{ 'control': true }">
                    <input v-model="donation.name" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                  </p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Email Address <small>*</small></label>
                  <!-- <input v-model="user.email" id="form_email" name="form_email" class="form-control" type="email"> -->
                  <p :class="{ 'control': true }">
                    <input v-model="donation.email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" name="email" title="Email" type="text" placeholder="Email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                  </p>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="form_hideName" style="cursor: pointer;">  <input v-model="donation.hideName" id="form_hideName" name="form_hideName" value="1" class="" type="checkbox"> Hide name and comment from everyone but the organizer.</label>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="city">Country <small>*</small></label>
                  <v-select :on-change="getMask" :options="countries" :debounce="250" :on-search="getCountries" placeholder="Search for your Country..." label="name" v-model="donation.country" class="input form-control" id="country">
                  </v-select>
                  <div class="error-box fr hide">Please select a Country</div>
                </div>
                <div class="form-group" v-if="donation.country">
                  <label for="city">State / Region <small>*</small></label>
                  <v-select :options="states" :debounce="250" :on-search="getStates" placeholder="Search for your State or Region..." label="name" v-model="donation.state" class="input form-control" id="state">
                  </v-select>
                  <div class="error-box fr hide">Please select a State</div>
                </div>
                <div class="form-group" v-if="donation.country && donation.state">
                  <label for="city">City <small>*</small></label>
                  <v-select :options="cities" :debounce="250" :on-search="getCities" placeholder="Search for your City..." label="name" v-model="donation.city" class="input form-control" id="city">
                  </v-select>
                  <div class="error-box fr hide">Please select a city</div>
                </div>
                <div class="form-group" v-if="donation.country && donation.state && donation.city">
                  <label for="form_phone">Phone</label>
                  <masked-input v-model="donation.phone" :mask="mask" placeholder="Phone number" class="form-control custom" type="tel" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="zip">ZIP or Postal Code <small>*</small></label>
                  <!-- <input id="form_zip" v-model="campaign.zip" name="form_zip" class="form-control required" type="text" placeholder="Enter Zip Code" aria-required="true"> -->
                  <p :class="{ 'control': true }">
                    <input v-model="donation.zip" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('zip') }" name="zip" type="text" placeholder="Enter Zip Code">
                    <span v-show="errors.has('zip')" class="help is-danger">{{ errors.first('zip') }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <p :class="{ 'control': true }">
                <textarea v-model="donation.comment" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('comment') }" name="comment" type="text" placeholder="Enter Message" rows="5"></textarea>
                <span v-show="errors.has('comment')" class="help is-danger">{{ errors.first('comment') }}</span>
              </p>
              <!-- <textarea class="form-control" required name="contact_message2" placeholder="Enter Message" rows="7"></textarea> -->
            </div>

            <div class="form-group">
              <a @click="validate()" class="btn btn-colored btn-theme-colored btn-lg btn-block mt-15" v-if="!loading"> Donate Now </a>
              <a class="btn btn-muted btn-dark btn-lg btn-block mt-15" v-if="loading">
                <i class="fa fa-spinner fa-spin"></i>
              </a>
            </div>
          </form>
          <!-- Job Form Validation-->

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
                  Number of Donors: <span>{{campaign.donations.length}}</span><br> Created: {{campaign.created_at | timeago}}
                </div>
                <!-- <router-link to="/campaign/1/donate" type="button" style="font-weight: 600; font-size: 1.375rem; padding: 1rem 0.625rem;" class=" mt-30 btn btn-primary btn-theme-colored btn-lg btn-block">Donate Now</router-link> -->
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
import CountrySelect from '../components/static/CountrySelect.vue'
import vSelect from "vue-select"
import MaskedInput from 'vue-masked-input'
export default {
  name: "donate",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {
    'share-on-social': ShareOnSocial,
    'country-select': CountrySelect,
    vSelect,
    MaskedInput,
  },
  data: function data() {
    return {
      donation: {
        amount: '',
        country: null,
        state: null,
        city: null,
        phone: null,
        name: '',
        city: '',
        zip: '',
        comment: '',
        hideName: false
      },
      country: null,
      loading: false,
      cities: [],
      countries: [],
      states: [],
      mask: "\\+\\2376-1111-1111"
    }
  },
  methods: {
    getCountries(search, loading) {
      loading(true)
      this.$http.get('api/getCountries?q=' + search).then(resp => {
        this.countries = resp.body
        loading(false)
      })
    },
    getMask(val){

      if (val) {
        this.donation.country = val

        var that = this;
        var result = window.PHONEMASK.filter(function(o) {
          return o.cc == that.donation.country.code;
        });
        // alert(window.PHONEMASK)
        if (result[0]) {
          // alert(result[0].mask);
          this.mask = result[0].mask;
        } else {
          var result2 = window.PHONEMASK.filter(function(o) {
            return o.cc[0] == that.donation.country.code || o.cc[1] == that.donation.country.code;
          });
          if (result2[0]) {
            // alert("result2: "+ result2[0].mask);
            this.mask = result2[0].mask;
          }
        }
      }
    },
    getStates(search, loading) {
      if (this.donation.country) {
        loading(true)
        this.$http.get('api/getStates/' + this.donation.country.id + '?q=' + search).then(resp => {
          this.states = resp.body
          loading(false)
        })
      }
    },
    getCities(search, loading) {
      loading(true)
      if (this.donation.country && this.donation.state) {
        this.$http.get('api/getCities/' + this.donation.country.id + '/' + this.donation.state.id + '?q=' + search).then(resp => {
          this.cities = resp.body
          loading(false)
        })
      }
    },
    getCountry(city) {
      this.$http.get('api/getCountry/' + city).then(resp => {
        return resp.body
      })
    },
    validate() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          if (!this.donation.country) {
            $('#country + .error-box').removeClass('hide')
            $('#country input').on('focus', function() {
              $('#country + .error-box').addClass('hide')
            })
          } else if (!this.donation.state) {
            $('#state + .error-box').removeClass('hide')
            $('#state input').on('focus', function() {
              $('#state + .error-box').addClass('hide')
            })
          } else if (!this.donation.city) {
            $('#city + .error-box').removeClass('hide')
            $('#city input').on('focus', function() {
              $('#city + .error-box').addClass('hide')
            })
          }
          // alert('From Submitted!');
          this.loading = true
          this.donate()
          return
        }

        if (!this.donation.country) {
          $('#country + .error-box').removeClass('hide')
          $('#country input').on('focus', function() {
            $('#country + .error-box').addClass('hide')
          })
        } else if (!this.donation.state) {
          $('#state + .error-box').removeClass('hide')
          $('#state input').on('focus', function() {
            $('#state + .error-box').addClass('hide')
          })
        } else if (!this.donation.city) {
          $('#city + .error-box').removeClass('hide')
          $('#city input').on('focus', function() {
            $('#city + .error-box').addClass('hide')
          })
        }
      });
    },
    donate() {
      if (this.$oauth.isAuthenticated()) {
        var authUser = this.user.id
      }else{
        var authUser = null
      }
      var data = {
        campaign_id: this.campaign.id,
        amount: this.donation.amount,
        name: this.donation.name,
        email: this.donation.email,
        phone: this.donation.phone.replace(/ /g, '').split('-').join('').split('+').join(''),
        country_id: this.donation.country.id,
        state_id: this.donation.state.id,
        town_id: this.donation.city.id,
        comment: this.donation.comment,
        zip: this.donation.zip,
        hideName: this.donation.hideName,
        authUser: authUser
      }

      console.log(data)
      this.$http.post('api/donate', data)
          .then(response => {
            console.log(response)
              this.$router.push(this.campaign.link+'/donate/'+response.body.data.id+'/payment')
          })
          .catch(e => {
            console.log(e)
            this.loading = false
            var msg = ''
            if (e.status === 203) {
              if (e.body.email) {
                this.errors.add('email', e.body.email[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.email[0]+'</div>'
              }
              if (e.body.name) {
                this.errors.add('name', e.body.name[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.name[0]+'</div>'
              }
            }else {
              msg = '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.message+'</div>'
            }
            $('#reg-form').prepend(msg)
          })
    }
  },
  created() {
    this.$http.get('api/allCountries').then(resp => {
      this.countries = resp.body
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

</style>
