<template>
<div id="dashboard-settings-status" class="divider">
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
      <div class="col-md-8 settings-container">
        <div class="border-1px">
          <div class="ml-0 bb-1px" style="">
            <div class="processheader">
              <div class="headline error_amount_label" v-lang.status_settings>Status Settings </div>
            </div>
          </div>
          <div class="two left pt-20 pb-20" v-lang.manage_your_fundandimpact_account_status_below>
            Manage your FundAndImpact account status below.
          </div>
          <div class="two left nobt nobb">
            <div class="lbl mb-10" v-lang.account_status>Account Status</div>
            <div class="qst" v-lang.your_account_is_live>Your account is live!</div>
            <div class="lbl mb-10 mt-30" v-lang.join_date>Join Date</div>
            <div class="qst mb-30">{{user.created_at | timeago}}</div>
            <div style="color:#888;">
              <router-link to="/help" class="est" target="_blank" v-lang.feedback>Feedback</router-link> |
              <router-link to="/faq" class="est" target="_blank" v-lang.common_questions>Common Questions</router-link> |
              <a @click="deleteAccount()" class="est" v-lang.delete_account> Delete Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-settings-status",
  props: ['user'],
  data: function data() {
    return {

    }
  },
  methods: {
    deleteAccount(){
      var that = this
      swal({
          title: "Are you sure?",
          text: "You will not be able to recover your Account!",
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
            that.$http.delete('api/user')
              .then(response => {
                swal({
                    title: "Deleted!",
                    text: "Your Account has been deleted.",
                    type: "success",
                    closeOnConfirm: false,
                  },
                  function(isConfirm) {
                    that.$router.push('/logout')
                  }
                );
              })
              .catch(e => {
                console.log(e);
                if (e.status === 404) {
                  swal({
                      title: "Deleted!",
                      text: "Your Account has been deleted.",
                      type: "success",
                      closeOnConfirm: false,
                    },
                    function(isConfirm) {
                      that.$router.push('/logout')
                    }
                  );
                }
              })

          } else {
            swal({
                title: "Cancelled!",
                text: "Your Campaign is safe :)",
                type: "error",
                closeOnConfirm: true,
              },
              function(isConfirm) {
                that.$router.push('#')
              }
            );
          }
        });
    }
  }
}
</script>
<style lang="css">
#dashboard-settings-status .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-settings-status .col-md-8{
  background: transparent !important;
}
#dashboard-settings-status .twothirds-box {
  width: 100%;
}

#dashboard-settings-status .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-settings-status .list-border a.active{
  color: black !important;
}
</style>
