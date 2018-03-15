<template>
<div id="login" class="mt-40">
  <div class="setup">
    <div class="col-md-6 twothirds-box pt-30">
      <h4 class="text-theme-colored mt-0 pt-5" v-lang.login> Login</h4>
      <hr>
      <p></p>
      <form id="login-form" name="login-form" class="clearfix">
        <div class="row">
          <div class="form-group col-md-12">
            <label for="form_username_email" v-lang.email>Email</label>
            <!-- <input v-model="oauth.email" id="form_username_email" name="form_username_email" class="form-control" type="text"> -->
            <p :class="{ 'control': true }">
              <input v-model="oauth.email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" name="email" :title="translate('email')" type="text" :placeholder="translate('email')">
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="form_password" v-lang.password>Password</label>
            <!-- <input v-model="oauth.password" id="form_password" name="form_password" class="form-control" type="password"> -->
            <p :class="{ 'control': true }">
              <input v-model="oauth.password" v-validate="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('password') }" name="password" type="password" :placeholder="translate('password')" pattern=".{6,}" required :title="translate('password')">
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
          </div>
        </div>
        <div class="checkbox pull-left mt-15">
          <label for="form_checkbox">
                  <input id="form_checkbox" name="form_checkbox" type="checkbox">
                  <span v-lang.remember_me>Remember me</span> </label>
        </div>
        <div class="form-group pull-right mt-10">
          <a v-if="!loading" @click="login" class="btn sitg signin-continue submit-ajax is_loading"><i class="fa fa-sign-in mr-20"></i><span v-lang.sign_into_fundandimpact>Sign In to FundAndImpact</span></a>
          <a v-if="loading" class="btn sitg signin-continue submit-ajax is_loading"><i class="fa fa-spinner fa-spin mr-20"></i><span v-lang.loading_please_wait>Loading please wait!</span></a>
        </div>
        <div class="clear text-center pt-10">
          <a class="text-theme-colored font-weight-600 font-12" href="#" v-lang.forgot_your_password>Forgot Your Password?</a>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "login",
  data: function data() {
    return {
      oauth: {
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    authenticate: function(provider) {
      this.$auth.authenticate(provider).then(function() {
        // Execute application logic after successful social authentication
      })
    },
    login() {
      var data = {
        client_id: this.$_connection.client_id,
        client_secret: this.$_connection.client_secret,
        grant_type: 'password',
        username: this.oauth.email,
        password: this.oauth.password
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true
          this.$http.post('oauth/token', data)
            .then(response => {
              this.$oauth.setToken(response.body.access_token, response.body.expires_in + Date.now())
              window.location = '/fundraiser'
            })
            .catch(e => {
              this.loading = false
              console.log(e)
              var alert =
                '<div id="login-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>'+this.translate('login_failed')+'!</strong> ' +
                e.body.message + '</div>'
              $('#login-form').prepend(alert)
            })
        }
      })
    }
  },
  mounted() {
    // this.login()
  }
}
</script>
<style lang="css">
.sitg {
    /*background: url(images14/SignIn_sp.png) no-repeat 0 -54px #F5A409;*/
    background: #F5A409;
    border-bottom: 3px solid #E2960B;
    border-radius: 5px;
    color: #fff !important;
    display: inline-block;
    font-family: Montserrat, sans-serif;
    font-size: 20px;
    font-weight: 600;
    height: 50px;
    text-align: center;
    text-shadow: 1px 1px 1px #8C4600 !important;
    text-decoration: none !important;
    letter-spacing: -1px;
    margin: 20px auto;
    padding-top: 10px;
    min-width: 262px;
}
#login input.form-control{
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
</style>
