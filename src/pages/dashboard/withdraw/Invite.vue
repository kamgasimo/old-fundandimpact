<template>
<div id="dashboard-withdraw-beneficiary-invite" class="divider pt-40 mb-70">
  <div class="container container-main p-0">
    <div class="topbar"></div>
    <div class="col-sm-8 p-0">
        <div class="layer-white p-30">
          <div id="who-receives">
          <div class="row mt-0 pt-0">
            <div class="processheader">
              <div class="headline error_amount_label" v-lang.how_much_do_you_want_to_transfer>How much do you want to transfer?</div>
              <div class="donationsprite donatesprite-arrow"></div>
            </div>
            <div class="error-contain">
              <div class="donationbox  amount-contain ">
                <div class="campaign_currency" style="font-family: Montserrat, sans-serif; font-size: 16px; left: 26px">USD</div>
                <div class="dollarsign txt1 error_amount focus_amount">$</div>
                <input v-model="transfer.amount" v-validate="'required|decimal:{1}'" autocomplete="off" :class="{'donationamount txt1 error_amount input_onlynumbers': true, 'is-danger': errors.has('amount') }"  min="0" :max="transfer.max" maxlength="15" name="amount"
                  title="Tranfer Amount" type="number" value="" oninput="javascript: if (this.value.length > this.maxLength) {this.value = this.value.slice(0, this.maxLength);}
                        if (parseInt(this.value) > this.max) {this.value = this.max;}
                        if (parseInt(this.value) < this.min) {this.value = this.min;}" />
                <div class="zeros txt1 error_amount focus_amount">
                  .00
                </div>
              </div>
              <div v-show="errors.has('amount')" class="error-box fr ">{{ errors.first('amount') }}</div>
            </div>
            <hr>
            <div v-if="(transfer.amount >= 1) && (parseInt(transfer.amount) <= user.bank_account.balance) && (transfer.amount % 1 == 0)" class="">
              <strong class="mb-10" v-lang.money_will_go_to>Money will go to...</strong>
              <div class="form-group col-md-12">
                <label for="name"><span v-lang.name>Name</span> <small>*</small></label>
                <!-- <input v-model="user.name" id="form_name" name="form_name" class="form-control" type="text"> -->
                <p :class="{ 'control': true }">
                    <input v-model="transfer.name" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Receiver's Name used to register">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                </p>
              </div>
              <div class="form-group col-md-12">
                <label><span v-lang.email_address>Email Address</span> <small>*</small></label>
                <!-- <input v-model="user.email" id="form_email" name="form_email" class="form-control" type="email"> -->
                <p :class="{ 'control': true }">
                    <input v-model="transfer.email" v-validate="'required|email'" :class="{'input form-control': true, 'is-danger': errors.has('email') }" name="email" title="Email" type="text" placeholder="Receiver's Email used to register">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
              </div>
            </div>

          </div>
          <a v-if="!loading && transfer.amount >= 1 && parseInt(transfer.amount) <= user.bank_account.balance && transfer.amount % 1 == 0" @click="transferMoney()" class="button expanded primary medium mt-30" v-lang.transfer_money>Transfer Money</a>
          <a v-if="loading" class="button expanded primary medium mt-30"><i class="fa fa-spinner spin"></i> <span v-lang.transferring>transferring</span></a>
          <div class="text-center text-small">
            <span>
              <strong v-lang.money_transfered>Money tranfered</strong>
               <span v-lang.to_this_person_will_be_deducted_from_your_balance_and_cant_be_recovered>to this person will be deducted from your balance and can't be recovered.</span>
             </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="panel panel-default p-0">
        <div class="panel-heading headbar light-bkgd" v-lang.money_management_system>Money Management System</div>
        <div class="panel-body p-0">
          <div class="widget p-0 m-0">
            <div class="call-to-action border-1px bg-lighter br-none">
              <h5 class="widget-title line-bottom mb-0 mt-10" v-lang.money_raised>Money Raised</h5>
              <ul class="list-border list pl-20 theme-colored angle-double-right text-black">
                <li v-if="user && user.campaigns" v-for="campaign in user.campaigns" :key="campaign.id">
                  {{campaign.title}}
                  <div class="goal fs-18 pl-20" style="border: 0px;">
                      <strong>${{campaign.raised}}</strong>
                      <small class="smaller"><span v-lang.of>of</span> ${{campaign.goal}} <span v-lang.goal>goal</span></small>
                  </div>
                </li>
              </ul>
              <h5 class="widget-title line-bottom mb-0 mt-20" v-lang.total_money_raised>Total Money Raised</h5>
              <ul class="list-border list pl-20 theme-colored angle-double-right text-black">
                <li v-lang.all_campaigns>All Campaigns</li>
                <li class="goal fs-18" style="border: 0px;">
                    <strong>${{user.sumRaised}}</strong>
                    <!-- <small class="smaller">of ${{user.sumGoal}} goal</small> -->
                </li>
              </ul>
              <h5 class="widget-title line-bottom mb-0 mt-20" v-lang.total_money_withdrew>Total Money Withdrew</h5>
              <ul class="list-border list pl-20 theme-colored angle-double-right text-black">
                <li v-lang.the_sum_of_all_your_withdrawals_are>The sum of all your withdrawals are:</li>
                <li class="goal fs-18" style="border: 0px;">
                    <strong>${{user.sumWithdrawals}}</strong>
                    <!-- <small class="smaller">of ${{user.sumRaised}} raised</small> -->
                </li>
              </ul>
              <h5 class="widget-title line-bottom mb-0 mt-20" v-lang.total_money_transfered>Total Money Transfered</h5>
              <ul class="list-border list pl-20 theme-colored angle-double-right text-black">
                <li v-lang.the_sum_of_all_your_outgoing_transfers_are>The sum of all your outgoing transfers are:</li>
                <li class="goal fs-18" style="border: 0px;">
                    <strong>${{user.sumTransferOut}}</strong>
                    <!-- <small class="smaller">of ${{user.sumRaised}} raised</small> -->
                </li>
              </ul>
              <h5 class="widget-title line-bottom mb-0 mt-20" v-lang.total_money_received>Total Money Received</h5>
              <ul class="list-border list pl-20 theme-colored angle-double-right text-black">
                <li v-lang.the_sum_of_all_your_incomming_transfers_are>The sum of all your incomming transfers are:</li>
                <li class="goal fs-18" style="border: 0px;">
                    <strong>${{user.sumTransferIn}}</strong>
                </li>
              </ul>
              <h5 class="widget-title line-bottom mb-0 mt-20" v-lang.your_balance>Your Balance</h5>
              <ul class="list-border list pl-20 theme-colored angle-double-right text-black">
                <li v-lang.this_is_the_maximun_amount_you_can_withdraw>This is the maximun amount you can withdraw:</li>
                <li class="goal fs-18" style="border: 0px;">
                    <strong v-if="user.bank_account">${{user.bank_account.balance}}</strong>
                </li>
              </ul>
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
  name: "dashboard-withdraw-beneficiary-invite",
  props: ['user'],
  data: function data() {
    return {
      transfer: {
        amount: 0,
        name: '',
        email: '',
        max: 0
      },
      loading: false
    }
  },
  watch: {
    user: function (val) {
      this.transfer.max = this.user.bank_account.balance
    }
  },
  methods: {
    transferMoney(){
      this.$validator.validateAll().then((result) => {
          if (result) {
            this.loading = true
            var data = {
              'amount': this.transfer.amount, 'name': this.transfer.name, 'email': this.transfer.email
            }
            this.$http.post('api/user/check', data)
                      .then(response => {
                        var that = this
                        swal({
                            title: "Are you sure?",
                            text: "You want to transfer $"+data.amount+" to "+data.email+"? You will not be able to recover this Money!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, transfer it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                          },
                          function(isConfirm) {
                            if (isConfirm) {
                              data.to_id = response.body.data.id
                              that.$http.post('api/transfer', data)
                                .then(response => {
                                  swal({
                                      title: "Money Transfered!",
                                      text: "Your transaction was successful.",
                                      type: "success",
                                      closeOnConfirm: true,
                                    },
                                    function(isConfirm) {
                                      that.$router.push('/dashboard')
                                    }
                                  );
                                })
                                .catch(e => {
                                  console.log(e);
                                    swal({
                                        title: "Money NOT Transfered!",
                                        text: "Something went wrong during the transaction.",
                                        type: "error",
                                        closeOnConfirm: true,
                                      },
                                      function(isConfirm) {
                                        that.loading = false
                                        that.$router.push('#')
                                      }
                                    );
                                })

                            } else {
                              swal({
                                  title: "Cancelled!",
                                  text: "Your Money is safe :)",
                                  type: "error",
                                  closeOnConfirm: true,
                                },
                                function(isConfirm) {
                                  that.$router.push('/dashboard')
                                }
                              );
                            }
                          });
                      })
                      .catch(e => {
                        this.loading = false
                        console.log(e)
                        swal("User NOT Found!", "The user you requested is not a FundAndImpact member.", "error")
                      })
          }
        })
    }
  }
}
</script>
<style lang="css">
#dashboard-withdraw-beneficiary-invite input.form-control{
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
#dashboard-withdraw-beneficiary-invite label{
  font-size: 18px;
}
#dashboard-withdraw-beneficiary-invite .container-main{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
