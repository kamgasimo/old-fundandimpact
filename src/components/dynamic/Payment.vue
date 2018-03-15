<template>
<div id="payment">
  <div id="withdraw-info" class="modal-promo-box mfp-hide bg-lightest">
    <h3 v-lang.please_provide_your_withdrawal_information>Please Provide your Withdrawal Information</h3>
    <h4><span v-lang.for_a_withdrawal_of>for a withdrawal of</span> <b class="text-theme-colored">${{amount}}</b></h4>
    <p :class="{ 'control': true }">
      <div class="input-group">
        <input v-model="phone" v-validate="'required'" :class="{'input form-control': true, 'is-danger': errors.has('phone') }" type="number" id="phone" data-height="40px" class="form-control input-lg" placeholder="Enter Phone Number"
          name="phone" title="Phone Number" style="height: 40px;">
        <span class="input-group-btn">
            <button v-show="!loading.withdraw" @click="withdraw()" type="button" class="btn btn-colored btn-theme-colored btn-xs m-0  font-17" data-height="40px" style="height: 40px;" v-lang.withdraw>Withdraw</button>
            <button v-show="loading.withdraw" type="button" class="btn btn-colored btn-theme-colored btn-xs m-0  font-17" data-height="40px" style="height: 40px;"><i class="fa fa-spinner fa-spin"></i></button>
          </span>
      </div>
    </p>
    <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
  </div>

  <ul id="myTab" class="nav nav-tabs boot-tabs">
    <li class="active"><a href="#credit-card" data-toggle="tab" v-lang.credit_card>Credit Card</a></li>
    <li><a href="#mo-mo" data-toggle="tab" v-lang.mobile_money>Mobile Money</a></li>
    <li><a href="#paypal" data-toggle="tab" v-lang.paypal>Paypal</a></li>
  </ul>
  <div id="myTabContent" class="tab-content">
    <div class="tab-pane fade in active" id="credit-card">
      <h2>{{(type == 'payment') ? 'Pay' : 'Withdraw'}} <span v-lang.with_visa_mastercard_discovery>with Visa, MasterCard, Discovery</span>.</h2>
      <img class="img-responsive pull-right" src="https://i76.imgup.net/accepted_c22e0.png">
      <!-- <iframe src="/src/components/lightbox/payment/afropay.html" width="" height="700px">
      </iframe> -->
      <div class="alert alert-warning">
        <span v-lang.credit_card>Credit Card</span> {{(type == 'payment') ? 'payments' : 'withdrawals'}} <span v-lang.are_currently_unsupported>are currently unsupported</span>.
      </div>
    </div>
    <div class="tab-pane fade" id="mo-mo">
      <h2>{{(type == 'payment') ? 'Pay' : 'Withdraw'}} <span v-lang.with_mobile_money>with Mobile Money</span></h2>
      <!-- <iframe v-if="type == 'payment' && amount > 0" :src="'/src/components/lightbox/payment/mobile-money.html?amount='+amount+'&id='+id" width="" height="700px">
      </iframe> -->
      <!-- <iframe v-if="type == 'payment' && amount > 0" :src="'https://www.dusupay.com/dusu_payments/dusupay?ref=https://fundandimpact.com&dusupay_merchantid=1833&dusupay_amount='+amount+'&dusupay_currency=XAF&dusupay_itemid=4&dusupay_itemname=Donation&dusupay_transactionreference='+id+'&dusupay_render=widget&dusupay_logo=https%3A%2F%2Ffundandimpact.com%2Fsrc%2Fassets%2Flogo.png&dusupay_redirecturl=https%3A%2F%2Fbackend-fundandimpact.com%2Fapi%2Fdusu_donated&dusupay_successurl=https%3A%2F%2Fbackend-fundandimpact.com%2Fapi%2Fdusu_donated&async=true'" width="" height="700px">
      </iframe> -->
      <!-- <a v-if="type == 'payment' && amount > 0" :href="'https://www.dusupay.com/dusu_payments/dusupay?ref=https://fundandimpact.com&dusupay_merchantid=1833&dusupay_amount='+amount+'&dusupay_currency=XAF&dusupay_itemid=4&dusupay_itemname=Donation&dusupay_transactionreference='+id+'&dusupay_render=widget&dusupay_logo=https%3A%2F%2Ffundandimpact.com%2Fsrc%2Fassets%2Flogo.png&dusupay_redirecturl=https%3A%2F%2Fbackend-fundandimpact.com%2Fapi%2Fdusu_donated&dusupay_successurl=https%3A%2F%2Fbackend-fundandimpact.com%2Fapi%2Fdusu_donated&async=true'" class="btn next2">Click Here to Donate</a> -->
      <div v-if="type == 'payment' && amount > 0" id="dusupay-btn">
        <a style="cursor: pointer;">
          <!-- <img src="https://dusupay.com/img/paybuttons/dusupaybtn4.png" /> -->
        </a>
        <button id="dusupay-btn" type="button" name="button" class="btn next2" v-lang.click_here_to_donate>Click Here to Donate</button>
        <div
        dusupay_merchantId="1833"
        :dusupay_amount= "amount"
        dusupay_currency="USD"
        dusupay_itemId="4"
        dusupay_itemName="Donation"
        :dusupay_transactionReference= "id"
        dusupay_render="widget"
        dusupay_logo= "https://fundandimpact.com/src/assets/logo.png"
        dusupay_redirectURL="https://backend-fundandimpact.com/api/dusu_donated"
        dusupay_successURL="https://backend-fundandimpact.com/api/dusu_donated"
        id="dusupay" async=true> </div>
      </div>
      <button v-else-if="type == 'withdraw'" @click="withdrawInfo()" type="button" name="button" class="btn next2" v-lang.click_here_to_withdraw>Click Here to Withdraw</button>
    </div>
    <div class="tab-pane fade" id="paypal">
      <h2>{{(type == 'payment') ? 'Pay' : 'Withdraw'}} <span v-lang.with_paypal>with Paypal</span></h2>
      <div class="alert alert-warning">
        Paypal {{(type == 'payment') ? 'payments' : 'withdrawals'}} <span v-lang.are_currently_unsupported>are currently unsupported</span>.
      </div>
    </div>
  </div>


</div>
</template>
<script>
import CountrySelect from '../static/CountrySelect.vue'
export default {
  name: "",
  props: ['amount', 'id', 'type'],
  components: {
    'country-select': CountrySelect
  },
  data: function data() {
    return {
      phone: '',
      loading: {
        withdraw: false
      }
    }
  },
  methods: {
    withdraw(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading.withdraw = true
          var data = {
            amount: this.amount,
            phone: this.phone
          }
          this.$http.post('api/generate/signature', data)
                    .then(response => {
                      this.loading.withdraw = false
                      console.log(response);
                      if (response.body.status == false) {
                        swal('Withdrawal Failed', response.body.message, 'error')
                      }else{
                        window.location.reload()
                      }
                    })
                    .catch(e => {
                      this.loading.withdraw = false
                      swal('Withdrawal Failed', 'Please try again later.', 'error')
                    })
        }
      })

    },
    withdrawInfo(){
      setTimeout(function() {
        $.magnificPopup.open({
          type: 'inline',

          items: {
            src: '#withdraw-info',
          },

          fixedContentPos: false,
          fixedBgPos: true,
          closeOnBgClick: false,
          overflowY: 'auto',

          showCloseBtn: true,
          preloader: false,

          midClick: false,
          removalDelay: 300,
          mainClass: 'my-mfp-zoom-in popup-middleware'
        });
      }, 0)
    },
    loadJs(url, callback) {
            jQuery.ajax({
              url: url,
              dataType: 'script',
              success: callback,
              async: true
            });
          }
  },
  updated(){
    this.loadJs('https://dusupay.com/js/widgets.js', function() {
      //Stuff to do after someScript has loaded
      // alert('loaded')
    });
  }
}
</script>
<style lang="css">

/* CSS for Credit Card Payment form */
.credit-card-box .panel-title {
    display: inline;
    font-weight: bold;
}
.credit-card-box .form-control.error {
    border-color: red;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(255,0,0,0.6);
}
.credit-card-box label.error {
  font-weight: bold;
  color: red;
  padding: 2px 8px;
  margin-top: 2px;
}
.credit-card-box .payment-errors {
  font-weight: bold;
  color: red;
  padding: 2px 8px;
  margin-top: 2px;
}
.credit-card-box label {
    display: block;
}
/* The old "center div vertically" hack */
.credit-card-box .display-table {
    display: table;
}
.credit-card-box .display-tr {
    display: table-row;
}
.credit-card-box .display-td {
    display: table-cell;
    vertical-align: middle;
    width: 50%;
}
/* Just looks nicer */
.credit-card-box .panel-heading img {
    min-width: 180px;
}
</style>
