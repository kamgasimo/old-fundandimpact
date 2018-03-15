<template>
  <div id="call-to-action-faq" class="">
    <div class="">
      <div class="col-md-12">
        <div class="call-to-action pt-40 pb-40 mb-20 border-1px bg-lighter">
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-md-8">
              <div class="icon-box icon-rounded-bordered left media mb-0 ml-60 ml-sm-0"> <a class="media-left pull-left flip" href="#"> <i class="fa fa-question-circle text-theme-colored border-1px-theme-colored p-20" aria-hidden="true"></i></a>
                <div class="media-body">
                  <h3 class="media-heading heading" v-lang.common_questions>Common Questions</h3>
                  <p v-lang.faq_call_msg>Learn more about FundAndImpact and how it can help you to raise fund.</p>
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-md-4 text-center">
              <router-link to="/faq" class="btn btn-dark btn-theme-colored btn-flat btn-xl mt-20" v-lang.learn_more>Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "call-to-action-faq",
  data: function data() {
    return {

    }
  }
}
</script>
<style lang="css">
#call-to-action-faq .btn{
  font-weight: 600;
}
</style>
