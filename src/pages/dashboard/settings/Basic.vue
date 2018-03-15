<template>
<div id="dashboard-settings-basic" class="divider">
  <div class="container container-main">
    <div class="row main-row pb-30">
      <div class="topbar"></div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd" v-lang.account_settings>ACCOUNT SETTINGS</div>
          <div class="panel-body p-0">
            <div class="widget p-10 m-0">
              <ul class="list-border list theme-colored angle-double-right">
                <li>
                  <router-link to="/dashboard/settings/basic" v-lang.basic_settings>Basic Settings</router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings/password" v-lang.set_your_password>Set your Password</router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings/campaigns" v-lang.my_campaigns>My campaigns</router-link>
                </li>
                <li>
                  <router-link to="/dashboard/settings/status" v-lang.account_status>Account Status</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 settings-container mb-10">
        <div class="border-1px">
          <div class="ml-0 bb-1px" style="">
            <div class="processheader">
              <div class="headline text-black" v-lang.basic_settings>Basic Settings </div>
            </div>
          </div>
          <div class="row p-30">
            <div class="form-group col-md-6">
              <label for="name" v-lang.name>Name <small>*</small></label>
              <!-- <input v-model="user.name" id="form_name" name="form_name" class="form-control" type="text"> -->
              <p :class="{ 'control': true }">
                  <input v-model="editedUser.name" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name">
                  <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
              </p>
            </div>
            <div class="form-group col-md-6">
              <label><span v-lang.email_address>Email Address</span> <small>*</small></label>
              <!-- <input v-model="user.email" id="form_email" name="form_email" class="form-control" type="email"> -->
              <p :class="{ 'control': true }">
                  <input v-model="editedUser.email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" name="email" title="Email" type="text" placeholder="Email">
                  <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
              </p>
            </div>
            <!-- <div class="form-group col-md-12">
              <label for="uname">Choose Username <small>*</small></label>
              <p :class="{ 'control': true }">
                <input v-model="editedUser.uname" v-validate="'required|alpha_dash'" id="uname" name="uname" :class="{'input form-control': true, 'is-danger': errors.has('uname') }" type="text" placeholder="Your username should not contain empty spaces." title="Username">
                <span v-show="errors.has('uname')" class="help is-danger">{{ errors.first('uname') }}</span>
              </p>
            </div> -->
            <div class="form-group col-md-12">
              <label for="form_choose_password" v-lang.change_password>Change Password</label>
              <div class="qst"><span v-lang.to_change_your_fundandimpact_account_password>To change your FundAndImpact account password</span>,
                <router-link to="/dashboard/settings/password" class="changepassword" v-lang.click_here>click here</router-link>
              </div>
            </div>
          </div>
          <div class="three mb-30">
            <div @click="updateUser()" v-if="!loading" class="lb1 hide-on-load">
              <div class="lb2">
                <a href="#" class="btn form-submit next2" v-lang.save_changes>Save Changes</a>
              </div>
            </div>
            <div v-if="loading"class="loading3 show-on-load">
              <div class="loader"></div>
            </div>
            <div class="clear"></div>
            <a class="rtlnk" data-target="#customize-details-link" href="." v-lang.cancel>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-settings-basic",
  props: ['user'],
  data: function data() {
    return {
      editedUser: {
        name: '',
        email: '',
        uname: ''
      },
      loading: false
    }
  },
  watch: {
    user: function (val) {
      this.editedUser.name = this.user.name
      this.editedUser.email = this.user.email
      // this.editedUser.uname = this.user.uname
    }
  },
  methods: {
    updateUser(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.editedUser.name != this.user.name || this.editedUser.email != this.user.email) {
            this.loading = true
            this.$http.put('api/user/edit', this.editedUser)
                      .then(response => {
                        this.loading = false
                        console.log(response)
                        this.user.name = response.body.data.name
                        this.user.email = response.body.data.email
                        // this.user.uname = response.body.data.uname
                        swal({
                            title: "Great Job!!",
                            text: 'You updated you profile information',
                            type: "success",
                            closeOnConfirm: true,
                          });
                      })
                      .catch(e => {
                        this.loading = false
                        swal("Profile NOT updated!", "Sorry, something went wrong", "error")
                      })
          }else{
            swal("Nothing Changed!", "Can't update your info, you haven't made any change.", "warning")
          }

        }
      })
    }
  },
  mounted() {
    this.editedUser.name = this.user.name
    this.editedUser.email = this.user.email
    this.editedUser.uname = this.user.uname
  }
}
</script>
<style lang="css">
#dashboard-settings-basic .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-settings-basic .col-md-8{
  background: transparent !important;
}
#dashboard-settings-basic .twothirds-box {
  width: 100%;
}

#dashboard-settings-basic .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-settings-basic .list-border a.active{
  color: black !important;
}
#dashboard-settings-basic input{
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
}
#dashboard-settings-basic label{
  font-size: 18px;
}
</style>
