<template>
<div id="dashboard-withdraw-beneficiary" class="divider pt-40 mb-70">
  <div class="container-main setup lbn">
    <div class="col-sm-4 col-sm-offset-4 p-0">
      <div class="text-center mb-15">
        <h1 class="message-header" v-lang.who_will_be_withdrawing_the_funds>Who will be withdrawing the funds?</h1>
        <div class="fs-18" v-lang.select_who_you_would_like_to_withdraw_the_money>
          Select who you would like to withdraw the money.
        </div>
      </div>
      <router-link :to="(user.bank_account) ? '/dashboard/withdraw/beneficiary/invite': '/dashboard/withdraw/beneficiary/individual?transfer=true'" class="layer-white layer-white--btn small-collapse flex-center mb-20 large">
        <div class="category-circle category-circle--sm flex-shrink ml-0 mr-15 mb-0">
          <div class="category-sp category-sp--wedding-honeymoon-fundraising"></div>
        </div>
        <div class="row text-left">
          <strong v-lang.someone_else>Someone else</strong>
          <div class="text-small light-gray" v-lang.must_be_a_fundandimpact_member>Must be a FundAndImpact member.</div>
        </div>
      </router-link>
      <router-link to="/dashboard/withdraw/beneficiary/individual" class="layer-white layer-white--btn small-collapse flex-center mb-20 large">
        <div class="category-circle category-circle--sm flex-shrink ml-0 mr-15 mb-0">
          <div class="category-sp category-sp--family-fundraising"></div>
        </div>
        <div class="row">
          <strong v-lang.myself>Myself</strong>
          <div class="text-small light-gray">{{user.name}}</div>
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "dashboard-withdraw-beneficiary",
  props: ['user'],
  data: function data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang="css">
#dashboard-withdraw-beneficiary .two{
  overflow: hidden;
  padding: 0;
}
</style>
