<template>
<div id="register" class="mt-40">
  <div class="setup">
    <div class="col-md-6  twothirds-box pt-30">
      <form id="reg-form" name="reg-form" class="register-form">
        <div class="icon-box mb-0 p-0">
          <a href="#" class="icon icon-bordered icon-rounded icon-sm pull-left mb-0 mr-10 border-theme-colored hover-bg-theme-colored">
            <i class="pe-7s-users"></i>
          </a>
          <h4 class="text-theme-colored pt-10 mt-0 mb-30" v-lang.dont_have_and_account_register_now>Don't have an Account? Register Now.</h4>
        </div>
        <hr>
        <p class="text-gray" v-lang.register_get_started_msg>Get started now. Create and account, start a campaign, share with friends, and receive donations.</p>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="name"><span v-lang.name>Name</span> <small>*</small></label>
            <!-- <input v-model="user.name" id="form_name" name="form_name" class="form-control" type="text"> -->
            <p :class="{ 'control': true }">
                <input v-model="user.name" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name">
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </p>
          </div>
          <div class="form-group col-md-6">
            <label><span v-lang.email_address>Email Address</span> <small>*</small></label>
            <!-- <input v-model="user.email" id="form_email" name="form_email" class="form-control" type="email"> -->
            <p :class="{ 'control': true }">
                <input v-model="user.email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" name="email" title="Email" type="text" placeholder="Email">
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="uname"><span v-lang.choose_a_username>Choose a Username</span> <small>*</small></label>
            <p :class="{ 'control': true }">
              <input v-model="user.uname" v-validate="'required|alpha_dash'" id="uname" name="uname" :class="{'input form-control': true, 'is-danger': errors.has('uname') }" type="text" placeholder="Your username should not contain empty spaces." title="Username">
              <span v-show="errors.has('uname')" class="help is-danger">{{ errors.first('uname') }}</span>
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="city"><span v-lang.country>Country</span> <small>*</small></label>
          <v-select :options="countries"
                    :debounce="250"
                  	:on-search="getCountries"
                  	placeholder="Search for your Country..."
                  	label="name"
                  	v-model="country"
                    class="input form-control"
                    id="country">
          </v-select>
          <div class="error-box fr hide" v-lang.please_select_a_country>Please select a Country</div>
        </div>
        <div class="form-group" v-if="country">
          <label for="city"><span v-lang.state_or_region>State / Region</span> <small>*</small></label>
          <v-select :options="states"
                    :debounce="250"
                  	:on-search="getStates"
                  	placeholder="Search for your State or Region..."
                  	label="name"
                  	v-model="state"
                    class="input form-control"
                    id="state">
          </v-select>
          <div class="error-box fr hide" v-lang.please_select_a_state>Please select a State</div>
        </div>
        <div class="form-group" v-if="country && state">
          <label for="city"><span v-lang.city>City</span> <small>*</small></label>
          <v-select :options="cities"
                    :debounce="250"
                  	:on-search="getCities"
                  	placeholder="Search for your City..."
                  	label="name"
                  	v-model="city"
                    class="input form-control"
                    id="city">
          </v-select>
          <div class="error-box fr hide" v-lang.please_select_a_city>Please select a city</div>
        </div>
        <div class="form-group" v-if="country && state && city">
          <label for="form_phone" v-lang.phone>Phone</label>
          <masked-input v-model="user.phone" :mask="mask" placeholder="Phone number" class="form-control custom" type="tel" />
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="password"><span v-lang.choose_password>Choose Password</span> <small>*</small></label>
            <!-- <input v-model="user.password" id="form_choose_password" name="form_choose_password" class="form-control" type="password"> -->
            <p :class="{ 'control': true }">
                <input v-model="user.password" v-validate="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="Password" pattern=".{6,}"   required title="Password">
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
          </div>
          <div class="form-group col-md-6">
            <label><span v-lang.reenter_password>Re-enter Password</span> <small>*</small></label>
            <!-- <input v-model="user.cpassword" id="form_re_enter_password" name="form_re_enter_password" class="form-control" type="password"> -->
            <p :class="{ 'control': true }">
                <input v-model="user.cpassword" v-validate="'required|confirmed:password'" :class="{'input form-control': true, 'is-danger': errors.has('cpassword') }" name="cpassword" title="Password Confirmation" type="password" placeholder="Confirm Password">
                <span v-show="errors.has('cpassword')" class="help is-danger">{{ errors.first('cpassword') }}</span>
            </p>
          </div>
          <div class="form-group col-md-12">
            <span v-lang.pricing_intro>FundAndImpact's fee is 6% from each donation you receive. The payment processor fee is 3% + $0.50 per donation. By continuing, you agree with the FundAndImpact</span> <router-link to="/pricing" class="text-theme-colored" v-lang.fees>fees</router-link>, <router-link to="/terms" class="text-theme-colored" v-lang.terms_and_privacy_policy>terms and privacy policy.</router-link>
          </div>
        </div>
        <div class="form-group">
          <a @click="validate()" class="btn btn-colored btn-theme-colored btn-lg btn-block mt-15" v-if="!loading" v-lang.register_now> Register Now </a>
          <a class="btn btn-muted btn-dark btn-lg btn-block mt-15" v-if="loading">
            <i class="fa fa-spinner fa-spin"></i>
          </a>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script>
import vSelect from "vue-select"
import MaskedInput from 'vue-masked-input'
export default {
  name: "register",
  components: {
    vSelect,
    MaskedInput,
  },
  data: function data() {
    return {
      user: {
        name: '',
        uname: '',
        email: '',
        phone: null,
        password: '',
        cpassword: ''
      },
      loading: false,
      cities: [],
      countries: [],
      states: [],
      country: null,
      state: null,
      city: null,
      mask: "\\+\\237-1111-1111"
    }
  },
  watch: {
    country: function (val) {
      if (this.country) {
        var that = this;
        var result  = window.PHONEMASK.filter(function(o){return o.cc == that.country.code;} );
        // alert(window.PHONEMASK)
        if (result[0]) {
          // alert(result[0].mask);
          this.mask = result[0].mask;
        }else{
          var result2  = window.PHONEMASK.filter(function(o){
            return o.cc[0] == that.country.code || o.cc[1] == that.country.code;
          } );
          if (result2[0]) {
            // alert("result2: "+ result2[0].mask);
            this.mask = result2[0].mask;
          }
        }
      }
    }
  },
  methods: {
    getCountries(search, loading) {
      loading(true)
      this.$http.get('api/getCountries?q='+search).then(resp => {
         this.countries = resp.body
         loading(false)
      })
    },
    getStates(search, loading) {
      if (this.country) {
        loading(true)
        this.$http.get('api/getStates/'+this.country.id+'?q='+search).then(resp => {
           this.states = resp.body
           loading(false)
        })
      }
    },
    getCities(search, loading) {
      loading(true)
      if (this.country && this.state) {
        this.$http.get('api/getCities/'+this.country.id+'/'+this.state.id+'?q='+search).then(resp => {
           this.cities = resp.body
           loading(false)
        })
      }
    },
    getCountry(city) {
      this.$http.get('api/getCountry/'+city).then(resp => {
         return resp.body
      })
    },
    validate(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          if(!this.country){
            $('#country + .error-box').removeClass('hide')
            $('#country input').on('focus', function (){
              $('#country + .error-box').addClass('hide')
            })
          }else if(!this.state){
            $('#state + .error-box').removeClass('hide')
            $('#state input').on('focus', function (){
              $('#state + .error-box').addClass('hide')
            })
          }else if(!this.city){
            $('#city + .error-box').removeClass('hide')
            $('#city input').on('focus', function (){
              $('#city + .error-box').addClass('hide')
            })
          }
          // alert('From Submitted!');
          this.loading = true
          this.register()
          return
        }

        if(!this.country){
          $('#country + .error-box').removeClass('hide')
          $('#country input').on('focus', function (){
            $('#country + .error-box').addClass('hide')
          })
        }else if(!this.state){
          $('#state + .error-box').removeClass('hide')
          $('#state input').on('focus', function (){
            $('#state + .error-box').addClass('hide')
          })
        }else if(!this.city){
          $('#city + .error-box').removeClass('hide')
          $('#city input').on('focus', function (){
            $('#city + .error-box').addClass('hide')
          })
        }

        // alert('Correct the errors!');
      });
    },
    register() {
      var data = {
        name: this.user.name,
        uname: this.user.uname,
        email: this.user.email,
        phone: this.user.phone.replace(/ /g, '').split('-').join('').split('+').join(''),
        country_id: this.country.id,
        state_id: this.state.id,
        town_id: this.city.id,
        password: this.user.password,
        url: this.$_connection.domain+'/api'
      }
      // alert(data.phone)
      this.$http.post('api/register', data)
          .then(response => {
            var msg = ''
            if (response.status === 203) {
              this.loading = false
              var e = response;
              if (e.body.email) {
                this.errors.add('email', e.body.email[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.email[0]+'</div>'
              }
              if (e.body.name) {
                this.errors.add('name', e.body.name[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.name[0]+'</div>'
              }
              if (e.body.phone) {
                this.errors.add('phone', e.body.phone[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.phone[0]+'</div>'
              }
              if (e.body.uname) {
                this.errors.add('uname', e.body.uname[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.uname[0]+'</div>'
              }
              if (e.body.password) {
                this.errors.add('password', e.body.password[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.password[0]+'</div>'
              }
              $('#reg-form').prepend(msg)
              $(window).scrollTop(0);
            }else {
              console.log(response)
              this.login()
            }
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
              if (e.body.phone) {
                this.errors.add('name', e.body.phone[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.phone[0]+'</div>'
              }
              if (e.body.uname) {
                this.errors.add('uname', e.body.uname[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.uname[0]+'</div>'
              }
              if (e.body.password) {
                this.errors.add('password', e.body.password[0]);
                msg = msg + '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body.password[0]+'</div>'
              }
            }else {
              msg = '<div id="register-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration failed!</strong> '+e.body+'</div>'
            }
            $('#reg-form').prepend(msg)
            $(window).scrollTop(0);
          })
    },
    login() {
      var data = {
        client_id: this.$_connection.client_id,
        client_secret: this.$_connection.client_secret,
        grant_type: 'password',
        username: this.user.email,
        password: this.user.password
      }

      this.$http.post('oauth/token', data)
          .then(response => {
            this.$oauth.setToken(response.body.access_token, response.body.expires_in + Date.now())
            window.location = '/fundraiser'
          })
          .catch(e => {
            this.loading = false
            var msg = '<div id="login-failed" class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Registration completed!</strong> <a href="/login">click here to Login</a></div>'
            $('#reg-form').prepend(msg)
            $(window).scrollTop(0);
          })
    }
  }
}
</script>
<style lang="css">
/*#register input{
  padding: 8px 10px 8px 10px;
    margin: 0 0 17px 0;
    border-radius: 7px !important;
    border: 1px solid #cccccc;
    box-shadow: inset 1px 1px 2px #cccccc;
    font-size: 15px;
    height: 50px;
    line-height: 17px;
    color: #666666;
    font-family: lato, sans-serif;
    font-weight: 300;
}*/

</style>
