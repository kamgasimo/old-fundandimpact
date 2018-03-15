<template>
<section id="donation-payment" class="divider">
  <div class="container">
    <div id="donate-container" class="row">
      <div class="topbar"></div>
      <div class="col-md-8">
        <div class="border-1px mb-0">
          <div class="ml-0" style="">
            <div class="processheader">
              <div class="headline error_amount_label" v-lang.how_much_do_you_want_to_withdraw>How much do you want to withdraw?</div>
              <div class="donationsprite donatesprite-arrow"></div>
            </div>
            <div class="error-contain">
              <div class="donationbox  amount-contain ">
                <div class="campaign_currency" style="font-family: Montserrat, sans-serif; font-size: 16px; left: 26px">USD</div>
                <div class="dollarsign txt1 error_amount focus_amount">$</div>
                <input v-model="withdraw.amount" v-validate="'required|decimal:{1}'" autocomplete="off" :class="{'donationamount txt1 error_amount input_onlynumbers': true, 'is-danger': errors.has('amount') }"  min="0" :max="withdraw.max" maxlength="15" name="amount"
                  title="Withdraw Amount" type="number" value="" oninput="javascript: if (this.value.length > this.maxLength) {this.value = this.value.slice(0, this.maxLength);}
                        if (parseInt(this.value) > this.max) {this.value = this.max;}
                        if (parseInt(this.value) < this.min) {this.value = this.min;}" />
                <div class="zeros txt1 error_amount focus_amount">
                  .00
                </div>
              </div>
              <div v-show="errors.has('amount')" class="error-box fr ">{{ errors.first('amount') }}</div>
            </div>
          </div>
          <hr>
          <!-- Payment form -->
            <payment v-if="withdraw.amount >= 1 && parseInt(withdraw.amount) <= withdraw.max && withdraw.amount % 1 == 0" :amount="withdraw.amount" :type="'withdraw'"></payment>
          <!--/ Payment form -->
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
</section>
</template>
<script>
import Payment from '../../../components/dynamic/Payment.vue'
export default {
  name: "donation-payment",
  props: ['user'],
  components: {
    'payment': Payment
  },
  data: function data() {
    return {
      withdraw: {
        max: 0,
        amount: null
      }
    }
  },
  watch: {
    user: function (val) {
      this.withdraw.max = this.user.bank_account.balance
    }
  },
  mounted() {

  }
}
</script>
<style lang="css">
#donate-container{
  background: #fcfcfc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
#donate-container #payment .panel{
  border-radius: 0px !important;
  margin-bottom: 0px;
}

</style>
