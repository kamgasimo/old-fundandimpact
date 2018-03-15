<template>
<div id="dashboard-edit-settings" class="divider">
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
          <div class="bb-1px">
            <div class="one arw" v-lang.check_your_settings>
              Check your Settings
            </div>
          </div>
          <div class="bb-1px p-30">
            <div class="form-group">
              <label for="form_category" style="font-size: 25px;"><span v-lang.category>Category</span> <small>*</small></label>
              <v-select :options="categories" vee-validate="'required'" data-vv-value-path="#form_category input" data-vv-name="category" :has-error="errors.has('category')" v-model="editedCampaign.category" class="form-control" id="form_category"></v-select>
              <div v-show="errors.has('category')" class="error-box fr ">{{ errors.first('category') }}</div>
            </div>
            <div class="form-group" style="font-size: 25px;">
              <label for="zip"><span v-lang.zip_or_postal_code>ZIP or Postal Code</span> <small>*</small></label>
              <p :class="{ 'control': true }">
                  <input v-model="editedCampaign.zip" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('zip') }" name="zip" type="text" placeholder="Enter Zip Code">
                  <span v-show="errors.has('zip')" class="help is-danger">{{ errors.first('zip') }}</span>
              </p>
            </div>
          </div>
          <div class="bb-1px p-30">
            <div class="mb-20" style="font-size: 25px;" v-lang.visitor_comments>Visitor Comments</div>
            <!-- Rounded switch -->
            <label class="switch pt-0">
            <span class="ml-80" v-if="settings.comments" style="font-size: 20px;">On</span>
            <span class="ml-80" v-else style="font-size: 20px;">Off</span>
              <input v-model="settings.comments" type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="bb-1px p-30">
            <div class="mb-20" style="font-size: 25px;" v-lang.donations_enabled>Donations Enabled</div>
            <!-- Rounded switch -->
            <label class="switch pt-0">
            <span class="ml-80" v-if="settings.donations" style="font-size: 20px;">On</span>
            <span class="ml-80" v-if="!settings.donations" style="font-size: 20px;">Off</span>
              <input v-model="settings.donations" type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="bb-1px p-30">
            <div style="font-size: 25px;" v-lang.display_on_fundandimpact>Display on FundAndImpact?</div>
            <div class="mb-20">
              <span class="text-warning" style="font-size: 15px;"><b v-lang.note>Note:</b> <span v-lang.disable_display_msg>If you disable this setting people will not be able to see Campaign on FundAndImpact.</span></span>
            </div>
            <!-- Rounded switch -->
            <label class="switch pt-0">
            <span class="ml-80" v-if="settings.display" style="font-size: 20px;">On</span>
            <span class="ml-80" v-if="!settings.display" style="font-size: 20px;">Off</span>
              <input v-model="settings.display" type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="three mb-30">
            <div @click="validate()" v-if="!loading" class="lb1 hide-on-load">
              <div class="lb2">
                <a href="javascript:void(0)" class="btn form-submit next2" v-lang.save_changes>Save Changes</a>
              </div>
            </div>
            <div v-if="loading" class="loading3 show-on-load">
              <div class="loader"></div>
            </div>
            <div class="clear"></div>
            <a class="rtlnk" data-target="#customize-details-link" href="./.." v-lang.cancel>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import vSelect from "vue-select"
export default {
  name: "dashboard-edit-settings",
  props: ['campaign', 'user', 'deleteCampaign'],
  components: {
    vSelect,
  },
  data: function data() {
    return {
      editedCampaign: {
        category: null,
        zip: '',

      },
      settings: {
        comments: true,
        donations: true,
        display: true
      },
      categories: [],
      loading: false
    }
  },
  watch: {
    editedCampaign: {
      handler: function (val, oldVal) {
        if (this.editedCampaign.category) {
          for( var i= this.errors.items.length-1; i>=0; i--) {
              if( this.errors.items[i].field == "category") {
                this.errors.items.splice(i,1);
              }
          }
        }
      },
      deep: true
    },
   campaign: function (val) {
     this.editedCampaign.category = val.category
     this.editedCampaign.zip = val.zip
     this.settings.comments = (this.campaign.enable_comment == "1") ? true : false
     this.settings.donations = (this.campaign.enable_donation == "1") ? true: false
     this.settings.display = (this.campaign.enable_display == "1") ? true: false
   }
  },
  methods:{
    validate(){
      this.$validator.validateAll().then((result) => {
        if (!this.editedCampaign.category) {
          this.errors.add('category', 'The Campaign Category is required')
          var that = this
          $('#form_category input').on('keyup', function () {
            for( var i= that.errors.items.length-1; i>=0; i--) {
                if( that.errors.items[i].field == "category") {
                  that.errors.items.splice(i,1);
                }
            }
          })
          return false
        }
        if (result) {
          if ((this.editedCampaign.category == this.campaign.category) && (this.editedCampaign.zip == this.campaign.zip) && (this.settings.comments == this.campaign.enable_comment) && (this.settings.donations == this.campaign.enable_donation) && (this.settings.display == this.campaign.enable_display)) {
            swal("Nothing Changed!", "Can't update your Campaign, you haven't made any change.", "warning")
            return false
          }
        this.loading = true
        this.updateCampaign()
      }
      else {
        // alert('nope')
        return false
      }
    })
    },
    updateCampaign(){
      if (this.settings.comments) {
        var enaCom = 1
      }else{
        var enaCom = 0
      }
      if (this.settings.donations) {
        var enaDon = 1
      }else{
        var enaDon = 0
      }
      if (this.settings.display) {
        var enaDis = 1
      }else{
        var enaDis = 0
      }

      var data = {
        link_id: this.campaign.link_id,
        category_id: this.editedCampaign.category.id,
        zip: this.editedCampaign.zip,
        case: 2,
        enable_comment: enaCom,
        enable_donation: enaDon,
        enable_display: enaDis
      }

      this.$http.put('api/campaign/edit', data)
          .then(response => {
            console.log(response)
            var that = this
            swal({
                title: "Campaign Updated!",
                text: 'You have successfully updated your Campaign',
                type: "success",
                showCancelButton: false,
                confirmButtonText: "ok",
                closeOnConfirm: true,
              },
              function(isConfirm) {
                if (isConfirm) {
                  that.loading = false
                  that.$emit('campaignUpdated', response.body.data)
                }
              });
          })
          .catch(e => {
            this.loading = false
            console.log(e)
            swal("Update Failed!", "Please refresh the page and try again.", "error")
          })
    }
  },
  mounted() {
    this.$http.get('api/getCategories')
              .then(response => {
                this.categories = response.body
                console.log(response)
              })
    this.editedCampaign.category = this.campaign.category
    this.editedCampaign.zip = this.campaign.zip
    this.settings.comments = this.campaign.enable_comment
    this.settings.donations = this.campaign.enable_donation
    this.settings.display = this.campaign.enable_display
  }
}
</script>
<style lang="css">
#dashboard-edit-settings .container .row.main-row{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#dashboard-edit-settings .col-md-8{
  background: transparent !important;
}
#dashboard-edit-settings .twothirds-box {
  width: 100%;
}

#dashboard-edit-settings .container-main{
  width: 80%;
  margin: auto;
}
#dashboard-edit-settings .list-border a.active{
  color: black !important;
}

</style>
