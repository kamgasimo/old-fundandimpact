<template>
<div id="dashboard-edit" class="divider">
  <div class="container container-main">
    <div class="row main-row pb-30">
      <div class="topbar"></div>
      <div class="col-md-4">
        <div class="panel panel-default p-0">
          <div class="panel-heading headbar light-bkgd" v-lang.edit>Edit</div>
          <div class="panel-body p-0">
            <div class="widget p-10 m-0">
              <ul class="list-border list theme-colored angle-double-right">
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit'" exact v-lang.goal_and_title>Goal & Title</router-link>
                </li>
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit/media'" v-lang.photo_or_video>Photo or video</router-link>
                </li>
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit/story'" v-lang.story>Story</router-link>
                </li>
                <li>
                  <router-link :to="'/dashboard/'+campaign.link_id+'/edit/setting'" v-lang.campaign_setting>Campaign Setting</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 raise-box">
        <div class="border-1px mb-10 mt-10">
          <div class="ml-0" style="">
            <div class="processheader">
              <div class="headline error_amount_label"><span v-lang.hi>Hi</span> {{user.shortname}}, <span v-lang.enter_your_goal>enter your goal</span> </div>
              <div class="donationsprite donatesprite-arrow"></div>
            </div>
            <div class="error-contain">
              <div class="donationbox  amount-contain ">
                <div class="campaign_currency" style="font-family: Montserrat, sans-serif; font-size: 16px; left: 26px">USD</div>
                <div class="dollarsign txt1 error_amount focus_amount">$</div>
                <input v-model="editedCampaign.goal" v-validate="'required|decimal:{1}'" autocomplete="off" :class="{'donationamount txt1 error_amount input_onlynumbers': true, 'is-danger': errors.has('goal') }"  id="input_goal" min="1" max="900000000" maxlength="9" name="goal"  title="Campaign Goal" type="number"
                  value="" oninput="javascript: if (this.value.length > this.maxLength) {this.value = this.value.slice(0, this.maxLength);}
                        if (parseInt(this.value) > this.max) {this.value = this.max;}
                        if (parseInt(this.value) < this.min) {this.value = this.min;}" />
                <div class="zeros txt1 error_amount focus_amount">
                  .00
                </div>
              </div>
              <div v-show="errors.has('goal')" class="error-box fr ">{{ errors.first('goal') }}</div>
            </div>
          </div>
          <form id="job_apply_form" style="clear:both" class="mt-30 pl-30 pr-30">
            <div class="form-group">
              <label for="title"><span v-lang.my_campaign_title>My Campaign Title</span> <small>*</small></label>
              <p :class="{ 'control': true }">
                  <input v-model="editedCampaign.title" v-validate="'required'"  maxlength="55" :class="{'input form-control': true, 'is-danger': errors.has('title') }" name="title" type="text" placeholder="Example: My College Tuition Fund">
                  <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
              </p>
              <input-counter v-if="this.editedCampaign && this.editedCampaign.title" v-bind:input.sync="editedCampaign.title" v-bind:limit="55"></input-counter>
            </div>
            <div class="three hauto">
              <div @click="editCampaign()" v-if="!loading" class="lb1 hide-on-load">
                <div class="lb2">
                  <a href="javascript:void(0)" class="btn form-submit next2" v-lang.save_changes>Save Changes</a>
                </div>
              </div>
              <div v-if="loading" class="loading3 show-on-load">
                <div class="loader"></div>
              </div>
              <div class="clear"></div>

              <a class="rtlnk" data-target="#customize-details-link" href="." v-lang.cancel>Cancel</a>
            </div>
          </form>
          <div class="text-center mt-20 mb-30" v-lang.dont_worry_you_can_later_change_msg>Don’t worry, you can easily make changes to your campaign at any time.        </div>
          <!-- Job Form Validation-->

        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-edit",
  components: {},
  props: ['campaign', 'user', 'deleteCampaign'],
  data: function data() {
    return {
      loading: false,
      editedCampaign: {
        title: '',
        goal: ''
      }
    }
  },
  methods: {
    editCampaign(){
      this.$validator.validateAll().then((result) => {
          if (result) {
            if ((this.editedCampaign.title == this.campaign.title) && (this.editedCampaign.goal == this.campaign.goal) ) {
              swal("Nothing Changed!", "Can't update Campaign, you haven't made any change.", "warning")
            }else{
              this.loading = true

              var data = {
                goal: this.editedCampaign.goal,
                title: this.editedCampaign.title,
                newlink_id: this.editedCampaign.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/ /g, '-'),
                case: 1,
                link_id: this.campaign.link_id
              }

              this.$http.put('api/campaign/edit', data)
                  .then(response => {
                    this.loading = false
                    console.log(response)
                    // swal("Campaign Updated!", "You have successfully update your Campaign", "success")
                    var that = this
                    swal({
                        title: "Campaign Updated!",
                        text: 'You have successfully updated your Campaign',
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "rgb(255,175,0)",
                        confirmButtonText: "ok",
                        closeOnConfirm: true,
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          that.$emit('campaignUpdated', response.body.data)
                          window.location = '/dashboard/'+response.body.data.link_id+'/edit'
                        }
                      });
                  })
                  .catch(e => {
                      this.loading = false
                      console.log(e)
                      swal("Update Failed!", "Please refresh the page and try again.", "error")
                    })

            }
        }
        else {
          // alert('nope')
          return false
        }
      })
    }
  },
  watch: {
    campaign: function(val) {
      this.editedCampaign.title = val.title
      this.editedCampaign.goal = val.goal
    }
  },
  mounted() {
    if (this.campaign) {
      this.editedCampaign.title = this.campaign.title
      this.editedCampaign.goal = this.campaign.goal
    }
  }
}
</script>
<style lang="css">
#dashboard-edit .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-edit .col-md-8{
  background: transparent !important;
}
#dashboard-edit .twothirds-box {
  width: 100%;
}

#dashboard-edit .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-edit .list-border a.active{
  color: black !important;
}
</style>
