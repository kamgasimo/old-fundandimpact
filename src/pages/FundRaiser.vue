<template>
<div id="fund-raiser" class="container mt-40 mb-40">
  <div class="row">
    <div class="col-md-8 col-md-offset-2 raise-box">
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
              <input v-model="campaign.goal" v-validate="'required|decimal:{1}'" autocomplete="off" :class="{'donationamount txt1 error_amount input_onlynumbers': true, 'is-danger': errors.has('goal') }"  id="input_goal" min="1" max="900000000" maxlength="9" name="goal"  title="Campaign Goal" type="number"
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
        <form id="fundraiser-form" style="clear:both" class="mt-30 pl-30 pr-30">
          <div class="form-group">
            <label for="form_title"><span v-lang.my_campaign_title>My Campaign Title</span> <small>*</small></label>
            <!-- <input id="form_title" v-model="campaign.title" name="form_title" type="text" placeholder="Example: My College Tuition Fund" required="" class="form-control" aria-required="true"> -->
            <p :class="{ 'control': true }">
                <input v-model="campaign.title" v-validate="'required'"  maxlength="55" :class="{'input form-control': true, 'is-danger': errors.has('title') }" name="title" type="text" placeholder="Example: My College Tuition Fund">
                <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
            </p>
            <input-counter v-bind:input.sync="campaign.title" v-bind:limit="55"></input-counter>
          </div>
          <div class="form-group">
            <label for="form_category"><span v-lang.category>Category</span> <small>*</small></label>
            <v-select :options="categories" vee-validate="'required'" data-vv-value-path="#form_category input" data-vv-name="category" :has-error="errors.has('category')" v-model="campaign.category" class="form-control" id="form_category"></v-select>
            <div v-show="errors.has('category')" class="error-box fr ">{{ errors.first('category') }}</div>
          </div>
          <div class="form-group">
            <label for="zip"><span v-lang.zip_or_postal_code>ZIP or Postal Code</span> <small>*</small></label>
            <!-- <input id="form_zip" v-model="campaign.zip" name="form_zip" class="form-control required" type="text" placeholder="Enter Zip Code" aria-required="true"> -->
            <p :class="{ 'control': true }">
                <input v-model="campaign.zip" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('zip') }" name="zip" type="text" placeholder="Enter Zip Code">
                <span v-show="errors.has('zip')" class="help is-danger">{{ errors.first('zip') }}</span>
            </p>
          </div>
          <div class="form-group">
            <input id="form_botcheck" name="form_botcheck" class="form-control" type="hidden" value="">
            <a @click="validate()" class="btn btn-block font-18 btn-dark btn-theme-colored btn-sm mt-20 pt-10 pb-10" v-if="!loading" v-lang.continue>Continue</a>
            <a class="btn btn-muted font-18 btn-dark btn-block btn-sm mt-20 pt-10 pb-10" v-if="loading">
              <i class="fa fa-spinner fa-spin"></i>
            </a>
          </div>
        </form>
        <!-- Job Form Validation-->

      </div>
    </div>
  </div>
</div>
</template>
<script>
import swal from 'sweetalert'
import vSelect from "vue-select"
export default {
  name: "fund-raiser",
  components: {
    vSelect,
  },
  props: ['user'],
  watch: {
    campaign: {
      handler: function (val, oldVal) {
        if (this.campaign.category) {
          for( var i= this.errors.items.length-1; i>=0; i--) {
              if( this.errors.items[i].field == "category") {
                this.errors.items.splice(i,1);
              }
          }
        }
      },
      deep: true
    }
  },
  data: function data() {
    return {
      campaign: {
        goal: '',
        title: '',
        category: null,
        zip: ''
      },
      categories: [],
      loading: false
    }
  },
  methods: {
    validate(){
      this.$validator.validateAll().then((result) => {
        if (!this.campaign.category) {
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
        this.loading = true
        this.createCampaign()
      }
      else {
        // alert('nope')
        return false
      }
    })
    },
    createCampaign(){
      var data = {
        goal: this.campaign.goal,
        title: this.campaign.title,
        category_id: this.campaign.category.id,
        zip: this.campaign.zip,
        link: this.campaign.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/ /g, '-')
      }

      this.$http.post('api/campaign/create', data)
          .then(response => {
            console.log(response)
            // localStorage.setItem('fundraiserStarted', 1)
            // localStorage.setItem('fundraiserStep', response.body.raiser_step)
            // localStorage.setItem('campaignId', response.body.id)
            // localStorage.setItem('campaignLink', response.body.link)
            // localStorage.setItem('dashboardLink', response.body.db_link)
            // localStorage.setItem('linkId', response.body.link_id)
            this.$router.push('/fundraiser/'+response.body.link_id+'/media')
          })
          .catch(e => {
              this.loading = false
              console.log(e)
              if (e.status === 409) {
                var feedback = ''
                if (e.body.link) {
                  this.errors.add('title', 'you have already created a campaign with this title.');
                  feedback = feedback + '<div id="campaign-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Creation failed!</strong> you have already created a campaign with this title.</div>'
                }else if (e.body.goal) {
                  this.errors.add('title', e.body.goal[0]);
                  feedback = feedback + '<div id="campaign-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Creation failed!</strong> '+e.body.goal[0]+'</div>'
                }else{
                  feedback = '<div id="campaign-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Creation failed!</strong> Please verify your details and try again.</div>'
                }
              }else{
                  var feedback = '<div id="campaign-failed" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Creation failed!</strong> Incorrect Details.</div>'

              }
                $('#fundraiser-form').prepend(alert)
            })
    }
  },
  mounted() {
    this.$http.get('api/getCategories')
              .then(response => {
                this.categories = response.body
                console.log(response)
              })
      $("input[type='number']").on('keypress', function(e){
        return e.metaKey || // cmd/ctrl
          e.which <= 0 || // arrow keys
          e.which == 8 || // delete key
          /[0-9]/.test(String.fromCharCode(e.which)); // numbers
      })
  }
}
</script>
<style lang="css">
.donationamount{
  z-index:1;
  height:155px;
}
</style>
