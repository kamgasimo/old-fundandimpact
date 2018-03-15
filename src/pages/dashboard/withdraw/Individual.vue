<template>
<div id="dashboard-withdraw-beneficiary-individual" class="divider pt-40 mb-70">
  <div class="container-main setup lbn">
    <div class="col-sm-4 col-sm-offset-4 p-0">
      <div id="i-receive">
        <h1 class="message-header text-center" v-lang.verification_required>Verification Required</h1>
        <div class="mb-20 text-center" v-lang.verification_required_msg>FundAndImpact is required to collect this information. It will only be used to verify your identity.</div>
        <div class="layer-white p-30">
          <div class="row">
            <div class="form-group col-md-12">
              <label for="name" v-lang.your_full_legal_name>Your Full Legal Name</label>
              <p :class="{ 'control': true }">
                  <input v-model="account.name" v-validate="'required'" :class="{'custom form-control': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name">
                  <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
              </p>
            </div>
            <div class="form-group col-md-12">
              <label for="address" v-lang.your_home_address>Your Home Address</label>
              <p :class="{ 'control': true }">
                  <input v-model="account.address" v-validate="'required'" :class="{'custom form-control': true, 'is-danger': errors.has('address') }" name="address" type="text" placeholder="Home Address">
                  <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
              </p>
            </div>
            <div class="form-group col-md-12">
              <label for="form_date" v-lang.your_date_of_birth>Your date of birth</label>
              <p :class="{ 'control': true }">
                  <input v-validate="'required'" :class="{'custom date-picker form-control': true, 'is-danger': errors.has('dob') }" name="dob" type="text" placeholder="Date Of Birth">
                  <span v-show="errors.has('dob')" class="help is-danger">{{ errors.first('dob') }}</span>
              </p>
            </div>
            <div class="form-group col-md-12">
              <label for="form_idcn" v-lang.national_id_card_number>National ID Card Number</label>
              <p :class="{ 'control': true }">
                  <input v-model="account.idcn" v-validate="'required'" :class="{'custom form-control': true, 'is-danger': errors.has('idcn') }" name="idcn" type="text" placeholder="National ID Card Number">
                  <span v-show="errors.has('idcn')" class="help is-danger">{{ errors.first('idcn') }}</span>
              </p>
            </div>
          </div>
          <a v-if="!loading" @click="withdraw()" class="button expanded primary medium mt-30" v-lang.get_money>Get Money</a>
          <a v-if="loading" class="button expanded primary medium mt-30"><i class="fa fa-spinner fa-spin"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-withdraw-beneficiary-individual",
  props: ['user'],
  components: {

  },
  data: function data() {
    return {
      account: {
        name: '',
        address: '',
        idcn: '',
        dob: ''
      },
      loading: false,
    }
  },
  watch: {
    user: function (val) {
      if (this.user.bank_account) {
        this.$router.push('/dashboard/withdraw/beneficiary/individual/get_money')
      }
      this.account.name = this.user.name
    }
  },
  methods: {
    withdraw(){
      this.$validator.validateAll().then((result) => {
          if (result) {
            this.loading = true
            var dob = $('[name=dob]').val()
            var data = {
              'legal_name': this.account.name, 'home_address': this.account.address, 'date_of_birth': dob, 'national_id_card': this.account.idcn
            }
            this.$http.post('api/withdraw', data)
                      .then(response => {
                        this.loading = false
                        this.user.bank_account = response.body.data
                        if (this.$route.query.transfer) {
                          this.$router.push('/dashboard/withdraw/beneficiary/invite')
                        }else{
                          this.$router.push('/dashboard/withdraw/beneficiary/individual/get_money')
                        }

                      })
                      .catch(e => {
                        this.loading = false
                        console.log(e)
                        swal("Something went wrong!", "Please refresh the page and try again.", "error")
                      })
          }
        })
    }
  },
  mounted(){
    if (this.user.bank_account) {
      this.$router.push('/dashboard/withdraw/beneficiary/individual/get_money')
    }
    $( ".date-picker" ).datepicker();
  }

}
</script>
<style lang="css">
#dashboard-withdraw-beneficiary-individual input.form-control.custom, #dashboard-withdraw-beneficiary-individual .v-select.searchable{
  padding: 8px 10px 8px 10px;
    margin: 0;
    border-radius: 7px !important;
    /*border: 1px solid #cccccc;*/
    box-shadow: inset 1px 1px 2px #cccccc;
    font-size: 15px;
    height: 45px;
    line-height: 17px;
    color: #666666;
    font-family: lato, sans-serif;
    font-weight: 300;
}
#dashboard-withdraw-beneficiary-individual label{
  font-size: 18px;
}
</style>
