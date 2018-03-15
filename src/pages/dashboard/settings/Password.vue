<template>
<div id="dashboard-settings-password" class="divider">
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
      <div class="col-md-8 settings-container mb-10 ">
        <div class="border-1px">
          <div class="ml-0 bb-1px" style="">
            <div class="processheader">
              <div class="headline error_amount_label" v-lang.password_setting>Password Setting </div>
            </div>
          </div>
          <div class="row p-30">
            <div class="form-group col-md-12">
              <label for="current_password" v-lang.current_password>Current Password</label>
              <p :class="{ 'control': true }">
                  <input v-model="editedUser.currentPassword" v-validate="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('current_password') }" name="current_password" type="password" placeholder="Current Password" pattern=".{6,}" required title="Current Password">
                  <span v-show="errors.has('current_password')" class="help is-danger">{{ errors.first('current_password') }}</span>
              </p>
            </div>
            <div class="form-group col-md-6">
              <label for="password"><span v-lang.new_password>New Password</span> <small>*</small></label>
              <!-- <input v-model="user.password" id="form_choose_password" name="form_choose_password" class="form-control" type="password"> -->
              <p :class="{ 'control': true }">
                  <input v-model="editedUser.password" v-validate="'required|min:6'" :class="{'input form-control': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="New Password" pattern=".{6,}"   required title="New Password">
                  <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
              </p>
            </div>
            <div class="form-group col-md-6">
              <label v-lang.reenter_password>Re-enter Password <small>*</small></label>
              <!-- <input v-model="user.cpassword" id="form_re_enter_password" name="form_re_enter_password" class="form-control" type="password"> -->
              <p :class="{ 'control': true }">
                  <input v-model="editedUser.cpassword" v-validate="'required|confirmed:password'" :class="{'input form-control': true, 'is-danger': errors.has('cpassword') }" name="cpassword" title="Password Confirmation" type="password" placeholder="Confirm Password">
                  <span v-show="errors.has('cpassword')" class="help is-danger">{{ errors.first('cpassword') }}</span>
              </p>
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
  name: "dashboard-settings-password",
  props: ['user'],
  data: function data() {
    return {
      editedUser: {
        currentPassword: '',
        password: '',
        cpassword: ''
      },
      loading: false
    }
  },
  methods: {
    updateUser(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.editedUser.password != this.editedUser.currentPassword) {
            this.loading = true
            this.$http.put('api/user/edit', this.editedUser)
                      .then(response => {
                        this.loading = false
                        console.log(response)
                        // this.user.uname = response.body.data.uname
                        swal({
                            title: "Great Job!!",
                            text: 'You updated your password',
                            type: "success",
                            closeOnConfirm: true,
                          });
                      })
                      .catch(e => {
                        this.loading = false
                        if (e.status == 401) {
                          swal("Wrong Password!", "The current password you entered was incorrect.", "error")
                        }else{
                          swal("Password NOT updated!", "Sorry, something went wrong", "error")
                        }
                      })
          }else{
            swal("Nothing Changed!", "New password is the same as Current Password.", "warning")
          }

        }
      })
    }
  }
}
</script>
<style lang="css">
#dashboard-settings-password .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-settings-password .col-md-8{
  background: transparent !important;
}
#dashboard-settings-password .twothirds-box {
  width: 100%;
}

#dashboard-settings-password .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-settings-password .list-border a.active{
  color: black !important;
}
#dashboard-settings-password input{
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
#dashboard-settings-password label{
  font-size: 18px;
}
</style>
