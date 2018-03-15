<template>
<div id="dashboard-withdraw" class="divider pt-40 mb-70">
  <div class="container-main setup lbn">
    <div class="col-sm-4 col-sm-offset-4 p-0">
      <h1 class="message-header text-center" v-lang.did_you_know>Did You Know?</h1>
      <div class="layer-white p-30">
        <h3 class="mb-40 text-center text-warning" style="font-size: 18px;" v-lang.withdrawals_to_a_bank_account_is_currently_unsupported>Withdrawals to a bank account is currently unsupported.</h3>
        <ul class="list-with-checks fa-ul">
          <li class="text-success"><i class="fa-li fa fa-check"></i>
            <span v-lang.you_currently_can_only_withdraw_to_a_mobile_money_account>You currently can only withdraw to a mobile money account.</span>
          </li>
          <li><i class="fa-li fa fa-check"></i>
            <span v-lang.you_can_withdraw_any_amount_from_your_fundandimpact_account_at_anytime>You can withdraw any amount from your FundAndImpact Account at anytime.</span>
          </li>
          <li><i class="fa-li fa fa-check"></i>
            <span v-lang.you_can_also_transfer_money_from_your_fundandimpact_account_to_another_fundAndImpact_user>You can also transfer money from your FundAndImpact Account to another FundAndImpact user.</span>
          </li>
        </ul>
        <router-link to="/dashboard/withdraw/beneficiary" class="button expanded primary medium mt-40" v-lang.continue>Continue</router-link>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-withdraw",

  data: function data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang="css">
#dashboard-withdraw .two{
  overflow: hidden;
  padding: 0;
}
</style>
